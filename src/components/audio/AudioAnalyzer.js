/**
 * Created by Lu on 10/29/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class AudioAnalyzer extends React.Component{
  constructor(props, context){
    super(props, context);
    this.canvasRef = React.createRef();
    this.state = {dataArray:[]};
    this.constraints = {audio: true, video:false};
    this.updateCanvas = this.updateCanvas.bind(this);
    this.source=null;
  }
  componentDidMount(){

    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 2048;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.analyser.getByteTimeDomainData(this.dataArray);

    // get media
    let me = this;
    if (navigator.mediaDevices.getUserMedia) {
      console.log('getUserMedia supported.');
      navigator.mediaDevices.getUserMedia (this.constraints)
        .then(
        function(stream) {
          me.source = me.audioCtx.createMediaStreamSource(stream);
          me.source.connect(me.analyser);
          console.log("connected to source");
        })
        .catch( function(err) { console.log('The following gUM error occured: ' + err);})
    } else {
      console.log('getUserMedia not supported on your browser!');
    }

    //create a timer
    this.timer = setInterval(this.updateCanvas, 100)
  }
  componentWillUnmount(){
    clearInterval(this.timer);
  }
  updateCanvas(){
    this.analyser.getByteTimeDomainData(this.dataArray);
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
