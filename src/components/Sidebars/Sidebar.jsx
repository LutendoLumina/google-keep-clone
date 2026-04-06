import "./Sidebar.css";

const Sidebar = ({ expanded, onHoverExpand, onHoverCollapse }) => {
  return (
    <aside
      className={`sidebar ${expanded ? "sidebar--expanded" : "sidebar--collapsed"}`}
      onMouseEnter={onHoverExpand}
      onMouseLeave={onHoverCollapse}
    >
      <div className="sidebar-active-item">
        <i className="material-symbols-outlined hover active">lightbulb</i>
        <span className="sidebar-text">Notes</span>
      </div>
      <div className="sidebar-item">
        <i className="material-symbols-outlined hover">notifications</i>
        <span className="sidebar-text">Reminders</span>
      </div>
      <div className="sidebar-item">
        <i className="material-symbols-outlined hover">edit</i>
        <span className="sidebar-text">Edit Labels</span>
      </div>
      <div className="sidebar-item">
        <i className="material-symbols-outlined hover">archive</i>
        <span className="sidebar-text">Archive</span>
      </div>
      <div className="sidebar-item">
        <i className="material-symbols-outlined hover">delete</i>
        <span className="sidebar-text">Bin</span>
      </div>
    </aside>
  );
};

export default Sidebar;
