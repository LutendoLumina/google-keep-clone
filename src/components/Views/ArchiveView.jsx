import Note from "../Notes/Note";
import "../Notes/Notes.css";

const ArchiveView = ({ notes, isListView, deleteNote, unarchiveNote, toggleModal, setSelectedNote }) => (
  <div className="notes-view">
    {notes.length === 0 ? (
      <div className="notes notes-empty">
        <div className="empty-view">
          <i className="material-symbols-outlined empty-icon">archive</i>
          <p>Your archived notes appear here</p>
        </div>
      </div>
    ) : (
      <div className={isListView ? "notes notes--list" : "notes notes--grid"}>
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            deleteNote={deleteNote}
            archiveNote={unarchiveNote}   
            archiveIcon="unarchive"       
            archiveTooltip="Unarchive"
            toggleModal={toggleModal}
            setSelectedNote={setSelectedNote}
          />
        ))}
      </div>
    )}
  </div>
);

export default ArchiveView;