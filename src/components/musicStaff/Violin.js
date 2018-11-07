import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import BoardNote from './ViolinBoardNote';
import * as Constants from './Constants';
import * as Utils from './Utils';

class Violin extends React.Component {
  constructor(props, context){
    super(props, context);
    this.rowNum = 8;
    this.colNum = 6;
    // boardNotes should be a 8*4 array
    this.boardNotes = Utils.generateVirtualBoardNotes(this.props.markNotes);
    this.stringNum = 4;
    this.stringNoteLen = 8;
  }
  render(){
    const markNotes = this.props.markNotes;
    return(
      <table className="violinT" align="center">
        <tbody>
          {[...Array(this.rowNum).keys()].map(r=> {
              return (<tr key={"brow"+r} className="violinTr">
                {[...Array(this.colNum).keys()].map(l=> {
                  let boardClass = (r>0&&l>0) ? "violinBoard" : "";
                  let chartContent = <div>&nbsp;</div>;
                  if (l==0){
                    //should show the finger position
                    let fingerPos = Constants.ViolinFinger_POS1[r%this.stringNoteLen].finger;
                    chartContent = <div>{fingerPos}</div>;
                  } else if (l<5){
                    //should show the notes
                    const curNoteRIdx = r;
                    const curNoteCIdx = l-1;
                    const curNote = this.boardNotes[curNoteCIdx%this.stringNum][curNoteRIdx];
                    chartContent = (
                      <div style={{textAlign:'right',position:'relative'}}>
                        <BoardNote key={"BN"+r+l} note={curNote} markNotes={markNotes} />
                      </div>
                    );
                  }
                  return <td key={"bcell" + l} className={"show violinTd "+boardClass}>{chartContent}</td>;
                })}
            </tr>);}
            )}
        </tbody>
      </table>
    );
  }
}

Violin.propTypes = {
  markNotes: PropTypes.array
};

function mapStateToProps(state, ownProps){
  return {markNotes: state.music.markNotes};
}

export default connect(mapStateToProps)(Violin);
