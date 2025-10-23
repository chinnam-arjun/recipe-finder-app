import React, { useState } from 'react'

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim() !== '') {
      onSearch(query);
      setQuery('')
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
      <input
        type="text"
        value={query}
        placeholder="Search for a recipe"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        style={{ padding: '10px', width: '300px' }}
      />
      <button onClick={handleSearch} style={{ padding: '10px', marginLeft: '10px'}}>🔍</button>
    </div>
  );
};

export default SearchBar;
