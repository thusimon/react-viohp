import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as playerActions from '../../actions/playerActions';

class AudioPlayer extends React.Component {
  constructor(props, context){
    super(props, context);
    this.clickBackwardBtn = this.clickBackwardBtn.bind(this);
    this.clickForwardBtn = this.clickForwardBtn.bind(this);
    this.state = {playing: false, seek:-1};
  }
  static getDerivedStateFromProps(props, state) {
    return {
      playing: props.playing,
      seek: props.seek
    };
  }
  clickBackwardBtn() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.props.backward();
    this.timer = setTimeout(() => {
      this.props.resetSeek();
    }, 500);
  }
  clickForwardBtn() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.props.forward();
    this.timer = setTimeout(() => {
      this.props.resetSeek();
    }, 500);
  }
  render() {
    const playClass = this.props.playing === 1 ? 'playerColorBtn' : '';
    const pauseClass = this.props.playing === 0? 'playerColorBtn' : '';
    const backwardClass = this.props.seek === -1 ? 'playerColorBtn' : '';
    const forwardClass = this.props.seek === 1 ? 'playerColorBtn' : '';
    return (
      <div class='btn-group' role='group' aria-label='player-buttons'>
        <button type='button' class={'btn btn-secondary ' + backwardClass} onClick = {this.clickBackwardBtn}>
          <FontAwesomeIcon icon='backward' />
        </button>
        <button type='button' class={'btn btn-secondary ' + playClass} onClick = {this.props.play}>
          <FontAwesomeIcon icon='play' />
        </button>
        <button type='button' class={'btn btn-secondary ' + pauseClass} onClick = {this.props.pause}>
          <FontAwesomeIcon icon='pause' />
        </button>
        <button type='button' class={'btn btn-secondary ' + forwardClass} onClick = {this.clickForwardBtn}>
          <FontAwesomeIcon icon='forward' />
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state.player;
}

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
      resetSeek: () => {
        dispatch(playerActions.resetSeek());
      }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer);