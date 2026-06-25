import { describe, it, expect, beforeEach } from 'vitest';
import { GetPokemonByIdUseCase, GetPokemonByNameUseCase } from '../GetPokemon';
import { InMemoryPokemonRepository } from './mocks/InMemoryPokemonRepository';
import { Pokemon } from '../../../domain/entities/Pokemon';
import { PokemonId } from '../../../domain/value-objects/PokemonId';
import { PokemonName } from '../../../domain/value-objects/PokemonName';
import { PokemonTypeName } from '../../../domain/value-objects/PokemonTypeName';
import { PokemonStatName } from '../../../domain/value-objects/PokemonStatName';
import { PokemonStat, PokemonAbility } from '../../../domain/entities/Pokemon';
import { PokemonNotFoundError } from '../../../domain/errors/PokemonErrors';

describe('GetPokemonByIdUseCase', () => {
  let repository: InMemoryPokemonRepository;
  let useCase: GetPokemonByIdUseCase;

  beforeEach(() => {
    repository = new InMemoryPokemonRepository();
    useCase = new GetPokemonByIdUseCase(repository);
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

  it('should return pokemon detail DTO when found by id', async () => {
    const pokemon = createPokemon(25, 'pikachu');
    repository.addPokemon(pokemon);

    const result = await useCase.execute(25);

    expect(result).toBeDefined();
    expect(result.id).toBe(25);
    expect(result.name).toBe('pikachu');
    expect(result.spriteUrl).toBe('https://example.com/25.png');
    expect(result.types).toEqual(['electric']);
    expect(result.height).toBe(7);
    expect(result.weight).toBe(69);
    expect(result.stats).toEqual([{ name: 'speed', baseValue: 90 }]);
    expect(result.abilities).toEqual([{ name: 'static', isHidden: false }]);
    expect(result.speciesUrl).toBe('https://pokeapi.co/api/v2/pokemon-species/25/');
    expect(result.moves).toEqual([]);
  });

  it('should throw PokemonNotFoundError when pokemon not found by id', async () => {
    await expect(useCase.execute(999)).rejects.toThrow(PokemonNotFoundError);
  });

  it('should reject invalid id (zero)', async () => {
    await expect(useCase.execute(0)).rejects.toThrow('PokemonId must be a positive integer');
  });

  it('should reject invalid id (negative)', async () => {
    await expect(useCase.execute(-1)).rejects.toThrow('PokemonId must be a positive integer');
  });
});

describe('GetPokemonByNameUseCase', () => {
  let repository: InMemoryPokemonRepository;
  let useCase: GetPokemonByNameUseCase;

  beforeEach(() => {
    repository = new InMemoryPokemonRepository();
    useCase = new GetPokemonByNameUseCase(repository);
  });

  const createPokemon = (id: number, name: string) => {
    return new Pokemon({
      id: new PokemonId(id),
      name: new PokemonName(name),
      height: 7,
      weight: 69,
      speciesUrl: `https://pokeapi.co/api/v2/pokemon-species/${id}/`,
      spriteUrl: `https://example.com/${id}.png`,
      types: [new PokemonTypeName('fire')],
      stats: [new PokemonStat(new PokemonStatName('attack'), 84)],
      abilities: [new PokemonAbility('blaze', false)],
      moves: [],
    });
  };

  it('should return pokemon detail DTO when found by name', async () => {
    const pokemon = createPokemon(6, 'charizard');
    repository.addPokemon(pokemon);

    const result = await useCase.execute('charizard');

    expect(result).toBeDefined();
    expect(result.id).toBe(6);
    expect(result.name).toBe('charizard');
    expect(result.types).toEqual(['fire']);
  });

  it('should throw PokemonNotFoundError when pokemon not found by name', async () => {
    await expect(useCase.execute('missingno')).rejects.toThrow(PokemonNotFoundError);
  });

  it('should reject empty name', async () => {
    await expect(useCase.execute('')).rejects.toThrow('PokemonName cannot be empty');
  });

  it('should convert name to lowercase in DTO', async () => {
    const pokemon = createPokemon(25, 'pikachu');
    repository.addPokemon(pokemon);

    const result = await useCase.execute('PIKACHU');

    expect(result.name).toBe('pikachu');
  });
});
