/**
 * Created by Lu on 8/12/2018.
 */
import React from 'react';
import MusicStaff from './MusicStaff';
import * as Utils from './Utils';
import TopControls from './TopControls';

class MusicStaffPage extends React.Component {
  constructor(props, context){
    super(props, context);
    this.signatureTypes = Utils.SIGNATURES.map(signature =>
      ({value:signature.name, text:signature.name}));
    this.scaleTypes = Utils.getAllScaleNames();
    this.onSelectChange = this.onSelectChange.bind(this);
    // init state
    const signature = 'Major';
    const scale = 'C';
    const notes = Utils.getSetOfNoteFromSignatureScale(signature, scale);
    this.state = {signature, scale, notes};
  }

  onSelectChange(event){
    const curStateVal = {signature: this.state.signature, scale: this.state.scale};
    curStateVal[event.target.name] = event.target.value;
    const signature = curStateVal.signature;
    const scale = curStateVal.scale;
    const notes = Utils.getSetOfNoteFromSignatureScale(signature, scale);
    this.setState({signature, scale, notes});
  }

  render(){
    return (
      <div>
        <TopControls />
        <br />
        <div style={{marginTop:'30px', marginBottom: '30px'}}>
          <MusicStaff syms={this.state.notes} />
        </div>
      </div>);
  }
}

export default MusicStaffPage;
