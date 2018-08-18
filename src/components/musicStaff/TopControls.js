/**
 * Created by Lu on 8/18/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Note from './Note';
import * as Symbols from './Symbols';
import SelectInput from '../common/SelectInput';

class TopControls extends React.Component {
  constructor(props, context){
    super(props, context);
  }
  render(){
    return (<div className="row">
      <div className="col-6">
        <span className="badge badge-primary" style={{fontSize:'14px'}}>Drag the note to staff</span>
        <br />
        <Note code={Symbols.NOTE_WHOLE} />
        <Note code={Symbols.NOTE_HALF} />
        <Note code={Symbols.NOTE_QUARTER} />
        <Note code={Symbols.NOTE_EIGHTH} />
        <Note code={Symbols.NOTE_SIXTEENTH} />
        <Note code={Symbols.NOTE_THIRTYSECOND} />
      </div>
      <div className="col-3">
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
      <div className="col-3">button</div>
    </div>);
  }
}

export default TopControls;
