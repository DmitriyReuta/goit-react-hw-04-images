import React, { useState } from "react";

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(query);
    setQuery("");
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <button type="submit">
          <span>Search</span>
        </button>
        <input
          placeholder="Search images and photos"
          value={query}
          onChange={handleQueryChange}
        />
      </form>
    </header>
  );
};