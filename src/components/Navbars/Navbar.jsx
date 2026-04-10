import { useState, useEffect, useRef } from "react";
import "./Navbar.css";

const Navbar = ({
  onMenuClick,
  searchQuery,
  onSearch,
  isListView,
  onViewToggle,
  activeView,
  isDarkMode,
  onDarkModeToggle,
}) => {
  // opening settings
  const [settingsOpen, setSettingOpen] = useState(false);
  const settingsRef = useRef(null);

  // opening google apps
  const [appsOpen, setAppsOpen] = useState(false);
  const appsRef = useRef(null);

  // activating search
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchInputRef = useRef(null);

  const titles = {
    notes: "Keep",
    reminders: "Reminders",
    archive: "Archive",
    trash: "Bin",
  };

  const getTitle = () => {
    if (titles[activeView]) return titles[activeView];
    return activeView;
  };

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

  // close google apps when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (appsRef.current && !appsRef.current.contains(event.target)) {
        setAppsOpen(false);
      }
    };
    if (appsOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [appsOpen]);

  return (
    <nav className={isSearchActive ? "navbar--search-active" : ""}>
      {/* left side */}
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
        <span className="logo-text">{getTitle()}</span>
      </div>

      {/* middle part (search) */}
      <div className="search-area">
        {isSearchActive && (
          <div className="tooltip">
            <i
              className="material-symbols-outlined hover"
              onClick={() => {
                setIsSearchActive(false);
                searchInputRef.current?.blur();
              }}
            >
              arrow_back
            </i>
            <span className="tooltip-text">Back</span>
          </div>
        )}
        <div className="tooltip">
          <i className="material-symbols-outlined hover">search</i>
          <span className="tooltip-text">Search</span>
        </div>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          onFocus={() => setIsSearchActive(true)}
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

      {/* right side (icons) */}
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
          <i className="material-symbols-outlined hover" onClick={onViewToggle}>
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
              <p
                onClick={() => {
                  onDarkModeToggle?.();
                  setSettingOpen(false);
                }}
              >
                {isDarkMode ? "Disable dark mode" : "Enable dark mode"}
              </p>
              <p>Send feedback</p>
              <p>Help</p>
              <p>App downloads</p>
              <p>Keyboard shortcuts</p>
            </div>
          )}
        </div>
        <div className="tooltip apps-wrapper" ref={appsRef}>
          <i
            className="material-symbols-outlined hover"
            onClick={() => setAppsOpen((prev) => !prev)}
          >
            apps
          </i>
          <span className="tooltip-text">Google apps</span>

          {appsOpen && (
            <div className="apps-dropdown">
              <div className="apps-grid">
                {[
                  { name: "Search", color: "#4285F4", letter: "G" },
                  { name: "Maps", color: "#34A853", letter: "M" },
                  { name: "YouTube", color: "#FF0000", letter: "▶" },
                  { name: "Gmail", color: "#EA4335", letter: "M" },
                  { name: "Drive", color: "#FBBC05", letter: "△" },
                  { name: "Calendar", color: "#1A73E8", letter: "31" },
                  { name: "Meet", color: "#00897B", letter: "▶" },
                  { name: "Photos", color: "#F57C00", letter: "⊕" },
                  { name: "Docs", color: "#4285F4", letter: "≡" },
                ].map((app) => (
                  <div key={app.name} className="app-item">
                    <div
                      className="app-icon"
                      style={{ backgroundColor: app.color }}
                    >
                      {app.letter}
                    </div>
                    <span className="app-name">{app.name}</span>
                  </div>
                ))}
              </div>
              <div className="apps-footer">
                <button className="more-google-btn">More from Google</button>
              </div>
            </div>
          )}
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
