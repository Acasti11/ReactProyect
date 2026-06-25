import { DreamTeamRepository } from '../../../../domain/repositories/DreamTeamRepository';
import { DreamTeamPokemon } from '../../../../domain/entities/DreamTeamPokemon';
import { PokemonName } from '../../../../domain/value-objects/PokemonName';
import { PokemonId } from '../../../../domain/value-objects/PokemonId';
import { DreamTeamFullError, DreamTeamDuplicateError } from '../../../../domain/errors/PokemonErrors';

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
    if (this.pokemons.some((p) => p.name.value === pokemon.name.value)) {
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

  // Helper para tests
  addPokemon(id: number, name: string, spriteUrl: string): void {
    this.add(new DreamTeamPokemon({
      id: new PokemonId(id),
      name: new PokemonName(name),
      spriteUrl,
    }));
  }
}
