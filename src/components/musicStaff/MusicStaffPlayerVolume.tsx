import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/initialState';

const MusicStaffPlayerVolume = ({audioOscillator}) => {
  const playerProps = useSelector((state: RootState) => state.player);
  audioOscillator.setVolume(playerProps.vol);
  return <div style={{display: "none"}} />;
};

export default MusicStaffPlayerVolume;
