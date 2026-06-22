import { describe, it, expect, beforeEach } from 'vitest';
import { EvolutionRepository } from '../EvolutionRepository';
import { InMemoryEvolutionRepository } from './mocks/InMemoryEvolutionRepository';
import { Pokemon } from '../../entities/Pokemon';
import { PokemonId } from '../../value-objects/PokemonId';
import { PokemonName } from '../../value-objects/PokemonName';
import { PokemonTypeName } from '../../value-objects/PokemonTypeName';
import { PokemonStatName } from '../../value-objects/PokemonStatName';
import { PokemonStat, PokemonAbility } from '../../entities/Pokemon';

describe('EvolutionRepository contract', () => {
  let repository: EvolutionRepository;

  beforeEach(() => {
    repository = new InMemoryEvolutionRepository();
  });

  const createPokemon = (id: number, name: string) => {
    return new Pokemon({
      id: new PokemonId(id),
      name: new PokemonName(name),
      height: 7,
      weight: 69,
      speciesUrl: `https://pokeapi.co/api/v2/pokemon-species/${id}/`,
      spriteUrl: `https://example.com/${id}.png`,
      types: [new PokemonTypeName('electric')],
      stats: [new PokemonStat(new PokemonStatName('speed'), 90)],
      abilities: [new PokemonAbility('static', false)],
      moves: [],
    });
  };

  it('should get evolution chain for a pokemon', async () => {
    const pokemon = createPokemon(25, 'pikachu');
    const chain = await repository.getEvolutionChain(pokemon);
    expect(Array.isArray(chain)).toBe(true);
  });

  it('should get mega forms for a pokemon', async () => {
    const pokemon = createPokemon(6, 'charizard');
    const megaForms = await repository.getMegaForms(pokemon);
    expect(Array.isArray(megaForms)).toBe(true);
  });
});
