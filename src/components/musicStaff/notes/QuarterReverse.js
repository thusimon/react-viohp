import React from 'react';
import NoteBase from './NoteBase';
import {NOTE_HEAD_FILL, NOTE_POLE} from '../Symbols';

const QuarterReverse = function() {
  const center = [9, 8];
  const components = [
    {
      type: NOTE_HEAD_FILL,
      rect: {
        width: '22px',
        height: '18px',
        top: '0px',
        left: '0px'
      }
    },
    {
      type: NOTE_POLE,
      rect: {
        width: '4px',
        height: '43px',
        top: '8px',
        left: '2px'
      }
    }
  ]
  return <NoteBase center={center} components={components} />;
}

export default QuarterReverse;