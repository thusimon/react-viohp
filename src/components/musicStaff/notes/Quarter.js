import React from 'react';
import NoteBase from './NoteBase';
import {NOTE_HEAD_FILL, NOTE_POLE} from '../Symbols';

const Quarter = function() {
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
    }
  ]
  return <NoteBase center={center} components={components} />;
}

export default Quarter;