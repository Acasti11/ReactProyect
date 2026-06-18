import type { PokemonDetailDto } from '../../../../../application/dto/PokemonDto';
import { PokemonInfoTypes } from './PokeTypes';
import { PokemonInfo } from './PokemonInfo';
import { EvolutionSection } from './PokemonEvolution';
import { toTypeClass } from '../../../../../utils/pokemon';
import '../../../../../styles/nomalStyles/pokeType.css';
import '../../../../../styles/nomalStyles/pokeinfo.css';

type Props = {
  pokemon: PokemonDetailDto;
  evolutions: ReadonlyArray<PokemonDetailDto>;
};

export const PokemonHeader = ({ pokemon, evolutions }: Props) => {
  return (
    <header
      id="poke_header"
      className={`poke_header ${toTypeClass(pokemon.types[0] || '')}`}
    >
      <h1 className="poke_name">{pokemon.name}</h1>
      <PokemonInfoTypes pokemon={pokemon} />
      <PokemonInfo pokemon={pokemon} />
      <EvolutionSection evolutions={evolutions} />
    </header>
  );
};
