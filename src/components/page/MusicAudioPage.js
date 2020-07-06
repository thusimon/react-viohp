/**
 * Created by Lu on 11/7/2018.
 */
import React from 'react';
import {connect} from 'react-redux';
import {fetchDataWithAccessToken} from '../../api/utils';
import {getAccessToken} from '../../storage/utils';
import {getWebSockets} from '../../websockets/websocket';
import * as modalActions from '../../actions/modalActions';
import MusicStaffPage from '../musicStaff/MusicStaffPage';
import Violin from '../musicStaff/Violin';
import AudioAnalyzer from '../audio/AudioAnalyzer';
import AudioPlayer from '../audio/AudioPlayer';
import ScorePickerModal from '../modal/ScorePickerModal';
import SpectrumFilterModal from '../modal/SpectrumFilterModal';
import SpectrumSettingModal from '../modal/SpectrumSettingModal';
import { AudioCtx, getMediaStream, mergeBuffers, interleave, generateWAV, forceDownload } from '../audio/audio-util'
import '../../styles/common/btn-xs.scss';
import './music-audio-page.scss';

class MusicAudioPage extends React.Component{
  constructor(props){
    super(props);
    this.pickScore = this.pickScore.bind(this);
    this.pickSpectrumFilter = this.pickSpectrumFilter.bind(this);
    this.pickSpectrumSetting = this.pickSpectrumSetting.bind(this);
    this.cleanBuffers = this.cleanBuffers.bind(this);
    this.recordAudio = this.recordAudio.bind(this);
    this.state = {recording: 0};
    this.recLength = 0;
    this.recBuffers = [[],[]];
    this.sampleRate = 48000;
    this.numChannels = 2;
    this.ws = null;

    //this.postData = [[], []];
    //this.postDataSize = 480000; // 10 seconds of data, post data size: 4*480000*2 = 3.7MB
  }

  toggleFilter(){
  }

  pickScore() {
    this.props.toggleScorePicker();
  }

  pickSpectrumFilter() {
    this.props.toggleSpectrumFilter();
  }

  pickSpectrumSetting() {
    this.props.toggleSpectrumSetting();
  }

  cleanBuffers() {
    this.recBuffers=[[],[]];
    this.recLength = 0;
  }

  recordAudio(evt) {
    const {scoreId, musicInfo} = this.props.music;
    if (this.state.recording == 1) {
      // we should stop recording
      this.setState({recording: 0});
      console.log(this.props.music);
      const stopRecordingWSData = {
        type: 'stopRecording',
        data: {scoreId, title: musicInfo.title}
      }
      this.audioContext && this.recorderNode && this.recorderNode.parameters.get('isRecording').setValueAtTime(0, this.audioContext.currentTime);
      this.ws && this.ws.send(JSON.stringify(stopRecordingWSData));
    } else {
      this.setState({recording: 1});
      const audioContext = AudioCtx.getInstance();
      this.audioContext = audioContext;
      this.sampleRate = audioContext.sampleRate;
      const startRecordingWSData = {
        type: 'startRecording',
        data: {scoreId, title: musicInfo.title, sampleRate: this.sampleRate}
      }
      this.ws && this.ws.send(JSON.stringify(startRecordingWSData));
      audioContext.audioWorklet.addModule('worklets/record-worklet.js').then(() => {
        const recorderNode = new window.AudioWorkletNode(
          audioContext,
          'record-worklet'
        );
        // keep the recorder node in class
        this.recorderNode = recorderNode;
        return getMediaStream({audio: true, video:false})
        .then((stream) => {
          const audioBufferSourceNode = audioContext.createMediaStreamSource(stream);
          audioBufferSourceNode.connect(recorderNode);
          recorderNode.connect(audioContext.destination);
          recorderNode.port.onmessage = (e) => {
            if (e.data.eventType === 'data') {
              const audioData = e.data.audioBuffer;
              // store the buffers
              this.recBuffers[0].push(audioData[0]);
              this.recBuffers[1].push(audioData[1]);
              const bufferLen = audioData[0].length; // audioData[0] is one audio worklet buffer, length should be sampleRate
              this.recLength += bufferLen
              // combine the two channels as 1
              const audioWSData = new Float32Array(bufferLen*2);
              console.log(104, audioWSData, audioWSData.length, audioWSData.byteLength, audioWSData.buffer, audioWSData.buffer.length);
              audioWSData.set(audioData[0], 0);
              audioWSData.set(audioData[1], bufferLen);
              this.ws && this.ws.send(audioWSData.buffer);
            }
            if (e.data.eventType === 'stop') {
              const channel1Buffer = mergeBuffers(this.recBuffers[0], this.recLength);
              const channel2Buffer = mergeBuffers(this.recBuffers[1], this.recLength);
              const interleavedBuffer = interleave(channel1Buffer, channel2Buffer);
              const view = generateWAV(interleavedBuffer, this.sampleRate);
              const wavBlob = new Blob ( [ view ], { type : 'audio/wav' } );
              this.cleanBuffers();

              const fileTime = new Date().toISOString().replace(/:/g, '_');
              forceDownload(wavBlob, `record_${fileTime}.wav`);
            }
          }
          recorderNode.parameters.get('isRecording').setValueAtTime(1, audioContext.currentTime);
        })
      });
    }
  }

