import { Pokemon } from '../entities/Pokemon';

export interface EvolutionRepository {
  getEvolutionChain(pokemon: Pokemon): Promise<ReadonlyArray<Pokemon>>;
  getMegaForms(pokemon: Pokemon): Promise<ReadonlyArray<string>>;
}
