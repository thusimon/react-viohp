/**
 * Created by Lu on 10/30/2018.
 */
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

export const getPeakFreq = (freqData, sampleRate, fftSize)=>{
  let res = [0,0]; // res[0] frequency magnitude, res[1] frequency index
  for (let i=0;i<freqData.length;i++){
    if (res[0]<freqData[i]){
      res[0]=freqData[i];
      res[1]=i;
    }
  }
  //now we have max freq magnitude and freq index
  res[1] = res[1]*sampleRate/fftSize;
  return res;
};

export const getPeakFreqInRange = (freqData, sampleRate, fftSize, range)=>{
  let res = [0,0]; // res[0] frequency magnitude, res[1] frequency index
  for (let i=0;i<freqData.length;i++){
    let curFreq = i*sampleRate/fftSize;
    if (curFreq<range[0] || curFreq>range[1]){
      continue;
    }
    if (res[0]<freqData[i]){
      res[0]=freqData[i];
      res[1]=curFreq;
    }
  }
  //now we have max freq magnitude and freq index
  return res;
};
