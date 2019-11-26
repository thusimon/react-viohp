class AudioGenerator {
  constructor(sampleRate=44100, channels=1, volume=0.1, bitsPerSample=16) {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
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
          var base = this.modulate[0];
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
    //this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
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
    var thisSound = this.soundProfile[sound];
    if(!thisSound) { throw new Error('Invalid sound: ' + sound); }
    var t = (new Date).valueOf();
    this._temp = {};
    var time = !duration?2:parseFloat(duration);
    var sampleRate = this._sampleRate;
    var volume = this._volume;
    var channels = this._channels;
    var bitsPerSample = this._bitsPerSample;
    var attack = thisSound.attack(sampleRate, frequency, volume);
    var dampen = thisSound.dampen(sampleRate, frequency, volume);
    var waveFunc = thisSound.wave;
    var waveBind = {modulate: this.modulate, vars: this._temp};
    var val = 0;

    var buffer = this.audioCtx.createBuffer(2, sampleRate * duration, sampleRate);
    
    var attackLen = (sampleRate * attack) | 0;
    var decayLen = (sampleRate * time) | 0;

    for (var channel = 0; channel < buffer.numberOfChannels; channel++) {
      // This gives us the actual array that contains the data
      var nowBuffering = buffer.getChannelData(channel);
      for (var i = 0 | 0; i !== attackLen; i++) {
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
    var buffer = this.generate(sound, frequency, duration);
    // Create an empty three-second stereo buffer at the sample rate of the AudioContext
    
    // Get an AudioBufferSourceNode.
    // This is the AudioNode to use when we want to play an AudioBuffer
    var source = this.audioCtx.createBufferSource();

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
