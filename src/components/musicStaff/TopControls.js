/**
 * Created by Lu on 8/18/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Note from './Note';
import NoteDragable from './NoteDragable';
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
    let notes = Utils.getSetOfNoteFromSignatureScale(signature, scale);
    this.state = {signature, scale, notes};
  }

  onSelectChange(event){
    const curStateVal = {signature: this.state.signature, scale: this.state.scale};
    curStateVal[event.target.name] = event.target.value;
    const signature = curStateVal.signature;
    const scale = curStateVal.scale;
    const scaleHead = Constants.SHARPFLATIDX[signature][scale];
    this.setState({signature, scale});
    this.props.addScaleHead(scaleHead, signature, scale);
  }

  onButtonClick(event){
    let {signature, scale} = this.state;
    let scaleNotes=[];
    let scaleNotesMap=[];
    switch (event.target.name){
      case "showScales":
        scaleNotes = Utils.getSetOfNoteFromSignatureScale(signature, scale);
        console.log(scaleNotes);
        // prepare the notes
        scaleNotesMap = {};
        for (let i=0;i<scaleNotes.length;i++){
          let curNote = scaleNotes[i];
          curNote.xCord = 160 + i*40;
          curNote.type = Symbols.NOTE_QUARTER_TYPE;
          scaleNotesMap[i] = curNote;
        }
        this.props.showScaleNotes(scaleNotesMap);
        break;
      case "clearAll":
        this.props.clearAllNotes();
        break;
      default:
        break;
    }
  }
  render(){
    return (<div className="row">
      <div className="col-3">
        <span className="badge badge-info" style={{fontSize:'14px'}}>Drag the note to staff</span>
        <br />
        <div className="btn-group">
          <NoteDragable code={Symbols.NOTE_WHOLE} name={Symbols.NOTE_WHOLE_TYPE} />
          <NoteDragable code={Symbols.NOTE_HALF} name={Symbols.NOTE_HALF_TYPE} />
          <NoteDragable code={Symbols.NOTE_QUARTER} name={Symbols.NOTE_QUARTER_TYPE} />
          <NoteDragable code={Symbols.NOTE_EIGHTH} name={Symbols.NOTE_EIGHTH_TYPE} />
          <NoteDragable code={Symbols.NOTE_SIXTEENTH} name={Symbols.NOTE_SIXTEENTH_TYPE} />
          <NoteDragable code={Symbols.NOTE_THIRTYSECOND} name={Symbols.NOTE_THIRTYSECOND_TYPE} />
        </div>
      </div>
      <div className="col-3">
        <span className="badge badge-info" style={{fontSize:'14px', marginBottom:"20px"}}>Choose Signarture and Scale</span>
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
      <div className="col-3">
        <span className="badge badge-info" style={{fontSize:'14px',marginBottom:"20px"}}>Staff Actions</span>
        <br />
        <div className="btn-group-vertical">
          <button type="button" className="btn btn-primary" name="showScales" onClick={this.onButtonClick}>Show Scales</button>
          <button type="button" className="btn btn-primary" name="clearAll" onClick={this.onButtonClick}>Clear All</button>
        </div>
      </div>
    </div>);
  }
}

TopControls.propTypes = {
  addNotes: PropTypes.func,
  addScaleHead: PropTypes.func,
  showScaleNotes: PropTypes.func,
  clearAllNotes: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
  addNotes: (notes) => {
    dispatch(musicAction.addNote(notes));
  },
  addScaleHead: (scaleHead, signature, scale) => {
    dispatch(musicAction.generateScaleHeads(scaleHead, signature, scale));
  },
  showScaleNotes: (scaleNotes) => {
    dispatch(musicAction.showScaleNotes(scaleNotes));
  },
  clearAllNotes: () => {
    dispatch(musicAction.clearAllNotes());
  }
});

export default connect(null, mapDispatchToProps)(TopControls);
