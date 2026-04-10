import { useEffect, useState } from "react";
import Navbar from "./components/Navbars/Navbar";
import Sidebar from "./components/Sidebars/Sidebar";
import Form from "./components/Forms/Form";
import Notes from "./components/Notes/Notes";
import Modal from "./components/Modals/Modal";
import RemindersView from "./components/Views/RemindersView";
import LabelsView from "./components/Views/LabelsView";
import ArchiveView from "./components/Views/ArchiveView";
import TrashView from "./components/Views/TrashView";
import LabelsModal from "./components/Labels/LabelsModal";
import SearchResultsView from "./components/Views/SearchResultsView";
import { uid } from "uid";

const NOTES = [];

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      return localStorage.getItem("isDarkMode") === "true";
    } catch {
      return false;
    }
  });
  const [notes, setNotes] = useState(NOTES);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [trashedNotes, setTrashedNotes] = useState([]);
  const [activeView, setActiveView] = useState("notes");
  const [selectedNote, setSelectedNote] = useState({});
  const [isModalOpen, setisModalOpen] = useState(false);
  const [labels, setLabels] = useState([]); // stores created labels
  const [isLabelsOpen, setIsLabelsOpen] = useState(false); // labels modal toggle

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
    try {
      localStorage.setItem("isDarkMode", String(isDarkMode));
    } catch {
      // ignore write errors (private mode / blocked storage)
    }
  }, [isDarkMode]);

  const addLabel = (label) => {
    setLabels((prev) => [...prev, { id: uid(), name: label }]);
  };

  const deleteLabel = (id) => {
    setLabels((prev) => prev.filter((l) => l.id !== id));
  };

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

  const globalResults = searchQuery
    ? [
        ...notes.map((n) => ({ ...n, source: "Notes" })),
        ...archivedNotes.map((n) => ({ ...n, source: "Archive" })),
        ...trashedNotes.map((n) => ({ ...n, source: "Bin" })),
      ].filter((note) => {
        const query = searchQuery.toLowerCase();
        return (
          note.title?.toLowerCase().includes(query) ||
          note.text?.toLowerCase().includes(query)
        );
      })
    : [];

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
    const note = notes.find((n) => n.id === id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setTrashedNotes((prev) => [...prev, note]);
  };

  const archiveNote = (id) => {
    const note = notes.find((n) => n.id === id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setArchivedNotes((prev) => [...prev, note]);
  };

  const unarchiveNote = (id) => {
    const note = archivedNotes.find((n) => n.id === id);
    setArchivedNotes((prev) => prev.filter((n) => n.id !== id));
    setNotes((prev) => [...prev, note]);
  };

  const restoreNote = (id) => {
    const note = trashedNotes.find((n) => n.id === id);
    setTrashedNotes((prev) => prev.filter((n) => n.id !== id));
    setNotes((prev) => [...prev, note]);
  };

  const permanentlyDelete = (id) => {
    setTrashedNotes((prev) => prev.filter((n) => n.id !== id));
  };

  // Empty entire trash
  const emptyTrash = () => setTrashedNotes([]);

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

  const removeReminder = (id) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, reminder: null } : note)),
    );
  };

  return (
    <div>
      <Navbar
        onMenuClick={() => setMenuOpen((prev) => !prev)}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        isListView={isListView}
        onViewToggle={() => setIsListView((prev) => !prev)}
        activeView={activeView}
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode((prev) => !prev)}
      />
      <div
        className={`sidebar-backdrop ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />
      <Sidebar
        expanded={sidebarOpen}
        onHoverExpand={() => setHovered(true)}
        onHoverCollapse={() => setHovered(false)}
        activeView={activeView}
        onViewChange={setActiveView}
        labels={labels}
        onEditLabels={() => setIsLabelsOpen(true)}
      />
      <LabelsModal
        isOpen={isLabelsOpen}
        onClose={() => setIsLabelsOpen(false)}
        labels={labels}
        addLabel={addLabel}
        deleteLabel={deleteLabel}
      />

      <main
        className={`main-content ${sidebarOpen ? "main-expanded" : "main-collapsed"}`}
      >
        {searchQuery ? (
          <SearchResultsView
            results={globalResults}
            searchQuery={searchQuery}
            toggleModal={toggleModal}
            setSelectedNote={setSelectedNote}
          />
        ) : (
          <>
            {activeView === "notes" && (
              <>
                <Form addNote={addNote} />
                <Notes
                  notes={filteredNotes}
                  searchQuery={searchQuery}
                  isListView={isListView}
                  deleteNote={deleteNote}
                  archiveNote={archiveNote}
                  toggleModal={toggleModal}
                  setSelectedNote={setSelectedNote}
                />
              </>
            )}
            {activeView === "reminders" && (
              <RemindersView
                notes={notes}
                searchQuery={searchQuery}
                isListView={isListView}
                deleteNote={deleteNote}
                archiveNote={archiveNote}
                removeReminder={removeReminder}
                toggleModal={toggleModal}
                setSelectedNote={setSelectedNote}
              />
            )}
            {activeView === "archive" && (
              <ArchiveView
                notes={archivedNotes}
                isListView={isListView}
                deleteNote={deleteNote}
                unarchiveNote={unarchiveNote}
                toggleModal={toggleModal}
                setSelectedNote={setSelectedNote}
              />
            )}
            {activeView === "trash" && (
              <TrashView
                notes={trashedNotes}
                searchQuery={searchQuery}
                isListView={isListView}
                restoreNote={restoreNote}
                permanentlyDelete={permanentlyDelete}
                emptyTrash={emptyTrash}
              />
            )}
            {activeView === "labels" && <LabelsView />}
          </>
        )}
      </main>

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
