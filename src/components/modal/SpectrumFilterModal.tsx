import React from 'react';
import * as modalActions from '../../actions/modalActions';
import {useSelector ,useDispatch} from 'react-redux';
import {RootState} from '../../reducers/initialState';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AudioFilter from '../audio/AudioFilter';

const SepctrumFilterModal = () => {
  const modalProps = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(modalActions.toggleSpectrumFilter());
  };

  return (
    <>
      <Modal show={modalProps.spectrumFilterDisplay} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select your spectrum filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AudioFilter />
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

export default SepctrumFilterModal;
