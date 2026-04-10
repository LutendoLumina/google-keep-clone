import HighlightedText from "./HighlightedText";
import "../Notes/Notes.css";
import "./SearchResultsView.css";

const SearchResultsView = ({ results, searchQuery, toggleModal, setSelectedNote }) => {

  if (results.length === 0) {
    return (
      <div className="notes notes-empty">
        <div className="empty-view">
          <i className="material-symbols-outlined empty-icon">search</i>
          <p>No matching results for "{searchQuery}"</p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results">
      <p className="search-results-count">
        {results.length} result{results.length !== 1 ? "s" : ""} for "{searchQuery}"
      </p>
      <div className="notes notes--grid">
        {results.map(note => (
          <div
            key={note.id}
            className="note"
            onClick={() => { toggleModal(); setSelectedNote(note); }}
          >
            {/* Source badge — tells user which section it came from */}
            <span className="source-badge">{note.source}</span>

            <div className="title">
              <HighlightedText text={note.title || ""} query={searchQuery} />
            </div>
            <div className="text">
              <HighlightedText text={note.text || ""} query={searchQuery} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsView;