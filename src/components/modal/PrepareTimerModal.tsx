import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as modalActions from '../../actions/modalActions';
import {RootState} from '../../reducers/initialState';
import Modal from 'react-bootstrap/Modal';
import './prepare-timer-modal.scss';

const TIME_OFF = 5;

const PrepareTimerModal = ({callback}) => {
  const modalProps = useSelector((state: RootState) => state.modal);
  const display = modalProps.prepareTimerDisplay;
  const dispatch = useDispatch();
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
      // start display
      dispatch(callback());
      dispatch(modalActions.togglePrepareTimer());
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

export default PrepareTimerModal;
