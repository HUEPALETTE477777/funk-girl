import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query); 
  };

  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
      <div className="flex items-center relative w-full">
        <input
          type="search"
          className="p-3 w-full text-sm text-gray-400 bg-gray-50 border-none focus:outline-none m-2"
          placeholder="SEARCH BY GIRL NAME"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="p-3 text-sm font-medium h-full bg-pink-300 cursor-pointer">
          SEARCH
        </button>
      </div>
    </form>
  );
};

export default Search;
