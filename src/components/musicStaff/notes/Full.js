import React from 'react';
import NoteBase from './NoteBase';
import {NOTE_CIRCLE} from '../Symbols';

const FullNote = function() {
  const center = [9, 8];
  const components = [
    {
      type: NOTE_CIRCLE,
      rect: {
        width: '22px',
        height: '20px',
        top: '0px',
        left: '0px'
      }
    }
  ]
  return <NoteBase center={center} components={components} />;
}

export default FullNote;