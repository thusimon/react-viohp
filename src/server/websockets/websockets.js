const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');
const Audio = require('../models/audio');
const webSocketCache = require('./websocketsCache').webSocketCache();

const mergeBuffers = (channelBuffer, recordingLength) => {
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

const interleave = (inputL, inputR) => {
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

const writeUTFBytes = (view, offset, string) => { 
  var lng = string.length;
  for (var i = 0; i < lng; i++){
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

const generateWAV = (interleaved, sampleRate) => {
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
  return view;
}

const webSocketIncomingDataHandler = (wsId, data) => {
  // data can only be blob or string
  if (typeof data == 'string') {
    try {
      const dataJson = JSON.parse(data);
      switch (dataJson.type) {
        case 'auth': {
          break;
        }
        case 'startRecording': {
          const {scoreId, title, sampleRate} = dataJson.data;
          const recordAudio = webSocketCache.getCache(wsId, 'audio') || {};
          recordAudio.scoreId = scoreId;
          recordAudio.title = title;
          recordAudio.sampleRate = sampleRate;
          recordAudio.buffer = [[],[]];
          recordAudio.recLength = 0;
          webSocketCache.setCache(wsId, 'audio', recordAudio);
          break;
        }
        case 'stopRecording': {
          const recordAudio = webSocketCache.getCache(wsId, 'audio') || {};
          // process audio
          const audioBuffer = recordAudio.buffer;
          const audioChLen = recordAudio.recLength;
          console.log(audioChLen);
          const channel1Buffer = mergeBuffers(audioBuffer[0], audioChLen);
          const channel2Buffer = mergeBuffers(audioBuffer[1], audioChLen);
          const interleavedBuffer = interleave(channel1Buffer, channel2Buffer);
          const view = generateWAV(interleavedBuffer, recordAudio.sampleRate);
          const buff = Buffer.from(view.buffer);
          console.log(buff, buff.length, buff.byteLength);
          const audio = new Audio({
            title: recordAudio.title,
            scoreId: recordAudio.scoreId,
            sampleRate: recordAudio.sampleRate,
            bin: buff
          });
          audio.save()
          .then((res) => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
          webSocketCache.setCache(wsId, 'audio', {});
          break;
        }
      }
    } catch (e) {
      console.log('Handling string socket data error' + e.message);
    }
  } else if (data instanceof Buffer) {
    const floatData = new Float32Array(data.buffer, 0, data.byteLength / Float32Array.BYTES_PER_ELEMENT);
    const chLen = floatData.length / 2;
    const ch1Data = floatData.subarray(0, chLen);
    const ch2Data = floatData.subarray(chLen, floatData.length);
    const recordAudio = webSocketCache.getCache(wsId, 'audio') || {};
    if (recordAudio.buffer) {
      recordAudio.buffer[0].push(ch1Data);
      recordAudio.buffer[1].push(ch2Data);
      recordAudio.recLength += chLen;
      webSocketCache.setCache(wsId, 'audio', recordAudio);
    }
  } else {

  }
}

const webSocketConnectHandler = (ws, req) => {
  console.log('ws on connection');
  ws.id = uuidv4();
  webSocketCache.setCache(ws.id, 'audio', {});
  ws.on('message', function incomingMessage(data) {
    webSocketIncomingDataHandler(ws.id, data);
  });
}

const createWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });
  wss.on('connection', webSocketConnectHandler);
  return wss;
}

module.exports = {
  createWebSocket
}