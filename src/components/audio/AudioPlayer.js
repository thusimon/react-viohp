/* eslint-disable react/jsx-no-bind */
import React, {useState} from 'react';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as playerActions from '../../actions/playerActions';
import PropTypes from 'prop-types';
import SelfClearBtn from '../common/SelfClearBtn';
import Slider from '../common/Slider';

const PlayerState = {
  init: 0,
  playing: 1,
  pause: 2
};

const AudioPlayer = (props) => {
  const [playerState, setPlayerState] = useState(PlayerState.init);
  const playClass = playerState === PlayerState.playing ? 'playerColorBtn' : '';
  const pauseClass = playerState === PlayerState.pause ? 'playerColorBtn' : '';
  return (
    <div>
      <span className="badge badge-info" style={{fontSize:'12px'}}>Music Player</span>
      <br /><br />
      <div className="btn-group" role="group" aria-label="player-buttons">
        <SelfClearBtn baseClass={'btn btn-secondary'} activeClass={'playerColorBtn'} icon={'backward'} clickCallBack={() => {props.backward();}} isClear />
        <button type="button" className={'btn btn-secondary ' + playClass} onClick = {() => {props.play(); setPlayerState(PlayerState.playing);}}>
          <FontAwesomeIcon icon="play" />
        </button>
        <button type="button" className={'btn btn-secondary ' + pauseClass} onClick = {() => {props.pause(); setPlayerState(PlayerState.pause);}}>
          <FontAwesomeIcon icon="pause" />
        </button>
        <SelfClearBtn baseClass={'btn btn-secondary'} activeClass={'playerColorBtn'} icon={'forward'} clickCallBack = {() => {props.forward();}} isClear />
      </div>
      <div style={{width: "80%", marginTop:"15px"}}>
        <Slider start={0} end={100} showValue={1} initVal={props.vol} onSlide={(val) => props.changeVol(val)}/>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const {vol} = state.player;
  return {vol};
};

const mapDispatchToProps = (dispatch) => {
  return {
      play: () => {
        dispatch(playerActions.play());
      },
      pause: () => {
        dispatch(playerActions.pause());
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

AudioPlayer.propTypes = {
  backward: PropTypes.func,
  forward: PropTypes.func,
  play: PropTypes.func,
  pause: PropTypes.func,
  changeVol: PropTypes.func,
  playing: PropTypes.number,
  seek: PropTypes.number,
  vol: PropTypes.number
};
export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer);
