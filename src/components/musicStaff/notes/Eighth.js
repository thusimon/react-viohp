import React from 'react';
import NoteBase from './NoteBase';
import {NOTE_HEAD_FILL, NOTE_POLE, NOTE_TAIL} from '../Symbols';

const Eighth = function() {
  const center = [9, 38];
  const components = [
    {
      type: NOTE_HEAD_FILL,
      rect: {
        width: '22px',
        height: '18px',
        top: '35px',
        left: '0px'
      }
    },
    {
      type: NOTE_POLE,
      rect: {
        width: '3px',
        height: '43px',
        top: '0px',
        left: '18px'
      }
    },
    {
      type: NOTE_TAIL,
      rect: {
        width: '12px',
        height: '30px',
        top: '-1px',
        left: '19px'
      }
    },
  ]
  return <NoteBase center={center} components={components} />;
}

export default Eighth;