import React from 'react';
import { PokemonDetailDto } from '../../../application/dto/PokemonDto';
import '../../../../styles/nomalStyles/pokeinfo.css';
import '../../../../styles/nomalStyles/pokeType.css';

type Props = {
  evolutions: ReadonlyArray<PokemonDetailDto>;
};

export const EvolutionSection: React.FC<Props> = ({ evolutions }) => {
  return (
    <section className="poke_evolution">
      <h2 className="section_title">Evolution Chain</h2>
      <div className="evolution_chain">
        {evolutions.map((poke, index) => (
          <React.Fragment key={poke.id}>
            <div className="evolution_item">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`}
                alt={poke.name}
              />
              <span>{poke.name}</span>
            </div>
            {index < evolutions.length - 1 && (
              <div className="evolution_arrow">→</div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};
