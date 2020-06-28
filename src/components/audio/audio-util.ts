export const AudioCtx = (() => {
  let audioContext;

  function createInstance() {
      return new AudioContext();
  }

  return {
      getInstance: function () {
          if (!audioContext) {
            audioContext = createInstance();
          }
          return audioContext;
      }
  };
})();

export const getMediaStream = (options) => {
  return navigator.mediaDevices.getUserMedia (options)
  .then((stream) => {
    return stream;
  })
  .catch((err) => {
    return {err};
  })
}

export const mergeBuffers = (channelBuffer, recordingLength) => {
  const result = new Float32Array(recordingLength);
  let offset = 0;
  const lng = channelBuffer.length;
  for (let i = 0; i < lng; i++){
    const buffer = channelBuffer[i];
    result.set(buffer, offset);
    offset += buffer.length;
  }
  return result;
}

export const interleave = (inputL, inputR) => {
  let length = inputL.length + inputR.length;
  let result = new Float32Array(length);

  let index = 0, inputIndex = 0;

  while (index < length) {
    result[index++] = inputL[inputIndex];
    result[index++] = inputR[inputIndex];
    inputIndex++;
  }
  return result;
}

export const writeUTFBytes = (view, offset, string) => { 
  var lng = string.length;
  for (var i = 0; i < lng; i++){
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

export const generateWAV = (interleaved, sampleRate) => {
  // create the buffer and view to create the .WAV file
  const buffer = new ArrayBuffer(44 + interleaved.length * 2);
  const view = new DataView(buffer);

  // write the WAV container, check spec at: https://ccrma.stanford.edu/courses/422/projects/WaveFormat/
  // RIFF chunk descriptor
  writeUTFBytes(view, 0, 'RIFF');
  view.setUint32(4, 44 + interleaved.length * 2, true);
  writeUTFBytes(view, 8, 'WAVE');
  // FMT sub-chunk
  writeUTFBytes(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  // stereo (2 channels)
  view.setUint16(22, 2, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 4, true);
  view.setUint16(32, 4, true);
  view.setUint16(34, 16, true);
  // data sub-chunk
  writeUTFBytes(view, 36, 'data');
  view.setUint32(40, interleaved.length * 2, true);
 
  // write the PCM samples
  const lng = interleaved.length;
  let index = 44;
  const volume = 1;
  for (let i = 0; i < lng; i++){
    view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
    index += 2;
  }
  // our final binary blob that we can hand off
  return new Blob ( [ view ], { type : 'audio/wav' } );
}

export const forceDownload = (blob, filename) => {
  let url = (window.URL || window.webkitURL).createObjectURL(blob);
  let link = window.document.createElement('a');
  link.href = url;
  link.download = filename || 'output.wav';
  document.body.append(link);
  link.click();
  link.remove();
}