/**
 * Created by Lu on 8/12/2018.
 */
import React from 'react';
import Note from './Note';
import MusicStaff from './MusicStaff';
import * as SYMS from './Symbols';
import * as Utils from './Utils';
import SelectInput from '../common/SelectInput';

class MusicStaffPage extends React.Component {
  constructor(props, context){
    super(props, context);
    this.signatureTypes = Utils.SIGNATURES.map(signature =>
      ({value:signature.name, text:signature.name}));
    this.scaleTypes = Utils.getAllScaleNames();
    this.fullScales = Utils.getExtendScales();

    this.onSelectChange = this.onSelectChange.bind(this);
    this.getSetOfNoteFromSignatureAndScale = this.getSetOfNoteFromSignatureAndScale.bind(this);

    // init state
    const signature = 'Major';
    const scale = 'C';
    const notes = this.getSetOfNoteFromSignatureAndScale(signature, scale);
    this.state = {signature, scale, notes};
  }

  /**
   * @param signature, can only be Major or Minor
   * @param scale
   */
  getSetOfNoteFromSignatureAndScale(signature, scale){
    const intervals = signature == 'Major' ? Utils.MajorInterval : Utils.MinorInterval;
    let scaleIndex = this.fullScales.findIndex(element => {
      return element.names.includes(scale);
    });
    let notes=[this.fullScales[scaleIndex]];
    for(let i=0; i<intervals.length-1; i++){
      scaleIndex += intervals[i];
      notes.push(this.fullScales[scaleIndex]);
    }
    return notes;
  }

  onSelectChange(event){
    const curStateVal = {signature: this.state.signature, scale: this.state.scale};
    curStateVal[event.target.name] = event.target.value;
    const signature = curStateVal.signature;
    const scale = curStateVal.scale;
    const notes = this.getSetOfNoteFromSignatureAndScale(signature, scale);
    this.setState({signature, scale, notes});
  }

  render(){
    return (
      <div>
        <div style={{display:'inline-block'}} >
          <Note code={SYMS.NOTE_WHOLE} />
          <Note code={SYMS.NOTE_HALF} />
          <Note code={SYMS.NOTE_QUARTER} />
          <Note code={SYMS.NOTE_EIGHTH} />
          <Note code={SYMS.NOTE_SIXTEENTH} />
          <Note code={SYMS.NOTE_THIRTYSECOND} />
        </div>
        <div style={{display:'inline-block'}}>
          <SelectInput
            name="signature"
            label="Signature"
            value={this.state.signature}
            defaultOption={null}
            options={this.signatureTypes}
            onChange={this.onSelectChange} />
        </div>
        <div style={{display:'inline-block'}}>
          <SelectInput
            name="scale"
            label="Scale"
            value={this.state.scale}
            defaultOption={null}
            options={this.scaleTypes}
            onChange={this.onSelectChange} />
        </div>
        <br />
        <div style={{marginTop:'30px', marginBottom: '30px'}}>
          <MusicStaff syms={this.state.notes} />
        </div>
      </div>);
  }
}

export default MusicStaffPage;
