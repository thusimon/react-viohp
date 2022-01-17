import React from 'react';
import * as modalActions from '../../actions/modalActions';
import {useSelector ,useDispatch} from 'react-redux';
import {RootState} from '../../reducers/initialState';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AudioControls from '../audio/AudioControls';

const SepctrumSettingModal = () => {
  const modalProps = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(modalActions.toggleSpectrumSetting());
  };

  return (
    <>
      <Modal show={modalProps.spectrumSettingDisplay} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Config audio analyze settings</Modal.Title>
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

export default SepctrumSettingModal;
