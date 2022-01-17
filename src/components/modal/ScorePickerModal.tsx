import React from 'react';
import * as modalActions from '../../actions/modalActions';
import {useSelector ,useDispatch} from 'react-redux';
import {RootState} from '../../reducers/initialState';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ScorePicker from '../Scores/ScorePicker';

const ScorePickerModal = () => {
  const modalProps = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(modalActions.toggleScorePicker());
  };

  return (
    <>
      <Modal show={modalProps.scorePickerDisplay} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select your score</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ScorePicker />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ScorePickerModal;
