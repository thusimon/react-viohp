/**
 * Created by Lu on 8/15/2018.
 */

// the scale and interval, this is fixed
export const SCALE_INTERVAL = [
  {names:['B' , 'B' ], pos:[3,3], primary: true },
  {names:['A#', 'Bb'], pos:[4,3], primary: false},
  {names:['A' , 'A' ], pos:[4,4], primary: true },
  {names:['G#', 'Ab'], pos:[5,4], primary: false},
  {names:['G' , 'G' ], pos:[5,5], primary: true },
  {names:['F#', 'Gb'], pos:[6,5], primary: false},
  {names:['F' , 'F' ], pos:[6,6], primary: true },
  {names:['E' , 'E' ], pos:[7,7], primary: true },
  {names:['D#', 'Eb'], pos:[8,7], primary: false},
  {names:['D' , 'D' ], pos:[8,8], primary: true },
  {names:['C#', 'Db'], pos:[9,8], primary: false},
  {names:['C' , 'C' ], pos:[9,9], primary: true }
];

export const SIGNATURES = [
  {name:'Major'},
  {name:'Minor'}
];

export const MajorInterval = [2,2,1,2,2,2,1].reverse();
export const MinorInterval = [2,1,2,2,1,2,2].reverse();

//return notes from lowest to highest
export const getExtendScales = (srcScale=SCALE_INTERVAL,range=[0,1]) => {
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

export const getAllPossibleScales = ()=>{
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
