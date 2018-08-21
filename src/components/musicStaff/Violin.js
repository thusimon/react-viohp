import React from 'react';
import PropTypes from 'prop-types';
import BoardNote from './ViolinBoardNote';
import * as Constants from './Constants';

class Violin extends React.Component {
  constructor(props, context){
    super(props, context);
    this.rowNum = 8;
    this.colNum = 6;
  }
  render(){
    return(
      <table className="violinT">
        <tbody>
          {[...Array(this.rowNum).keys()].map(r=> {
            return (<tr key={"brow"+r} className="violinTr">
              {[...Array(this.colNum).keys()].map(l=> {
                let chartContent = "";
                let boardClass = "";
                if (l==0){
                  //should show the finger position
                  chartContent = Constants.ViolinFinger_POS1[r%8].finger;
                } else {
                  //should show the notes
                  let noteLabel = Constants.ViolinFinger_POS1[r%8].notes[(l-1)%4].label;
                  console.log(noteLabel);
                  boardClass = (r>0 && l>0)?"violinBoard":"";
                  if (l>0 && l<this.colNum-1){
                    chartContent = (<div style={{textAlign:'right',position:'relative'}}>
                      <BoardNote key={"BN"+r+l} label={noteLabel}/>
                    </div>);
                  }
                }
                return (<td key={"bcell" + l} className={"show violinTd "+boardClass}>{chartContent}</td>)
              })}
            </tr>)}
            )}
        </tbody>
      </table>
    );
  }
}

export default Violin;
