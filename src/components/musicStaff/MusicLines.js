/**
 * Created by Lu on 8/13/2018.
 */
import React from 'react';
import * as Symbols from './Symbols';
import Note from './Note';

class MusicLines extends React.Component {
  constructor(props, context){
    super(props, context);
    this.putSymToStaff = this.putSymToStaff.bind(this);
    this.displaySymsOnStaff = this.displaySymsOnStaff.bind(this);
    this.state = {syms:[{sym:Symbols.NOTE_QUARTER_TYPE, pos: 1, id:1}]};
  }

  /** put music sym to staff
   *
   * @param sym
   * @param posY:
   *    --- {-4} ---
   *    --- {-2} ---
   *    --- {0}  ---
   *    --- {2}  ---
   *    --- {4}  ---
   */
  putSymToStaff(sym, pos){
    const curSyms = this.state.syms;
    const newSym = {sym, pos};
    this.setState({syms: curSyms.push(newSym)});
  }

  displaySymsOnStaff(){
    return this.state.syms.map(curSym => {
      const symType = curSym.sym;
      const symPos = (curSym.pos*20-30) + 'px';
      const symCode = Symbols.NOTE_QUARTER;
      console.log(symPos);
      return (
        <div key={curSym.id} style={{position:'absolute', top: '0px', left:'60px'}}>
          <Note code={symCode} />
        </div>
      );
    })
  }
  render(){
    // return five lines with a clef at left
    const hLine = Symbols.LINE_1.repeat(100);
    console.log(this.state);
    console.log(this.displaySymsOnStaff());
    return (
      <div className="staffLines">
        <div>{hLine}</div>
        <div>{hLine}</div>
        <div>{hLine}</div>
        <div>{hLine}</div>
        <div>{hLine}</div>
        <div className="vl" />
        <div className="clef">{Symbols.CLEF_G}</div>
        {this.displaySymsOnStaff()}
      </div>
    );
  }
}

export default MusicLines;
