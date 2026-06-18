import { Pokemon } from '../entities/Pokemon';
import { PokemonName } from '../value-objects/PokemonName';
import { PokemonId } from '../value-objects/PokemonId';

export interface PokemonRepository {
  getById(id: PokemonId): Promise<Pokemon>;
  getByName(name: PokemonName): Promise<Pokemon>;
  getByGeneration(generation: number): Promise<ReadonlyArray<Pokemon>>;
}
