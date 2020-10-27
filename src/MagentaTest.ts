// const mvae = require('@magenta/music/node/music_vae');
// const music_rnn = require('@magenta/music/node/music_rnn');
// const core = require('@magenta/music/node/core');

import * as mm from '@magenta/music/es6';

export default () => {
    
    const FULL_TWINKLE: mm.INoteSequence = {
      notes: [
        {pitch: 60, quantizedStartStep: 0, quantizedEndStep: 2, program: 0},
        {pitch: 60, quantizedStartStep: 2, quantizedEndStep: 4, program: 0},
        {pitch: 67, quantizedStartStep: 4, quantizedEndStep: 6, program: 0},
        {pitch: 67, quantizedStartStep: 6, quantizedEndStep: 8, program: 0},
        {pitch: 69, quantizedStartStep: 8, quantizedEndStep: 10, program: 0},
        {pitch: 69, quantizedStartStep: 10, quantizedEndStep: 12, program: 0},
        {pitch: 67, quantizedStartStep: 12, quantizedEndStep: 16, program: 0},
        {pitch: 65, quantizedStartStep: 16, quantizedEndStep: 18, program: 0},
        {pitch: 65, quantizedStartStep: 18, quantizedEndStep: 20, program: 0},
        {pitch: 64, quantizedStartStep: 20, quantizedEndStep: 22, program: 0},
        {pitch: 64, quantizedStartStep: 22, quantizedEndStep: 24, program: 0},
        {pitch: 62, quantizedStartStep: 24, quantizedEndStep: 26, program: 0},
        {pitch: 62, quantizedStartStep: 26, quantizedEndStep: 28, program: 0},
        {pitch: 60, quantizedStartStep: 28, quantizedEndStep: 32, program: 0},
        {pitch: 67, quantizedStartStep: 32, quantizedEndStep: 34, program: 0},
        {pitch: 67, quantizedStartStep: 34, quantizedEndStep: 36, program: 0},
        {pitch: 65, quantizedStartStep: 36, quantizedEndStep: 38, program: 0},
        {pitch: 65, quantizedStartStep: 38, quantizedEndStep: 40, program: 0},
        {pitch: 64, quantizedStartStep: 40, quantizedEndStep: 42, program: 0},
        {pitch: 64, quantizedStartStep: 42, quantizedEndStep: 44, program: 0},
        {pitch: 62, quantizedStartStep: 44, quantizedEndStep: 48, program: 0},
        {pitch: 67, quantizedStartStep: 48, quantizedEndStep: 50, program: 0},
        {pitch: 67, quantizedStartStep: 50, quantizedEndStep: 52, program: 0},
        {pitch: 65, quantizedStartStep: 52, quantizedEndStep: 54, program: 0},
        {pitch: 65, quantizedStartStep: 54, quantizedEndStep: 56, program: 0},
        {pitch: 64, quantizedStartStep: 56, quantizedEndStep: 58, program: 0},
        {pitch: 64, quantizedStartStep: 58, quantizedEndStep: 60, program: 0},
        {pitch: 62, quantizedStartStep: 60, quantizedEndStep: 64, program: 0},
        {pitch: 60, quantizedStartStep: 64, quantizedEndStep: 66, program: 0},
        {pitch: 60, quantizedStartStep: 66, quantizedEndStep: 68, program: 0},
        {pitch: 67, quantizedStartStep: 68, quantizedEndStep: 70, program: 0},
        {pitch: 67, quantizedStartStep: 70, quantizedEndStep: 72, program: 0},
        {pitch: 69, quantizedStartStep: 72, quantizedEndStep: 74, program: 0},
        {pitch: 69, quantizedStartStep: 74, quantizedEndStep: 76, program: 0},
        {pitch: 67, quantizedStartStep: 76, quantizedEndStep: 80, program: 0},
        {pitch: 65, quantizedStartStep: 80, quantizedEndStep: 82, program: 0},
        {pitch: 65, quantizedStartStep: 82, quantizedEndStep: 84, program: 0},
        {pitch: 64, quantizedStartStep: 84, quantizedEndStep: 86, program: 0},
        {pitch: 64, quantizedStartStep: 86, quantizedEndStep: 88, program: 0},
        {pitch: 62, quantizedStartStep: 88, quantizedEndStep: 90, program: 0},
        {pitch: 62, quantizedStartStep: 90, quantizedEndStep: 92, program: 0},
        {pitch: 60, quantizedStartStep: 92, quantizedEndStep: 96, program: 0}
      ],
      tempos: [
        {time: 0, qpm: 60}
      ],
      quantizationInfo: {stepsPerQuarter: 4},
      totalQuantizedSteps: 96
    };
    
    // const music_rnn = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn');
    // music_rnn.initialize();
    // const player = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/salamander');
    // player.loadAllSamples().then(() => {
    //     player.start(FULL_TWINKLE);
    // });
    
    


    // const model = new music_rnn.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn');
    // model.initialize();

    // const TWINKLE_TWINKLE = {
    //     notes: [
    //     {pitch: 60, startTime: 0.0, endTime: 0.5},
    //     {pitch: 60, startTime: 0.5, endTime: 1.0},
    //     {pitch: 67, startTime: 1.0, endTime: 1.5},
    //     {pitch: 67, startTime: 1.5, endTime: 2.0},
    //     {pitch: 69, startTime: 2.0, endTime: 2.5},
    //     {pitch: 69, startTime: 2.5, endTime: 3.0},
    //     {pitch: 67, startTime: 3.0, endTime: 4.0},
    //     {pitch: 65, startTime: 4.0, endTime: 4.5},
    //     {pitch: 65, startTime: 4.5, endTime: 5.0},
    //     {pitch: 64, startTime: 5.0, endTime: 5.5},
    //     {pitch: 64, startTime: 5.5, endTime: 6.0},
    //     {pitch: 62, startTime: 6.0, endTime: 6.5},
    //     {pitch: 62, startTime: 6.5, endTime: 7.0},
    //     {pitch: 60, startTime: 7.0, endTime: 8.0},  
    //     ],
    //     totalTime: 8
    // };

    // const player = new core.Player();

    // player.start(TWINKLE_TWINKLE);
    
}
