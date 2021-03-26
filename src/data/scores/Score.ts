/**
 * Created by Lu on 11/9/2018.
 */
import {NotesFullMap, STAFF_SYM_START, STAFF_SYM_END} from '../../components/musicStaff/Constants';
import {SymbolType as Sym} from '../../music-editor/types';

class Score {
  /**
   * @param signature
   * @param scale
   * @param title
   * @param author
   * @param notes, would be a 2D array [[staffline1],[staffline2]];
   */
  id: string;
  signature: string;
  scale: string;
  title: string;
  author: string;
  originalNotes: any[];
  notes: any[];
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
      return note.type!=Sym.BAR;
    })
  }

  static convertRawTypeToSymType(type) {
    let symType = Sym.NOTE_QUARTER;
    switch (type) {
      case 'w':
        symType = Sym.NOTE_WHOLE;
        break;
      case 'h':
        symType = Sym.NOTE_HALF;
        break;
      case 'Rh':
        symType = Sym.NOTE_HALF_REVERSE;
        break;
      case 'q':
        symType = Sym.NOTE_QUARTER;
        break;
      case 'Rq':
        symType = Sym.NOTE_QUARTER_REVERSE;
        break;
      case 'e':
        symType = Sym.NOTE_EIGHTH;
        break;
      case 'Re':
        symType = Sym.NOTE_EIGHTH_REVERSE;
        break;
      case '|':
        symType = Sym.BAR;
        break;
      case 'rw':
        symType = Sym.WHOLEREST;
        break;
      case 'rh':
        symType = Sym.HALFREST;
        break;
      case 'rq':
        symType = Sym.QUARTERREST;
        break;
      case 're':
        symType = Sym.EIGTHREST;
        break;
      default:
        break;
    }
    return symType;
  }

  static addDescriptor(nt) {
    let descriptor: {
      augment?: boolean,
      scale?: Sym
    } = {};
    let scale = nt.s;
    let augment = nt.a;
    if(scale == 'b') {
      descriptor.scale=Sym.FLAT;
    } else if (scale == 's') {
      descriptor.scale=Sym.SHARP;
    } else if (scale == 'n') {
      descriptor.scale=Sym.NATURAL;
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
      if(note.type == Sym.BAR){
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
      if (note.type == Sym.BAR && !note.x) {
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
