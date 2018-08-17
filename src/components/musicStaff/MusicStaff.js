/**
 * Created by Lu on 8/13/2018.
 */
import React from 'react';
import * as Symbols from './Symbols';
import * as Utils from './Utils';
import Note from './Note';

class MusicStaff extends React.Component {
  constructor(props, context){
    super(props, context);
    this.putSymToStaff = this.putSymToStaff.bind(this);
    this.displaySymsOnStaff = this.displaySymsOnStaff.bind(this);
    this.getStaffIndexOnLayout = this.getStaffIndexOnLayout.bind(this);
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

  getStaffIndexOnLayout(staffIndex){

  }

  putSymToStaff(sym, pos){
    const curSyms = this.state.syms;
    const newSym = {sym, pos};
    this.setState({syms: curSyms.push(newSym)});
  }

  displaySymsOnStaff(){
    const xOffSet = 80;
    const xStep = 40;
    const res = [];
    const symCenter = Note.center;
    for (let i=0; i<this.props.syms.length; i++){
      const curSym = this.props.syms[i];
      //choose the first one to display
      const curSymName = curSym.names[0];
      const curSymYPos = curSym.pos[0];
      const curSymXPos = xOffSet+xStep*i;
      const symPos = curSym.pos;
      const initOffset = [curSymXPos,curSymYPos*10]; //[x, y]
      const finalOffset = [initOffset[0]-symCenter[0], initOffset[1]-symCenter[1]];
      const mynote = React.createElement(Note,{code:Symbols.NOTE_QUARTER,showLabel:true, label:curSymName});
      res.push(
        <div key={i} style={{position:'absolute', top: finalOffset[1]+'px', left:finalOffset[0]+'px'}}>
          {mynote}
        </div>
      );
    }
    console.log(res);
    return res;
  }
  render(){
    // return table with 10 cells, 4 visible cells form five lines with a clef at left
    let staffLineKey = 0;
    return (
      <div className="staffLines">
        <div className="staffLinesContent">
          <table>
            <tbody>
              {this.props.LineLayout.map(line=>{
                let tdClass = line >0 ? 'show':'hide';
                staffLineKey++;
                return (<tr key={staffLineKey}><td className={tdClass}>&nbsp;</td></tr>);
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

//define some static properties, config of the class
MusicStaff.defaultProps = {
  LineSpace : 20,
  LineLayout: [0,0,0,1,1,1,1,0,0,0]
};

export default MusicStaff;
