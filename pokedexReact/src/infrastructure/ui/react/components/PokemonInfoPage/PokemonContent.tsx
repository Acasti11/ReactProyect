import type { PokemonDetailDto } from '../../../../../application/dto/PokemonDto';
import PokemonLeft from './PokemonLeft';
import PokemonRight from './PokemonRigth';
import { toTypeClass } from '../../../../../utils/pokemon';
import '../../../../../styles/nomalStyles/pokeinfo.css';
import '../../../../../styles/nomalStyles/pokeType.css';

type Props = {
  pokemon: PokemonDetailDto;
};

export const PokemonContent = ({ pokemon }: Props) => {
  return (
    <section className={`poke_content ${toTypeClass(pokemon.types[0] || '')}`}>
      <PokemonLeft pokemon={pokemon} />
      <PokemonRight pokemon={pokemon} />
    </section>
  );
};
