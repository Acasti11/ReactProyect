import { describe, it, expect, beforeEach } from 'vitest';
import { GetPokemonByGenerationUseCase } from '../GetPokemonByGeneration';
import { InMemoryPokemonRepository } from './mocks/InMemoryPokemonRepository';
import { Pokemon } from '../../../domain/entities/Pokemon';
import { PokemonId } from '../../../domain/value-objects/PokemonId';
import { PokemonName } from '../../../domain/value-objects/PokemonName';
import { PokemonTypeName } from '../../../domain/value-objects/PokemonTypeName';
import { PokemonStatName } from '../../../domain/value-objects/PokemonStatName';
import { PokemonStat, PokemonAbility } from '../../../domain/entities/Pokemon';
import { PokemonNotFoundError } from '../../../domain/errors/PokemonErrors';

describe('GetPokemonByGenerationUseCase', () => {
  let repository: InMemoryPokemonRepository;
  let useCase: GetPokemonByGenerationUseCase;

  beforeEach(() => {
    repository = new InMemoryPokemonRepository();
    useCase = new GetPokemonByGenerationUseCase(repository);
  });

  const createPokemon = (id: number, name: string) => {
    return new Pokemon({
      id: new PokemonId(id),
      name: new PokemonName(name),
      height: 7,
      weight: 69,
      speciesUrl: `https://pokeapi.co/api/v2/pokemon-species/${id}/`,
      spriteUrl: `https://example.com/${id}.png`,
      types: [new PokemonTypeName('grass')],
      stats: [new PokemonStat(new PokemonStatName('hp'), 45)],
      abilities: [new PokemonAbility('overgrow', false)],
      moves: [],
    });
  };

  it('should return list of pokemon DTOs for a generation', async () => {
    repository.addPokemon(createPokemon(1, 'bulbasaur'));
    repository.addPokemon(createPokemon(2, 'ivysaur'));
    repository.addPokemon(createPokemon(3, 'venusaur'));

    const result = await useCase.execute(1);

    expect(result).toHaveLength(3);
    expect(result[0].name).toBe('bulbasaur');
    expect(result[1].name).toBe('ivysaur');
    expect(result[2].name).toBe('venusaur');
  });

  it('should throw PokemonNotFoundError when repository is empty', async () => {
    await expect(useCase.execute(999)).rejects.toThrow(PokemonNotFoundError);
  });

  it('should map each pokemon to PokemonListItemDto', async () => {
    repository.addPokemon(createPokemon(25, 'pikachu'));

    const result = await useCase.execute(1);

    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('name');
    expect(result[0]).toHaveProperty('spriteUrl');
    expect(result[0]).toHaveProperty('types');
    expect(result[0]).toHaveProperty('height');
    expect(result[0]).toHaveProperty('weight');
    expect(result[0]).toHaveProperty('stats');
    expect(result[0]).toHaveProperty('abilities');
    expect(result[0]).not.toHaveProperty('speciesUrl');
    expect(result[0]).not.toHaveProperty('moves');
  });

  it('should throw PokemonNotFoundError when generation not found', async () => {
    await expect(useCase.execute(999)).rejects.toThrow(PokemonNotFoundError);
  });
});
