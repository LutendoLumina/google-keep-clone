import React, { useState } from "react";
import Navbar from "./components/Navbars/Navbar";
import Sidebar from "./components/Sidebars/Sidebar";
import Form from "./components/Forms/Form";
import Notes from "./components/Notes/Notes";
import Modal from "./components/Modals/Modal";

const NOTES = [];

const App = () => {
  const [notes, setNotes] = useState(NOTES);
  const [selectedNote, setSelectedNote] = useState({});
  const [isModalOpen, setisModalOpen] = useState(false);

  const addNote = (note) => {
    setNotes((prevNotes) => {
      return [...prevNotes, note];
    });
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => id !== note.id);
    });
  };

  const editNote = (editNote) => {
    setNotes((prevNotes) => {
      const newArray = prevNotes.map((note) => {
        if (editNote.id === note.id) {
          note.title = editNote.title;
          note.text = editNote.text;
        }
        return note;
      });
      return newArray;
    });
  };

  const toggleModal = () => {
    setisModalOpen((prevState) => {
      return !prevState;
    });
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <Form addNote={addNote} />
      <Notes
        notes={notes}
        deleteNote={deleteNote}
        toggleModal={toggleModal}
        setSelectedNote={setSelectedNote}
      />
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          selectedNote={selectedNote}
          toggleModal={toggleModal}
          editNote={editNote}
        />
      )}
    </div>
  );
};

export default App;
