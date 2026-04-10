import { useState } from "react";
import "./LabelsModal.css";

const LabelsModal = ({ isOpen, onClose, labels, addLabel, deleteLabel }) => {
  const [newLabel, setNewLabel] = useState("");
  const [hoveredId, setHoveredId] = useState(null);

  if (!isOpen) return null; 

  const handleAdd = () => {
    if (newLabel.trim()) {
      addLabel(newLabel.trim());
      setNewLabel("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();  // pressing Enter also creates the label
  };

  return (
    <div className="labels-overlay" onClick={onClose}>
      <div className="labels-modal" onClick={(e) => e.stopPropagation()}>  {/* stop click going to overlay */}

        <h3 className="labels-title">Edit labels</h3>

        {/* Create new label row */}
        <div className="label-input-row">
          <i
            className="material-symbols-outlined label-icon-btn"
            onClick={() => setNewLabel("")}  // X clears the input
          >
            close
          </i>
          <input
            type="text"
            placeholder="Create new label"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <i
            className="material-symbols-outlined label-icon-btn"
            onClick={handleAdd}   // tick confirms creation
          >
            check
          </i>
        </div>

        {/* Existing labels list */}
        {labels.map((label) => (
          <div
            key={label.id}
            className="label-row"
            onMouseEnter={() => setHoveredId(label.id)}   // track hover per label
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Label icon → turns to delete on hover */}
            <i
              className="material-symbols-outlined label-icon-btn"
              onClick={() => hoveredId === label.id && deleteLabel(label.id)}
            >
              {hoveredId === label.id ? "delete" : "label"}  {/* swap icon on hover */}
            </i>
            <span className="label-name">{label.name}</span>
            <i className="material-symbols-outlined label-icon-btn">edit</i>
          </div>
        ))}

        {/* Done button */}
        <div className="labels-footer">
          <button className="labels-done-btn" onClick={onClose}>Done</button>
        </div>

      </div>
    </div>
  );
};

export default LabelsModal;