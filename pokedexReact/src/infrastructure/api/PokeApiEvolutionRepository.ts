import { Pokemon } from '../../domain/entities/Pokemon';
import { PokemonName } from '../../domain/value-objects/PokemonName';
import type { EvolutionRepository } from '../../domain/repositories/EvolutionRepository';
import type { PokemonRepository } from '../../domain/repositories/PokemonRepository';

interface EvolutionChainApi {
  species: { name: string };
  evolves_to: EvolutionChainApi[];
}

interface SpeciesApi {
  evolution_chain: { url: string };
  varieties?: Array<{ pokemon: { name: string } }>;
}

export class PokeApiEvolutionRepository implements EvolutionRepository {
  private readonly pokemonRepository: PokemonRepository;

  constructor(pokemonRepository: PokemonRepository) {
    this.pokemonRepository = pokemonRepository;
  }

  async getEvolutionChain(pokemon: Pokemon): Promise<ReadonlyArray<Pokemon>> {
    const speciesRes = await fetch(pokemon.speciesUrl);
    if (!speciesRes.ok) {
      return [];
    }
    const species: SpeciesApi = await speciesRes.json();

    const evoRes = await fetch(species.evolution_chain.url);
    if (!evoRes.ok) {
      return [];
    }
    const evo = await evoRes.json();

    let names = this.extractNames(evo.chain);

    // Include mega forms for the last evolution if any
    if (names.length > 0) {
      const lastName = names[names.length - 1]!;
      try {
        const lastPokemon = await this.pokemonRepository.getByName(new PokemonName(lastName));
        const megas = await this.getMegaForms(lastPokemon);
        const extra = megas.filter((m) => !names.includes(m));
        names = names.concat(extra);
      } catch {
        // Ignore errors fetching mega forms
      }
    }

    const data = await Promise.all(
      names.map(async (name) => {
        try {
          return await this.pokemonRepository.getByName(new PokemonName(name));
        } catch {
          return null;
        }
      })
    );

    return data.filter((p): p is Pokemon => p !== null);
  }

  async getMegaForms(pokemon: Pokemon): Promise<ReadonlyArray<string>> {
    try {
      const speciesRes = await fetch(pokemon.speciesUrl);
      if (!speciesRes.ok) {
        return [];
      }
      const species: SpeciesApi = await speciesRes.json();

      const megas = (species.varieties || [])
        .map((v) => v.pokemon.name)
        .filter((name) => name.includes('mega'));

      return megas;
    } catch {
      return [];
    }
  }

  private extractNames(chain: EvolutionChainApi): string[] {
    let result: string[] = [];
    result.push(chain.species.name);
    chain.evolves_to.forEach((evo) => {
      result = result.concat(this.extractNames(evo));
    });
    return result;
  }
}
