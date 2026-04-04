import React, { useState } from "react";

const Note = (props) => {

  const { toggleModal, note, setSelectedNote } = props;
  const [isHover, setIsHover] = useState(false);

  const noteClickHandler = () => {
    toggleModal();
    setSelectedNote(note);
  }

  const hoverOverHandler = () => {
    console.log("hover:", isHover);
    setIsHover(true);
    console.log("hover:", isHover);
  };

  const hoverOutHandler = () => {
    setIsHover(false);
  };

  const deleteHandler = () => {
    props.deleteNote(note.id);
  }

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
        <div className="tooltip" onClick={deleteHandler}>
          <i className="material-symbols-outlined hover small-icon">archive</i>
          <span className="tooltip-text">Archive</span>
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
