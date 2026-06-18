import React from 'react';
import { PokemonDetailDto } from '../../../application/dto/PokemonDto';
import { typeIcons, toTypeClass } from '../../../../utils/pokemon';
import '../../../../styles/nomalStyles/pokeType.css';
import '../../../../styles/nomalStyles/pokeinfo.css';

type Props = {
  pokemon: PokemonDetailDto;
};

export const PokemonInfoTypes: React.FC<Props> = ({ pokemon }) => {
  return (
    <div className="poke_types">
      {pokemon.types.map((t, idx) => (
        <span
          key={idx}
          className={`pokeCard_type ${toTypeClass(t)}`}
        >
          {typeIcons[t] || '•'} {toTypeClass(t)}
        </span>
      ))}
    </div>
  );
};
