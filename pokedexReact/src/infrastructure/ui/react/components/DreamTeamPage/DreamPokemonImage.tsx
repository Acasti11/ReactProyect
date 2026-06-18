import React from 'react';
import { DreamTeamPokemonDto } from '../../../application/dto/DreamTeamDto';

type Props = {
  pokemon: DreamTeamPokemonDto;
  index: number;
};

export const DreamPokemonImage: React.FC<Props> = ({ pokemon, index }) => {
  return (
    <img
      className={`dream-pokemon dream-pokemon--${index + 1}`}
      src={pokemon.spriteUrl}
      alt={pokemon.name}
      title={pokemon.name}
    />
  );
};
