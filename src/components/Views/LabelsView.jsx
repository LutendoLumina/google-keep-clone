import { useState } from "react";

const LabelsView = () => {
  const [newLabel, setNewLabel] = useState("");

  return (
    <div className="labels-modal-overlay">
      <div className="labels-modal">
        <h3>Edit labels</h3>
        <div className="label-input-row">
          <i className="material-symbols-outlined">close</i>
          <input
            type="text"
            placeholder="Create new label"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
          />
          <i className="material-symbols-outlined">check</i>
        </div>
        <div className="label-done">
          <button>Done</button>
        </div>
      </div>
    </div>
  );
};
export default LabelsView;