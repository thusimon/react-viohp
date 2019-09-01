import React from 'react';
import NoteBase from './NoteBase';
import {NOTE_HEAD_FILL, NOTE_POLE, NOTE_TAIL_REVERSE} from '../Symbols';

const EighthReverse = function() {
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
    },
    {
      type: NOTE_TAIL_REVERSE,
      rect: {
        width: '12px',
        height: '30px',
        top: '23px',
        left: '4px'
      }
    }
  ]
  return <NoteBase center={center} components={components} />;
}

export default EighthReverse;