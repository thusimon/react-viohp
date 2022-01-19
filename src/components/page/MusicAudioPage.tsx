import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as modalActions from '../../actions/modalActions';
import {toggleAnalyzeAudio} from '../../actions/audioActions'
import * as playerActions from '../../actions/playerActions'
import MusicStaff from '../musicStaff/MusicStaff';
import Violin from '../violinBoard/Violin';
import AudioAnalyzer from '../audio/AudioAnalyzer';
import AudioPlayer from '../audio/AudioPlayer';
import PrepareTimerModal from '../modal/PrepareTimerModal';
import ScorePickerModal from '../modal/ScorePickerModal';
import SpectrumFilterModal from '../modal/SpectrumFilterModal';
import SpectrumSettingModal from '../modal/SpectrumSettingModal';
import { AudioCtx, getMediaStream, mergeBuffers, interleave, generateWAV, forceDownload } from '../audio/audio-util'
import { RootState } from '../../reducers/initialState';

import '../../styles/common/btn-xs.scss';
import './music-audio-page.scss';

const MusicAudioPage = () => {
  const audioPageProps = useSelector((state: RootState) => ({
    audio:state.audio,
    score:state.score,
    auth:state.auth,
    ws: state.ws
  }));
  const dispatch = useDispatch();
  const [audioPageState, setAudioPageState] = useState({
    recording: 0});
  let recLength = 0;
  let recBuffers = [[],[]];
  let sampleRate = 48000;
  let numChannels = 2;
  let audioContext;
  let recorderNode;

  const toggleFilter = () => {};
  const pickScore = () => {
    dispatch(modalActions.toggleScorePicker());
  }
  const pickSpectrumFilter = () => {
    dispatch(modalActions.toggleSpectrumFilter());
  }
  const pickSpectrumSetting = () => {
    dispatch(modalActions.toggleSpectrumSetting());
  }
  const cleanBuffers = () => {
    recLength = 0;
    recBuffers=[[],[]];
  }
  const analyzeAudio = (evt) => {
    const {id, scoreInfo} = audioPageProps.score;
    dispatch(toggleAnalyzeAudio(!audioPageState.recording));
    if (audioPageState.recording == 1) {
      // we should stop recording
      setAudioPageState({recording: 0});
      audioContext && recorderNode && recorderNode.parameters.get('isRecording').setValueAtTime(0, audioContext.currentTime);
      /*
      const stopRecordingWSData = {
        type: 'stopRecording',
        data: {scoreId: id, title: scoreInfo.title}
      }
      audioPageProps.ws.ws && audioPageProps.ws.ws.send(JSON.stringify(stopRecordingWSData));
      */
    } else {
      dispatch(playerActions.preplay());
      setAudioPageState({recording: 1});
      audioContext = AudioCtx.getInstance();
      sampleRate = audioContext.sampleRate;
      /*
      const startRecordingWSData = {
        type: 'startRecording',
        data: {scoreId: id, title: scoreInfo.title, sampleRate: this.sampleRate}
      }
      audioPageProps.ws.ws && audioPageProps.ws.ws.send(JSON.stringify(startRecordingWSData));
      */
      audioContext.audioWorklet.addModule('worklets/record-worklet.js').then(() => {
        recorderNode = new window.AudioWorkletNode(
          audioContext,
          'record-worklet'
        );
        return getMediaStream({audio: true, video:false})
        .then((stream) => {
          const audioBufferSourceNode = audioContext.createMediaStreamSource(stream);
          audioBufferSourceNode.connect(recorderNode);
          recorderNode.connect(audioContext.destination);
          recorderNode.port.onmessage = (e) => {
            if (e.data.eventType === 'data') {
              const audioData = e.data.audioBuffer;
              // store the buffers
              recBuffers[0].push(audioData[0]);
              recBuffers[1].push(audioData[1]);
              const bufferLen = audioData[0].length; // audioData[0] is one audio worklet buffer, length should be sampleRate
              recLength += bufferLen
              // combine the two channels as 1
              /*
              const audioWSData = new Float32Array(bufferLen*2);
              audioWSData.set(audioData[0], 0);
              audioWSData.set(audioData[1], bufferLen);
              audioPageProps.ws.ws && audioPageProps.ws.ws.send(audioWSData.buffer);
              */
            }
            if (e.data.eventType === 'stop') {
              const channel1Buffer = mergeBuffers(recBuffers[0], recLength);
              const channel2Buffer = mergeBuffers(recBuffers[1], recLength);
              const interleavedBuffer = interleave(channel1Buffer, channel2Buffer);
              const view = generateWAV(interleavedBuffer, sampleRate);
              const wavBlob = new Blob ( [ view ], { type : 'audio/wav' } );
              cleanBuffers();

              const fileTime = new Date().toISOString().replace(/:/g, '_');
              forceDownload(wavBlob, `record_${fileTime}.wav`);
            }
          }
          recorderNode.parameters.get('isRecording').setValueAtTime(1, audioContext.currentTime);
        })
      });
    }
  }
  return (
    <div className="music-audio-page">
      <div className="control-section">
        <div className="score-picker-button">
          <button type="button" className="btn btn-outline-primary btn-xs" onClick={pickScore}
             title='Select a score'>Pick Score</button>
          <ScorePickerModal />
        </div>
        <div className="filter-picker-button">
          <button type="button" className="btn btn-outline-primary btn-xs" onClick={pickSpectrumFilter}
            title='Select a spectrum filter to obtain a better audio analyses result, since the musical instruments frequency domain are different'>Spectrum Filter</button>
          <SpectrumFilterModal />
        </div>
        <div className="audio-setting-button">
          <button type="button" className="btn btn-outline-primary btn-xs" onClick={pickSpectrumSetting}
            title='Configure the audio analyses, such as frequence range, tolerance.'>Spectrum Setting</button>
          <SpectrumSettingModal />
        </div>
        <div className='audio-recording-button'>
          <button type="button" className={audioPageState.recording != 1 ? 'btn btn-outline-primary btn-xs fullwidth' : 'btn btn-outline-danger btn-xs fullwidth'}
            onClick={analyzeAudio}
            title='Analyze the audio for evalutating the performance' disabled={audioPageProps.auth.user == null}>
            {audioPageState.recording != 1 ? 'Analyze':'Stop'}
          </button>
        </div>
        <div className="player-section">
          <AudioPlayer />
        </div>
      </div>
      <div className="score-section">
        <MusicStaff />
      </div>
      <div className="audio-section">
        <AudioAnalyzer />
        <p className="badge badge-info violin-caption">Violin(Position 1)</p>
        <div className="violin-container">
          <Violin />
        </div>
      </div>
      <PrepareTimerModal callback={playerActions.play}/>
    </div>
  );
}

export default MusicAudioPage;
