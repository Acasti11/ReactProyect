import { PokemonRepository } from '../../domain/repositories/PokemonRepository';
import { PokemonId } from '../../domain/value-objects/PokemonId';
import { PokemonName } from '../../domain/value-objects/PokemonName';
import { PokemonDetailDto, toPokemonDetailDto } from '../dto/PokemonDto';

export class GetPokemonByIdUseCase {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async execute(id: number): Promise<PokemonDetailDto> {
    const pokemonId = new PokemonId(id);
    const pokemon = await this.pokemonRepository.getById(pokemonId);
    return toPokemonDetailDto(pokemon);
  }
}

export class GetPokemonByNameUseCase {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async execute(name: string): Promise<PokemonDetailDto> {
    const pokemonName = new PokemonName(name);
    const pokemon = await this.pokemonRepository.getByName(pokemonName);
    return toPokemonDetailDto(pokemon);
  }
}
