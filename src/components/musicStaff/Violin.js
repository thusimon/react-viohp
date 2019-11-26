import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import BoardNote from './ViolinBoardNote';
import * as Constants from './Constants';
import * as Utils from './Utils';
import './violin.scss';

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
    //const freqNote = {noteName:this.props.noteName,noteColor:this.props.noteColor};
    return(
      <table className="violin-table">
        <tbody>
          {[...Array(this.rowNum).keys()].map(r=> {
              return (<tr key={"brow"+r} className="violin-table-tr">
                {[...Array(this.colNum).keys()].map(l=> {
                  let boardClass = (r>0&&l>0) ? "violin-board" : "";
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
                      <div className="board-note-container">
                        <BoardNote key={"BN"+r+l} note={curNote} markNotes={markNotes} 
                          noteName={this.props.noteName} noteColor={this.props.noteColor} />
                      </div>
                    );
                  }
                  return <td key={"bcell" + l} className={"show violin-table-td "+boardClass}>{chartContent}</td>;
                })}
            </tr>);}
            )}
        </tbody>
      </table>
    );
  }
}

Violin.propTypes = {
  markNotes: PropTypes.array,
  noteName: PropTypes.string,
  noteColor: PropTypes.string
};

function mapStateToProps(state){
  return {
    markNotes: state.music.markNotes,
    peakEnergy: state.audio.peakFreq,
    noteColor: state.audio.noteColor,
    noteName: state.audio.noteName,
    noteFreq: state.audio.noteFreq
  };
}

export default connect(mapStateToProps)(Violin);
