/**
 * Created by Lu on 10/30/2018.
 */
import * as audioSettings from './AudioSettings';

export const pow2Table = [256, 512, 1024, 2048, 4096, 8192, 16384];
export const getViolinFFtSize = (sampleRate)=>{
  // the frequency of each note is not linear
  // g3-->g3# is the minimum 12Hz, so the fftsize should be large enough to distinguish 12Hz
  let rawFFtSize = Math.ceil(sampleRate*2/12);
  for (let i=0; i<pow2Table.length; i++){
    if (rawFFtSize<pow2Table[i]){
      return pow2Table[i];
    }
  }
  return pow2Table[pow2Table.length-1];
};

export const getPeakFreq = (freqData, noiseThreshold)=>{
  let res = [0,0]; // res[0] frequency magnitude, res[1] frequency index
  if (!freqData){
    return res;
  }
  for (let i=0;i<freqData.length;i++){
    let curFreq = freqData[i];
    if (curFreq<noiseThreshold){
      // this frequency is too small
      continue;
    }
    if (res[0]<curFreq){
      res[0]=curFreq;
      res[1]=i;
    }
  }
  //now we have max freq magnitude and freq index
  return res;
};


export const getBasePeakFreq = (freqData,noiseThreshold,consMinLen)=>{
  // improved version of getPeakFreq
  // my violin open string produces quite high energy harmonic components
  // it is better only keep the base freq component
  let groupedFreqComponents = [];
  let freqComponent = {data:[],idx:0}, i=0;
  while (i<freqData.length){
    let curFreq = freqData[i];
    if (curFreq<noiseThreshold){
      // this frequency is too small
      // find next consMinLen data
      let nextNoiseDataIdx = freqData.slice(i, i+consMinLen).findIndex(d=>d>=noiseThreshold);
      if (nextNoiseDataIdx == -1){
        // next consMinLen data are all noise
        i+=consMinLen;
        // need to push new group;
        if (freqComponent.data.length>0){
          groupedFreqComponents.push(freqComponent);
        }
        // clear the freqComponent
        freqComponent = {data:[],idx:0};
      } else {
        // next consMinLen data contains fft
        i+=(nextNoiseDataIdx+1);
      }
    } else {
      // this frequency is not noise
      let nextNoiseData = freqData.slice(i, i+consMinLen);
      freqComponent = freqComponent.concat(...nextNoiseData);
      i+=consMinLen;
    }
  }
  //now groupedFreqComponents includes base and harmonic components
  let baseComponent = groupedFreqComponents[0];
  let baseFreqRes = getPeakFreq(baseComponent, noiseThreshold);
  return baseFreqRes;
};

export const getNoteByFreq = (curFreq, tolerance)=>{
  let res = {noteColor: "#00FF00", peakFreq: curFreq.toString(), noteName: "--", noteFreq: "--"};
  for(let noteKey in audioSettings.POS1_NOTE_FREQ){
    let noteFreq = audioSettings.POS1_NOTE_FREQ[noteKey];
    let freqDiff = curFreq-noteFreq;
    if (freqDiff>0 && freqDiff<=tolerance){
      // curFreq is higher than noteFreq
      res.noteColor = "#FF0000";
      res.noteName = noteKey;
      res.noteFreq = noteFreq.toString();
      return res;
    } else if (freqDiff>=-tolerance && freqDiff<=0){
      res.noteName = noteKey;
      res.noteFreq = noteFreq.toString();
      return res;
    }
  }
  return res;
};

export const getFreqFromIndex = (freqIndex, sampleRate, fftSize) => freqIndex*sampleRate/fftSize;

export const getRangedFreqData = (freqData, sampleRate, fftSize, range)=>{
  let [freqMin, freqMax] = range; // freqMin < freqMax
  let [indexMin, indexMax] = [Math.round(freqMin*fftSize/sampleRate), Math.round(freqMax*fftSize/sampleRate)];
  indexMin = indexMin<0 ? 0: indexMin;
  indexMax = indexMax>freqData.length ? freqData.length:indexMax;
  return freqData.slice(indexMin, indexMax);
};
