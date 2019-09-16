class AudioOscillator {
    constructor(){
        // create web audio api context
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.gainNode = this.audioCtx.createGain();
        // create Oscillator node
        this.oscillator = this.audioCtx.createOscillator();
        this.oscillator.type = 'sine';
        //this.oscillator.frequency.setValueAtTime(440, this.audioCtx.currentTime); // value in hertz
        this.gainNode.connect(this.audioCtx.destination);
        this.oscillator.connect(this.gainNode);
        const initialVol = 0.2;
        this.gainNode.gain.value = initialVol;
        //this.gainNode.gain.minValue = initialVol;
        //this.gainNode.gain.maxValue = initialVol;
    }
    setFrequency(freq) {
        this.oscillator.frequency.value = freq;
    }
    setType(type = 'sine') {
        this.oscillator.type = type;
    }
    start() {
        this.audioCtx.resume();
        this.oscillator.start();
    }
    mute() {
        this.gainNode.gain.value = 0;
        //this.gainNode.gain.minValue = 0;
        //this.gainNode.gain.maxValue = 0;
    }
    unmute() {
        this.gainNode.gain.value = 0.2;
    }
    stop() {
        this.oscillator.stop();
    }
}

export default AudioOscillator;