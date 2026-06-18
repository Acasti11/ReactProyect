import { EvolutionRepository } from '../../domain/repositories/EvolutionRepository';
import { PokemonRepository } from '../../domain/repositories/PokemonRepository';
import { Pokemon } from '../../domain/entities/Pokemon';
import { PokemonDetailDto, toPokemonDetailDto } from '../dto/PokemonDto';

export class GetPokemonEvolutionsUseCase {
  constructor(
    private readonly pokemonRepository: PokemonRepository,
    private readonly evolutionRepository: EvolutionRepository,
  ) {}

  async execute(pokemon: Pokemon): Promise<ReadonlyArray<PokemonDetailDto>> {
    const evolutions = await this.evolutionRepository.getEvolutionChain(pokemon);
    return evolutions.map(toPokemonDetailDto);
  }
}

export class GetPokemonMegaFormsUseCase {
  constructor(private readonly evolutionRepository: EvolutionRepository) {}

  async execute(pokemon: Pokemon): Promise<ReadonlyArray<string>> {
    return this.evolutionRepository.getMegaForms(pokemon);
  }
}
