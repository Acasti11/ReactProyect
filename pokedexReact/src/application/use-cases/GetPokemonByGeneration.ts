import type { PokemonRepository } from '../../domain/repositories/PokemonRepository';
import { toPokemonListItemDto } from '../dto/PokemonDto';
import type { PokemonListItemDto } from '../dto/PokemonDto';

export class GetPokemonByGenerationUseCase {
  private readonly pokemonRepository: PokemonRepository;

  constructor(pokemonRepository: PokemonRepository) {
    this.pokemonRepository = pokemonRepository;
  }

  async execute(generation: number): Promise<ReadonlyArray<PokemonListItemDto>> {
    const pokemonList = await this.pokemonRepository.getByGeneration(generation);
    return pokemonList.map(toPokemonListItemDto);
  }
}
