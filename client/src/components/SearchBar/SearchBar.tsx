/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Search icon
import {
  SearchBarContainer,
  SearchInput,
  SearchIconContainer,
} from "./SearchBar.styles";

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
    <SearchBarContainer>
      {/* Search Icon */}
      <SearchIconContainer>
        <FaSearch />
      </SearchIconContainer>

      {/* Input Field */}
      <SearchInput
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;
