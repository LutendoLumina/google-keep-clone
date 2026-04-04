import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <div className="logo-area">
        <div className="tooltip">
          <i className="material-symbols-outlined hover">menu</i>
          <span className="tooltip-text">Main Menu</span>
        </div>
        <img
          src="src/assets/google-keep-logo.png"
          className="logo"
          alt="Google Keep Logo"
        />
        <span className="logo-text">Keep</span>
      </div>

      <div className="search-area">
        <div className="tooltip">
          <i className="material-symbols-outlined hover">search</i>
          <span className="tooltip-text">Search</span>
        </div>
        <input type="text" placeholder="Search" />
      </div>

      <div className="profile-actions-area">
        <div className="tooltip">
          <i className="material-symbols-outlined hover">refresh</i>
          <span className="tooltip-text">Refresh</span>
        </div>
        <div className="tooltip">
          <i className="material-symbols-outlined hover">view_agenda</i>
          <span className="tooltip-text">List view</span>
        </div>
        <div className="tooltip">
          <i className="material-symbols-outlined hover">settings</i>
          <span className="tooltip-text">Settings</span>
        </div>
        <div className="tooltip">
          <i className="material-symbols-outlined hover">apps</i>
          <span className="tooltip-text">Google apps</span>
        </div>
        <div className="tooltip">
          <i className="material-symbols-outlined hover">account_circle</i>
          <span className="tooltip-text">Google Account</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
