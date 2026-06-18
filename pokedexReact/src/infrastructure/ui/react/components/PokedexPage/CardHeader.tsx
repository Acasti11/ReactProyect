import React from 'react';
import { PokemonListItemDto } from '../../../application/dto/PokemonDto';
import '../../../../styles/nomalStyles/pokeCard.css';
import '../../../../styles/nomalStyles/pokeType.css';

type Props = {
  pokemon: PokemonListItemDto;
};

export const CardHeader: React.FC<Props> = ({ pokemon }) => {
  return (
    <header className="pokeCard_header">
      <h2 className="pokeCard_name">{pokemon.name}</h2>
      <p className="pokeCard_number">#{pokemon.id.toString().padStart(3, '0')}</p>
    </header>
  );
};
