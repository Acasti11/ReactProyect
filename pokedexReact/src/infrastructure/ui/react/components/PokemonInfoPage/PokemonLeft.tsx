import React from 'react';
import { PokemonDetailDto } from '../../../application/dto/PokemonDto';
import { Abilities } from './Abilities';
import { MovesSection } from './MovesSection';
import '../../../../styles/nomalStyles/pokeinfo.css';
import '../../../../styles/nomalStyles/pokeType.css';

interface Props {
  pokemon: PokemonDetailDto;
}

export default function PokemonLeft({ pokemon }: Props) {
  return (
    <article className="poke_left">
      <Abilities pokemon={pokemon} />
      <MovesSection pokemon={pokemon} title="TM / TR" type="tm" />
      <MovesSection pokemon={pokemon} title="Egg Moves" type="egg" />
      <MovesSection pokemon={pokemon} title="Tutor Moves" type="tutor" />
    </article>
  );
}
