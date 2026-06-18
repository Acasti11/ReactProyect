import React from 'react';
import { PokemonListItemDto } from '../../../application/dto/PokemonDto';
import { statMap } from '../../../../utils/pokemon';
import '../../../../styles/nomalStyles/pokeCard.css';
import '../../../../styles/nomalStyles/pokeType.css';

type Props = {
  pokemon: PokemonListItemDto;
};

export const Stats: React.FC<Props> = ({ pokemon }) => {
  return (
    <ul className="pokeCard_stats">
      {pokemon.stats.map((stat, idx) => (
        <li key={idx} className="pokeCard_stat">
          <span className="pokeCard_statLabel">
            {statMap[stat.name] || stat.name}
          </span>
          <span className="pokeCard_statValue">{stat.baseValue}</span>
          <progress
            className="pokeCard_statBar"
            value={stat.baseValue}
            max={255}
          />
        </li>
      ))}
    </ul>
  );
};
