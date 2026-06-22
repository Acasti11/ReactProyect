import { DreamTeamRepository } from '../../DreamTeamRepository';
import { DreamTeamPokemon } from '../../../entities/DreamTeamPokemon';
import { PokemonName } from '../../../value-objects/PokemonName';
import { DreamTeamFullError, DreamTeamDuplicateError } from '../../../errors/PokemonErrors';

export class InMemoryDreamTeamRepository implements DreamTeamRepository {
  private pokemons: DreamTeamPokemon[] = [];
  private readonly MAX_SIZE = 10;

  getAll(): ReadonlyArray<DreamTeamPokemon> {
    return this.pokemons;
  }

  add(pokemon: DreamTeamPokemon): boolean {
    if (this.pokemons.length >= this.MAX_SIZE) {
      throw new DreamTeamFullError();
    }
    if (this.has(pokemon.name)) {
      throw new DreamTeamDuplicateError(pokemon.name.value);
    }
    this.pokemons.push(pokemon);
    return true;
  }

  remove(name: PokemonName): void {
    this.pokemons = this.pokemons.filter((p) => p.name.value !== name.value);
  }

  has(name: PokemonName): boolean {
    return this.pokemons.some((p) => p.name.value === name.value);
  }

  clear(): void {
    this.pokemons = [];
  }
}
