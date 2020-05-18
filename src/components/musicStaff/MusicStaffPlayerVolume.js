import React from 'react';
import {connect} from 'react-redux';

const MusicStaffPlayerVolume = ({audioOscillator, vol}) => {
  audioOscillator.setVolume(vol);
  return <div style={{display: "none"}} />;
};

const mapStateToProps = (state) => {
  return {vol: state.player.vol};
};

export default connect(mapStateToProps)(MusicStaffPlayerVolume);