/**
 * Created by Lu on 10/29/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as audioUtils from './Utils';

class AudioAnalyzer extends React.Component{
  constructor(props, context){
    super(props, context);
    this.canvasRef = React.createRef();
    this.state = {dataArray:[]};
    this.constraints = {audio: true, video:false};
    this.updateCanvas = this.updateCanvas.bind(this);
    this.source=null;
    // position 1, note frequency g3=196Hz, b5=988Hz
    this.freqRange=[180,1000];
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
          me.fftSize = audioUtils.getViolinFFtSize(me.sampleRate);
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
    let maxFreqRes = audioUtils.getPeakFreqInRange(this.dataArray, this.sampleRate, this.fftSize, this.freqRange);
    console.log(maxFreqRes);
    this.setState({dataArray: this.dataArray});
  }
  render(){
    let canvasDom = this.canvasRef.current;
    if(canvasDom) {
      //console.log(canvasDom);
      //console.log(this.state.dataArray);
      let canvasCtx = canvasDom.getContext("2d");

      //console.log(this.dataArray);

      canvasCtx.fillStyle = "rgb(200, 200, 200)";
      canvasCtx.fillRect(0, 0, canvasDom.width, canvasDom.height);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = "rgb(0, 0, 0)";

      canvasCtx.beginPath();

      var sliceWidth = canvasDom.width * 1.0 / this.bufferLength;
      var x = 0;
      for (var i = 0; i < this.bufferLength; i++) {

        var v = this.dataArray[i] / 128.0;
        var y = v * canvasDom.height / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvasDom.width, canvasDom.height / 2);
      canvasCtx.stroke();
    }
    return (
      <canvas id="audiocanvas" ref={this.canvasRef} width="600" height="400">
      </canvas>)
  }
}


AudioAnalyzer.propTypes = {

}

export default AudioAnalyzer;
