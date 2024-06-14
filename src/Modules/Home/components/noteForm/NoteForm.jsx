/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from 'react-bootstrap';
import { MultiSelect } from 'react-multi-select-component';

import './NoteForm.css';
import noteService from '../../services/noteService';
import { toast } from 'react-toastify';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { CONTRADICTORY_TAGS, TAG_OPTIONS } from '../../../shared/const';

export const NoteForm = ({ setLoadNotes, loadNotes, currentNote, userId, setCurrentNote }) => {
  const [title, setTitle] = useState('');
  const tagsArray = currentNote?.tags?.length ? currentNote?.tags.split(',') : [];
  const [tags, setTags] = useState([]);
  const contentRef = useRef('');

  const handleManageNote = async () => {
    if (!title || !contentRef.current.getContent()) {
      return toast.error('All fields are required.');
    }

    const note = {
      title,
      content: contentRef.current.getContent(),
      userId,
      tags: tags.map(tag => tag.value).join(',')
    };

    try {
      if (!currentNote?.id) {
        await noteService.createNote(note);
      } else {
        note.id = currentNote.id;
        await noteService.updateNote(note);
        setCurrentNote(null);
      }
      setLoadNotes(!loadNotes);
    } catch (error) {
      console.error('Error managing note:', error);
      toast.error('An error occurred while managing the note.');
    }
  };
  useEffect(() => {
    setTitle(currentNote?.title ?? '');
    setTags(tagsArray ? tagsArray.map(tag => ({ label: tag, value: tag })) : []);
  }, [currentNote]);

  const updateDisabledOptions = (selectedTags) => {
    const updatedOptions = TAG_OPTIONS.map(option => {
      const contradictedTags = CONTRADICTORY_TAGS[option.value] || [];
      const isDisabled = contradictedTags.some(tag => selectedTags.some(selected => selected.value === tag));
      return { ...option, disabled: isDisabled };
    });
    return updatedOptions;
  };

  return (
    <div className="note-form-container">
      <div className='d-flex justify-content-center mb-3'>
        <h1>{currentNote ? 'Edit note' : 'Add note'}</h1>
      </div>

      <form className='d-flex flex-column gap-2'>
        <div className="form-field-login">
          <label htmlFor="title" className='input-label mb-3'>Title</label>
          <div className='d-flex align-items-center'>
            <MdDriveFileRenameOutline className='field-icon' />
            <input
              type="text"
              id="title"
              className='w-100 input-with-icon'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <div className="form-field-login position-relative">
          <label htmlFor="tags" className='input-label mb-3'>Tags</label>
          <MultiSelect
            options={updateDisabledOptions(tags)}
            value={tags}
            onChange={setTags}
            labelledBy="Select"
            hasSelectAll={false}
            overrideStrings={{ selectSomeItems: 'Select tags' }}
            className="dark"
          />
        </div>

        <div className="form-field-login position-relative">
          <label htmlFor="content" className='input-label mb-3'>Content</label>
          <div className='d-flex align-items-center password'>
            <div className="editor-container">
              <Editor
                onInit={(_evt, editor) => contentRef.current = editor}
                initialValue={currentNote?.content ?? ''}
                apiKey='zihkwon6rwrhylq751dpeas0uczb7nflfp8jnnzfom1lbxkl'
                init={{
                  height: "250px",
                  skin: "oxide-dark",
                  content_css: "dark",
                  width: "100%",
                  plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
                  toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                }}
              />
            </div>
          </div>
        </div>

        <div className='mt-2 d-flex row'>
          <div className='col'>
            <Button variant="primary" onClick={handleManageNote} className='w-100 rounded-4'>{currentNote ? 'Update note' : 'Save note'}</Button>
          </div>
        </div>
      </form>
    </div>
  );
};
