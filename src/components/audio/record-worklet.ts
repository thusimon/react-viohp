interface AudioWorkletProcessor {
  readonly port: MessagePort;
  process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Map<string, Float32Array>): void;
}

declare var AudioWorkletProcessor: {
  prototype: AudioWorkletProcessor;
  new(options?: AudioWorkletNodeOptions): AudioWorkletProcessor;
}

declare function registerProcessor(name:any, _class:any)

declare var sampleRate:number;

class RecordWorklet extends AudioWorkletProcessor {
  _bufferSize: number;
  _bufferChannel1: Float32Array;
  _bufferChannel2: Float32Array;
  _bytesWritten: number;
  static get parameterDescriptors() {
    return [{
      name: 'isRecording',
      defaultValue: 0
    }];
  }
  constructor() {
    super();
    this._bufferSize = sampleRate; // the buffer is 1 second data
    this._bufferChannel1 = new Float32Array(this._bufferSize);
    this._bufferChannel2 = new Float32Array(this._bufferSize);
    this._initBuffer();
  }

  _initBuffer() {
    this._bytesWritten = 0;
  }

  _isBufferEmpty() {
    return this._bytesWritten === 0;
  }

  _isBufferFull() {
    return this._bytesWritten === this._bufferSize;
  }

  _appendToBuffer(frame1, frame2) {
    if (this._isBufferFull()) {
      this._flush();
    }

    const frameLen = frame1.length; // frame1 and frame2 should be the same length
    this._bufferChannel1.set(frame1, this._bytesWritten);
    this._bufferChannel2.set(frame2, this._bytesWritten);
    this._bytesWritten += frameLen;
  }

  _flush() {
    let buffer1 = this._bufferChannel1;
    let buffer2 = this._bufferChannel2;
    if (this._bytesWritten < this._bufferSize) {
      buffer1 = buffer1.slice(0, this._bytesWritten);
      buffer2 = buffer2.slice(0, this._bytesWritten);
    }

    this.port.postMessage({
      eventType: 'data',
      audioBuffer: [buffer1, buffer2]
    });

    this._initBuffer();
  }

  _recordingStopped() {
    this.port.postMessage({
      eventType: 'stop'
    });
  }

  process(inputs, outputs, parameters) {
    const isRecordingValues = parameters.isRecording;
    const shouldRecord = isRecordingValues[0] === 1;
    if (!shouldRecord && !this._isBufferEmpty()) {
      this._flush();
      this._recordingStopped();
    }

    if (shouldRecord) {
      this._appendToBuffer(inputs[0][0], inputs[0][1]);
    }

    return true;
  }

}

registerProcessor('record-worklet', RecordWorklet);
