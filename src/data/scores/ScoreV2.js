/**
 * Created by Lu on 11/9/2018.
 */
import {NotesFullMapV2} from '../../components/musicStaff/Constants';

// some constants to control the positions
const SYM_START = 0.1;
const SYM_END = 0.95;

class Score {
  /**
   * @param signature
   * @param scale
   * @param title
   * @param author
   * @param notes, would be a 2D array [[staffline1],[staffline2]];
   */
  constructor(score){
    let {name, signature, scale, title, author, notes=[]} = score;
    this.name = name || title;
    this.signature = signature;
    this.scale = scale;
    this.title = title;
    this.author = author;
    this.notes = Score.parseAllNotes(notes);
  }

  /**
   * some symbols, such as bar line, does not take actual space
   * @param {*} notes: 1D array 
   */
  static filterNonPositionedSymbols(notes){
    return notes.filter(note=>{
      return note.type!='|';
    })
  }

  /**
   * 
   * @param {*} noteLine: would be a string splitted by semi-colon
   */
  static parseNoteLine(noteLine) {
    let noteL = noteLine || '';
    return noteL.split(';').filter(note=>!!note);
  }

  /**
   * @param {*} note: would be a string splitted by comma
   * q,a4,0.15,440,sfn,+(1);
   * which means a quater, A4, x position 0.15, frequence 440, sharp, flat or natual, with augment
   * after split, note would be: {type, note, }
   */
  static parseNote(note){
    const nt = note || '';
    const ntPart = nt.split(',').filter(ntPart=>!!ntPart)
    const ntName = ntPart[1] ? ntPart[1].toLowerCase() : null;
    const xParse = parseFloat(ntPart[2]);
    const freqParse = parseInt(ntPart[3]);
    return {
      type: ntPart[0],
      name: ntName,
      x: Number.isNaN(xParse) ? null : xParse,
      freq: Number.isNaN(freqParse) ? null : freqParse,
      scale: ntPart[4],
      aug: ntPart[5] 
    };
  }

  /**
   * @param notes array from the score
   */
  static repositionNotes(notes){
    //staff start 0.1, staff end 0.95
    const countNoteLen = Score.filterNonPositionedSymbols(notes).length
    const incStep = (SYM_END - SYM_START)/countNoteLen;
    return notes.map((note, idx)=>{
      if(note.x) {
        // x is already defined
      } else if(note.type == '|'){
        // note is bar line
        note.x = SYM_START+(idx-1)*incStep + incStep/2;
      } else {
        note.x = SYM_START+idx*incStep;
      }
      // merge the properties from NotesFullMap
      if (note.name) {
        const moreProps = NotesFullMapV2[note.name];
        note = Object.assign(note, moreProps);
      }
      return note;
    });
  }

  /**
   * 
   * @param {*} notes string, splited by ';'
   */
  static parseNotesLineStr(notesLineStr) {
    const noteLSplit = Score.parseNoteLine(notesLineStr);
    const parsedNotes = noteLSplit.map(note=>Score.parseNote(note));
    return Score.repositionNotes(parsedNotes);
  }
  
  static parseAllNotes(notes){
    return notes.map(notesLineStr=>Score.parseNotesLineStr(notesLineStr))
  }

}

export default Score;
