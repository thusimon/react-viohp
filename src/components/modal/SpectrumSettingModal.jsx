import React from 'react';
import * as modalActions from '../../actions/modalActions';
import {connect} from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AudioControls from '../audio/AudioControls';

const SepctrumFilterModal = ({display, toggleDisplay}) => {
  
  const handleClose = () => {
    toggleDisplay();
  };

  return (
    <>
      <Modal show={display} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select your spectrum filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AudioControls />
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
    display: state.modal.spectrumSettingDisplay
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDisplay: () => {
      dispatch(modalActions.toggleSpectrumSetting());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SepctrumFilterModal);