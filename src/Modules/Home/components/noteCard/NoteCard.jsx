/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import "./NoteCard.css"
import { MdDeleteOutline, MdEdit } from 'react-icons/md';
import YesNoModal from '../../../shared/components/yesNoModal/YesNoModal';
import noteService from '../../services/noteService';
import { toast } from 'react-toastify';
import { FaEye } from 'react-icons/fa';
import ChangeStatusDialog from '../changeStatusDialog/ChangeStatusDialog';

export const NoteCard = ({ note, setCurrentNote, setShowNoteForm, userId, setLoadNotes, loadNotes, setShowPreview, isSelected }) => {

  const [modalShow, setModalShow] = useState(false);
  const [changeStatus, setChangeStatus] = useState(false);

  const handleYes = async () => {
    setModalShow(false);
    try {
      const noteInformation = {
        id: note.id,
        userId
      }
      await noteService.deleteNote(noteInformation)
      setLoadNotes(!loadNotes)
    } catch (error) {
      return toast.error('An error ocurred.')
    }
  };

  const handleNo = () => {
    setModalShow(false);
  };

  const getColor = (status) => {
    const statusColors = {
      'Pending': 'warning',
      'In progress': 'primary',
      'Completed': 'success'
    };

    return statusColors[status] || null;
  }

  return (
    <Card className={`mb-3 bg-dark text-white ${isSelected ? 'selected' : ''}`}>
      <Card.Body className="card-body">
        <Card.Title className="card-title">{note?.title || '---'}</Card.Title>
        <Card.Text>
          <strong>Tags: </strong>
          {
            note?.tags?.length ? `${note?.tags.split(',').join(', ')}.`
              : "Has no tags."
          }
        </Card.Text>
      </Card.Body>
      <hr className='my-1' />
      <footer className='d-flex row w-100 m-0'>

        <section className='col-6 d-flex gap-2 align-items-center'>
          <span
            onClick={() => setChangeStatus(true)}
            className={`text-${getColor(note.status)} font-monospace neon-effect`}
            type="button">
            {note?.status}
          </span>
          <ChangeStatusDialog
            show={changeStatus}
            onHide={() => { setChangeStatus(false); setLoadNotes(!loadNotes) }}
            title="Change note state"
            note={note}
          />
        </section>

        <section className='col-6 d-flex gap-3 justify-content-end note-button-container'>
          <FaEye
            className='note-card-icons'
            onClick={(e) => {
              e.preventDefault();
              setShowPreview(note);
              setShowNoteForm(null);
              setCurrentNote(note)
            }}
          />
          <MdEdit
            className='note-card-icons'
            onClick={(e) => {
              e.stopPropagation();
              setCurrentNote(note);
              setShowNoteForm(true);
              setShowPreview(null);
            }} />
          <MdDeleteOutline
            className='note-card-icons'
            onClick={(e) => {
              e.stopPropagation();
              setModalShow(true);
            }}
          />
          <YesNoModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            onYes={handleYes}
            onNo={handleNo}
          />
        </section>
      </footer>
    </Card>
  );
};