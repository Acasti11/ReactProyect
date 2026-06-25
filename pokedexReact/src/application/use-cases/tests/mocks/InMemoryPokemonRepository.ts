import { PokemonRepository } from '../../../../domain/repositories/PokemonRepository';
import { Pokemon } from '../../../../domain/entities/Pokemon';
import { PokemonId } from '../../../../domain/value-objects/PokemonId';
import { PokemonName } from '../../../../domain/value-objects/PokemonName';
import { PokemonNotFoundError } from '../../../../domain/errors/PokemonErrors';

export class InMemoryPokemonRepository implements PokemonRepository {
  private pokemons: Map<number, Pokemon> = new Map();

  async getById(id: PokemonId): Promise<Pokemon> {
    const pokemon = this.pokemons.get(id.value);
    if (!pokemon) {
      throw new PokemonNotFoundError(id.value);
    }
    return pokemon;
  }

  async getByName(name: PokemonName): Promise<Pokemon> {
    const pokemon = Array.from(this.pokemons.values()).find(
      (p) => p.name.value === name.value
    );
    if (!pokemon) {
      throw new PokemonNotFoundError(name.value);
    }
    return pokemon;
  }

  async getByGeneration(generation: number): Promise<ReadonlyArray<Pokemon>> {
    const pokemons = Array.from(this.pokemons.values());
    if (pokemons.length === 0) {
      throw new PokemonNotFoundError(`generation ${generation}`);
    }
    return pokemons;
  }

  addPokemon(pokemon: Pokemon): void {
    this.pokemons.set(pokemon.id.value, pokemon);
  }

  clear(): void {
    this.pokemons.clear();
  }
}
