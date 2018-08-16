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
    this.scaleTypes = Utils.getAllPossibleScales();
    this.fullScales = Utils.getExtendScales();
    console.log(this.fullScales);

    this.onSignatureChange = this.onSignatureChange.bind(this);
    this.onScaleChange = this.onScaleChange.bind(this);
    this.getSetOfNoteFromSignatureAndScale = this.getSetOfNoteFromSignatureAndScale.bind(this);
    // init state
    this.state = {signature:'Major', scale:'C', notes:[]};
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
    console.log(signature);
    console.log(scale);
    console.log(notes);
    this.setState({signature, scale, notes})
  }
  onSignatureChange(event){
    //this.setState({signature: event.target.value});
    const newSignature = event.target.value;
    const scale = this.state.scale;
    console.log(1);
    this.getSetOfNoteFromSignatureAndScale(newSignature, scale);
  }

  onScaleChange(event){
    //this.setState({scale: event.target.value});
    const signature = this.state.signature;
    const newScale = event.target.value;
    console.log(2);
    this.getSetOfNoteFromSignatureAndScale(signature, newScale);
  }
  render(){
    console.log(this.state);
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
            onChange={this.onSignatureChange} />
        </div>
        <div style={{display:'inline-block'}}>
          <SelectInput
            name="scale"
            label="Scale"
            value={this.state.scale}
            defaultOption={null}
            options={this.scaleTypes}
            onChange={this.onScaleChange} />
        </div>
        <br />
        <div style={{marginTop:'30px', marginBottom: '30px'}}>
          <MusicStaff syms={this.state.notes.reverse()} />
        </div>
      </div>);
  }
}

export default MusicStaffPage;
