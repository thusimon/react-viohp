import {Signature, Scale, NoteType} from '../types';
import {MajorInterval, MinorInterval, SCALE_FULL} from './staff-data';

export const getSetOfNoteFromSignatureScale = (signature: Signature, scale: Scale) => {
  const intervals = signature == Signature.Major ? MajorInterval : MinorInterval;
  const intervalsR = intervals.slice().reverse();

  // find the first note that matches the scale
  let scaleIndex = SCALE_FULL.findIndex(notes=>{
      return notes.map(note=>note.scale).includes(scale);
    });
  let res: NoteType[] = [], i=0, intervalLen = intervals.length;
  let firstNote = SCALE_FULL[scaleIndex].filter(note=>note.scale==scale);
  res.push(firstNote[0]);
  // traverse the Constant.NotesFullArr to get the notes that matches the signature and scale
  let nextIdx = scaleIndex;
  let NotesFullArrLen = SCALE_FULL.length;
  while (nextIdx+intervals[i]<NotesFullArrLen){
    nextIdx += intervals[i];
    let notes = SCALE_FULL[nextIdx];
    // we should find the note whose sfIdx is different from the previous one
    let curNoteSfIdx = res[i].sfIdx;
    let differentSfIdxNote = notes.length>1 ?
      notes.filter(note => note.sfIdx!=curNoteSfIdx) :
      notes;
    res.push(differentSfIdxNote[0]);
    i = (++i)%intervalLen;
  }

  // should trace back to add notes
  nextIdx = scaleIndex;
  i=0;
  while (nextIdx-intervalsR[i]>=0){
    nextIdx -= intervalsR[i];
    let notes = SCALE_FULL[nextIdx];
    // we should find the note whose sfIdx is different from the previous one
    let curNoteSfIdx = res[0].sfIdx;
    let differentSfIdxNote = notes.length>1 ?
      notes.filter(note => note.sfIdx!=curNoteSfIdx) :
      notes;
    res.unshift(differentSfIdxNote[0]);
    i = (++i)%intervalLen;
  }
  return res; 
}
