import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import * as Constants from './Constants';
import * as Utils from './Utils';
import SelectInput from '../common/SelectInput';
import * as musicAction from '../../actions/musicActions';

const TopControls = () => {
  const dispatch = useDispatch();
  const signatureTypes = Constants.SIGNATURES.map(signature =>
    ({value:signature.name, text:signature.name}));
  const scaleTypes =  Utils.getAllScaleNames();
  // init state
  const signature = 'Major';
  const scale = 'C';
  const [controlState, setControlState] = useState({signature, scale});

  const onSelectChange = (event) => {
    const newState = {...controlState};
    newState[event.target.name] = event.target.value;
    setControlState(newState);
    dispatch(musicAction.setSignatureScale(newState.signature, newState.scale));
  }

  const onButtonClick = (event) => {
    switch (event.target.name){
      case 'clearAll':
        dispatch(musicAction.clearAllNotes());
        break;
      default:
        break;
    }
  }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <span className='badge badge-info' style={{fontSize:'12px'}}>Drag the note to staff</span>
        </div>
        <div className='col'>
          <SelectInput
            name='signature'
            label='Signature'
            value={controlState.signature}
            defaultOption={null}
            error={null}
            options={signatureTypes}
            onChange={onSelectChange} />
          <SelectInput
            name='scale'
            label='Scale'
            value={controlState.scale}
            defaultOption={null}
            error={null}
            options={scaleTypes}
            onChange={onSelectChange} />
        </div>
        <div className='col'>
          <div className='btn-group-sm'>
            <button type='button' className='btn btn-primary btn-sm' name='clearAll' onClick={onButtonClick}>Clear All</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopControls;
