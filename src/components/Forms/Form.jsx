import React, { useState } from "react";
import "./Form.css";
import { uid } from "uid";

const Form = (props) => {
  const { edit, selectedNote, toggleModal, editNote } = props;
  const [title, setTitle] = useState((edit && selectedNote.title) || "");
  const [text, setText] = useState((edit && selectedNote.text) || "");
  const [isActiveForm, setIsActiveForm] = useState(edit);

  const titleChangeHandler = (event) => setTitle(event.target.value);
  const textChangeHandler = (event) => {
    setText(event.target.value);
    setIsActiveForm(true);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (!edit) {
      const note = {
        id: uid(),
        title,
        text,
      };

      props.addNote(note);

      setTitle("");
      setText("");

      setIsActiveForm(false);
    } 
    else {
      props.editNote({
        id: selectedNote.id,
        title,
        text
      })
      toggleModal()
    }
  };

  const formClickHandler = () => {
    setIsActiveForm(true);
  };

  return (
    <div>
      <div className="form-container active-form" onClick={formClickHandler}>
        <form
          onSubmit={submitFormHandler}
          className={isActiveForm ? "form" : ""}
        >
          {isActiveForm && (
            <input
              onChange={titleChangeHandler}
              value={title}
              className="note-title"
              type="text"
              placeholder="Title"
            />
          )}
          <input
            onChange={textChangeHandler}
            value={text}
            className="note-text"
            type="text"
            placeholder="Text"
          />
          {isActiveForm ? (
            <div className="form-actions">
              <div className="icons">
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
                  <i className="material-symbols-outlined hover small-icon">
                    palette
                  </i>
                  <span className="tooltip-text">Change color</span>
                </div>
                <div className="tooltip">
                  <i className="material-symbols-outlined hover small-icon">
                    image
                  </i>
                  <span className="tooltip-text">Add Image</span>
                </div>
                <div className="tooltip">
                  <i className="material-symbols-outlined hover small-icon">
                    archive
                  </i>
                  <span className="tooltip-text">Archive</span>
                </div>
                <div className="tooltip">
                  <i className="material-symbols-outlined hover small-icon">
                    more_vert
                  </i>
                  <span className="tooltip-text">More</span>
                </div>
                <div className="tooltip">
                  <i className="material-symbols-outlined hover small-icon">
                    undo
                  </i>
                  <span className="tooltip-text">Undo</span>
                </div>
                <div className="tooltip">
                  <i className="material-symbols-outlined hover small-icon">
                    redo
                  </i>
                  <span className="tooltip-text">Redo</span>
                </div>
              </div>

              <button type="submit" className="close-btn">
                Close
              </button>
            </div>
          ) : (
            <div className="form-actions">
              <div className="tooltip">
                <i className="material-symbols-outlined hover">check_box</i>
                <span className="tooltip-text">New List</span>
              </div>
              <div className="tooltip">
                <i className="material-symbols-outlined hover">brush</i>
                <span className="tooltip-text">New Drawing</span>
              </div>
              <div className="tooltip">
                <i className="material-symbols-outlined hover">image</i>
                <span className="tooltip-text">New Image</span>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;
