import React from 'react';
import { DreamTeamPokemonDto } from '../../../application/dto/DreamTeamDto';

type Props = {
  pokemon: DreamTeamPokemonDto;
};

export const DreamThumbnail: React.FC<Props> = ({ pokemon }) => {
  return (
    <img
      className="dream-thumb"
      src={pokemon.spriteUrl}
      alt={pokemon.name}
      title={pokemon.name}
    />
  );
};
