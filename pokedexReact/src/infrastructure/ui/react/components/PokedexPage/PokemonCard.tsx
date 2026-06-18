import React from 'react';
import { Link } from 'react-router-dom';
import { PokemonListItemDto } from '../../../application/dto/PokemonDto';
import { CardHeader } from './CardHeader';
import { CardImage } from './CardImage';
import { CardContent } from './CardContent';
import { toTypeClass } from '../../../../utils/pokemon';
import '../../../../styles/nomalStyles/pokeCard.css';
import '../../../../styles/nomalStyles/pokeType.css';

type Props = {
  pokemon: PokemonListItemDto;
};

export const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  return (
    <React.Fragment>
      <Link to={`/pokemon/${pokemon.name}`} className="card_link">
        <article id={pokemon.name} className={'pokeCard' + ' ' + toTypeClass(pokemon.types[0] || '')}>
          <CardHeader pokemon={pokemon} />
          <CardImage pokemon={pokemon} />
          <CardContent pokemon={pokemon} />
        </article>
      </Link>
    </React.Fragment>
  );
};
