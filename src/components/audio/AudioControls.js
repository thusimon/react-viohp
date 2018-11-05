/**
 * Created by Lu on 10/31/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as audioActions from '../../actions/audioActions';

class AudioControls extends React.Component {
  constructor(props, context){
    super(props, context);
    this.saveBtnClick = this.saveBtnClick.bind(this);
    this.settingChange = this.settingChange.bind(this);
    this.state = {threshold: this.props.threshold, tolerance:this.props.tolerance,
      freqRangeMin:this.props.freqRange[0], freqRangeMax:this.props.freqRange[1],
      buttonDisabled: false};
  }
  saveBtnClick(){
    this.props.saveAudioSetting(this.state.threshold,this.state.tolerance,[this.state.freqRangeMin, this.state.freqRangeMax]);
  }
  settingChange(evt){
    let tarName = evt.target.name;
    let tarVal = parseInt(evt.target.value);
    if (Number.isNaN(tarVal)){
      tarVal=0;
    }
    switch (tarName){
      case "audioThreshold":
        this.setState({threshold: tarVal});
        break;
      case "audioTolerance":
        this.setState({tolerance:tarVal});
        break;
      case "audioFreqRangeMin":
      {
        let maxRange = this.state.freqRangeMax;
        if(maxRange<tarVal){
          this.setState({freqRangeMin: this.state.freqRangeMax});
        } else {
          this.setState({freqRangeMin: tarVal});
        }
        break;
      }
      case "audioFreqRangeMax":
      {
        let minRange = parseInt(this.state.freqRangeMin);
        if (minRange>tarVal){
          this.setState({freqRangeMax: this.state.freqRangeMin});
        } else {
          this.setState({freqRangeMax: tarVal});
        }
        break;
      }
      default:
        break;
    }
  }
  render(){
    return (
      <table style={{border:"none"}}>
        <tbody>
          <tr>
            <td>
              <label title="if the spectrum power is less than threshold, consider as noise">Threshold(0-255)</label>
              <input name="audioThreshold" pattern="[0-9]*" value={this.state.threshold} style={{width:"35px"}}
                     onChange={this.settingChange}></input>
            </td>
          </tr>
          <tr>
            <td>
              <label title="the current freq is x, find the note between [x-5, x+5], for accuracy, should be less than 6">Tolerance(Hz)</label>
              <input name="audioTolerance" pattern="[0-9]*" value={this.state.tolerance} style={{width:"20px"}}
                     onChange={this.settingChange}></input>
            </td>
          </tr>
          <tr>
            <td>
              <label title="the frequency range to display the spectrum, e.g g3=196Hz, b5=988Hz">Freq Range(Hz)</label>
              <input name="audioFreqRangeMin" pattern="[0-9]*" value={this.state.freqRangeMin} style={{width:"35px"}}
                     onChange={this.settingChange}></input>
              <span>-</span>
              <input name="audioFreqRangeMax" pattern="[0-9]*" value={this.state.freqRangeMax} style={{width:"35px"}}
                     onChange={this.settingChange}></input>
            </td>
          </tr>
          <tr>
            <td>
              <button type="button" className="btn btn-success btn-xs" onClick={this.saveBtnClick}
                disabled={this.state.buttonDisabled}>Save</button>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

function mapStateToProps(state){
  let {threshold,tolerance,freqRange} = state.audio;
  return {threshold,tolerance,freqRange};
}

function mapDispatchToProps(dispatch){
  return {
    saveAudioSetting: (threshold,tolerance,freqRange)=>{
      dispatch(audioActions.saveSettings(threshold,tolerance,freqRange));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioControls)
