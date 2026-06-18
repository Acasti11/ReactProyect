import { useParams } from 'react-router-dom';
import { usePokemon } from '../hooks/usePokemon';
import { usePokemonEvolutions } from '../hooks/usePokemonEvolutions';
import { PokemonHeader } from '../components/PokemonInfoPage/PokemonHeader';
import { PokemonContent } from '../components/PokemonInfoPage/PokemonContent';
import '../../../../styles/nomalStyles/pokeinfo.css';
import '../../../../styles/nomalStyles/pokeType.css';

export const PokemonInfoPage = () => {
  const { name } = useParams<{ name: string }>();
  const { pokemon, loadingState } = usePokemon(name);
  const { evolutions } = usePokemonEvolutions(pokemon);

  if (loadingState === 'loading' || !pokemon) {
    return <p>Loading...</p>;
  }

  return (
    <main className="main_poke">
      <PokemonHeader pokemon={pokemon} evolutions={evolutions} />
      <PokemonContent pokemon={pokemon} />
    </main>
  );
};
