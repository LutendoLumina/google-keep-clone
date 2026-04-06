import "./Notes.css";
import Note from "./Note";

const Notes = (props) => {
  const {
    notes,
    searchQuery,
    isListView,
    deleteNote,
    toggleModal,
    setSelectedNote,
  } = props;

  if (notes.length === 0) {
    return (
      <div className="notes">
        {searchQuery ? (
          <p>No matching results for "{searchQuery}"</p>
        ) : (
          <p>Notes you add appear here.</p>
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
          toggleModal={toggleModal}
          setSelectedNote={setSelectedNote}
        />
      ))}
    </div>
  );
};

export default Notes;
