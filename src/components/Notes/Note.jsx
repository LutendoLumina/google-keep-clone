import React, { useState } from "react";

const Note = (props) => {
  const { toggleModal, note, setSelectedNote, archiveIcon, archiveTooltip } = props;
  const [isHover, setIsHover] = useState(false);

  const noteClickHandler = () => {
    toggleModal();
    setSelectedNote(note);
  };

  const hoverOverHandler = () => {
    setIsHover(true);
  };

  const hoverOutHandler = () => {
    setIsHover(false);
  };

  const archiveHandler = (e) => {
    e.stopPropagation();
    props.archiveNote(note.id);
  };

  const deleteHandler = (e) => {
    e.stopPropagation();
    props.deleteNote(note.id);
  };

  return (
    <div
      className="note"
      id={note.id}
      onClick={noteClickHandler}
      onMouseOver={hoverOverHandler}
      onMouseOut={hoverOutHandler}
    >
      {isHover && (
        <i className="material-symbols-outlined check-circle">check_circle</i>
      )}
      <div className="title">{note.title}</div>
      <div className="text">{note.text}</div>
      {note.reminder?.date && (
        <div className="reminder-chip">
          <i className="material-symbols-outlined reminder-chip-icon">
            task_alt
          </i>
          <span>Today, {note.reminder.time}</span>
          <i
            className="material-symbols-outlined reminder-chip-close"
            onClick={(e) => {
              e.stopPropagation();
              props.removeReminder?.(note.id);
            }}
          >
            close
          </i>
        </div>
      )}
      <div
        className="note-footer"
        style={{ visibility: isHover ? "visible" : "hidden" }}
      >
        <div className="tooltip">
          <i className="material-symbols-outlined hover small-icon">
            add_alert
          </i>
          <span className="tooltip-text">Remind me</span>
        </div>
        <div className="tooltip">
          <i className="material-symbols-outlined hover small-icon">
            person_add
          </i>
          <span className="tooltip-text">Collaborator</span>
        </div>
        <div className="tooltip">
          <i className="material-symbols-outlined hover small-icon">palette</i>
          <span className="tooltip-text">Change color</span>
        </div>
        <div className="tooltip">
          <i className="material-symbols-outlined hover small-icon">image</i>
          <span className="tooltip-text">Add Image</span>
        </div>
        <div className="tooltip" onClick={archiveHandler}>
          <i className="material-symbols-outlined hover small-icon">{archiveIcon || "archive"}</i>
          <span className="tooltip-text">{archiveTooltip || "Archive"}</span>
        </div>
        <div className="tooltip" onClick={deleteHandler}>
          <i className="material-symbols-outlined hover small-icon">delete</i>
          <span className="tooltip-text">Delete Note</span>
        </div>
        <div className="tooltip">
          <i className="material-symbols-outlined hover small-icon">
            more_vert
          </i>
          <span className="tooltip-text">More</span>
        </div>
      </div>
    </div>
  );
};

export default Note;
