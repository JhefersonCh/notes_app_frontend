/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import tokenService from "../../../shared/services/tokenService";
import noteService from "../../services/noteService";
import { NoteCard } from "../../components/noteCard/NoteCard";
import "./Home.css";
import { EmptyResponse } from "../../../shared/components/empty-response/EmptyResponse";
import { FaFilter, FaPlus } from "react-icons/fa";
import { NoteForm } from "../../components/noteForm/NoteForm";
import { NotePreview } from "../../components/notePreview/NotePreview";
import { MdClear } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { MultiSelect } from "react-multi-select-component";
import { CONTRADICTORY_TAGS, STATUS_OTIONS, TAG_OPTIONS } from "../../../shared/const";
import { Button, NavDropdown } from "react-bootstrap";

export const Home = () => {
  const [loadNotes, setLoadNotes] = useState(true);
  const [notes, setNotes] = useState([]);
  const [notesFiltered, setNotesFiltered] = useState([]);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [closingNoteForm, setClosingNoteForm] = useState(false);
  const [closingPreview, setClosingPreview] = useState(false);
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState('');

  const user = tokenService.getUser();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await noteService.getNotesByUserId(user.id);
        setNotes(data.data.notes);
        setNotesFiltered(data.data.notes);
      } catch (error) {
        return;
      }
    };
    fetchNotes();
  }, [loadNotes]);

  const handleCloseNoteForm = () => {
    setClosingNoteForm(true);
    setTimeout(() => {
      setShowNoteForm(false);
      setClosingNoteForm(false);
      setCurrentNote(null);
    }, 500);
  };

  const handleClosePreview = () => {
    setClosingPreview(true);
    setTimeout(() => {
      setShowPreview(false);
      setClosingPreview(false);
      setCurrentNote(null);
    }, 500);
  };

  const filterNotes = (searchTerm, tagFilters, status) => {
    const filteredNotes = notes.filter(note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) && (!status || note?.status === status) &&
      (tagFilters.length === 0 || tagFilters.every(tag =>
        note?.tags?.split(',').map(tag => tag.trim()).includes(tag.value)
      ))
    );
    setNotesFiltered(filteredNotes);
  };

  const updateDisabledOptions = (selectedTags) => {
    const updatedOptions = TAG_OPTIONS.map(option => {
      const contradictedTags = CONTRADICTORY_TAGS[option.value] || [];
      const isDisabled = contradictedTags.some(tag => selectedTags.some(selected => selected.value === tag));
      return { ...option, disabled: isDisabled };
    });
    return updatedOptions;
  };

  const clearFilters = () => {
    setStatus('');
    setTags([])
  }

  useEffect(() => {
    filterNotes(search, tags, status);
  }, [search, tags, notes, status]);

  return (
    <div
      className={
        `home-container p-0
        ${showNoteForm && !closingNoteForm ? "show-note-form" : ""}
        ${closingNoteForm ? "hide-note-form" : ""}
        ${showPreview && !closingPreview ? "show-preview" : ""}
        ${closingPreview ? "hide-preview" : ""}`
      }
    >
      <div className="third-column bg-black bg-opacity-25 position-relative">
        {showPreview && (
          <section>
            <MdClear
              title="Close"
              className="close-button"
              onClick={handleClosePreview}
            ></MdClear>

            <NotePreview
              setShowPreview={setShowPreview}
              note={currentNote}
              setCurrentNote={setCurrentNote}
            />
          </section>
        )}
      </div>
      <div className="first-column">
        <FaPlus
          title="Add note"
          className="add-note-button"
          onClick={() => {
            setShowNoteForm(true);
            setCurrentNote(null);
            setShowPreview(false);
          }}
        />

        <header className="d-flex justify-content-center">
          <h1 className="mb-4">{`Welcome, these are your notes.`}</h1>
        </header>

        <section className="row d-flex align-items-center">
          <div className="form-field-login mb-3 col-8">
            <div className='d-flex align-items-center'>
              <CiSearch className='field-icon' />
              <input
                type="text"
                id="title"
                className='w-100 input-with-icon'
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <NavDropdown
            title={<FaFilter style={{ fontSize: "25px", color: "inherit" }} />}
            className="text-light col-3"
            menuVariant="dark"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="text-center">
              <h3>Filters</h3>
            </header>
            <div className="m-3 d-flex flex-column gap-3">

              <MultiSelect
                options={updateDisabledOptions(tags)}
                value={tags}
                onChange={setTags}
                labelledBy="Select"
                hasSelectAll={false}
                overrideStrings={{
                  selectSomeItems: (
                    <span>
                      <span className="mx-3">Select tags</span>
                    </span>
                  ),
                }}
                className="dark"
              />

              <div className="d-flex flex-column">
                <select id="change-status" style={{ height: "2.5rem" }} className="dark text-center" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value=''>Select an state</option>
                  {STATUS_OTIONS.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <hr className="mt-0"/>
            <div className="text-end mx-3">
              <Button variant="secondary" onClick={clearFilters}>Clean filters</Button>
            </div>
          </NavDropdown>
        </section>

        <section
          className="section-grid"
          style={{
            gridTemplateColumns: `repeat(${showNoteForm || showPreview || !notes.length ? 1 : 3
              }, 1fr)`,
            gap: "16px",
          }}
        >
          {
            notesFiltered?.length ?
              notesFiltered.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  userId={user.id}
                  setLoadNotes={setLoadNotes}
                  loadNotes={loadNotes}
                  setCurrentNote={setCurrentNote}
                  setShowNoteForm={setShowNoteForm}
                  setShowPreview={setShowPreview}
                  isSelected={currentNote?.id === note.id}
                />
              )) : ''
          }
        </section>
        {
          !notesFiltered?.length
          && <EmptyResponse />
        }
      </div>

      <div className="second-column bg-black bg-opacity-25 position-relative">
        {showNoteForm && (
          <section>
            <MdClear
              title="Close"
              className="close-button"
              onClick={handleCloseNoteForm}
            ></MdClear>

            <NoteForm
              setShowNoteForm={setShowNoteForm}
              loadNotes={loadNotes}
              userId={user.id}
              currentNote={currentNote}
              setCurrentNote={setCurrentNote}
              setLoadNotes={setLoadNotes}
            />
          </section>
        )}
      </div>
    </div>
  );
};
