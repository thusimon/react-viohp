/**
 * Created by Lu on 8/31/2019.
 */
import React from 'react';
import NoteBase from './NoteBase';
import {
  NOTE_CIRCLE, NOTE_HEAD_EMPTY, NOTE_HEAD_FILL,
  NOTE_POLE,
  NOTE_TAIL, NOTE_TAIL_REVERSE
} from '../Symbols';

const Full = function(props) {
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
  ];
  return <NoteBase center={Full.center} components={components} mark={props.mark} name={props.name} sfIdx={props.sfIdx} />;
};
Full.center = [9,8];

const Half = function(props) {
  const components = [
    {
      type: NOTE_HEAD_EMPTY,
      rect: {
        width: '22px',
        height: '18px',
        top: '36px',
        left: '2px'
      }
    },
    {
      type: NOTE_POLE,
      rect: {
        width: '3px',
        height: '43px',
        top: '1px',
        left: '18px'
      }
    }
  ];
  return <NoteBase center={Half.center} components={components} mark={props.mark} name={props.name} sfIdx={props.sfIdx}/>;
};
Half.center = [9, 43];

const HalfReverse = function(props) {
  const components = [
    {
      type: NOTE_HEAD_EMPTY,
      rect: {
        width: '22px',
        height: '18px',
        top: '0px',
        left: '2px'
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
  ];
  return <NoteBase center={HalfReverse.center} components={components} mark={props.mark} name={props.name} sfIdx={props.sfIdx} />;
};
HalfReverse.center = [9, 8];

const Quarter = function(props) {
  const components = [
    {
      type: NOTE_HEAD_FILL,
      rect: {
        width: '22px',
        height: '18px',
        top: '36px',
        left: '2px'
      }
    },
    {
      type: NOTE_POLE,
      rect: {
        width: '3px',
        height: '43px',
        top: '1px',
        left: '18px'
      }
    }
  ];
  return <NoteBase center={Quarter.center} components={components} mark={props.mark} name={props.name} sfIdx={props.sfIdx} />;
};
Quarter.center = [9, 43];

const QuarterReverse = function(props) {
  const components = [
    {
      type: NOTE_HEAD_FILL,
      rect: {
        width: '22px',
        height: '18px',
        top: '0px',
        left: '2px'
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
  ];
  return <NoteBase center={QuarterReverse.center} components={components} mark={props.mark} name={props.name} sfIdx={props.sfIdx} />;
};
QuarterReverse.center = [9, 8];

const Eighth = function(props) {
  const components = [
    {
      type: NOTE_HEAD_FILL,
      rect: {
        width: '22px',
        height: '18px',
        top: '36px',
        left: '0px'
      }
    },
    {
      type: NOTE_POLE,
      rect: {
        width: '3px',
        height: '43px',
        top: '1px',
        left: '16px'
      }
    },
    {
      type: NOTE_TAIL,
      rect: {
        width: '12px',
        height: '30px',
        top: '1px',
        left: '17px'
      }
    },
  ];
  return <NoteBase center={Eighth.center} components={components} mark={props.mark} name={props.name} sfIdx={props.sfIdx} />;
};
Eighth.center = [9, 43];

const EighthReverse = function(props) {
  const components = [
    {
      type: NOTE_HEAD_FILL,
      rect: {
        width: '22px',
        height: '18px',
        top: '1px',
        left: '0px'
      }
    },
    {
      type: NOTE_POLE,
      rect: {
        width: '4px',
        height: '43px',
        top: '9px',
        left: '0px'
      }
    },
    {
      type: NOTE_TAIL_REVERSE,
      rect: {
        width: '12px',
        height: '30px',
        top: '24px',
        left: '1px'
      }
    }
  ];
  return <NoteBase center={EighthReverse.center} components={components} mark={props.mark} name={props.name} sfIdx={props.sfIdx} />;
};
EighthReverse.center = [9, 8];

export default {Full, Half, HalfReverse, Quarter, QuarterReverse, Eighth, EighthReverse};
