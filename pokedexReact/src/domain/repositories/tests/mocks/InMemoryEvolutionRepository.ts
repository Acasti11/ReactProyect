import { EvolutionRepository } from '../../EvolutionRepository';
import { Pokemon } from '../../../entities/Pokemon';

export class InMemoryEvolutionRepository implements EvolutionRepository {
  async getEvolutionChain(pokemon: Pokemon): Promise<ReadonlyArray<Pokemon>> {
    return [pokemon];
  }

  async getMegaForms(pokemon: Pokemon): Promise<ReadonlyArray<string>> {
    return [];
  }
}
