import { DreamTeamPokemon } from '../entities/DreamTeamPokemon';
import { PokemonName } from '../value-objects/PokemonName';

export interface DreamTeamRepository {
  getAll(): ReadonlyArray<DreamTeamPokemon>;
  add(pokemon: DreamTeamPokemon): boolean;
  remove(name: PokemonName): void;
  has(name: PokemonName): boolean;
  clear(): void;
}
