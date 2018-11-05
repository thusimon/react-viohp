/**
 * Created by Lu on 10/31/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class AudioDisplay extends React.Component{
  constructor(props, context){
    super(props, context);
  }
  render(){
    return (
      //some basic info
      <div>
        <table style={{border:"none"}}>
          <tbody>
            <tr>
              <td>
                <div style={{display:"inline-block"}}>
                  <label>Sample Rate(Hz)</label>
                  <h2>{this.props.sampleRate}</h2>
                </div>
              </td>
              <td>
                <div style={{display:"inline-block"}}>
                  <label>Peak Freq Energy(0-255)</label>
                  <h2>{this.props.peakEnergy}</h2>
                </div>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <div style={{display:"inline-block"}}>
                  <label>Current Frequency(Hz)</label>
                  <h2 style={{color:this.props.noteColor}}>{this.props.peakFreq}</h2>
                </div>
              </td>
              <td>
                <div style={{display:"inline-block"}}>
                  <label>Note</label>
                  <h2 style={{color:this.props.noteColor}}>{this.props.noteName}</h2>
                </div>
              </td>
              <td>
                <div style={{display:"inline-block"}}>
                  <label>Frequency(Hz)</label>
                  <h2>{this.props.noteFreq}</h2>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state){
  return state.audio;
}

AudioDisplay.propTypes = {
  sampleRate: PropTypes.number,
  peakEnergy: PropTypes.number,
  noteColor: PropTypes.string,
  peakFreq: PropTypes.string,
  noteName: PropTypes.string,
  noteFreq: PropTypes.string
};

//export default connect(mapStateToProps)(AudioDisplay);
export default AudioDisplay;
