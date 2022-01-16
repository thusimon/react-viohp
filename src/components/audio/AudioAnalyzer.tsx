/*eslint no-console: 0 */
import React, {useRef, useState, useEffect} from 'react';
import { RootState } from '../../reducers/initialState';
import {connect, useSelector, useDispatch } from 'react-redux';
import { AUDIO_ANALYSE_INTERVAL } from './constants';
import * as audioUtils from './Utils';
import AudioDisplay from './AudioDisplay';
import * as audioActions from '../../actions/audioActions';
import {multiplyVectors} from '../../math/basicMatrix';
import {fetchDataWithAccessToken} from '../../api/utils';
import './audio-analyzer.scss';
import { AudioState } from '../../reducers/audioReducer';

const AudioAnalyzer = (props) => {
  const canvasRef = useRef(null);
  const audioProps = useSelector((state: RootState) => state.audio);
  const dispatch = useDispatch();
  let source=null;
  const defaultInfo = {
    noteColor: '#00FF00',
    peakFreq: 0,
    peakEnergy: 0,
    noteName: '--',
    noteFreq: '--'
  };
  const [settingsState, setSettingsState] = useState({ showSettings: false });
  // const [audioState, setAudioState] = useState({
  //   ...audioProps
  // });
  // const [audioState, setAudioState] = useState({
  //   dataArray: new Uint8Array(0),
  //   peakEnergy: 0,
  //   peakFreq: 0,
  //   noteColor: defaultInfo.noteColor,
  //   noteName: defaultInfo.noteName,
  //   noteFreq: defaultInfo.noteFreq
  // });
  const initAnalyzeData = {
    sampleRate: 48000,
    scoreTitle: '',
    scoreId: '',
    analyzeFrames: [],
    prepareTime: 5000,
    analyzeIncTime: AUDIO_ANALYSE_INTERVAL
  };
  let analyzing = false;
  let analyser;
  let analyzeData;
  let audioCtx;
  let timer;
  let dataArray;
  const fftSize = 32768;
  let sampleRate = 48000;

  const toggleSettings = () => {
    const curState = settingsState.showSettings;
    setSettingsState({showSettings:!curState});
  }

  const toggleAudioAnalyze = (peakFreqIndex) => {
    if (audioProps.analyzeState == 1){
      if (analyzing) {
        analyzeData.analyzeFrames.push(peakFreqIndex);
      } else {
        analyzing = true;
        analyzeData = initAnalyzeData;
        analyzeData.sampleRate = sampleRate;
        analyzeData.scoreTitle = props.score.scoreInfo.title
        analyzeData.scoreId = props.score.id
        analyzeData.noteBaseTime = 300;
        analyzeData.analyzeFrames.push(peakFreqIndex);
      }
    } else {
      if (analyzing) {
        // recording is done, we should send the analyzed data
        analyzing = false;
        /*
        this.props.ws.ws.send(JSON.stringify({
          type: 'anaylzeAudio',
          data: this.analyzeData
        }));
        */
        fetchDataWithAccessToken('/api/audioanalyse', 'POST', analyzeData);
        analyzeData = initAnalyzeData;
      }
    }
  };

  const getAudioDisplayInfo = (rangedFreqData, sampleRate, fftSize, threshold, freqRange, tolerance) => {
    //const [peakEnergy, peakFreqIndex] = audioUtils.getBasePeakFreq(rangedFreqData, threshold, 50);
    const [peakEnergy, peakFreqIndex] = audioUtils.getPeakFreq(rangedFreqData, threshold);
    toggleAudioAnalyze(peakFreqIndex);
    let {noteColor, peakFreq, noteName, noteFreq} = defaultInfo;
    if (peakEnergy > 0){
      let peakFreqRaw = audioUtils.getFreqFromIndex(peakFreqIndex, sampleRate, fftSize) + freqRange[0];
      peakFreqRaw = +peakFreqRaw.toFixed(2);
      const freqDisplayInfo = audioUtils.getNoteByFreq(peakFreqRaw, tolerance);
      peakFreq = freqDisplayInfo.peakFreq;
      noteColor = freqDisplayInfo.noteColor;
      noteName = freqDisplayInfo.noteName;
      noteFreq = freqDisplayInfo.noteFreq;
    }
    return { noteColor, peakFreq, peakEnergy, noteName, noteFreq };
  };

  const redrawCanvas = () => {
    const dataArray = audioProps.spectrumData;
    if (!dataArray || dataArray.length < 1) {
      return defaultInfo;
    }
    let rangedFreqData = audioUtils.getRangedFreqData(dataArray, sampleRate, fftSize, audioProps.freqRange);
    if (audioProps.appliedFilter && audioProps.appliedFilter.length > 0){
      //multiply the two arrays
      rangedFreqData = multiplyVectors(rangedFreqData, audioProps.appliedFilter);
    }
    const canvasDom = canvasRef.current;
    if (canvasDom) {
      const canvasCtx = canvasDom.getContext('2d');
      canvasCtx.clearRect(0, 0, canvasDom.width, canvasDom.height);
      canvasCtx.fillStyle = 'rgb(220, 220, 220)';
      canvasCtx.fillRect(0, 0, canvasDom.width, canvasDom.height);
      const axisW = 25;
      const chartW = canvasDom.width - axisW - 20;
      const axisH = 25;
      const chartH = canvasDom.height- axisH - 20;
      const chartHTo255 = chartH / 255;
      const dataLen = rangedFreqData.length;
      const barWidth = chartW / dataLen;
      let x = axisW;
      for(let i = 0; i < dataLen; i++) {
        const barHeight = rangedFreqData[i] * chartHTo255; // [0,255]=>[0,chartH]
        canvasCtx.fillStyle = `rgb(${rangedFreqData[i]}, ${255 - rangedFreqData[i]}, 50)`;
        canvasCtx.fillRect(x, chartH - barHeight + 20, barWidth, barHeight);
        x += barWidth;
      }
      // plot the y axises
      canvasCtx.strokeStyle = '#000000';
      canvasCtx.fillStyle = 'rgb(0,0,0)';
      canvasCtx.font = '10px Arial';
      canvasCtx.beginPath();
      canvasCtx.moveTo(axisW, 20);
      canvasCtx.lineTo(axisW, chartH + 20);
      canvasCtx.lineTo(axisW + chartW, chartH + 20);

      canvasCtx.moveTo(axisW - 4, 20);
      canvasCtx.lineTo(axisW - 0, 20);
      canvasCtx.fillText('255', 4, 24);
      canvasCtx.moveTo(axisW - 4, 20 + chartH / 2);
      canvasCtx.lineTo(axisW - 0, 20 + chartH / 2);
      canvasCtx.fillText('127', 2, 24 + chartH / 2);
      canvasCtx.moveTo(axisW - 4, 20 + chartH);
      canvasCtx.lineTo(axisW - 0, 20 + chartH);
      canvasCtx.fillText('0', 4, 24 + chartH);


      const xaxisDiv=8;
      const xstep = chartW / xaxisDiv;
      const xfreqStep=(audioProps.freqRange[1] - audioProps.freqRange[0]) / xaxisDiv;
      for (let i = 0; i <= xaxisDiv; i++){
        const curXaxis = axisW + i * xstep;
        canvasCtx.moveTo(curXaxis, 20 + chartH);
        canvasCtx.lineTo(curXaxis, 24 + chartH);
        canvasCtx.fillText(Math.round(audioProps.freqRange[0] + i * xfreqStep), curXaxis - 12, 40 + chartH);
      }
      canvasCtx.fillStyle = 'rgb(0,0,255)';
      const thresholdH = chartH - audioProps.threshold * chartHTo255;
      canvasCtx.moveTo(axisW - 4, 20 + thresholdH);
      canvasCtx.lineTo(axisW - 0, 20 + thresholdH);
      canvasCtx.fillText(audioProps.threshold, 4, 24 + thresholdH);

      canvasCtx.stroke();

      return getAudioDisplayInfo(rangedFreqData, sampleRate, fftSize, audioProps.threshold, audioProps.freqRange, audioProps.tolerance);
    }
  }

  const updateCanvas = () => {
    analyser.getByteFrequencyData(dataArray);
    dispatch(audioActions.sendSpctrumData(dataArray));
  }

  useEffect(() => {
    // get media
    if (navigator.mediaDevices.getUserMedia) {
      console.log('getUserMedia supported.');
      navigator.mediaDevices.getUserMedia ({audio: true, video:false})
      .then(stream => {
        audioCtx = new window.AudioContext();
        analyser = audioCtx.createAnalyser();
        source = audioCtx.createMediaStreamSource(stream);
        sampleRate = audioCtx.sampleRate;
        //props.setAudioParam(sampleRate, fftSize);
        analyser.fftSize = fftSize;
        dispatch(audioActions.setAudioParam(sampleRate, fftSize));
        //analyser.smoothingTimeConstant = 0.5;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        source.connect(analyser);
        console.log('connected to source');
        // mostly the sample rate is 48000 by default
        // for violin g3#-g3=12Hz
        console.log('sample rate = ' + sampleRate);
        console.log('fft dataArray len: ' + dataArray.length);
        timer = setInterval(updateCanvas, AUDIO_ANALYSE_INTERVAL);
        audioCtx.resume();
      })
      .catch( function(err) { 
        console.log('The following gUM error occured: ' + err);
      });
    } else {
      console.log('getUserMedia not supported on your browser!');
    }

    return () => {
      // unmount
      if (timer) {
        clearInterval(timer);
      }
    }
  }, []);

  const audioDisplayInfo = redrawCanvas();
  return (
    <div className='audio-analyzer-container'>
      <div className='audio-spectrum-canvas-container'>
        <canvas id='audio-canvas' ref={canvasRef} width='400' height='150' />
      </div>
      <AudioDisplay peakEnergy={audioDisplayInfo.peakEnergy} noteColor={audioProps.noteColor}
        peakFreq={audioDisplayInfo.peakFreq} noteName={audioDisplayInfo.noteName}
        noteFreq={audioDisplayInfo.noteFreq} />
    </div>
  );
}

export default AudioAnalyzer;
