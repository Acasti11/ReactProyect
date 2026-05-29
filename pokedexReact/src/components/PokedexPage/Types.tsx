import React from "react";
import type * as Types from "../../types/PokemonType";
import { typeIcons, toTypeClass } from "../../utils/pokemon";
import "../../styles/nomalStyles/pokeType.css";
import "../../styles/nomalStyles/pokeCard.css";

type Props = {
  pokemon: Types.Pokemon;
};

export const PokemonTypes: React.FC<Props> = ({ pokemon }) => {
  return (
    <div className="pokeCard_types">
      {pokemon.types.map((t, idx) => (
        <span
          key={idx}
          className={`pokeCard_type ${toTypeClass(t.type.name)}`}
        >
          {typeIcons[t.type.name] || "•"} {toTypeClass(t.type.name)}
        </span>
      ))}
    </div>
  );
};
