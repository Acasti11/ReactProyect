import React from 'react';
import { PokemonDetailDto } from '../../../application/dto/PokemonDto';
import { StatsChartCanvas } from './StartChartCanvas';
import '../../../../styles/nomalStyles/pokeinfo.css';
import '../../../../styles/nomalStyles/pokeType.css';

type Props = {
  pokemon: PokemonDetailDto;
};

export const Stats: React.FC<Props> = ({ pokemon }) => {
  return (
    <section className="poke_stats">
      <h2 className="section_title">Stats</h2>
      <StatsChartCanvas pokemon={pokemon} />
      <div className="stats_values">
        <div className="stat_item">
          PS:
          <span>{pokemon.stats[0]?.baseValue}</span>
        </div>
        <div className="stat_item">
          Attack:
          <span>{pokemon.stats[1]?.baseValue}</span>
        </div>
        <div className="stat_item">
          Defense:
          <span>{pokemon.stats[2]?.baseValue}</span>
        </div>
        <div className="stat_item">
          Sp. Atk:
          <span>{pokemon.stats[3]?.baseValue}</span>
        </div>
        <div className="stat_item">
          Speed:
          <span>{pokemon.stats[5]?.baseValue}</span>
        </div>
      </div>
    </section>
  );
};
