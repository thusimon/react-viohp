/**
 * Created by Lu on 11/9/2018.
 */
import {NotesFullMap, STAFF_SYM_START, STAFF_SYM_END, STAFF_WIDTH} from '../../components/musicStaff/Constants';
import * as Syms from '../../components/musicStaff/Symbols';

class Score {
  /**
   * @param signature
   * @param scale
   * @param title
   * @param author
   * @param notes, would be a 2D array [[staffline1],[staffline2]];
   */
  constructor(score){
    let {id, signature, scale, title, author, notes=[]} = score;
    this.id = id;
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

  static convertRawTypeToSymType(type) {
    let symType = Syms.NOTE_QUARTER;
    switch (type) {
      case 'w':
        symType = Syms.NOTE_WHOLE;
        break;
      case 'h':
        symType = Syms.NOTE_HALF;
        break;
      case 'Rh':
        symType = Syms.NOTE_HALF_REVERSE;
        break;
      case 'q':
        symType = Syms.NOTE_QUARTER;
        break;
      case 'Rq':
        symType = Syms.NOTE_QUARTER_REVERSE;
        break;
      case 'e':
        symType = Syms.NOTE_EIGHTH;
        break;
      case 'Re':
        symType = Syms.NOTE_EIGHTH_REVERSE;
        break;
      case '|':
        symType = Syms.BARLINE_TYPE;
        break;
      case 'rw':
        symType = Syms.WHOLEREST_TYPE;
        break;
      case 'rh':
        symType = Syms.HALFREST_TYPE;
        break;
      case 'rq':
        symType = Syms.QUARTERREST_TYPE;
        break;
      case 're':
        symType = Syms.EIGTHREST_TYPE;
        break;
      default:
        break;
    }
    return symType;
  }

  static addDescriptor(nt) {
    let descriptor = {};
    let scale = nt.s;
    let augment = nt.a;
    if(scale == 'b') {
      descriptor.scale=Syms.FLAT_TYPE;
    } else if (scale == 's') {
      descriptor.scale=Syms.SHARP_TYPE;
    } else if (scale == 'n') {
      descriptor.scale=Syms.NATURAL_TYPE;
    } else if (augment == '.') {
      descriptor.augment = true;
    }
    return descriptor;
  }
  /**
   * @param {*} note
   * {t:'q',n:'a4',x:0.15,f:440,s:'s/f/n',a:'.'}
   * which means a quater, A4, x position 0.15, frequence 440, sharp, flat or natual, with augment
   */
  static parseNote(note){
    const nt = note || {};
    const xParse = parseFloat(nt.x);
    const freqParse = parseInt(nt.f);
    return {
      type: Score.convertRawTypeToSymType(nt.t),
      name: nt.n,
      x: Number.isNaN(xParse) ? null : xParse,
      freq: Number.isNaN(freqParse) ? null : freqParse,
      descriptor: Score.addDescriptor(nt)
    };
  }

  /**
   * @param notes array from the score
   */
  static repositionNotes(notes){
    //staff start 0.1, staff end 0.95
    const countNoteLen = Score.filterNonPositionedSymbols(notes).length
    const incStep = (STAFF_SYM_END - STAFF_SYM_START)/countNoteLen;
    const positionedNotes = notes.map((note, idx)=>{
      if(note.type == Syms.BARLINE_TYPE){
        // do not assign bar line x first
      } else if (note.x) {
        note.x *= STAFF_WIDTH;
      }
      else {
        note.x = Math.round((STAFF_SYM_START+idx*incStep)*STAFF_WIDTH);
      }
      // merge the properties from NotesFullMap
      if (note.name) {
        const moreProps = NotesFullMap[note.name];
        note = Object.assign(note, moreProps);
      }
      return note;
    });
    return positionedNotes.map((note, idx)=> {
      if (note.type == Syms.BARLINE_TYPE && !note.x) {
        const prevNote = positionedNotes[idx-1];
        const nextNote = positionedNotes[idx+1];
        const prevNoteX = prevNote && prevNote.x ? prevNote.x : null;
        const nextNoteX = nextNote && nextNote.x ? nextNote.x : null;
        const incStepLen = incStep*STAFF_WIDTH;
        if (prevNoteX && nextNoteX) {
          note.x = Math.round((prevNoteX + nextNoteX)/2);
        } else if (prevNoteX) {
          note.x = Math.round((prevNoteX+incStepLen/2));
        } else {
          note.x = Math.round((nextNoteX-incStepLen/2));
        }
      }
      return note;
    });
  }

  /**
   * 
   * @param {*} notes line array
   */
  static parseNotesLine(notesLine) {
    const parsedNotes = notesLine.map(note=>Score.parseNote(note));
    return Score.repositionNotes(parsedNotes);
  }
  
  static parseAllNotes(notes){
    return notes.map(notesLine=>Score.parseNotesLine(notesLine))
  }
}

export default Score;
