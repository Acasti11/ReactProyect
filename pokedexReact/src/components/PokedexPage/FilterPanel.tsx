import React, { useState } from "react";
import { toTypeClass } from "../../utils/pokemon";
import "../../styles/nomalStyles/filterPanel.css";
import "../../styles/nomalStyles/pokeType.css";

const STORAGE_KEY = "filter_collapsed";

type FilterPanelProps = {
  types: string[];
  selectedTypes: string[];
  onToggleType: (type: string) => void;
  onClear: () => void;
};

export const FilterPanel: React.FC<FilterPanelProps> = ({
  types,
  selectedTypes,
  onToggleType,
  onClear,
}) => {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored !== null ? stored === "true" : true;
    } catch {
      return true;
    }
  });

  const handleTogglePanel = (): void => {
    setCollapsed((previous) => {
      const next = !previous;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  };

  const toggleText = collapsed ? "☰" : "✕";
  const toggleTitle = collapsed ? "Abrir panel de filtros" : "Cerrar panel de filtros";

  return (
    <section id="filter_container" className={collapsed ? "collapsed" : ""}>
      <button id="filter_button" type="button" title={toggleTitle} onClick={handleTogglePanel}>
        {toggleText}
      </button>

      <button type="button" onClick={onClear}>
        Clear filters
      </button>

      {types.map((type) => {
        const normalizedType = type.toLowerCase();
        const isSelected = selectedTypes.includes(normalizedType);

        return (
          <button
            key={normalizedType}
            type="button"
            className={`type-button ${toTypeClass(normalizedType)} ${isSelected ? "active" : ""}`}
            onClick={() => onToggleType(normalizedType)}
          >
            {toTypeClass(normalizedType)}
          </button>
        );
      })}
    </section>
  );
};
