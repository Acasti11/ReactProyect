import { describe, it, expect } from 'vitest';
import {
  PokemonNotFoundError,
  GenerationNotFoundError,
  DreamTeamFullError,
  DreamTeamDuplicateError,
} from '../PokemonErrors';

describe('PokemonNotFoundError', () => {
  it('should create error with numeric identifier', () => {
    const error = new PokemonNotFoundError(25);
    expect(error.message).toBe('Pokemon not found: 25');
    expect(error.name).toBe('PokemonNotFoundError');
    expect(error.identifier).toBe(25);
  });

  it('should create error with string identifier', () => {
    const error = new PokemonNotFoundError('pikachu');
    expect(error.message).toBe('Pokemon not found: pikachu');
    expect(error.identifier).toBe('pikachu');
  });

  it('should be an instance of Error', () => {
    const error = new PokemonNotFoundError(1);
    expect(error).toBeInstanceOf(Error);
  });
});

describe('GenerationNotFoundError', () => {
  it('should create error with generation number', () => {
    const error = new GenerationNotFoundError(999);
    expect(error.message).toBe('Generation not found: 999');
    expect(error.name).toBe('GenerationNotFoundError');
    expect(error.generation).toBe(999);
  });

  it('should be an instance of Error', () => {
    const error = new GenerationNotFoundError(1);
    expect(error).toBeInstanceOf(Error);
  });
});

describe('DreamTeamFullError', () => {
  it('should create error with correct message', () => {
    const error = new DreamTeamFullError();
    expect(error.message).toBe('Dream Team is full (max 10 Pokemon)');
    expect(error.name).toBe('DreamTeamFullError');
  });

  it('should be an instance of Error', () => {
    const error = new DreamTeamFullError();
    expect(error).toBeInstanceOf(Error);
  });
});

describe('DreamTeamDuplicateError', () => {
  it('should create error with pokemon name', () => {
    const error = new DreamTeamDuplicateError('pikachu');
    expect(error.message).toBe('Pokemon already in Dream Team: pikachu');
    expect(error.name).toBe('DreamTeamDuplicateError');
    expect(error.pokemonName).toBe('pikachu');
  });

  it('should be an instance of Error', () => {
    const error = new DreamTeamDuplicateError('mewtwo');
    expect(error).toBeInstanceOf(Error);
  });
});
