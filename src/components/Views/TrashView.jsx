import { useState } from "react";
import "../Notes/Notes.css";

const TrashNote = ({ note, restoreNote, permanentlyDelete }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className="note"
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      {isHover && (
        <i className="material-symbols-outlined check-circle">check_circle</i>
      )}
      <div className="title">{note.title}</div>
      <div className="text">{note.text}</div>
      <div
        className="note-footer"
        style={{ visibility: isHover ? "visible" : "hidden" }}
      >
        <div className="tooltip">
          <i
            className="material-symbols-outlined hover small-icon"
            onClick={(e) => { e.stopPropagation(); restoreNote(note.id); }}
          >
            restore_from_trash
          </i>
          <span className="tooltip-text">Restore</span>
        </div>
        <div className="tooltip">
          <i
            className="material-symbols-outlined hover small-icon"
            onClick={(e) => { e.stopPropagation(); permanentlyDelete(note.id); }}
          >
            delete_forever
          </i>
          <span className="tooltip-text">Delete forever</span>
        </div>
      </div>
    </div>
  );
};

const TrashView = ({ notes, isListView, restoreNote, permanentlyDelete, emptyTrash }) => (
  <div className="notes-view">
    <div className="trash-header">
      <span>Notes in the Recycle Bin are deleted after 7 days.</span>
      <button className="empty-bin-btn" onClick={emptyTrash}>Empty bin</button>
    </div>
    {notes.length === 0 ? (
      <div className="notes notes-empty">
        <div className="empty-view">
          <i className="material-symbols-outlined empty-icon">delete</i>
          <p>No notes in Trash</p>
        </div>
      </div>
    ) : (
      <div className={isListView ? "notes notes--list" : "notes notes--grid"}>
        {notes.map((note) => (
          <TrashNote
            key={note.id}
            note={note}
            restoreNote={restoreNote}
            permanentlyDelete={permanentlyDelete}
          />
        ))}
      </div>
    )}
  </div>
);

export default TrashView;