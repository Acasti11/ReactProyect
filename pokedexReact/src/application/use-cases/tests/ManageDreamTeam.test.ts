import { describe, it, expect, beforeEach } from 'vitest';
import {
  GetDreamTeamUseCase,
  AddToDreamTeamUseCase,
  RemoveFromDreamTeamUseCase,
  IsInDreamTeamUseCase,
} from '../ManageDreamTeam';
import { InMemoryDreamTeamRepository } from './mocks/InMemoryDreamTeamRepository';
import { PokemonName } from '../../../domain/value-objects/PokemonName';
import { DreamTeamFullError, DreamTeamDuplicateError } from '../../../domain/errors/PokemonErrors';

describe('GetDreamTeamUseCase', () => {
  let repository: InMemoryDreamTeamRepository;
  let useCase: GetDreamTeamUseCase;

  beforeEach(() => {
    repository = new InMemoryDreamTeamRepository();
    useCase = new GetDreamTeamUseCase(repository);
  });

  it('should return empty array when no pokemons', () => {
    const result = useCase.execute();
    expect(result).toEqual([]);
  });

  it('should return team as DTOs', () => {
    repository.addPokemon(25, 'pikachu', 'https://example.com/25.png');
    repository.addPokemon(6, 'charizard', 'https://example.com/6.png');

    const result = useCase.execute();

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ id: 25, name: 'pikachu', spriteUrl: 'https://example.com/25.png' });
    expect(result[1]).toEqual({ id: 6, name: 'charizard', spriteUrl: 'https://example.com/6.png' });
  });

  it('should not expose domain properties in DTO', () => {
    repository.addPokemon(25, 'pikachu', 'https://example.com/25.png');

    const result = useCase.execute();

    expect(result[0]).not.toHaveProperty('equals');
    expect(result[0]).not.toHaveProperty('id.value');
  });
});

describe('AddToDreamTeamUseCase', () => {
  let repository: InMemoryDreamTeamRepository;
  let useCase: AddToDreamTeamUseCase;

  beforeEach(() => {
    repository = new InMemoryDreamTeamRepository();
    useCase = new AddToDreamTeamUseCase(repository);
  });

  it('should add a pokemon to the team', () => {
    const result = useCase.execute({ id: 25, name: 'pikachu', spriteUrl: 'https://example.com/25.png' });

    expect(result).toBe(true);
    expect(repository.getAll()).toHaveLength(1);
  });

  it('should create DreamTeamPokemon with correct values', () => {
    useCase.execute({ id: 25, name: 'PIKACHU', spriteUrl: 'https://example.com/25.png' });

    const team = repository.getAll();
    expect(team[0].id.value).toBe(25);
    expect(team[0].name.value).toBe('pikachu');
    expect(team[0].spriteUrl).toBe('https://example.com/25.png');
  });

  it('should throw DreamTeamFullError when team is full', () => {
    for (let i = 1; i <= 10; i++) {
      repository.addPokemon(i, `pokemon-${i}`, `https://example.com/${i}.png`);
    }

    expect(() => useCase.execute({ id: 11, name: 'pokemon-11', spriteUrl: 'https://example.com/11.png' }))
      .toThrow(DreamTeamFullError);
  });

  it('should throw DreamTeamDuplicateError when adding duplicate', () => {
    useCase.execute({ id: 25, name: 'pikachu', spriteUrl: 'https://example.com/25.png' });

    expect(() => useCase.execute({ id: 25, name: 'pikachu', spriteUrl: 'https://example.com/25.png' }))
      .toThrow(DreamTeamDuplicateError);
  });

  it('should reject invalid id (zero)', () => {
    expect(() => useCase.execute({ id: 0, name: 'pikachu', spriteUrl: 'https://example.com/0.png' }))
      .toThrow('PokemonId must be a positive integer');
  });

  it('should reject empty name', () => {
    expect(() => useCase.execute({ id: 25, name: '', spriteUrl: 'https://example.com/25.png' }))
      .toThrow('PokemonName cannot be empty');
  });
});

describe('RemoveFromDreamTeamUseCase', () => {
  let repository: InMemoryDreamTeamRepository;
  let useCase: RemoveFromDreamTeamUseCase;

  beforeEach(() => {
    repository = new InMemoryDreamTeamRepository();
    useCase = new RemoveFromDreamTeamUseCase(repository);
  });

  it('should remove a pokemon by name', () => {
    repository.addPokemon(25, 'pikachu', 'https://example.com/25.png');
    repository.addPokemon(6, 'charizard', 'https://example.com/6.png');

    useCase.execute('pikachu');

    expect(repository.getAll()).toHaveLength(1);
    expect(repository.has(new PokemonName('charizard'))).toBe(true);
    expect(repository.has(new PokemonName('pikachu'))).toBe(false);
  });

  it('should handle removing non-existent pokemon gracefully', () => {
    useCase.execute('missingno');

    expect(repository.getAll()).toHaveLength(0);
  });

  it('should convert name to lowercase', () => {
    repository.addPokemon(25, 'pikachu', 'https://example.com/25.png');

    useCase.execute('PIKACHU');

    expect(repository.has('pikachu')).toBe(false);
  });
});

describe('IsInDreamTeamUseCase', () => {
  let repository: InMemoryDreamTeamRepository;
  let useCase: IsInDreamTeamUseCase;

  beforeEach(() => {
    repository = new InMemoryDreamTeamRepository();
    useCase = new IsInDreamTeamUseCase(repository);
  });

  it('should return true when pokemon is in team', () => {
    repository.addPokemon(25, 'pikachu', 'https://example.com/25.png');

    const result = useCase.execute('pikachu');

    expect(result).toBe(true);
  });

  it('should return false when pokemon is not in team', () => {
    const result = useCase.execute('missingno');

    expect(result).toBe(false);
  });

  it('should be case-insensitive', () => {
    repository.addPokemon(25, 'pikachu', 'https://example.com/25.png');

    expect(useCase.execute('PIKACHU')).toBe(true);
    expect(useCase.execute('Pikachu')).toBe(true);
  });
});
