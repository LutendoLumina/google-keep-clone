# Google Keep Clone — React

A fully functional Google Keep clone built with React and Vite. Designed to closely replicate the original Google Keep UI and feature set, including note management, sidebar navigation, search, dark mode, and reminders.

---

## Features

### Core
- **Create notes** with a title and body via an expandable form
- **Edit notes** by clicking a note card to open it in a modal
- **Delete notes** — moves notes to Trash (recoverable)
- **Archive notes** — moves notes to Archive with unarchive support
- **Masonry grid layout** — notes sized to their own content, Pinterest-style
- **List / Grid view toggle** in the navbar

### Navigation
- **Collapsible sidebar** — collapses to icon-only, expands on hover or menu click
- **Sidebar views** — Notes, Reminders, Archive, Bin, and custom label pages
- **Dynamic navbar title** — updates to match the active view (Keep / Reminders / Archive / Bin)

### Search (Custom Feature — No AI)
- **Global search** across Notes, Archive, and Bin simultaneously
- **Real-time filtering** on every keystroke
- **Keyword highlighting** — matched text is highlighted in yellow on results
- **Source badge** on each result showing which section it came from
- **"No matching results"** message with the search query displayed
- Clear button (×) to reset search instantly

### Reminders
- Set a reminder date and time on any note via the bell icon
- Reminder chip displayed on the note card with the set time
- Reminders view filters and shows only notes that have a reminder set
- Remove a reminder directly from the note card

### Dark Mode
- Full dark mode toggle via Settings dropdown in the navbar
- Smooth transition across all components
- Preference persisted in `localStorage` — survives page refresh

### Labels
- Create custom labels via the Edit Labels modal
- Labels appear as sidebar items with their own view page
- Delete labels with a hover-to-reveal delete icon

### Trash & Archive
- Trash shows restore and delete-forever actions on hover
- Archive shows unarchive action on hover
- Empty bin button to permanently clear all trashed notes

---

## Tech Stack

- **React 18** with Hooks (`useState`, `useEffect`, `useRef`)
- **Vite** for fast dev server and bundling
- **CSS Modules** per component (no CSS framework)
- **Material Symbols** (Google Icons) via CDN
- **uid** for unique note IDs

---

## React Concepts Used

| Concept | Where |
|---|---|
| `useState` | All state: notes, views, search, dark mode |
| `useEffect` | Dark mode persistence, click-outside detection |
| `useRef` | Textarea auto-resize, settings/apps dropdown outside click |
| State lifting | Search query, sidebar open, view toggle shared across components |
| Derived state | `filteredNotes` and `globalResults` computed from state, never stored |
| Conditional rendering | Active view, empty states, hover actions, dark mode text |
| Props as callbacks | `onMenuClick`, `onSearch`, `onViewToggle` passed down to children |

---

## Project Structure

```
src/
├── components/
│   ├── Navbars/
│   │   ├── Navbar.jsx
│   │   └── Navbar.css
│   ├── Sidebars/
│   │   ├── Sidebar.jsx
│   │   └── Sidebar.css
│   ├── Forms/
│   │   ├── Form.jsx
│   │   └── Form.css
│   ├── Notes/
│   │   ├── Notes.jsx
│   │   ├── Note.jsx
│   │   └── Notes.css
│   ├── Modals/
│   │   ├── Modal.jsx
│   │   └── Modal.css
│   ├── Labels/
│   │   ├── LabelsModal.jsx
│   │   └── LabelsModal.css
│   └── Views/
│       ├── RemindersView.jsx
│       ├── ArchiveView.jsx
│       ├── TrashView.jsx
│       ├── LabelsView.jsx
│       ├── SearchResultsView.jsx
│       └── HighlightedText.jsx
├── App.jsx
├── App.css
├── responsive.css
└── main.jsx
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## Key Design Decisions

**State lifting over local state** — shared state like `searchQuery`, `activeView`, `isDarkMode`, and `sidebarOpen` all live in `App.jsx` so sibling components can read and update them without prop drilling through unrelated components.

**Derived state over stored state** — `filteredNotes` and `globalResults` are computed on every render rather than stored in `useState`. This ensures they never go out of sync with the source arrays.

**CSS columns for masonry** — notes use CSS `columns` layout instead of CSS Grid or a library. Each note sizes to its own content independently, matching Google Keep's natural card heights.

**Two sources for sidebar open** — `menuOpen` (toggled by the hamburger) and `hovered` (mouse enter/leave) are combined with `||` so both can expand the sidebar independently without conflicting.