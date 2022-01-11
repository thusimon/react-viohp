/*eslint no-console: 0 */
import React, {useRef, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { AUDIO_ANALYSE_INTERVAL } from './constants';
import * as audioUtils from './Utils';
import AudioDisplay from './AudioDisplay';
import * as audioActions from '../../actions/audioActions';
import {multiplyVectors} from '../../math/basicMatrix';
import {fetchDataWithAccessToken} from '../../api/utils';
import './audio-analyzer.scss';

const AudioAnalyzer = (props) => {
  const canvasRef = useRef(null);
  let source=null;
  const defaultInfo = {noteColor: "#00FF00", peakFreq: 0, noteName: "--", noteFreq: '--'};
  const [settingsState, setSettingsState] = useState({showSettings: false});
  const [audioState, setAudioState] = useState({
    dataArray: new Uint8Array(0),
    peakEnergy: 0,
    peakFreq: 0,
    noteColor: defaultInfo.noteColor,
    noteName: defaultInfo.noteName,
    noteFreq: defaultInfo.noteFreq
  });
  const initAnalyzeData = {
    sampleRate: 44000,
    scoreTitle: '',
    scoreId: '',
    analyzeFrames: [],
    prepareTime: 5000,
    analyzeIncTime: AUDIO_ANALYSE_INTERVAL
  };
  let analyzing = false;
  let analyzeData;
  let audioCtx;
  let analyser;
  let timer;
  let dataArray;
  let fftSize = 32768;
  let sampleRate = 44000;

  const toggleSettings = () => {
    const curState = settingsState.showSettings;
    setSettingsState({showSettings:!curState});
  }

  const toggleAudioAnalyze = (peakFreqIndex) => {
    if (props.analyzeState == 1){
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

  const updateCanvas = () => {
    analyser.getByteFrequencyData(dataArray);
    let rangedFreqData = audioUtils.getRangedFreqData(dataArray, sampleRate, fftSize, props.freqRange);
    if (props.appliedFilter && props.appliedFilter.length > 0){
      //multiply the two arrays
      rangedFreqData = multiplyVectors(rangedFreqData, props.appliedFilter);
    }
    let [peakEnergy, peakFreqIndex] = audioUtils.getPeakFreq(rangedFreqData, props.threshold);
    toggleAudioAnalyze(peakFreqIndex)
    //let [peakEnergy, peakFreqIndex] = audioUtils.getBasePeakFreq(rangedFreqData, props.threshold, 50);
    let {noteColor, peakFreq,noteName, noteFreq} = defaultInfo;
    if (peakEnergy > 0){
      let peakFreqRaw = audioUtils.getFreqFromIndex(peakFreqIndex, sampleRate, fftSize) + props.freqRange[0];
      peakFreqRaw = +peakFreqRaw.toFixed(2);
      let freqDisplayInfo = audioUtils.getNoteByFreq(peakFreqRaw, props.tolerance);
      peakFreq = freqDisplayInfo.peakFreq;
      noteColor = freqDisplayInfo.noteColor;
      noteName = freqDisplayInfo.noteName;
      noteFreq = freqDisplayInfo.noteFreq;
    }
    props.displayInfo(peakEnergy, peakFreq, noteColor, noteName, noteFreq);
    setAudioState({
      dataArray,
      peakEnergy,
      peakFreq,
      noteColor,
      noteName,
      noteFreq
    });
  }

  useEffect(() => {
    audioCtx = new window.AudioContext();
    analyser = audioCtx.createAnalyser();
    // get media
    if (navigator.mediaDevices.getUserMedia) {
      console.log('getUserMedia supported.');
      navigator.mediaDevices.getUserMedia ({audio: true, video:false})
      .then(stream => {
        source = audioCtx.createMediaStreamSource(stream);
        sampleRate = audioCtx.sampleRate;
        props.setAudioParam(sampleRate, fftSize);
        analyser.fftSize = fftSize;
        //analyser.smoothingTimeConstant = 0.5;
        let bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        source.connect(analyser);
        console.log("connected to source");
        // mostly the sample rate is 48000 by default
        // for violin g3#-g3=12Hz
        console.log("sample rate = " + sampleRate);
        console.log("fft dataArray len: " + dataArray.length);
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

  let canvasDom = canvasRef.current;
  if (canvasDom && audioState.dataArray && audioState.dataArray.length > 0) {
    let canvasCtx = canvasDom.getContext("2d");
    canvasCtx.fillStyle = 'rgb(220, 220, 220)';
    canvasCtx.fillRect(0, 0, canvasDom.width, canvasDom.height);
    let axisW = 25;
    let chartW = canvasDom.width-axisW-20;
    let axisH = 25;
    let chartH = canvasDom.height-axisH-20;
    let chartHTo255 = chartH/255;
    let dataArray = audioState.dataArray;
    let dataLen = dataArray.length;
    let barWidth = (chartW / dataLen);
    let barHeight;
    let x = axisW;
    for(let i = 0; i < dataLen; i++) {
      barHeight = dataArray[i]*chartHTo255; // [0,255]=>[0,chartH]
      canvasCtx.fillStyle = `rgb(${dataArray[i]},${255-dataArray[i]}, 50)`;
      canvasCtx.fillRect(x, chartH - barHeight + 20, barWidth, barHeight);
      x += barWidth;
    }
    // plot the y axises
    canvasCtx.strokeStyle="#000000";
    canvasCtx.fillStyle = "rgb(0,0,0)";
    canvasCtx.font = "10px Arial";
    canvasCtx.beginPath();
    canvasCtx.moveTo(axisW,20);
    canvasCtx.lineTo(axisW,chartH+20);
    canvasCtx.lineTo(axisW+chartW,chartH+20);

    canvasCtx.moveTo(axisW-4,20);
    canvasCtx.lineTo(axisW-0,20);
    canvasCtx.fillText("255",4,24);
    canvasCtx.moveTo(axisW-4,20+chartH/2);
    canvasCtx.lineTo(axisW-0,20+chartH/2);
    canvasCtx.fillText("127",2,24+chartH/2);
    canvasCtx.moveTo(axisW-4,20+chartH);
    canvasCtx.lineTo(axisW-0,20+chartH);
    canvasCtx.fillText("0",4,24+chartH);


    let xaxisDiv=8;
    let xstep = chartW/xaxisDiv;
    let xfreqStep=(props.freqRange[1] - props.freqRange[0]) / xaxisDiv;
    for (let i=0; i <= xaxisDiv; i++){
      let curXaxis = axisW + i*xstep;
      canvasCtx.moveTo(curXaxis, 20+chartH);
      canvasCtx.lineTo(curXaxis, 24+chartH);
      canvasCtx.fillText(Math.round(props.freqRange[0]+i*xfreqStep), curXaxis-12,40+chartH);
    }
    canvasCtx.fillStyle = "rgb(0,0,255)";
    let thresholdH = chartH- props.threshold * chartHTo255;
    canvasCtx.moveTo(axisW-4,20+thresholdH);
    canvasCtx.lineTo(axisW-0,20+thresholdH);
    canvasCtx.fillText(props.threshold, 4, 24+thresholdH);

    canvasCtx.stroke();
  }
  
  return (
    <div className="audio-analyzer-container">
      <div className="audio-spectrum-canvas-container">
        <canvas id="audio-canvas" ref={canvasRef} width="400" height="150" />
      </div>
      <AudioDisplay />
    </div>
  );
}

function mapStateToProps(state){
  return Object.assign({}, state.audio, {score:state.score}, {ws: state.ws});
}

function mapDispatchToProps(dispatch){
  return {
    displayInfo: (peakEnergy, peakFreq, noteColor, noteName, noteFreq)=>{
      dispatch(audioActions.displayInfo(peakEnergy, peakFreq, noteColor, noteName, noteFreq));
    },
    setAudioParam: (sampleRate, fftSize)=>{
      dispatch(audioActions.setAudioParam(sampleRate, fftSize));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioAnalyzer);