import React from 'react';
import NoteBase from './NoteBase';
import {NOTE_CIRCLE} from '../Symbols';

const Full = function() {
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
  return <NoteBase center={Full.center} components={components} />;
}
Full.center = [9,8];

export default Full;