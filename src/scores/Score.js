/**
 * Created by Lu on 11/9/2018.
 */
import {NotesFullMap} from '../components/musicStaff/Constants';

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
      let curStaffNotesLen = curStaffRawNotes.length;
      let incStep = (790-120)/curStaffNotesLen;
      for (let j=0;j<curStaffNotesLen;j++){
        let {type, pitch} = curStaffRawNotes[j];
        let {name,label,scale,sfIdx,freq} = NotesFullMap[pitch];
        //calculate the xCord
        let xCord = Math.round(120+j*incStep);
        curStaffNotes[j]={type,name,label,scale,sfIdx,freq,xCord};
      }
      processedNotes.push(curStaffNotes);
    }
    this.notes=processedNotes;
  }
}

export default Score;
