/**
 * Created by Lu on 11/7/2018.
 */
/*eslint import/namespace: ['error', { allowComputed: true }]*/
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MusicStaffPage from './MusicStaffPage';
import Violin from './Violin';
import AudioAnalyzer from '../audio/AudioAnalyzer';
import ScorePicker from '../Scores/ScorePicker';
import AudioPlayer from '../audio/AudioPlayer';
import AudioFilter from '../audio/AudioFilter';
import ToggleButton from '../common/ToggleButton';

class MusicAudioPage extends React.Component{
  constructor(props){
    super(props);
    this.toggleFilter=this.toggleFilter.bind(this);
    this.state = {showFilter: false};
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
          <div style={{display:"flex", flexDirection:"column"}}>
            <ScorePicker></ScorePicker>
            <br></br>
            <AudioPlayer></AudioPlayer>
          </div>
        </div>
        <div style={{flex:"auto"}}>
          <MusicStaffPage></MusicStaffPage>
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
    )
  }
}

function mapStateToProps(state){
  return {
    appliedFiltername:state.audio.appliedFiltername
  }
}

export default connect(mapStateToProps)(MusicAudioPage);
