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
import Note from './Note';
import * as musicActions from '../../actions/musicActions';
import * as Symbols from './Symbols';
import ToggleButton from '../common/ToggleButton';
import AudioControls from '../audio/AudioControls';

class MusicAudioPage extends React.Component{
  constructor(props){
    super(props);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.state = {showSettings:true}
  }
  toggleSettings(evt){
    console.log("clicked toggle");
  }
  render(){
    return (
      <div style={{marginTop:"20px", display:"flex"}}>
        <div style={{flex:"auto"}}>
          <MusicStaffPage></MusicStaffPage>
        </div>
        <div style={{flex:"auto", display:"flex",flexDirection:"column"}}>
          <div style={{textAlign:'center',flex:"auto"}}>
            <span className="badge badge-info" style={{fontSize:'18px', marginBottom:"10px"}}>Violin</span>
            <Violin />
          </div>
          <div style={{textAlign:'center',flex:"auto"}}>
            <span className="badge badge-info" style={{fontSize:'18px', marginBottom:"10px"}}>Audio Analyse</span>
            <div style={{display:"flex",flexDirection: "row"}}>
              <div style={{marginRight:"5px"}}>
                <AudioAnalyzer />
              </div>
              <div style={{verticalAlign:"top", display:"inline-block"}}>
                <div onClick={this.toggleSettings}>
                  <ToggleButton text="Settings" toggle={this.state.showSettings} />
                </div>
                <div className="scrollUp scrollUpShow" style={{marginTop:"20px"}}>
                  <AudioControls />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MusicAudioPage;
