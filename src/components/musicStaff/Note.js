/**
 * Created by Lu on 8/12/2018.
 */
import {fabric} from 'fabric';
import NoteHead from './NoteHead';
import NoteBody from './NoteBody';

const Note = (props) => {
  const {fill,cords} = props;
  const noteHead = new NoteHead({fill});
  const noteBody = new NoteBody({cords});

  const note = new fabric.Group([noteHead, noteBody]);
  note.set('selectable', true);
  note.set('hasRotatingPoint', true);
  note.setControlsVisibility({
    tl: false, tr: false, br: false, bl: false,
    ml: false, mt: false, mr: false, mb: false,
    mtr: true
  });
  return note;
};
export default Note;
