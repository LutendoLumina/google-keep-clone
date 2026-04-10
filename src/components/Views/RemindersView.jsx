import Note from "../Notes/Note";
import "../Notes/Notes.css";

const RemindersView = ({ notes, isListView, deleteNote, archiveNote, removeReminder, toggleModal, setSelectedNote }) => {
  const reminderNotes = notes.filter(note => note.reminder?.date);  // 👈 only notes with reminders

  return (
    <div>
      {reminderNotes.length === 0 ? (
        <div className="notes notes-empty">
          <div className="empty-view">
            <i className="material-symbols-outlined empty-icon">notifications</i>
            <p>Notes with upcoming reminders appear here</p>
          </div>
        </div>
      ) : (
        <div className={`notes ${isListView ? "notes--list" : "notes--grid"}`}>
          {reminderNotes.map(note => (
            <Note
              key={note.id}
              note={note}
              deleteNote={deleteNote}
              archiveNote={archiveNote}
              removeReminder={removeReminder}
              toggleModal={toggleModal}
              setSelectedNote={setSelectedNote}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RemindersView;