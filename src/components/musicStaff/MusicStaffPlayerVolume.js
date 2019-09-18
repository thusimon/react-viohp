import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const MusicStaffPlayerVolume = ({audioOscillator, vol}) => {
  audioOscillator.setVolume(vol);
  return <div style={{display: "none"}} />;
};

MusicStaffPlayerVolume.propTypes = {
  audioOscillator: PropTypes.object,
  vol: PropTypes.number
};

const mapStateToProps = (state) => {
  return {vol: state.player.vol};
};

export default connect(mapStateToProps)(MusicStaffPlayerVolume);