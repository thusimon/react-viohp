import React from 'react';
import {connect, useSelector, useDispatch} from 'react-redux';
import BoardNote from './ViolinBoardNote';
import * as Constants from '../musicStaff/Constants';
import * as Utils from '../musicStaff/Utils';
import { RootState } from '../../reducers/initialState';

import './violin.scss';

const Violin = () => {
  const violinProps = useSelector((state: RootState) => ({
    score: state.score,
    audio: state.audio
  }));
  const rowNum = 8;
  const colNum = 6;
  // boardNotes should be a 8*4 array
  const boardNotes = Utils.generateVirtualBoardNotes();
  const stringNum = 4;
  const stringNoteLen = 8;

  const markNotes = violinProps.score.markNotes;

  return(
    <table className='violin-table'>
      <tbody>
        {[...Array(rowNum).keys()].map(r=> {
          return (<tr key={'brow'+r} className='violin-table-tr'>
            {[...Array(colNum).keys()].map(l=> {
              let boardClass = (r > 0&& l > 0) ? 'violin-board' : '';
              let chartContent = <div>&nbsp;</div>;
              if (l == 0){
                //should show the finger position
                let fingerPos = Constants.ViolinFinger_POS1[r % stringNoteLen].finger;
                chartContent = <div>{fingerPos}</div>;
              } else if ( l < 5){
                //should show the notes
                const curNoteRIdx = r;
                const curNoteCIdx = l - 1;
                const curNote = boardNotes[curNoteCIdx % stringNum][curNoteRIdx];
                chartContent = (
                  <div className='board-note-container'>
                    <BoardNote key={'BN' + r + l} note={curNote} markNotes={markNotes} 
                      noteName={violinProps.audio.noteName} noteColor={violinProps.audio.noteColor} />
                  </div>
                );
              }
              return <td key={'bcell' + l} className={'show violin-table-td '+ boardClass}>{chartContent}</td>;
            })}
          </tr>);}
        )}
      </tbody>
    </table>
  );
}

export default Violin;
