/**
 * Created by Lu on 11/9/2018.
 */
import {NotesFullMap, STAFF_SYM_START, STAFF_SYM_END} from '../../components/musicStaff/Constants';
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
    let {_id, signature, scale, title, author, notes=[]} = score;
    this.id = _id;
    this.signature = signature;
    this.scale = scale;
    this.title = title;
    this.author = author;
    this.originalNotes = notes;
    this.notes = Score.parseAllNotes(notes);
  }

  /**
   * some symbols, such as bar line, does not take actual space
   * @param {*} notes: 1D array 
   */
  static filterNonPositionedSymbols(notes){
    return notes.filter(note=>{
      return note.type!=Syms.BARLINE_TYPE;
    })
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
    //staff start 0.1, staff end 1
    const countNoteLen = Score.filterNonPositionedSymbols(notes).length
    const incStep = (STAFF_SYM_END - STAFF_SYM_START)/countNoteLen;
    let symPos = STAFF_SYM_START;
    notes.forEach((note) => {
      if(note.type == Syms.BARLINE_TYPE){
        // do not assign bar line x first
      } else if (note.x) {
        // do not assign x if exists;
      }
      else {
        note.x = symPos;
        symPos += incStep;
      }
      // merge the properties from NotesFullMap
      if (note.name) {
        const moreProps = NotesFullMap[note.name];
        note = Object.assign(note, moreProps);
      }
    });
    return notes.map((note, idx)=> {
      if (note.type == Syms.BARLINE_TYPE && !note.x) {
        const prevNote = notes[idx-1];
        const nextNote = notes[idx+1];
        const prevNoteX = prevNote && prevNote.x ? prevNote.x : null;
        const nextNoteX = nextNote && nextNote.x ? nextNote.x : null;
        if (prevNoteX && nextNoteX) {
          note.x = (prevNoteX + nextNoteX)/2;
        } else if (prevNoteX) {
          note.x = prevNoteX+incStep/2;
        } else {
          note.x = nextNoteX-incStep/2;
        }
      }
      return note;
    });
  }

  static parseAllNotes(notes){
    return notes.map(notesLine=>{
      const parsedNotes = notesLine.map(note=>Score.parseNote(note));
      return Score.repositionNotes(parsedNotes);
    });
  }
}

export default Score;
