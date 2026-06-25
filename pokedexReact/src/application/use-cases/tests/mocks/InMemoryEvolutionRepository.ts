import { EvolutionRepository } from '../../../../domain/repositories/EvolutionRepository';
import { Pokemon } from '../../../../domain/entities/Pokemon';

export class InMemoryEvolutionRepository implements EvolutionRepository {
  private evolutionChain: Pokemon[] = [];
  private megaForms: string[] = [];

  async getEvolutionChain(pokemon: Pokemon): Promise<ReadonlyArray<Pokemon>> {
    return this.evolutionChain;
  }

  async getMegaForms(pokemon: Pokemon): Promise<ReadonlyArray<string>> {
    return this.megaForms;
  }

  setEvolutionChain(chain: Pokemon[]): void {
    this.evolutionChain = chain;
  }

  setMegaForms(forms: string[]): void {
    this.megaForms = forms;
  }

  clear(): void {
    this.evolutionChain = [];
    this.megaForms = [];
  }
}
