import { useEffect, useState } from 'react';
import { useUseCases } from '../state/UseCasesContext';
import { PokemonDetailDto } from '../../../application/dto/PokemonDto';

type LoadingState = 'idle' | 'loading' | 'error' | 'success';

interface UsePokemonResult {
  pokemon: PokemonDetailDto | null;
  loadingState: LoadingState;
  error: Error | null;
}

export function usePokemon(name: string | undefined): UsePokemonResult {
  const { getPokemonByName } = useUseCases();
  const [pokemon, setPokemon] = useState<PokemonDetailDto | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!name) return;

    setLoadingState('loading');
    setError(null);

    getPokemonByName
      .execute(name)
      .then((data) => {
        setPokemon(data);
        setLoadingState('success');
      })
      .catch((err) => {
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoadingState('error');
      });
  }, [name, getPokemonByName]);

  return { pokemon, loadingState, error };
}
