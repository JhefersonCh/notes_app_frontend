import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { STATUS_OTIONS } from "../../../shared/const";
import { toast } from "react-toastify";
import noteService from "../../services/noteService";
import tokenService from "../../../shared/services/tokenService";

const ChangeStatusDialog = ({ show, onHide, title, note }) => {

  const [status, setStatus] = useState('');

  useEffect(() => {
    setStatus(note?.status || '')
  }, [])

  const handleChangeStatus = async () => {
    if(!status) return toast.error('State is required.');
    if(status === note?.status) return toast.error('The state is the same as the existing one.');

    try {
      const data = {
        id: note?.id,
        userId: tokenService.getUser().id,
        status
      }
      await noteService.updateState(data);
      return onHide();
    } catch (error) {
      return console.error(error);
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column">
          <label htmlFor="change-status">State</label>
          <select id="change-status" className="bg-light text-dark" value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUS_OTIONS.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleChangeStatus}>Guardar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeStatusDialog;
