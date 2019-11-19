/**
 * Created by Lu on 10/31/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './audio-display.scss';

class AudioDisplay extends React.Component{
  constructor(props, context){
    super(props, context);
  }
  render(){
    return (
      //some basic info
      <div className="audio-display-container">
        <table>
          <thead>
            <tr>
              <th title="The max value of Power Spectral Density">PSD(max)</th>
              <th title="The frequency value(Hz) with the max PSD">Freq(max)</th>
              <th title="The detected note name">Note</th>
              <th title="The detected note frequence(Hz)">Freq</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.props.peakEnergy}</td>
              <td style={{color:this.props.noteColor}}>{this.props.peakFreq}</td>
              <td style={{color:this.props.noteColor}}>{this.props.noteName}</td>
              <td>{this.props.noteFreq}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    sampleRate: state.audio.sampleRate,
    peakEnergy: state.audio.peakEnergy,
    noteColor: state.audio.noteColor,
    peakFreq: state.audio.peakFreq,
    noteName: state.audio.noteName,
    noteFreq: state.audio.noteFreq
  };
}

AudioDisplay.propTypes = {
  sampleRate: PropTypes.number,
  peakEnergy: PropTypes.number,
  noteColor: PropTypes.string,
  peakFreq: PropTypes.string,
  noteName: PropTypes.string,
  noteFreq: PropTypes.string
};

export default connect(mapStateToProps)(AudioDisplay);
//export default AudioDisplay;
