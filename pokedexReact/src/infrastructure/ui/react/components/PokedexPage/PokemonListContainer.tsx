import { ErrorMessage } from './ErrorMessage';
import { LoadingCards } from './LoadingCards';
import { PokemonCard } from './PokemonCard';
import type { PokemonListItemDto } from '../../../../../application/dto/PokemonDto';
import type { ReactNode } from 'react';

type LoadingState = 'idle' | 'loading' | 'error' | 'success';

interface PokemonListContainerProps {
  loadingState: LoadingState;
  hasNoResultsByCombined: boolean;
  hasNoResultsBySearch: boolean;
  hasNoResultsByType: boolean;
  selectedTypes: string[];
  searchValue: string;
  filteredPokemon: ReadonlyArray<PokemonListItemDto>;
}

export function PokemonListContainer({
  loadingState,
  hasNoResultsByCombined,
  hasNoResultsBySearch,
  hasNoResultsByType,
  selectedTypes,
  searchValue,
  filteredPokemon,
}: PokemonListContainerProps): ReactNode {
  if (loadingState === 'loading') {
    return <LoadingCards />;
  }

  if (loadingState === 'error') {
    return (
      <ErrorMessage
        title="Error"
        message="An error occurred while loading Pokémon"
        secondaryMessage="Please try again later"
        imageSrc="alert"
      />
    );
  }

  if (hasNoResultsByCombined) {
    const typesList = selectedTypes.join(', ');
    return (
      <ErrorMessage
        title="Not Found"
        message={`No Pokémon found matching "${searchValue}" with type${selectedTypes.length > 1 ? 's' : ''}: ${typesList}`}
        imageSrc="pokenot"
      />
    );
  }

  if (hasNoResultsBySearch) {
    return (
      <ErrorMessage
        title="Not Found"
        message={`There are no results for "${searchValue}"`}
        imageSrc="pokenot"
      />
    );
  }

  if (hasNoResultsByType) {
    const typesList = selectedTypes.join(', ');
    return (
      <ErrorMessage
        title="Not Found"
        message={`No Pokémon found with the selected type${selectedTypes.length > 1 ? 's' : ''}: ${typesList}`}
        imageSrc="pokenot"
      />
    );
  }

  return filteredPokemon.map((currentPokemon) => {
    return <PokemonCard key={currentPokemon.id} pokemon={currentPokemon} />;
  });
}
