import React, { useState, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import * as audioActions from '../../actions/audioActions';
import toastr from 'toastr';

const AudioControls = ({threshold, tolerance, freqRange, dispatch}) => {
  const [audioState, setAudioState] = useState({
    threshold,
    tolerance,
    freqRangeMin: freqRange[0],
    freqRangeMax: freqRange[1],
    buttonDisabled: false
  });

  const settingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    let tarName = evt.target.name;
    let tarVal = evt.target.value;
    switch (tarName){
      case "audioThreshold": {
        setAudioState({...audioState, threshold: tarVal});
        break;
      }
      case "audioTolerance": {
        setAudioState({...audioState, tolerance: tarVal});
        break;
      }
      case "audioFreqRangeMin": {
        setAudioState({...audioState, freqRangeMin: tarVal});
        break;
      }
      case "audioFreqRangeMax":
      {
        setAudioState({...audioState, freqRangeMax: tarVal});
        break;
      }
      default:
        break;
    }
  };

  const saveBtnClick = () => {
    const {threshold, tolerance, freqRangeMin, freqRangeMax} = audioState;
    const thresholdInt = Number.parseInt(threshold);
    const toleranceInt = Number.parseInt(tolerance);
    const freqRangeMinInt = Number.parseInt(freqRangeMin);
    const freqRangeMaxInt = Number.parseInt(freqRangeMax);
    if (Number.isInteger(thresholdInt) &&
      Number.isInteger(toleranceInt) &&
      Number.isInteger(freqRangeMinInt) && 
      Number.isInteger(freqRangeMaxInt) &&
      freqRangeMinInt<freqRangeMaxInt) {
        dispatch(audioActions.saveSettings(threshold, tolerance, [freqRangeMinInt, freqRangeMaxInt]));
    } else {
        toastr.error('invalid setting');
    }
  }

  return (
    // do not use table in the future
    <table id="audioControl" style={{border:"none", margin:"0px"}}>
      <tbody>
        <tr style={{textAlign:"left"}}>
          <td>
            <label title="if the spectrum power is less than threshold, consider as noise">Threshold(0-255)</label>
          </td>
          <td >
            <input name="audioThreshold" pattern="[0-9]*" value={audioState.threshold} style={{width:"35px"}}
                   onChange={settingChange} />
          </td>
        </tr>
        <tr style={{textAlign:"left"}}>
          <td>
            <label title="the current freq is x, find the note between [x-5, x+5], for accuracy, should be less than 6">Tolerance(Hz)</label>
          </td>
          <td>
            <input name="audioTolerance" pattern="[0-9]*" value={audioState.tolerance} style={{width:"20px"}}
                   onChange={settingChange} />
          </td>
        </tr>
        <tr style={{textAlign:"left"}}>
          <td>
            <label title="the frequency range to display the spectrum, e.g g3=196Hz, b5=988Hz">Freq Range(Hz)</label>
          </td>
          <td>
            <input name="audioFreqRangeMin" pattern="[0-9]*" value={audioState.freqRangeMin} style={{width:"35px"}}
                   onChange={settingChange} />
            <span>-</span>
            <input name="audioFreqRangeMax" pattern="[0-9]*" value={audioState.freqRangeMax} style={{width:"35px"}}
                   onChange={settingChange} />
          </td>
        </tr>
        <tr>
          <td>
            <button type="button" className="btn btn-success btn-sm" onClick={saveBtnClick}
              disabled={audioState.buttonDisabled}>Apply</button>
          </td>
        </tr>
      </tbody>
    </table>);
}

function mapStateToProps(state){
  let {threshold,tolerance,freqRange} = state.audio;
  return {threshold,tolerance,freqRange};
}

export default connect(mapStateToProps)(AudioControls);
