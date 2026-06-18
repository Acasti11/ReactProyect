import type { EvolutionRepository } from '../../domain/repositories/EvolutionRepository';
import { Pokemon } from '../../domain/entities/Pokemon';
import { toPokemonDetailDto } from '../dto/PokemonDto';
import type { PokemonDetailDto } from '../dto/PokemonDto';

export class GetPokemonEvolutionsUseCase {
  private readonly evolutionRepository: EvolutionRepository;

  constructor(evolutionRepository: EvolutionRepository) {
    this.evolutionRepository = evolutionRepository;
  }

  async execute(pokemon: Pokemon): Promise<ReadonlyArray<PokemonDetailDto>> {
    const evolutions = await this.evolutionRepository.getEvolutionChain(pokemon);
    return evolutions.map(toPokemonDetailDto);
  }
}

export class GetPokemonMegaFormsUseCase {
  private readonly evolutionRepository: EvolutionRepository;

  constructor(evolutionRepository: EvolutionRepository) {
    this.evolutionRepository = evolutionRepository;
  }

  async execute(pokemon: Pokemon): Promise<ReadonlyArray<string>> {
    return this.evolutionRepository.getMegaForms(pokemon);
  }
}
