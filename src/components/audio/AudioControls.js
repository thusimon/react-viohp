/**
 * Created by Lu on 10/31/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as audioActions from '../../actions/audioActions';
import toastr from 'toastr';

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
    // should check 
    const {threshold, tolerance, freqRangeMin, freqRangeMax} = this.state;
    const thresholdInt = Number.parseInt(threshold);
    const toleranceInt = Number.parseInt(tolerance);
    const freqRangeMinInt = Number.parseInt(freqRangeMin);
    const freqRangeMaxInt = Number.parseInt(freqRangeMax);
    if (Number.isInteger(thresholdInt) && Number.isInteger(toleranceInt) && Number.isInteger(freqRangeMinInt) && 
      Number.isInteger(freqRangeMaxInt) && freqRangeMinInt<freqRangeMaxInt){
        this.props.saveAudioSetting(thresholdInt,toleranceInt,[freqRangeMinInt, freqRangeMaxInt]);
    } else {
        toastr.error('invalid setting');
    }
  }
  settingChange(evt){
    let tarName = evt.target.name;
    let tarVal = evt.target.value;
    switch (tarName){
      case "audioThreshold":
        this.setState({threshold: tarVal});
        break;
      case "audioTolerance":
        this.setState({tolerance:tarVal});
        break;
      case "audioFreqRangeMin":
      {
        this.setState({freqRangeMin: tarVal});
        break;
      }
      case "audioFreqRangeMax":
      {
        this.setState({freqRangeMax: tarVal});
        break;
      }
      default:
        break;
    }
  }
  render(){
    return (
      // do not use table in the future
      <table id="audioControl" style={{border:"none", margin:"0px"}}>
        <tbody>
          <tr style={{textAlign:"left"}}>
            <td>
              <label title="if the spectrum power is less than threshold, consider as noise">Threshold(0-255)</label>
            </td>
            <td >
              <input name="audioThreshold" pattern="[0-9]*" value={this.state.threshold} style={{width:"35px"}}
                     onChange={this.settingChange}></input>
            </td>
          </tr>
          <tr style={{textAlign:"left"}}>
            <td>
              <label title="the current freq is x, find the note between [x-5, x+5], for accuracy, should be less than 6">Tolerance(Hz)</label>
            </td>
            <td>
              <input name="audioTolerance" pattern="[0-9]*" value={this.state.tolerance} style={{width:"20px"}}
                     onChange={this.settingChange}></input>
            </td>
          </tr>
          <tr style={{textAlign:"left"}}>
            <td>
              <label title="the frequency range to display the spectrum, e.g g3=196Hz, b5=988Hz">Freq Range(Hz)</label>
            </td>
            <td>
              <input name="audioFreqRangeMin" pattern="[0-9]*" value={this.state.freqRangeMin} style={{width:"35px"}}
                     onChange={this.settingChange}></input>
              <span>-</span>
              <input name="audioFreqRangeMax" pattern="[0-9]*" value={this.state.freqRangeMax} style={{width:"35px"}}
                     onChange={this.settingChange}></input>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button type="button" className="btn btn-success btn-sm" onClick={this.saveBtnClick}
                disabled={this.state.buttonDisabled}>Apply</button>
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
