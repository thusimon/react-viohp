/**
 * Created by Lu on 11/7/2018.
 */
import React from 'react';
import {connect} from 'react-redux';
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
    this.createDownloadLink = this.createDownloadLink.bind(this);
    this.state = {recording: 0};
    this.recorder = null;
    this.recLength = 0,
    this.recBuffers = [[],[]],
    this.sampleRate = 48000
    this.numChannels = 2;
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

  createDownloadLink() {
    this.recorder && this.recorder.exportWAV(function(blob) {
      var url = URL.createObjectURL(blob);
      var li = document.createElement('li');
      var au = document.createElement('audio');
      var hf = document.createElement('a');
      
      au.controls = true;
      au.src = url;
      hf.href = url;
      hf.download = new Date().toISOString() + '.wav';
      hf.innerHTML = hf.download;
      li.appendChild(au);
      li.appendChild(hf);
      //recordingslist.appendChild(li);
    });
  }

  cleanBuffers() {
    this.recBuffers=[[],[]];
    this.recLength = 0;
  }

  recordAudio(evt) {
    if (this.state.recording == 1) {
      // we should stop recording
      this.setState({recording: 0});
      this.audioContext && this.recorderNode &&
        this.recorderNode.parameters.get('isRecording').setValueAtTime(0, this.audioContext.currentTime);
    } else {
      this.setState({recording: 1});
      const audioContext = AudioCtx.getInstance();
      this.audioContext = audioContext;
      this.sampleRate = audioContext.sampleRate;

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
              this.recLength += audioData[0].length; // audioData[0] is one frame, length should be 128
            }
            if (e.data.eventType === 'stop') {
              const channel1Buffer = mergeBuffers(this.recBuffers[0], this.recLength);
              const channel2Buffer = mergeBuffers(this.recBuffers[1], this.recLength);
              const interleavedBuffer = interleave(channel1Buffer, channel2Buffer);
              const wavBlob = generateWAV(interleavedBuffer, this.sampleRate);
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
    audio:state.audio
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
