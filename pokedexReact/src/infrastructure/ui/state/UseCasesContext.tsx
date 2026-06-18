import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { GetPokemonByNameUseCase } from '../../../application/use-cases/GetPokemon';
import type { GetPokemonByGenerationUseCase } from '../../../application/use-cases/GetPokemonByGeneration';
import type { GetPokemonEvolutionsUseCase, GetPokemonMegaFormsUseCase } from '../../../application/use-cases/GetPokemonEvolutions';
import type {
  GetDreamTeamUseCase,
  AddToDreamTeamUseCase,
  RemoveFromDreamTeamUseCase,
  IsInDreamTeamUseCase,
} from '../../../application/use-cases/ManageDreamTeam';

export interface UseCases {
  getPokemonByName: GetPokemonByNameUseCase;
  getPokemonByGeneration: GetPokemonByGenerationUseCase;
  getPokemonEvolutions: GetPokemonEvolutionsUseCase;
  getPokemonMegaForms: GetPokemonMegaFormsUseCase;
  getDreamTeam: GetDreamTeamUseCase;
  addToDreamTeam: AddToDreamTeamUseCase;
  removeFromDreamTeam: RemoveFromDreamTeamUseCase;
  isInDreamTeam: IsInDreamTeamUseCase;
}

const UseCasesContext = createContext<UseCases | null>(null);

export function UseCasesProvider({
  children,
  useCases,
}: {
  children: ReactNode;
  useCases: UseCases;
}): React.ReactElement {
  return React.createElement(UseCasesContext.Provider, { value: useCases }, children);
}

export function useUseCases(): UseCases {
  const context = useContext(UseCasesContext);
  if (!context) {
    throw new Error('useUseCases must be used within a UseCasesProvider');
  }
  return context;
}
