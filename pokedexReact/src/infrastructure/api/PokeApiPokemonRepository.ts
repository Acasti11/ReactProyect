import { Pokemon } from '../../domain/entities/Pokemon';
import { PokemonId } from '../../domain/value-objects/PokemonId';
import { PokemonName } from '../../domain/value-objects/PokemonName';
import { PokemonTypeName } from '../../domain/value-objects/PokemonTypeName';
import { PokemonStatName } from '../../domain/value-objects/PokemonStatName';
import { PokemonRepository } from '../../domain/repositories/PokemonRepository';
import { PokemonNotFoundError, GenerationNotFoundError } from '../../domain/errors/PokemonErrors';

// Tipos raw de la API PokeAPI (internos al adaptador)
interface PokeApiPokemonResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  species: { url: string };
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: Array<{ type: { name: string } }>;
  stats: Array<{ base_stat: number; stat: { name: string } }>;
  abilities: Array<{ ability: { name: string }; is_hidden: boolean }>;
  moves: Array<{
    move: { name: string };
    version_group_details: Array<{
      level_learned_at: number;
      move_learn_method: { name: string };
      version_group: { name: string };
    }>;
  }>;
}

interface PokeApiSpeciesResponse {
  pokemon_species: Array<{ name: string; url: string }>;
}

export class PokeApiPokemonRepository implements PokemonRepository {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  async getById(id: PokemonId): Promise<Pokemon> {
    const data = await this.fetchPokemon(id.value);
    return this.mapToDomain(data);
  }

  async getByName(name: PokemonName): Promise<Pokemon> {
    const data = await this.fetchPokemon(name.value);
    return this.mapToDomain(data);
  }

  async getByGeneration(generation: number): Promise<ReadonlyArray<Pokemon>> {
    const response = await fetch(`${this.baseUrl}/generation/${generation}`);
    if (!response.ok) {
      throw new GenerationNotFoundError(generation);
    }
    const data: PokeApiSpeciesResponse = await response.json();

    const pokemonList = await Promise.all(
      data.pokemon_species.map(async (species) => {
        try {
          return await this.fetchPokemon(species.name);
        } catch {
          const idMatch = species.url.match(/\/(\d+)\/$/);
          const matchedId = idMatch?.[1];
          const id = matchedId ? parseInt(matchedId, 10) : null;
          if (id) {
            return await this.fetchPokemon(id);
          }
          throw new Error(`Could not fetch ${species.name} by name or ID`);
        }
      })
    );

    return pokemonList.map((p) => this.mapToDomain(p));
  }

  private async fetchPokemon(identifier: string | number): Promise<PokeApiPokemonResponse> {
    const response = await fetch(`${this.baseUrl}/pokemon/${identifier}`);
    if (!response.ok) {
      throw new PokemonNotFoundError(identifier);
    }
    return response.json();
  }

  private mapToDomain(data: PokeApiPokemonResponse): Pokemon {
    return new Pokemon({
      id: new PokemonId(data.id),
      name: new PokemonName(data.name),
      height: data.height,
      weight: data.weight,
      speciesUrl: data.species.url,
      spriteUrl: data.sprites.other['official-artwork'].front_default,
      types: data.types.map((t) => new PokemonTypeName(t.type.name)),
      stats: data.stats.map((s) => ({
        name: new PokemonStatName(s.stat.name),
        baseValue: s.base_stat,
      })),
      abilities: data.abilities.map((a) => ({
        name: a.ability.name,
        isHidden: a.is_hidden,
      })),
      moves: data.moves.map((m) => ({
        name: m.move.name,
        versionGroupDetails: m.version_group_details.map((d) => ({
          levelLearnedAt: d.level_learned_at,
          learnMethodName: d.move_learn_method.name,
          versionGroupName: d.version_group.name,
        })),
      })),
    });
  }
}
