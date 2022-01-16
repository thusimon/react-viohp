class AudioGenerator {
  private audioCtx: AudioContext;
  private _temp: object;
  private _sampleRate: number;
  private _bitsPerSample: number;
  private _channels: number;
  private _volume: number;
  private modulate: Function[];
  private soundProfile: object;
  constructor(sampleRate=44100, channels=1, volume=0.1, bitsPerSample=16) {
    this.audioCtx = new window.AudioContext();
    this._temp = {};
    this._sampleRate = this.audioCtx.sampleRate || sampleRate;
    this._bitsPerSample = bitsPerSample;
    this._channels = channels
    this.setVolume(volume);
    this.modulate = [
      function(i, sampleRate, frequency, x) { return 1 * Math.sin(2 * Math.PI * ((i / sampleRate) * frequency) + x); },
      function(i, sampleRate, frequency, x) { return 1 * Math.sin(4 * Math.PI * ((i / sampleRate) * frequency) + x); },
      function(i, sampleRate, frequency, x) { return 1 * Math.sin(8 * Math.PI * ((i / sampleRate) * frequency) + x); },
      function(i, sampleRate, frequency, x) { return 1 * Math.sin(0.5 * Math.PI * ((i / sampleRate) * frequency) + x); },
      function(i, sampleRate, frequency, x) { return 1 * Math.sin(0.25 * Math.PI * ((i / sampleRate) * frequency) + x); },
      function(i, sampleRate, frequency, x) { return 0.5 * Math.sin(2 * Math.PI * ((i / sampleRate) * frequency) + x); },
      function(i, sampleRate, frequency, x) { return 0.5 * Math.sin(4 * Math.PI * ((i / sampleRate) * frequency) + x); },
      function(i, sampleRate, frequency, x) { return 0.5 * Math.sin(8 * Math.PI * ((i / sampleRate) * frequency) + x); },
      function(i, sampleRate, frequency, x) { return 0.5 * Math.sin(0.5 * Math.PI * ((i / sampleRate) * frequency) + x); },
      function(i, sampleRate, frequency, x) { return 0.5 * Math.sin(0.25 * Math.PI * ((i / sampleRate) * frequency) + x); }
    ];
    this.soundProfile = {
      piano: {
        name: 'piano',
        attack: function() { return 0.002; },
        dampen: function(sampleRate, frequency, volume) {
          return Math.pow(0.5*Math.log((frequency*volume)/sampleRate),2);
        },
        wave: function(i, sampleRate, frequency, volume) {
          const base = this.modulate[0];
          return this.modulate[1](
            i,
            sampleRate,
            frequency,
            Math.pow(base(i, sampleRate, frequency, 0), 2) +
              (0.75 * base(i, sampleRate, frequency, 0.25)) +
              (0.1 * base(i, sampleRate, frequency, 0.5))
          );
        }
      }
    };
  }

  /**
   * 
   * @param {*} v 0-1 
   */
  setVolume(v){
		this._volume = v;
		return this._volume;
  }

  pack(c,arg){ 
    return [
      new Uint8Array([arg, arg >> 8]),
      new Uint8Array([arg, arg >> 8, arg >> 16, arg >> 24])
    ][c]; 
  };
  /**
   * 
   * @param {*} sound paino
   * @param {*} frequency Hz
   * @param {*} duration second
   */
  generate(sound, frequency, duration) {
    const thisSound = this.soundProfile[sound];
    if(!thisSound) { throw new Error('Invalid sound: ' + sound); }
    this._temp = {};
    const time = !duration?2:parseFloat(duration);
    const sampleRate = this._sampleRate;
    const volume = this._volume;
    const channels = this._channels;
    const bitsPerSample = this._bitsPerSample;
    const attack = thisSound.attack(sampleRate, frequency, volume);
    const dampen = thisSound.dampen(sampleRate, frequency, volume);
    const waveFunc = thisSound.wave;
    const waveBind = {modulate: this.modulate, vars: this._temp};
    let val = 0;

    const buffer = this.audioCtx.createBuffer(2, sampleRate * duration, sampleRate);
    
    const attackLen = (sampleRate * attack) | 0;
    const decayLen = (sampleRate * time) | 0;

    for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
      // This gives us the actual array that contains the data
      const nowBuffering = buffer.getChannelData(channel);
      let i = 0;
      for ( i = 0 | 0; i !== attackLen; i++) {
        val = volume * (i/(sampleRate*attack)) * waveFunc.call(waveBind, i, sampleRate, frequency, volume);
        nowBuffering[i] = val;
        //nowBuffering[(i << 1) + 1] = (val >> 8)/255;
      }
      for (; i !== decayLen; i++) {
        val = volume * Math.pow((1-((i-(sampleRate*attack))/(sampleRate*(time-attack)))),dampen) * waveFunc.call(waveBind, i, sampleRate, frequency, volume);
        nowBuffering[i] = val;
        //nowBuffering[(i << 1) + 1] = (val >> 8)/255;
      }
    }
    return buffer;
  }

  endHandler(e) {
    console.log('sound ended', e);
  }

  play(sound, frequency, duration) {
    const buffer = this.generate(sound, frequency, duration);
    // Create an empty three-second stereo buffer at the sample rate of the AudioContext
    
    // Get an AudioBufferSourceNode.
    // This is the AudioNode to use when we want to play an AudioBuffer
    const source = this.audioCtx.createBufferSource();

    source.addEventListener('ended', this.endHandler);
    // set the buffer in the AudioBufferSourceNode
    source.buffer = buffer;

    // connect the AudioBufferSourceNode to the
    // destination so we can hear the sound
    source.connect(this.audioCtx.destination);

    // start the source playing
    source.start();
  }
}

export default AudioGenerator;
