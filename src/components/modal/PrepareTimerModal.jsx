import React, {useState, useEffect} from 'react';
import * as playerActions from '../../actions/playerActions';
import * as modalActions from '../../actions/modalActions';
import {connect} from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import './prepare-timer-modal.scss';

const TIME_OFF = 5;

const PrepareTimerModal = ({display, startPlay, toggleDisplay, callback}) => {
  let [timeLeftover, setTimeLeftover] = useState(TIME_OFF);
  useEffect(() => {
    if (display) {
      startCountDown(TIME_OFF);
    }
  }, [display])
  const startCountDown = (currentTime) => {
    if (currentTime >= 0) {
      setTimeLeftover(currentTime);
      setTimeout(startCountDown, 1000, currentTime-1);
    } else {
      startPlay(callback);
      toggleDisplay();
    }
  }
  return (
    <>
      <Modal show={display} dialogClassName='prepare-timer-modal' backdrop={false} centered>
        <Modal.Body>
          <div>{timeLeftover}</div>
        </Modal.Body>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return { 
    display: state.modal.prepareTimerDisplay
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    startPlay: (callback) => {
      dispatch(callback());
    },
    toggleDisplay: () => {
      dispatch(modalActions.togglePrepareTimer());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrepareTimerModal);
