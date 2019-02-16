/**
 * Created by Lu on 11/9/2018.
 */
import {NotesFullMap} from '../../components/musicStaff/Constants';
import * as Symbols from '../../components/musicStaff/Symbols';
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
    this.name=name;
    this.signature = signature;
    this.scale = scale;
    this.title = title;
    this.author = author;
    this.rawNotes=notes;
    this.repositionNotes(notes);
  }

  /**
   * @param notes array from the score
   * need to convert the array as object, key=array index
   */
  repositionNotes(notes){
    let processedNotes=[];
    //staff start 120px, staff end 790px
    for (let i=0;i<notes.length;i++){
      let curStaffRawNotes = notes[i];
      let curStaffNotes = {};
      console.log(curStaffNotes);
      let curStaffSymLen = curStaffRawNotes.length;
      let curStaffNoteLen = curStaffRawNotes.filter(sym=>sym.type!=Symbols.BARLINE_TYPE).length;
      let incStep = (1200-120)/curStaffNoteLen;
      for (let j=0, idx=0;j<curStaffSymLen;j++){
        let {type, pitch, descriptor, x} = curStaffRawNotes[j];
        let {name,label,scale,sfIdx,freq} = NotesFullMap[pitch]||{};
        //calculate the xCord
        if (!x){
          if(type!=Symbols.BARLINE_TYPE){
            x = Math.round(120+idx*incStep);
            idx++;
          } else {
            // it is barline
            let prevX = curStaffNotes[j-1].x;
            x = prevX + incStep/2;
          }
        } else {
          x += 120;
        }
        curStaffNotes[j]={type,name,label,scale,sfIdx,freq,x,descriptor};
      }
      processedNotes.push(curStaffNotes);
    }
    this.notes=processedNotes;
  }
}

export default Score;
