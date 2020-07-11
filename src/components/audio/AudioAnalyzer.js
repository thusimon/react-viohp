/**
 * Created by Lu on 10/29/2018.
 */
/*eslint no-console: 0 */
import React from 'react';
import {connect} from 'react-redux';
import * as audioUtils from './Utils';
import AudioDisplay from './AudioDisplay';
import * as audioActions from '../../actions/audioActions';
import {multiplyVectors} from '../../math/basicMatrix';
import './audio-analyzer.scss';

class AudioAnalyzer extends React.Component{
  constructor(props, context){
    super(props, context);
    this.canvasRef = React.createRef();
    this.constraints = {audio: true, video:false};
    this.updateCanvas = this.updateCanvas.bind(this);
    this.toggleAudioAnalyze = this.toggleAudioAnalyze.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.source=null;
    this.defaultInfo = {noteColor: "#00FF00", peakFreq: "0", noteName: "--", noteFreq: '--'};
    this.state = Object.assign({}, this.props, {showSettings: false});
    this.initAnalyzeData = {
      sampleRate: 0,
      scoreTitle: '',
      scoreId: '',
      analyzeFrames: [],
      prepareTime: 5000,
      analyzeIncTime: 100
    },
    this.analyzing = false;
  }
  static getDerivedStateFromProps(nextProps){
    let {threshold, tolerance, freqRange,appliedFilter} = nextProps;
    return {threshold, tolerance, freqRange,appliedFilter};
  }
  componentDidMount(){
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.audioCtx.createAnalyser();
    // get media
    let me = this;
    if (navigator.mediaDevices.getUserMedia) {
      console.log('getUserMedia supported.');
      navigator.mediaDevices.getUserMedia (this.constraints)
        .then(
        function(stream) {
          me.source = me.audioCtx.createMediaStreamSource(stream);
          me.sampleRate = me.audioCtx.sampleRate;
          //me.props.displaySampleRate(me.sampleRate);
          //me.fftSize = audioUtils.getViolinFFtSize(me.sampleRate);
          me.fftSize = 32768;
          me.props.setAudioParam(me.sampleRate, me.fftSize);
          me.analyser.fftSize = me.fftSize;
          //me.analyser.smoothingTimeConstant = 0.5;
          me.bufferLength = me.analyser.frequencyBinCount;
          me.dataArray = new Uint8Array(me.bufferLength);
          me.source.connect(me.analyser);
          console.log("connected to source");
          // mostly the sample rate is 48000 by default
          // for violin g3#-g3=12Hz
          console.log("sample rate = " + me.sampleRate);
          console.log("fft dataArray len: " + me.dataArray.length);
          me.timer = setInterval(me.updateCanvas, 100);
          me.audioCtx.resume();
        })
        .catch( function(err) { 
          console.log('The following gUM error occured: ' + err);
        });
    } else {
      console.log('getUserMedia not supported on your browser!');
    }

    //create a timer
  }
  componentWillUnmount(){
    clearInterval(this.timer);
  }
  toggleSettings() {
    let curState = this.state.showSettings;
    this.setState({showSettings:!curState});
  }
  toggleAudioAnalyze(peakFreqIndex) {
    if (!this.props.ws.ws) {
      return;
    }
    if (this.props.analyzeState==1){
      if (this.analyzing == false) {
        this.analyzing = true;
        this.analyzeData = this.initAnalyzeData;
        this.analyzeData.analyzeFrames = [];
        this.analyzeData.sampleRate = this.sampleRate;
        this.analyzeData.scoreTitle = this.props.music.musicInfo.title
        this.analyzeData.scoreId = this.props.music.id
        this.analyzeData.analyzeFrames.push(peakFreqIndex);
      } else {
        this.analyzeData.analyzeFrames.push(peakFreqIndex);
      }
    } else {
      if (this.analyzing == true) {
        // recording is done, we should send the analyzed data
        this.analyzing = false;
        this.props.ws.ws.send(JSON.stringify({
          type: 'anaylzeAudio',
          data: this.analyzeData
        }));
        this.analyzeData = this.initAnalyzeData;
      }
    }
  }
  updateCanvas(){
    this.analyser.getByteFrequencyData(this.dataArray);
    let rangedFreqData = audioUtils.getRangedFreqData(this.dataArray, this.sampleRate, this.fftSize, this.state.freqRange);
    if (this.state.appliedFilter && this.state.appliedFilter.length>0){
      //multiply the two arrays
      rangedFreqData = multiplyVectors(rangedFreqData, this.state.appliedFilter);
    }
    let [peakEnergy, peakFreqIndex] = audioUtils.getPeakFreq(rangedFreqData, this.state.threshold);
    this.toggleAudioAnalyze(peakFreqIndex)
    //let [peakEnergy, peakFreqIndex] = audioUtils.getBasePeakFreq(rangedFreqData, this.state.threshold, 50);
    let {noteColor, peakFreq,noteName, noteFreq} = this.defaultInfo;
    if (peakEnergy>0){
      let peakFreqRaw = audioUtils.getFreqFromIndex(peakFreqIndex, this.sampleRate, this.fftSize) + this.state.freqRange[0];
      peakFreqRaw = peakFreqRaw.toFixed(2);
      let freqDisplayInfo = audioUtils.getNoteByFreq(peakFreqRaw, this.state.tolerance);
      peakFreq = freqDisplayInfo.peakFreq;
      noteColor = freqDisplayInfo.noteColor;
      noteName = freqDisplayInfo.noteName;
      noteFreq = freqDisplayInfo.noteFreq;
      //this.props.showFreqLineOnStaff(peakFreq);
    } else {
      //this.props.showFreqLineOnStaff(-1);
    }
    this.props.displayInfo(peakEnergy, peakFreq, noteColor, noteName, noteFreq);
    this.setState({dataArray: rangedFreqData, sampleRate:this.sampleRate, peakEnergy, peakFreq, noteColor, noteName, noteFreq});
  }
  render(){
    let canvasDom = this.canvasRef.current;
    if(canvasDom) {
      let canvasCtx = canvasDom.getContext("2d");
      canvasCtx.fillStyle = 'rgb(220, 220, 220)';
      canvasCtx.fillRect(0, 0, canvasDom.width, canvasDom.height);
      let axisW = 25;
      let chartW = canvasDom.width-axisW-20;
      let axisH = 25;
      let chartH = canvasDom.height-axisH-20;
      let chartHTo255 = chartH/255;
      let dataArray = this.state.dataArray||[];
      let dataLen = dataArray.length;
      let barWidth = (chartW / dataLen);
      let barHeight;
      let x = axisW;
      for(let i = 0; i < dataLen; i++) {
        barHeight = dataArray[i]*chartHTo255; // [0,255]=>[0,chartH]
        canvasCtx.fillStyle = `rgb(${dataArray[i]},${255-dataArray[i]}, 50)`;
        canvasCtx.fillRect(x,chartH-barHeight+20,barWidth,barHeight);
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


      let xaxisDiv=8, xstep = chartW/xaxisDiv, xfreqStep=(this.state.freqRange[1]-this.state.freqRange[0])/xaxisDiv;
      for (let i=0;i<=xaxisDiv;i++){
        let curXaxis = axisW+i*xstep;
        canvasCtx.moveTo(curXaxis,20+chartH);
        canvasCtx.lineTo(curXaxis,24+chartH);
        canvasCtx.fillText(Math.round(this.state.freqRange[0]+i*xfreqStep),curXaxis-12,40+chartH);
      }
      canvasCtx.fillStyle = "rgb(0,0,255)";
      let thresholdH = chartH-this.state.threshold*chartHTo255;
      canvasCtx.moveTo(axisW-4,20+thresholdH);
      canvasCtx.lineTo(axisW-0,20+thresholdH);
      canvasCtx.fillText(this.state.threshold,4,24+thresholdH);

      canvasCtx.stroke();
    }

    return (
      <div className="audio-analyzer-container">
        <div className="audio-spectrum-canvas-container">
          <canvas id="audio-canvas" ref={this.canvasRef} width="400" height="150" />
        </div>
        <AudioDisplay />
      </div>
    );
  }
}
function mapStateToProps(state){
  return Object.assign({}, state.audio, {music:state.music}, {ws: state.ws});
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
