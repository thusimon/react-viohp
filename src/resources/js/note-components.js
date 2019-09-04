import {NOTE_CIRCLE, NOTE_HEAD_EMPTY, NOTE_HEAD_FILL,
  NOTE_POLE, NOTE_TAIL, NOTE_TAIL_REVERSE} from '../../components/musicStaff/Symbols';

const noteCircle = () => '<svg version="1.0" style="width:18px;height:16px">\
  <g id="note-circle">\
    <ellipse cx="9" cy="8" rx="8" ry="6"\
      style="width:18px;height:16px;fill-opacity:0;stroke-width:2" />\
  </g>\
</svg>';

const noteHeadEmpty = () => '<svg version="1.0" style="width:18px;height:16px">\
  <g transform="rotate(-28, 9, 8)" id="note-head-empty">\
    <ellipse cx="9" cy="8" rx="8" ry="6"\
      style="width:18px;height:16px;fill-opacity:0;stroke-width:2" />\
  </g>\
</svg>';

const noteHeadFill = () => '<svg version="1.0" style="width:18px;height:16px">\
  <g transform="rotate(-28, 9, 8)" id="note-head-empty">\
    <ellipse cx="9" cy="8" rx="8" ry="6"\
      style="width:18px;height:16px;fill-opacity:255;stroke-width:2" />\
  </g>\
</svg>';

const notePole = () => '<svg version="1.0" style="width:3px;height:43px">\
  <g id="note-pole">\
    <line x1="1" y1="0" x2="1" y2="43" style="width:3px;height:43px;stroke-width:2.2" />\
  </g>\
</svg>';

const noteTail = () => '<svg version="1.0" style="width:12px;height:29px">\
  <g transform="scale(1,-1),translate(0,-28.31978)" id="note-tail">\
    <path d="M 0.5625,28.31978 C 0,21.94982 5.40505,19.68858 8.0625,16.76232 C 10.58846,13.98085 11.51117,10.7726 11.40798,7.76672 C 11.38043,6.96415 11.16255,3.48661 8.79353,0 C 11.96145,8.74711 9.012,12.25806 6.13057,15.05158 C 2.64063,18.43504 0.04445,21.62376 0.5625,28.26232 z"\
      style="width:12px;height:29px" />\
  </g>\
</svg>';

const noteTailReverse = () => '<svg version="1.0" style="width:12px;height:29px">\
  <g id="note-tail-reverse">\
    <path d="M 0.5625,28.31978 C 0,21.94982 5.40505,19.68858 8.0625,16.76232 C 10.58846,13.98085 11.51117,10.7726 11.40798,7.76672 C 11.38043,6.96415 11.16255,3.48661 8.79353,0 C 11.96145,8.74711 9.012,12.25806 6.13057,15.05158 C 2.64063,18.43504 0.04445,21.62376 0.5625,28.26232 z"\
      style="width:12px;height:29px" />\
  </g>\
</svg>';

const components = {
  [NOTE_CIRCLE]: noteCircle,
  [NOTE_HEAD_EMPTY]: noteHeadEmpty,
  [NOTE_HEAD_FILL]: noteHeadFill,
  [NOTE_POLE]: notePole,
  [NOTE_TAIL]: noteTail,
  [NOTE_TAIL_REVERSE]: noteTailReverse 
};
export default components;