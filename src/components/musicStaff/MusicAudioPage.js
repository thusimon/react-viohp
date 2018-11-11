/**
 * Created by Lu on 11/7/2018.
 */
/*eslint import/namespace: ['error', { allowComputed: true }]*/
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MusicStaffPage from './MusicStaffPage';
import * as Constants from './Constants';
import * as Utils from './Utils';
import Violin from './Violin';
import AudioAnalyzer from '../audio/AudioAnalyzer';
import ScorePicker from '../Scores/ScorePicker';
import Note from './Note';
import * as musicActions from '../../actions/musicActions';
import * as Symbols from './Symbols';

class MusicAudioPage extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div style={{marginTop:"20px", display:"flex"}}>
        <div style={{flex:"auto"}}>
          <ScorePicker></ScorePicker>
        </div>
        <div style={{flex:"auto"}}>
          <MusicStaffPage></MusicStaffPage>
        </div>
        <div style={{flex:"auto", display:"flex",flexDirection:"column"}}>
          <div style={{textAlign:'center',flex:"auto"}}>
            <span className="badge badge-info" style={{fontSize:'18px', marginBottom:"10px"}}>Audio Analyse</span>
            <div style={{display:"flex",flexDirection: "row"}}>
              <div style={{marginRight:"5px"}}>
                <AudioAnalyzer />
              </div>
            </div>
          </div>
          <br />
          <div style={{textAlign:'center',flex:"auto"}}>
            <span className="badge badge-info" style={{fontSize:'18px', marginBottom:"10px"}}>Violin(Position 1)</span>
            <Violin />
          </div>
        </div>
      </div>
    )
  }
}

export default MusicAudioPage;
