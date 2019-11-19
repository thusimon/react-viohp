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
import ToggleButton from '../common/ToggleButton';
import ScorePickerModal from '../modal/ScorePickerModal';
import SpectrumFilterModal from '../modal/SpectrumFilterModal';
import SpectrumSettingModal from '../modal/SpectrumSettingModal';

import '../../styles/common/btn-xs.scss';
import './music-audio-page.scss';

class MusicAudioPage extends React.Component{
  constructor(props){
    super(props);
    this.pickScore = this.pickScore.bind(this);
    this.pickSpectrumFilter = this.pickSpectrumFilter.bind(this);
    this.pickSpectrumSetting = this.pickSpectrumSetting.bind(this);
  }

  toggleFilter(){
  }

  pickScore() {
    this.props.toggleScorePicker();
  }

  pickSpectrumFilter() {
    this.props.toggleSpectrumFilter();
  }

  pickSpectrumSetting() {
    this.props.toggleSpectrumSetting();
  }


  render(){
    return (
      <div className="music-audio-page">
        <div className="control-section">
          <div className="score-picker-button">
            <button type="button" className="btn btn-outline-primary btn-xs" onClick={this.pickScore}>Pick Score</button>
            <ScorePickerModal />
          </div>
          <div className="filter-picker-button">
            <button type="button" className="btn btn-outline-primary btn-xs" onClick={this.pickSpectrumFilter}>Spectrum Filter</button>
            <SpectrumFilterModal />
          </div>
          <div className="audio-setting-button">
            <button type="button" className="btn btn-outline-primary btn-xs" onClick={this.pickSpectrumSetting}>Spectrum Setting</button>
            <SpectrumSettingModal />
          </div>
          <div className="player-section">
            <AudioPlayer />
          </div>
        </div>
        <div className="score-section">
          <MusicStaffPage />
        </div>
        <div className="audio-section">
          <AudioAnalyzer />
          <p className="badge badge-info violin-caption">Violin(Position 1)</p>
          <div className="violin-container">
            <Violin />
          </div>
        </div>
      </div>
    );
  }
}

MusicAudioPage.propTypes = {
  audio: PropTypes.object,
  toggleScorePicker: PropTypes.func,
  toggleSpectrumFilter: PropTypes.func,
  toggleSpectrumSetting: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    audio:state.audio
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleScorePicker: () => {
      dispatch(modalActions.toggleScorePicker());
    },
    toggleSpectrumFilter: () => {
      dispatch(modalActions.toggleSpectrumFilter());
    },
    toggleSpectrumSetting: () => {
      dispatch(modalActions.toggleSpectrumSetting());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicAudioPage);
