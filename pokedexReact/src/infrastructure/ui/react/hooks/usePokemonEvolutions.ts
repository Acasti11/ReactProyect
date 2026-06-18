import { useEffect, useState } from 'react';
import { useUseCases } from '../../state/UseCasesContext';
import type { PokemonDetailDto } from '../../../../application/dto/PokemonDto';
import { dtoToPokemonEntity } from './dtoToEntity';

type LoadingState = 'idle' | 'loading' | 'error' | 'success';

interface UsePokemonEvolutionsResult {
  evolutions: ReadonlyArray<PokemonDetailDto>;
  loadingState: LoadingState;
  error: Error | null;
}

export function usePokemonEvolutions(pokemon: PokemonDetailDto | null): UsePokemonEvolutionsResult {
  const { getPokemonEvolutions } = useUseCases();
  const [evolutions, setEvolutions] = useState<ReadonlyArray<PokemonDetailDto>>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!pokemon) return;

    setLoadingState('loading');
    setError(null);

    const entity = dtoToPokemonEntity(pokemon);

    getPokemonEvolutions
      .execute(entity)
      .then((data: ReadonlyArray<PokemonDetailDto>) => {
        setEvolutions(data);
        setLoadingState('success');
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoadingState('error');
      });
  }, [pokemon, getPokemonEvolutions]);

  return { evolutions, loadingState, error };
}
