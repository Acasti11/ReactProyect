import { PokemonRepository } from '../../domain/repositories/PokemonRepository';
import { PokemonListItemDto, toPokemonListItemDto } from '../dto/PokemonDto';

export class GetPokemonByGenerationUseCase {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async execute(generation: number): Promise<ReadonlyArray<PokemonListItemDto>> {
    const pokemonList = await this.pokemonRepository.getByGeneration(generation);
    return pokemonList.map(toPokemonListItemDto);
  }
}