  componentDidMount() {
    const host = window.location.host
    const ws = new WebSocket(`ws://${host}/path`);
    this.ws = ws;
    ws.onopen = function (event) {
      const authData={
        type: 'auth',
        token: getAccessToken()
      }
      ws.send(JSON.stringify(authData));
      const array = new Float32Array(48000);

      for (var i = 0; i < array.length; ++i) {
        array[i] = i / 2;
      }
      const t= new Float32Array(48000*2);

      t.set(array);
      t.set(array, 48000);
      
      ws.send(t);
    };
  }
  render(){
    return (
      <div className="music-audio-page">
        <div className="control-section">
          <div className="score-picker-button">
            <button type="button" className="btn btn-outline-primary btn-xs" onClick={this.pickScore}
               title='Select a score'>Pick Score</button>
            <ScorePickerModal />
          </div>
          <div className="filter-picker-button">
            <button type="button" className="btn btn-outline-primary btn-xs" onClick={this.pickSpectrumFilter}
              title='Select a spectrum filter to obtain a better audio analyses result, since the musical instruments frequency domain are different'>Spectrum Filter</button>
            <SpectrumFilterModal />
          </div>
          <div className="audio-setting-button">
            <button type="button" className="btn btn-outline-primary btn-xs" onClick={this.pickSpectrumSetting}
              title='Configure the audio analyses, such as frequence range, tolerance.'>Spectrum Setting</button>
            <SpectrumSettingModal />
          </div>
          <div className='audio-recording-button'>
            <button type="button" className={this.state.recording != 1 ? 'btn btn-outline-primary btn-xs fullwidth' : 'btn btn-outline-danger btn-xs fullwidth'}
              onClick={this.recordAudio}
              title='Record the audio for better analysis' disabled={this.state.recording == -1}
            >
              {this.state.recording != 1 ? 'Record':'Stop'}
            </button>
          </div>
          <div className="player-section">
            <AudioPlayer />
          </div>
        </div>
        <div className="score-section">
          <MusicStaffPage />
        </div>
        <div className="audio-section">
          <AudioAnalyzer />
          <p className="badge badge-info violin-caption">Violin(Position 1)</p>
          <div className="violin-container">
            <Violin />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    audio:state.audio,
    music:state.music
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleScorePicker: () => {
      dispatch(modalActions.toggleScorePicker());
    },
    toggleSpectrumFilter: () => {
      dispatch(modalActions.toggleSpectrumFilter());
    },
    toggleSpectrumSetting: () => {
      dispatch(modalActions.toggleSpectrumSetting());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicAudioPage);
