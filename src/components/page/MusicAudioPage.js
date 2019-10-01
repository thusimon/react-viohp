/**
 * Created by Lu on 11/7/2018.
 */
/*eslint import/namespace: ['error', { allowComputed: true }]*/
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MusicStaffPage from '../musicStaff/MusicStaffPage';
import Violin from '../musicStaff/Violin';
import AudioAnalyzer from '../audio/AudioAnalyzer';
import ScorePicker from '../Scores/ScorePicker';
import AudioPlayer from '../audio/AudioPlayer';
import AudioFilter from '../audio/AudioFilter';
import ToggleButton from '../common/ToggleButton';
import {getAllScoreList, getScoreByName} from '../../data/scores/Utils';
import * as musicActions from '../../actions/musicActions';

class MusicAudioPage extends React.Component{
  constructor(props){
    super(props);
    this.toggleFilter=this.toggleFilter.bind(this);
    this.state = {showFilter: false};
    let scoreList = getAllScoreList();
    props.setScoreList(scoreList);
    let firstScore = scoreList[0];
    if (firstScore){
      let scoreName = firstScore.name;
      props.setScore(scoreName);
    }
  }
  toggleFilter(){
    let curShowFilter = this.state.showFilter;
    this.setState({showFilter:!curShowFilter});
  }
  render(){
    let showFilterBtnText = this.props.appliedFiltername ? `You applied ${this.props.appliedFiltername} filter` : "Try filter?";
    let audioSettingClass = this.state.showFilter ? "scrollUp scrollUpShow" : "scrollUp";
    return (
      <div style={{marginTop:"20px", display:"flex"}}>
        <div style={{flex:"auto"}}>
          <div style={{display:"flex", flexDirection:"column", height: "100%"}}>
            <div style={{flexBasis: "30%"}}>
              <ScorePicker />
            </div>
            <div style={{flexBasis: "20%"}}>
              <AudioPlayer />
            </div>
          </div>
        </div>
        <div style={{flex:"auto"}}>
          <MusicStaffPage />
        </div>
        <div style={{flex:"auto", marginLeft:"8px", maxWidth:"710px"}}>
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
  setScoreList: PropTypes.func,
  setScore: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    appliedFiltername:state.audio.appliedFiltername
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setScoreList:(scoreList) => {
      dispatch(musicActions.setScoreList(scoreList));
    },
    setScore: (scoreName) => {
      dispatch(musicActions.setScore(scoreName)); 
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicAudioPage);
