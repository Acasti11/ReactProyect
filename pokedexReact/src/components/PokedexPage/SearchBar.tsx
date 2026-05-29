import React from "react";
import "../../styles/nomalStyles/searchBar.css";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <section className="searchBar">
      <svg className="searchBar_icon" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" stroke="gray" strokeWidth="2" fill="none" />
        <line x1="16" y1="16" x2="22" y2="22" stroke="gray" strokeWidth="2" />
      </svg>
      <input
        type="text"
        id="busqueda"
        name="busqueda"
        placeholder="Pokemon name..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </section>
  );
};
