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
