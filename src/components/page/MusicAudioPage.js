/**
 * Created by Lu on 11/7/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as modalActions from '../../actions/modalActions';
import MusicStaffPage from '../musicStaff/MusicStaffPage';
import Violin from '../musicStaff/Violin';
import AudioAnalyzer from '../audio/AudioAnalyzer';
import AudioPlayer from '../audio/AudioPlayer';
import AudioFilter from '../audio/AudioFilter';
import ToggleButton from '../common/ToggleButton';
import ScorePickerModal from '../modal/ScorePickerModal';

import '../../styles/common/btn-xs.scss';
import './music-audio-page.scss';

class MusicAudioPage extends React.Component{
  constructor(props){
    super(props);
    this.toggleFilter=this.toggleFilter.bind(this);
    this.pickScore = this.pickScore.bind(this);
    this.state = {showFilter: false};
  }

  toggleFilter(){
    let curShowFilter = this.state.showFilter;
    this.setState({showFilter:!curShowFilter});
  }

  pickScore() {
    console.log('clicked pick score');
    this.props.toggleScorePicker();
  }

  render(){
    let showFilterBtnText = this.props.appliedFiltername ? `You applied ${this.props.appliedFiltername} filter` : "Try filter?";
    let audioSettingClass = this.state.showFilter ? "scrollUp scrollUpShow" : "scrollUp";
    return (
      <div className="music-audio-page">
        <div className="control-section">
          <div className="score-picker-button">
            <button type="button" className="btn btn-outline-primary btn-xs" onClick={this.pickScore}>Pick Score</button>
            <ScorePickerModal />
          </div>
          <div className="player-section">
            <AudioPlayer />
          </div>
        </div>
        <div className="score-section">
          <MusicStaffPage />
        </div>
        <div className="audio-section">
          <div style={{textAlign:'center'}}>
            <span className="badge badge-info" style={{fontSize:'18px', marginBottom:"10px"}}>Audio Analyse</span>
            <div style={{display:"flex",flexDirection: "row"}}>
              <div style={{marginRight:"5px"}}>
                <AudioAnalyzer />
              </div>
            </div>
          </div>
          <div>
            <div style={{textAlign:'left'}}>
              <ToggleButton text={showFilterBtnText} toggle={this.state.showFilter} onclick={this.toggleFilter} />
            </div>
            <div className={audioSettingClass} style={{textAlign:"center",marginLeft:"5px", marginTop:"10px", width:"100%"}}>
              <AudioFilter />
            </div>
          </div>
          <br />
          <div style={{textAlign:'center',flex:"auto"}}>
            <span className="badge badge-info" style={{fontSize:'18px', marginBottom:"10px"}}>Violin(Position 1)</span>
            <Violin />
          </div>
        </div>
      </div>
    );
  }
}

MusicAudioPage.propTypes = {
  appliedFiltername: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    appliedFiltername:state.audio.appliedFiltername
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleScorePicker: () => {
      dispatch(modalActions.toggleScorePicker());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicAudioPage);
