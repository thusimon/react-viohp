/**
 * Created by Lu on 10/29/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as audioUtils from './Utils';
import AudioDisplay from './AudioDisplay';
import * as audioActions from '../../actions/audioActions';

class AudioAnalyzer extends React.Component{
  constructor(props, context){
    super(props, context);
    this.canvasRef = React.createRef();
    this.state = {dataArray:[]};
    this.constraints = {audio: true, video:false};
    this.updateCanvas = this.updateCanvas.bind(this);
    this.source=null;
    this.defaultInfo = {noteColor: "#00FF00", peakFreq: "0", noteName: "--", noteFreq: '--'};
    this.state = {dataArray:[], sampleRate: 0, peakEnergy: 0,
      noteColor: "#00FF00", peakFreq: "0", noteName: "--", noteFreq: '--'};
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
          me.fftSize = 16384;
          console.log("fftSize: " + me.fftSize);
          me.analyser.fftSize = me.fftSize;
          me.bufferLength = me.analyser.frequencyBinCount;
          me.dataArray = new Uint8Array(me.bufferLength);
          me.source.connect(me.analyser);
          console.log("connected to source");
          // mostly the sample rate is 48000 by default
          // for violin g3#-g3=12Hz
          console.log("sample rate = " + me.sampleRate);
          console.log("fft dataArray len" + me.dataArray.length);
          me.timer = setInterval(me.updateCanvas, 100)
        })
        .catch( function(err) { console.log('The following gUM error occured: ' + err);})
    } else {
      console.log('getUserMedia not supported on your browser!');
    }

    //create a timer
  }
  componentWillUnmount(){
    clearInterval(this.timer);
  }
  updateCanvas(){
    this.analyser.getByteFrequencyData(this.dataArray);
    let rangedFreqData = audioUtils.getRangedFreqData(this.dataArray, this.sampleRate, this.fftSize, this.props.freqRange);
    let [peakEnergy, peakFreqIndex] = audioUtils.getPeakFreq(rangedFreqData, this.props.threshold);
    let {noteColor, peakFreq,noteName, noteFreq} = this.defaultInfo;
    if (peakEnergy>0){
      let peakFreqRaw = audioUtils.getFreqFromIndex(peakFreqIndex, this.sampleRate, this.fftSize) + this.props.freqRange[0];
      peakFreqRaw = peakFreqRaw.toFixed(2);
      let freqDisplayInfo = audioUtils.getNoteByFreq(peakFreqRaw, this.props.tolerance);
      peakFreq = freqDisplayInfo.peakFreq;
      noteColor = freqDisplayInfo.noteColor;
      noteName = freqDisplayInfo.noteName;
      noteFreq = freqDisplayInfo.noteFreq;
    }
    this.setState({dataArray: rangedFreqData, sampleRate:this.sampleRate, peakEnergy, peakFreq, noteColor, noteName, noteFreq});
  }
  render(){
    let canvasDom = this.canvasRef.current;
    if(canvasDom) {
      let canvasCtx = canvasDom.getContext("2d");
      canvasCtx.fillStyle = 'rgb(220, 220, 220)';
      canvasCtx.fillRect(0, 0, canvasDom.width, canvasDom.height);
      let dataArray = this.state.dataArray;
      let dataLen = dataArray.length;
      var barWidth = (canvasDom.width / dataLen);
      var barHeight;
      var x = 0;
      for(var i = 0; i < dataLen; i++) {
        barHeight = dataArray[i];

        canvasCtx.fillStyle = 'rgb(50,' + (barHeight+100) + ',50)';
        canvasCtx.fillRect(x,canvasDom.height-barHeight/2,barWidth,barHeight/2);
        x += barWidth + 1;
      }
    }
    return (
      <div>
        <canvas id="audiocanvas" ref={this.canvasRef} width="600" height="400">
        </canvas>
        <AudioDisplay sampleRate={this.state.sampleRate} peakEnergy={this.state.peakEnergy}
                      peakFreq={this.state.peakFreq} noteColor={this.state.noteColor}
                      noteName={this.state.noteName} noteFreq={this.state.noteFreq} />
      </div>
      )
  }
}
function mapStateToProps(state){
  return state.audio;
}

export default connect(mapStateToProps)(AudioAnalyzer);
