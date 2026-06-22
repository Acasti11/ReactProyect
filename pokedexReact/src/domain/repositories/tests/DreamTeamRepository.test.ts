import { describe, it, expect, beforeEach } from 'vitest';
import { DreamTeamRepository } from '../DreamTeamRepository';
import { InMemoryDreamTeamRepository } from './mocks/InMemoryDreamTeamRepository';
import { DreamTeamPokemon } from '../../entities/DreamTeamPokemon';
import { PokemonId } from '../../value-objects/PokemonId';
import { PokemonName } from '../../value-objects/PokemonName';
import { DreamTeamFullError, DreamTeamDuplicateError } from '../../errors/PokemonErrors';

describe('DreamTeamRepository contract', () => {
  let repository: DreamTeamRepository;

  beforeEach(() => {
    repository = new InMemoryDreamTeamRepository();
  });

  const createPokemon = (id: number, name: string) => {
    return new DreamTeamPokemon({
      id: new PokemonId(id),
      name: new PokemonName(name),
      spriteUrl: `https://example.com/${id}.png`,
    });
  };

  it('should return empty array when no pokemons', () => {
    expect(repository.getAll()).toHaveLength(0);
  });

  it('should add a pokemon', () => {
    const pokemon = createPokemon(25, 'pikachu');
    const result = repository.add(pokemon);
    expect(result).toBe(true);
    expect(repository.getAll()).toHaveLength(1);
  });

  it('should check if a pokemon is in the team', () => {
    const pokemon = createPokemon(25, 'pikachu');
    repository.add(pokemon);
    expect(repository.has(new PokemonName('pikachu'))).toBe(true);
    expect(repository.has(new PokemonName('charizard'))).toBe(false);
  });

  it('should remove a pokemon by name', () => {
    const pokemon = createPokemon(25, 'pikachu');
    repository.add(pokemon);
    repository.remove(new PokemonName('pikachu'));
    expect(repository.has(new PokemonName('pikachu'))).toBe(false);
    expect(repository.getAll()).toHaveLength(0);
  });

  it('should clear all pokemons', () => {
    repository.add(createPokemon(25, 'pikachu'));
    repository.add(createPokemon(6, 'charizard'));
    repository.clear();
    expect(repository.getAll()).toHaveLength(0);
  });

  it('should throw DreamTeamDuplicateError when adding duplicate', () => {
    const pokemon = createPokemon(25, 'pikachu');
    repository.add(pokemon);
    expect(() => repository.add(createPokemon(25, 'pikachu'))).toThrow(DreamTeamDuplicateError);
  });

  it('should throw DreamTeamFullError when adding more than 10 pokemons', () => {
    for (let i = 1; i <= 10; i++) {
      repository.add(createPokemon(i, `pokemon-${i}`));
    }
    expect(() => repository.add(createPokemon(11, 'pokemon-11'))).toThrow(DreamTeamFullError);
  });
});
