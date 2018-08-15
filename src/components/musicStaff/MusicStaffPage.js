/**
 * Created by Lu on 8/12/2018.
 */
import React from 'react';
import Note from './Note';
import MusicLines from './MusicStaff';
import * as SYMS from './Symbols';

class MusicStaffPage extends React.Component {
  constructor(props, context){
    super(props, context);
  }

  render(){
    return (
      <div>
        <div>
          <Note code={SYMS.NOTE_WHOLE} />
          <Note code={SYMS.NOTE_HALF} />
          <Note code={SYMS.NOTE_QUARTER} />
          <Note code={SYMS.NOTE_EIGHTH} />
          <Note code={SYMS.NOTE_SIXTEENTH} />
          <Note code={SYMS.NOTE_THIRTYSECOND} />
        </div>
        <br />
        <div style={{marginTop:'30px', marginBottom: '30px'}}>
          <MusicLines />
        </div>
      </div>);
  }
}

export default MusicStaffPage;
