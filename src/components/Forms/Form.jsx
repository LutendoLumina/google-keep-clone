import React, { useState, useRef, useEffect } from "react";
import "./Form.css";
import { uid } from "uid";

const Form = (props) => {
  
  const { edit, selectedNote, toggleModal, editNote } = props;
  const [title, setTitle] = useState((edit && selectedNote.title) || "");
  const [text, setText] = useState((edit && selectedNote.text) || "");
  const [isActiveForm, setIsActiveForm] = useState(edit);
  const [editedTime, setEditedTime] = useState(
    edit
      ? new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : null,
  );

  const [reminder, setReminder] = useState(
    (edit && selectedNote.reminder) || null,
  );
  const [reminderPickerOpen, setReminderPickerOpen] = useState(false);

  const titleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = "auto";
      titleRef.current.style.height = titleRef.current.scrollHeight + "px";
    }
    if (textRef.current) {
      textRef.current.style.height = "auto";
      textRef.current.style.height = textRef.current.scrollHeight + "px";
    }
  }, []);

  const autoResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

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
        reminder,
      };

      props.addNote(note);

      setTitle("");
      setText("");
      setIsActiveForm(false);

      // Reset on submit
      setReminder(null);
      setReminderPickerOpen(false);

      if (titleRef.current) titleRef.current.style.height = "auto";
      if (textRef.current) textRef.current.style.height = "auto";
    } else {
      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setEditedTime(time);
      props.editNote({
        id: selectedNote.id,
        title,
        text,
      });
      toggleModal();
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
            <textarea
              ref={titleRef}
              onChange={titleChangeHandler}
              onInput={autoResize}
              value={title}
              className="note-title"
              placeholder="Title"
              rows={1}
            />
          )}
          <textarea
            ref={textRef}
            onChange={textChangeHandler}
            onInput={autoResize}
            value={text}
            className="note-text"
            placeholder="Take a note..."
            rows={1}
          />
          {isActiveForm ? (
            <div className="form-actions">
              <div className="icons">

                <div className="reminder-wrapper">
                  <div className="tooltip">
                    <i
                      className="material-symbols-outlined hover small-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setReminderPickerOpen((prev) => !prev);
                      }}
                    >
                      add_alert
                    </i>
                    <span className="tooltip-text">Remind me</span>
                  </div>

                  {reminderPickerOpen && (
                    <div
                      className="reminder-picker"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="reminder-picker-header">
                        <i
                          className="material-symbols-outlined reminder-back"
                          onClick={() => setReminderPickerOpen(false)}
                        >
                          arrow_back
                        </i>
                        <span>Select date and time</span>
                      </div>

                      <select
                        className="reminder-select"
                        value={reminder?.date || ""}
                        onChange={(e) =>
                          setReminder((prev) => ({
                            ...prev,
                            date: e.target.value,
                          }))
                        }
                      >
                        <option value="">Select date</option>
                        <option value="Today">
                          {new Date().toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </option>
                        <option value="Tomorrow">
                          {new Date(Date.now() + 86400000).toLocaleDateString(
                            "en-GB",
                            { day: "numeric", month: "short", year: "numeric" },
                          )}
                        </option>
                      </select>

                      <select
                        className="reminder-select"
                        value={reminder?.time || ""}
                        onChange={(e) =>
                          setReminder((prev) => ({
                            ...prev,
                            time: e.target.value,
                          }))
                        }
                      >
                        <option value="">Select time</option>
                        <option value="08:00">08:00</option>
                        <option value="09:00">09:00</option>
                        <option value="12:00">12:00</option>
                        <option value="17:30">17:30</option>
                        <option value="20:00">20:00</option>
                      </select>

                      <select className="reminder-select">
                        <option>Doesn't repeat</option>
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                      </select>

                      <div className="reminder-picker-footer">
                        <button
                          className="reminder-save-btn"
                          onClick={() => setReminderPickerOpen(false)}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  )}
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
              <div className="form-button">
                {edit && editedTime && (
                  <span className="edited-time">Edited {editedTime}</span>
                )}
                <button type="submit" className="close-btn">
                  Close
                </button>
              </div>
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
