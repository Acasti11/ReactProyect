import { useEffect, useState } from 'react';
import { useUseCases } from '../state/UseCasesContext';
import { PokemonListItemDto } from '../../../application/dto/PokemonDto';

type LoadingState = 'idle' | 'loading' | 'error' | 'success';

interface UsePokemonListResult {
  pokemonList: ReadonlyArray<PokemonListItemDto>;
  loadingState: LoadingState;
  error: Error | null;
}

export function usePokemonList(generation: number): UsePokemonListResult {
  const { getPokemonByGeneration } = useUseCases();
  const [pokemonList, setPokemonList] = useState<ReadonlyArray<PokemonListItemDto>>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoadingState('loading');
    setError(null);

    getPokemonByGeneration
      .execute(generation)
      .then((data) => {
        setPokemonList(data);
        setLoadingState('success');
      })
      .catch((err) => {
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoadingState('error');
      });
  }, [generation, getPokemonByGeneration]);

  return { pokemonList, loadingState, error };
}
