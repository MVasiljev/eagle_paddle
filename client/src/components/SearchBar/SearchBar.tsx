import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Search icon
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search...",
}) => {
  const [query, setQuery] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Trigger onSearch with updated query
  };

  return (
    <div className="search-bar-container">
      {/* Search Icon */}
      <div className="search-actions">
        <FaSearch />
      </div>

      {/* Input Field */}
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
