import { describe, it, expect, beforeEach } from 'vitest';
import { GetPokemonEvolutionsUseCase, GetPokemonMegaFormsUseCase } from '../GetPokemonEvolutions';
import { InMemoryEvolutionRepository } from './mocks/InMemoryEvolutionRepository';
import { Pokemon } from '../../../domain/entities/Pokemon';
import { PokemonId } from '../../../domain/value-objects/PokemonId';
import { PokemonName } from '../../../domain/value-objects/PokemonName';
import { PokemonTypeName } from '../../../domain/value-objects/PokemonTypeName';
import { PokemonStatName } from '../../../domain/value-objects/PokemonStatName';
import { PokemonStat, PokemonAbility } from '../../../domain/entities/Pokemon';

describe('GetPokemonEvolutionsUseCase', () => {
  let repository: InMemoryEvolutionRepository;
  let useCase: GetPokemonEvolutionsUseCase;

  beforeEach(() => {
    repository = new InMemoryEvolutionRepository();
    useCase = new GetPokemonEvolutionsUseCase(repository);
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

  it('should return evolution chain as DTOs', async () => {
    const charmander = createPokemon(4, 'charmander');
    const charmeleon = createPokemon(5, 'charmeleon');
    const charizard = createPokemon(6, 'charizard');
    repository.setEvolutionChain([charmander, charmeleon, charizard]);

    const result = await useCase.execute(charmander);

    expect(result).toHaveLength(3);
    expect(result[0].name).toBe('charmander');
    expect(result[1].name).toBe('charmeleon');
    expect(result[2].name).toBe('charizard');
  });

  it('should return empty array when no evolutions', async () => {
    const pokemon = createPokemon(25, 'pikachu');
    repository.setEvolutionChain([]);

    const result = await useCase.execute(pokemon);

    expect(result).toEqual([]);
  });

  it('should map evolutions to PokemonDetailDto', async () => {
    const pokemon = createPokemon(1, 'bulbasaur');
    repository.setEvolutionChain([pokemon]);

    const result = await useCase.execute(pokemon);

    expect(result[0]).toHaveProperty('speciesUrl');
    expect(result[0]).toHaveProperty('moves');
  });
});

describe('GetPokemonMegaFormsUseCase', () => {
  let repository: InMemoryEvolutionRepository;
  let useCase: GetPokemonMegaFormsUseCase;

  beforeEach(() => {
    repository = new InMemoryEvolutionRepository();
    useCase = new GetPokemonMegaFormsUseCase(repository);
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

  it('should return mega forms', async () => {
    const charizard = createPokemon(6, 'charizard');
    repository.setMegaForms(['charizard-mega-x', 'charizard-mega-y']);

    const result = await useCase.execute(charizard);

    expect(result).toEqual(['charizard-mega-x', 'charizard-mega-y']);
  });

  it('should return empty array when no mega forms', async () => {
    const pokemon = createPokemon(25, 'pikachu');
    repository.setMegaForms([]);

    const result = await useCase.execute(pokemon);

    expect(result).toEqual([]);
  });
});
