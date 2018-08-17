/**
 * Created by Lu on 8/15/2018.
 */

// the scale and interval, this is fixed
// since the notes are periodic, the position is not important
/**
 * the real staff
 * ----- -4 -----
 * ----- -2 -----
 * ⎯⎯⎯⎯⎯  0 ⎯⎯⎯⎯⎯
 * ⎯⎯⎯⎯⎯  2 ⎯⎯⎯⎯⎯
 * ⎯⎯⎯⎯⎯  4 ⎯⎯⎯⎯⎯
 * ⎯⎯⎯⎯⎯  6 ⎯⎯⎯⎯⎯
 * ⎯⎯⎯⎯⎯  8 ⎯⎯⎯⎯⎯
 * ----- 10 -----
 * ----- 12 -----
 */
export const SCALE_INTERVAL = [
  {names:['C' , 'C' ], pos:[ 3, 3], primary: true },
  {names:['C#', 'Db'], pos:[ 3, 2], primary: false},
  {names:['D' , 'D' ], pos:[ 2, 2], primary: true },
  {names:['D#', 'Eb'], pos:[ 2, 1], primary: false},
  {names:['E' , 'E' ], pos:[ 1, 1], primary: true },
  {names:['F' , 'F' ], pos:[ 0, 0], primary: true },
  {names:['F#', 'Gb'], pos:[ 0,-1], primary: false},
  {names:['G' , 'G' ], pos:[-1,-1], primary: true },
  {names:['G#', 'Ab'], pos:[-1,-2], primary: false},
  {names:['A' , 'A' ], pos:[-2,-2], primary: true },
  {names:['A#', 'Bb'], pos:[-2,-3], primary: false},
  {names:['B' , 'B' ], pos:[-3,-3], primary: true }
];

export const SIGNATURES = [
  {name:'Major'},
  {name:'Minor'}
];

export const MajorInterval = [2,2,1,2,2,2,1];
export const MinorInterval = [2,1,2,2,1,2,2];

//return notes from lowest to highest
export const getExtendScales = (srcScale=SCALE_INTERVAL,range=[1,0]) => {
  let result = [];
  range.forEach(idx => {
    let shiftOffSet = idx * 7;
    let shiftedScale = srcScale.map(scale =>
      ({names:scale.names, pos:[scale.pos[0]+shiftOffSet, scale.pos[1]+shiftOffSet], primary:scale.primary})
    );
    result  = result.concat(shiftedScale);
  });
  return result;
};

export const getAllScaleNames = ()=>{
  return SCALE_INTERVAL.reduce((accumulator, curValue)=>{
    let mappedScale = curValue.names.map(name=>({value:name, text:name}));
    if (curValue.primary){
      accumulator = accumulator.concat(mappedScale[0]);
    } else {
      accumulator = accumulator.concat(mappedScale);
    }
    return accumulator;
  }, []);
};
