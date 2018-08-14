import {fabric} from 'fabric';
import PropTypes from 'prop-types';

const NoteBody = ({cords}) => {
  const noteBody = new fabric.Line(cords,{
    fill: '#000',
    stroke: '#000',
    strokeWidth: 2,
    selectable: false,
  });
  return noteBody;
};

NoteBody.propTypes = {
  cords: PropTypes.array.isRequired
}

export default NoteBody;
