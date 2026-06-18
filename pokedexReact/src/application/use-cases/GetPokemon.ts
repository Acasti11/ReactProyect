import type { PokemonRepository } from '../../domain/repositories/PokemonRepository';
import { PokemonId } from '../../domain/value-objects/PokemonId';
import { PokemonName } from '../../domain/value-objects/PokemonName';
import { toPokemonDetailDto } from '../dto/PokemonDto';
import type { PokemonDetailDto } from '../dto/PokemonDto';

export class GetPokemonByIdUseCase {
  private readonly pokemonRepository: PokemonRepository;

  constructor(pokemonRepository: PokemonRepository) {
    this.pokemonRepository = pokemonRepository;
  }

  async execute(id: number): Promise<PokemonDetailDto> {
    const pokemonId = new PokemonId(id);
    const pokemon = await this.pokemonRepository.getById(pokemonId);
    return toPokemonDetailDto(pokemon);
  }
}

export class GetPokemonByNameUseCase {
  private readonly pokemonRepository: PokemonRepository;

  constructor(pokemonRepository: PokemonRepository) {
    this.pokemonRepository = pokemonRepository;
  }

  async execute(name: string): Promise<PokemonDetailDto> {
    const pokemonName = new PokemonName(name);
    const pokemon = await this.pokemonRepository.getByName(pokemonName);
    return toPokemonDetailDto(pokemon);
  }
}
