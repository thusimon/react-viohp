class AudioPlayer {
    constructor(){
        // create web audio api context
        var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        // create Oscillator node
        this.oscillator = audioCtx.createOscillator();
        this.oscillator.type = 'sine';
        this.oscillator.frequency.setValueAtTime(3000, audioCtx.currentTime); // value in hertz
        this.oscillator.connect(audioCtx.destination);
    }
    
}