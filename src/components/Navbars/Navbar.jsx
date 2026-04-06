import { useState, useEffect, useRef } from "react";
import "./Navbar.css";

const Navbar = ({ onMenuClick, searchQuery, onSearch, isListView, onViewToggle }) => {
  const [settingsOpen, setSettingOpen] = useState(false);
  const settingsRef = useRef(null);

  // close settings when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setSettingOpen(false); // clicked outside -> close
      }
    };

    if (settingsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [settingsOpen]);

  return (
    <nav>
      <div className="logo-area">
        <div className="tooltip">
          <i className="material-symbols-outlined hover" onClick={onMenuClick}>
            menu
          </i>
          <span className="tooltip-text">Main Menu</span>
        </div>
        <a href="#">
          <img
            src="src/assets/google-keep-logo.png"
            className="logo"
            alt="Google Keep Logo"
            onClick={() => onSearch("")}
          />
        </a>
        <a href="#" className="logo-text" onClick={() => onSearch("")}>
          Keep
        </a>
      </div>

      <div className="search-area">
        <div className="tooltip">
          <i className="material-symbols-outlined hover">search</i>
          <span className="tooltip-text">Search</span>
        </div>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
        />
        {searchQuery && (
          <i
            className="material-symbols-outlined hover"
            onClick={() => onSearch("")}
          >
            close
          </i>
        )}
      </div>

      <div className="profile-actions-area">
        <div className="tooltip">
          <i
            className="material-symbols-outlined hover"
            onClick={() => window.location.reload()}
          >
            refresh
          </i>
          <span className="tooltip-text">Refresh</span>
        </div>
        <div className="tooltip">
          <i
            className="material-symbols-outlined hover"
            onClick={onViewToggle}
          >
            {isListView ? "view_cozy" : "view_agenda"}
          </i>
          <span className="tooltip-text">
            {isListView ? "Grid view" : "List view"}
          </span>
        </div>
        <div className="tooltip settings-wrapper" ref={settingsRef}>
          <i
            className="material-symbols-outlined hover"
            onClick={() => setSettingOpen((prev) => !prev)}
          >
            settings
          </i>
          <span className="tooltip-text">Settings</span>
          {settingsOpen && (
            <div className="settings-dropdown">
              <p>Settings</p>
              <p>Enable dark theme</p>
              <p>Send feedback</p>
              <p>Help</p>
              <p>App downloads</p>
              <p>Keyboard shortcuts</p>
            </div>
          )}
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
};

export default Navbar;
