import React from 'react';
import './audio-display.scss';

const AudioDisplay = (props) => {
  return (
    <div className='audio-display-container'>
      <table>
        <thead>
          <tr>
            <th title='The max value of Power Spectral Density'>PSD(max)</th>
            <th title='The frequency value(Hz) with the max PSD'>Freq(max)</th>
            <th title='The detected note name'>Note</th>
            <th title='The detected note frequence(Hz)'>Freq</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.peakEnergy}</td>
            <td style={{color:props.noteColor}}>{props.peakFreq}</td>
            <td style={{color:props.noteColor}}>{props.noteName}</td>
            <td>{props.noteFreq}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AudioDisplay;
