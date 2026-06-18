import type { PokemonDetailDto } from '../../../../../application/dto/PokemonDto';
import { Stats } from './Stats';
import { MovesTable } from './MovesTable';
import '../../../../../styles/nomalStyles/pokeinfo.css';
import '../../../../../styles/nomalStyles/pokeType.css';

interface Props {
  pokemon: PokemonDetailDto;
}

export default function PokemonRight({ pokemon }: Props) {
  return (
    <article className="poke_right">
      <Stats pokemon={pokemon} />
      <MovesTable pokemon={pokemon} />
    </article>
  );
}
