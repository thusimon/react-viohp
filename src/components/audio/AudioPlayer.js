/* eslint-disable react/jsx-no-bind */
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as playerActions from '../../actions/playerActions';

import SelfClearBtn from '../common/SelfClearBtn';
import Slider from '../common/Slider';
import '../../styles/common/btn-xs.scss';
import './audio-player.scss';

const AudioPlayer = (props) => {
  const [volumeState, setVolumeState] = useState(props.vol>0);
  const playClass = props.playing === 1 ? 'player-btn-color-bg' : '';
  const pauseClass = props.playing === 0 ? 'player-btn-color-bg' : '';
  const volumeIcon = volumeState ? <FontAwesomeIcon icon="volume-up" size="sm" /> : <FontAwesomeIcon icon="volume-mute" size="sm" />;
  return (
    <div className="audio-player-container">
      <div className="btn-group btn-group-xs player-btn-group" role="group" aria-label="player-buttons">
        <SelfClearBtn baseClass={'btn btn-secondary btn-xs'} activeClass={'player-btn-color-bg'} icon={'backward'} clickCallBack={() => {props.backward();}} isClear />
        <button type="button" className={'btn btn-secondary btn-xs ' + playClass} onClick = {() => {props.preplay();}}>
          <FontAwesomeIcon icon="play" />
        </button>
        <button type="button" className={'btn btn-secondary btn-xs ' + pauseClass} onClick = {() => {props.pause();}}>
          <FontAwesomeIcon icon="pause" />
        </button>
        <SelfClearBtn baseClass={'btn btn-secondary btn-xs'} activeClass={'player-btn-color-bg'} icon={'forward'} clickCallBack = {() => {props.forward();}} isClear />
      </div>
      <div className="player-volumn">
        <span>
          {volumeIcon}
        </span>
        <Slider start={0} end={100} showValue={1} initVal={props.vol} onSlide={(val) => {
            props.changeVol(val);
            setVolumeState(val);
        }}/>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const {vol, playing} = state.player;
  return {vol, playing};
};

const mapDispatchToProps = (dispatch) => {
  return {
      preplay: () => {
        dispatch(playerActions.preplay());
      },
      play: () => {
        dispatch(playerActions.play());
      },
      pause: () => {
        dispatch(playerActions.pause());
      },
      reset: () => {
        dispatch(playerActions.reset());
      },
      forward: () => {
        dispatch(playerActions.forward());
      },
      backward: () => {
        dispatch(playerActions.backward());
      },
      changeVol: (vol) => {
        dispatch(playerActions.changeVolume(vol));
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer);
