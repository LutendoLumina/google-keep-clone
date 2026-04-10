import "./Notes.css";
import Note from "./Note";

const Notes = (props) => {
  const {
    notes,
    searchQuery,
    isListView,
    deleteNote,
    archiveNote,
    toggleModal,
    setSelectedNote,
  } = props;

  if (notes.length === 0) {
    return (
      <div className="notes notes-empty">
        {searchQuery ? (
          <div className="empty-view">
            <i className="material-symbols-outlined empty-icon">search</i>
            <p>No matching results for "{searchQuery}"</p>
          </div>
        ) : (
          <div className="empty-view">
            <i className="material-symbols-outlined empty-icon">lightbulb_2</i>
            <p>Notes you add appear here.</p>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className={isListView ? "notes notes--list" : "notes notes--grid"}>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          deleteNote={deleteNote}
          archiveNote={archiveNote}
          toggleModal={toggleModal}
          setSelectedNote={setSelectedNote}
        />
      ))}
    </div>
  );
};

export default Notes;
