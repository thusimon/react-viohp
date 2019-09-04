/**
 * Created by Lu on 8/18/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Note from './Note';
import * as Constants from './Constants';
import * as Utils from './Utils';
import * as Symbols from './Symbols';
import SelectInput from '../common/SelectInput';
import * as musicAction from '../../actions/musicActions';

class TopControls extends React.Component {
  constructor(props, context){
    super(props, context);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.scaleTypes = Utils.getAllScaleNames();
    this.signatureTypes = Constants.SIGNATURES.map(signature =>
      ({value:signature.name, text:signature.name}));
    // init state
    let signature = "Major";
    let scale = "C";
    this.state = {signature, scale};
  }

  onSelectChange(event){
    const curStateVal = {signature: this.state.signature, scale: this.state.scale};
    curStateVal[event.target.name] = event.target.value;
    const signature = curStateVal.signature;
    const scale = curStateVal.scale;
    this.setState({signature, scale});
    this.props.setSignatureScale(signature, scale);
  }

  onButtonClick(event){
    switch (event.target.name){
      case "clearAll":
        this.props.clearAllNotes();
        break;
      default:
        break;
    }
  }
  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <span className="badge badge-info" style={{fontSize:'12px'}}>Drag the note to staff</span>
            <br />
            <div className="btn-group">
              <Note type={Symbols.NOTE_CIRCLE} sfIdx={0} name={Symbols.NOTE_CIRCLE} />
              <Note type={Symbols.NOTE_HALF} sfIdx={0} name={Symbols.NOTE_HALF} />
              <Note type={Symbols.NOTE_QUARTER} sfIdx={0} name={Symbols.NOTE_QUARTER} />
              <Note type={Symbols.NOTE_EIGHTH} sfIdx={0} name={Symbols.NOTE_EIGHTH} />
            </div>
          </div>
          <div className="col">
            <SelectInput
              name="signature"
              label="Signature"
              value={this.state.signature}
              defaultOption={null}
              options={this.signatureTypes}
              onChange={this.onSelectChange} />
            <SelectInput
              name="scale"
              label="Scale"
              value={this.state.scale}
              defaultOption={null}
              options={this.scaleTypes}
              onChange={this.onSelectChange} />
          </div>
          <div className="col">
            <div className="btn-group-sm">
              <button type="button" className="btn btn-primary btn-sm" name="clearAll" onClick={this.onButtonClick}>Clear All</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TopControls.propTypes = {
  addNotes: PropTypes.func,
  setSignatureScale: PropTypes.func,
  clearAllNotes: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
  addNotes: (notes) => {
    dispatch(musicAction.addNote(notes));
  },
  setSignatureScale: (signature, scale) => {
    dispatch(musicAction.setSignatureScale(signature, scale));
  },
  clearAllNotes: () => {
    dispatch(musicAction.clearAllNotes());
  }
});

export default connect(null, mapDispatchToProps)(TopControls);
