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

    // a sym: {type:'NOTE_QUARTER',pos:[cordX, lineIndx]}
    this.state = {syms:[
      {code:Symbols.NOTE_WHOLE, pos: [0, 14], id: 0},
      {code:Symbols.NOTE_HALF, pos: [40, 13], id: 1},
      {code:Symbols.NOTE_QUARTER, pos: [80, 12], id: 2},
      {code:Symbols.NOTE_EIGHTH, pos: [120, 11], id: 3},
      {code:Symbols.NOTE_SIXTEENTH, pos: [160, 10], id: 4},
      {code:Symbols.NOTE_THIRTYSECOND, pos: [200, 9], id: 5},
      {code:Symbols.NOTE_QUARTER, pos: [280, 8], id: 6},
      {code:Symbols.NOTE_QUARTER, pos: [320, 7], id: 7},
      {code:Symbols.NOTE_QUARTER, pos: [360, 6], id: 8},
      {code:Symbols.NOTE_QUARTER, pos: [400, 7], id: 9},
      {code:Symbols.NOTE_QUARTER, pos: [440, 8], id: 10}
    ]};
  }

  putSymToStaff(sym, pos){
    const curSyms = this.state.syms;
    const newSym = {sym, pos};
    this.setState({syms: curSyms.push(newSym)});
  }

  displaySymsOnStaff(){
    const xOffSet = 80;
    return this.state.syms.map(curSym => {
      const mynote = React.createElement(Note,{code:curSym.code});
      const symCenter = mynote.props.center;
      const symPos = curSym.pos;
      const initOffset = [xOffSet + symPos[0],symPos[1]*10]; //[x, y]
      const finalOffset = [initOffset[0]-symCenter[0], initOffset[1]-symCenter[1]];
      return (
        <div key={curSym.id} style={{position:'absolute', top: finalOffset[1]+'px', left:finalOffset[0]+'px'}}>
          {mynote}
        </div>
      );
    });
  }
  render(){
    // return table with 10 cells, 4 visible cells form five lines with a clef at left
    return (
      <div className="staffLines">
        <div className="staffLinesContent">
          <table>
            <tbody>
              {[...Array(10).keys()].map(line=>{
                let tdClass = 'hide';
                if (line>2 && line < 7){
                  tdClass = 'show';
                }
                return (<tr key={line}><td className={tdClass}>&nbsp;</td></tr>);
              })}
            </tbody>
          </table>
          <div className="clef">{Symbols.CLEF_G}</div>
          {this.displaySymsOnStaff()}
        </div>
      </div>
    );
  }
}

export default MusicLines;
