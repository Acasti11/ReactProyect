import React from "react";
import type * as Types from "../../types/PokemonType";
import { statMap } from "../../utils/pokemon";
import "../../styles/nomalStyles/pokeCard.css";
import "../../styles/nomalStyles/pokeType.css";

type Props = {
  pokemon: Types.Pokemon;
};

export const Stats: React.FC<Props> = ({ pokemon }) => {
  return (
    <ul className="pokeCard_stats">
      {pokemon.stats.map((stat, idx) => (
        <li key={idx} className="pokeCard_stat">
          <span className="pokeCard_statLabel">
            {statMap[stat.stat.name] || stat.stat.name}
          </span>
          <span className="pokeCard_statValue">{stat.base_stat}</span>
          <progress
            className="pokeCard_statBar"
            value={stat.base_stat}
            max={255}
          />
        </li>
      ))}
    </ul>
  );
};
