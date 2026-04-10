const HighlightedText = ({ text, query }) => {
  if (!query || !text) return <span>{text}</span>;

  // Split text at every occurrence of the query (case insensitive)
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  
  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={index} className="highlight">{part}</mark> 
        ) : (
          <span key={index}>{part}</span>                     
        )
      )}
    </span>
  );
};

export default HighlightedText;