import {fabric} from 'fabric';

const NoteHead = ({fill}) => {
  const noteHead = new fabric.Circle({
    radius : 10,
    fill : fill,
    stroke: '#000',
    strokeWidth: 2,
    scaleY: 0.7,
    angle: -30
  });
  return noteHead;
};

NoteHead.defaultProps = {
  fill: '#000'
};
export default NoteHead;
