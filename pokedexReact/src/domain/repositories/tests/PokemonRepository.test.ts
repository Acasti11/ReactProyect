import { describe, it, expect, beforeEach } from 'vitest';
import { PokemonRepository } from '../PokemonRepository';
import { InMemoryPokemonRepository } from './mocks/InMemoryPokemonRepository';
import { Pokemon } from '../../entities/Pokemon';
import { PokemonId } from '../../value-objects/PokemonId';
import { PokemonName } from '../../value-objects/PokemonName';
import { PokemonTypeName } from '../../value-objects/PokemonTypeName';
import { PokemonStatName } from '../../value-objects/PokemonStatName';
import { PokemonStat, PokemonAbility } from '../../entities/Pokemon';
import { PokemonNotFoundError } from '../../errors/PokemonErrors';

describe('PokemonRepository contract', () => {
  let repository: InMemoryPokemonRepository;

  beforeEach(() => {
    repository = new InMemoryPokemonRepository();
  });

  const createPokemon = (id: number, name: string) => {
    return new Pokemon({
      id: new PokemonId(id),
      name: new PokemonName(name),
      height: 7,
      weight: 69,
      speciesUrl: `https://pokeapi.co/api/v2/pokemon-species/${id}/`,
      spriteUrl: `https://example.com/${id}.png`,
      types: [new PokemonTypeName('normal')],
      stats: [new PokemonStat(new PokemonStatName('hp'), 45)],
      abilities: [new PokemonAbility('run-away', false)],
      moves: [],
    });
  };

  it('should get a pokemon by id', async () => {
    const pokemon = createPokemon(25, 'pikachu');
    repository.addPokemon(pokemon);
    const found = await repository.getById(new PokemonId(25));
    expect(found.id.value).toBe(25);
    expect(found.name.value).toBe('pikachu');
  });

  it('should throw PokemonNotFoundError when pokemon not found by id', async () => {
    await expect(repository.getById(new PokemonId(999))).rejects.toThrow(PokemonNotFoundError);
  });

  it('should get a pokemon by name', async () => {
    const pokemon = createPokemon(25, 'pikachu');
    repository.addPokemon(pokemon);
    const found = await repository.getByName(new PokemonName('pikachu'));
    expect(found.name.value).toBe('pikachu');
  });

  it('should throw PokemonNotFoundError when pokemon not found by name', async () => {
    await expect(repository.getByName(new PokemonName('missingno'))).rejects.toThrow(PokemonNotFoundError);
  });

  it('should get pokemons by generation', async () => {
    repository.addPokemon(createPokemon(1, 'bulbasaur'));
    repository.addPokemon(createPokemon(2, 'ivysaur'));
    const pokemons = await repository.getByGeneration(1);
    expect(Array.isArray(pokemons)).toBe(true);
    expect(pokemons.length).toBeGreaterThan(0);
  });

  it('should throw PokemonNotFoundError when generation not found', async () => {
    await expect(repository.getByGeneration(999)).rejects.toThrow(PokemonNotFoundError);
  });
});
