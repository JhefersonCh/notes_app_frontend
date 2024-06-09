import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const YesNoModal = ({ show, onHide, onYes, onNo, title, body }) => {
  
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title || 'Confirm Action'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {body || 'Are you sure you want to proceed?'}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onNo}>
          No
        </Button>
        <Button variant="primary" onClick={onYes}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default YesNoModal;