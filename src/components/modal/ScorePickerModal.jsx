import React from 'react';
import * as modalActions from '../../actions/modalActions';
import {connect} from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ScorePicker from '../Scores/ScorePicker';

const ScorePickerModal = ({display, toggleDisplay}) => {
  
  const handleClose = () => {
    toggleDisplay();
  };

  return (
    <>
      <Modal show={display} onHide={handleClose}>
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

const mapStateToProps = (state) => {
  return { 
    display: state.modal.scorePickerDisplay
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDisplay: () => {
      dispatch(modalActions.toggleScorePicker());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScorePickerModal);