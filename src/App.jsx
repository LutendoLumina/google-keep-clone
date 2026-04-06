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

  //NAVBAR components
  const [searchQuery, setSearchQuery] = useState("");
  const [isListView, setIsListView] = useState(false);

  const filteredNotes = notes.filter((note) => {
    const query = searchQuery.toLowerCase();
    return (
      note.title?.toLowerCase().includes(query) ||
      note.text?.toLowerCase().includes(query)
    );
  });

  // SIDEBAR components
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const sidebarOpen = menuOpen || hovered;

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
      <Navbar
        onMenuClick={() => setMenuOpen((prev) => !prev)}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        isListView={isListView}
        onViewToggle={() => setIsListView(prev => !prev)}
      />
      <Sidebar
        expanded={sidebarOpen}
        onHoverExpand={() => setHovered(true)}
        onHoverCollapse={() => setHovered(false)}
      />
      <Form addNote={addNote} />
      <Notes
        notes={filteredNotes}
        searchQuery={searchQuery}
        isListView={isListView}
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
