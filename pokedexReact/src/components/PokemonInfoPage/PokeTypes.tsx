import React from "react";
import type * as Types from "../../types/PokemonType";
import { typeIcons, toTypeClass } from "../../utils/pokemon";
import "../../styles/nomalStyles/pokeType.css";
import "../../styles/nomalStyles/pokeinfo.css";

type Props = {
  pokemon: Types.Pokemon;
};

export const PokemonInfoTypes: React.FC<Props> = ({ pokemon }) => {
  return (
    <div className="poke_types">
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