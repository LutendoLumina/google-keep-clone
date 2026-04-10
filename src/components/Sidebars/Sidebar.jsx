import "./Sidebar.css";

const Sidebar = ({
  expanded,
  onHoverExpand,
  onHoverCollapse,
  activeView,
  onViewChange,
  labels,
  onEditLabels,
}) => {
  
  const staticItems = [
    { view: "notes", icon: "lightbulb", label: "Notes" },
    { view: "reminders", icon: "notifications", label: "Reminders" },
  ];

  const bottomItems = [
    { view: "archive", icon: "archive", label: "Archive" },
    { view: "trash", icon: "delete", label: "Trash" },
  ];

  return (
    <aside
      className={`sidebar ${expanded ? "sidebar--expanded" : "sidebar--collapsed"}`}
      onMouseEnter={onHoverExpand}
      onMouseLeave={onHoverCollapse}
    >
      {/* Notes + Reminders */}
      {staticItems.map((item) => (
        <div
          key={item.view}
          className={`sidebar-item ${activeView === item.view ? "sidebar-active-item" : ""}`}
          onClick={() => onViewChange(item.view)}
        >
          <i className="material-symbols-outlined">{item.icon}</i>
          <span className="sidebar-text">{item.label}</span>
        </div>
      ))}

      {/* Dynamic label items */}
      {labels.map((label) => (
        <div
          key={label.id}
          className={`sidebar-item ${activeView === label.name ? "sidebar-active-item" : ""}`}
          onClick={() => onViewChange(label.name)}
        >
          <i className="material-symbols-outlined">label</i>
          <span className="sidebar-text">{label.name}</span>
        </div>
      ))}

      {/* Edit labels - opens modal */}
      <div className="sidebar-item" onClick={onEditLabels}>
        <i className="material-symbols-outlined">edit</i>
        <span className="sidebar-text">Edit labels</span>
      </div>

      {/* Archive + Bin */}
      {bottomItems.map((item) => (
        <div
          key={item.view}
          className={`sidebar-item ${activeView === item.view ? "sidebar-active-item" : ""}`}
          onClick={() => onViewChange(item.view)}
        >
          <i className="material-symbols-outlined">{item.icon}</i>
          <span className="sidebar-text">{item.label}</span>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
