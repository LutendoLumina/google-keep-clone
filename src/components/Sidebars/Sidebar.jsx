import "./Sidebar.css";

const Sidebar = () => {
    return (

        <aside className="sidebar">

            <div className="sidebar-item">
                <i className="material-symbols-outlined hover active">lightbulb</i>
                <span className="sidebar-text">Notes</span>
            </div>
            <div className="sidebar-item">
                <i className="material-symbols-outlined hover">notifications</i>
                <span className="sidebar-text">Reminders</span>
            </div>
            <div className="sidebar-item">
                <i className="material-symbols-outlined hover">edit</i>
                <span className="sidebar-text">Notes</span>
            </div>
            <div className="sidebar-item">
                <i className="material-symbols-outlined hover">archive</i>
                <span className="sidebar-text">Archive</span>
            </div>
            <div className="sidebar-item">
                <i className="material-symbols-outlined hover">delete</i>
                <span className="sidebar-text">Trash</span>
            </div>

        </aside>
    )
}

export default Sidebar;