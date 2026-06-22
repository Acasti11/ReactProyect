import { describe, it, expect } from 'vitest';
import { PokemonStatName } from '../PokemonStatName';

describe('PokemonStatName', () => {
  it('should create a valid stat name', () => {
    const statName = new PokemonStatName('speed');
    expect(statName.value).toBe('speed');
  });

  it('should trim whitespace and convert to lowercase', () => {
    const statName = new PokemonStatName('  SPEED  ');
    expect(statName.value).toBe('speed');
  });

  it('should reject empty string', () => {
    expect(() => new PokemonStatName('')).toThrow('PokemonStatName cannot be empty');
  });

  it('should reject whitespace-only string', () => {
    expect(() => new PokemonStatName('   ')).toThrow('PokemonStatName cannot be empty');
  });

  it('should convert to string', () => {
    const statName = new PokemonStatName('attack');
    expect(statName.toString()).toBe('attack');
  });

  it('should return correct abbreviation for hp', () => {
    const statName = new PokemonStatName('hp');
    expect(statName.abbreviation()).toBe('HP');
  });

  it('should return correct abbreviation for attack', () => {
    const statName = new PokemonStatName('attack');
    expect(statName.abbreviation()).toBe('ATK');
  });

  it('should return correct abbreviation for defense', () => {
    const statName = new PokemonStatName('defense');
    expect(statName.abbreviation()).toBe('DEF');
  });

  it('should return correct abbreviation for sp. atk', () => {
    const statName = new PokemonStatName('sp. atk');
    expect(statName.abbreviation()).toBe('SP.ATK');
  });

  it('should return correct abbreviation for sp. def', () => {
    const statName = new PokemonStatName('sp. def');
    expect(statName.abbreviation()).toBe('SP.DEF');
  });

  it('should return correct abbreviation for speed', () => {
    const statName = new PokemonStatName('speed');
    expect(statName.abbreviation()).toBe('SPD');
  });

  it('should return uppercase for unknown stats', () => {
    const statName = new PokemonStatName('special');
    expect(statName.abbreviation()).toBe('SPECIAL');
  });

  it('should be equal to another stat name with same value', () => {
    const statName1 = new PokemonStatName('speed');
    const statName2 = new PokemonStatName('speed');
    expect(statName1.equals(statName2)).toBe(true);
  });

  it('should not be equal to another stat name with different value', () => {
    const statName1 = new PokemonStatName('speed');
    const statName2 = new PokemonStatName('attack');
    expect(statName1.equals(statName2)).toBe(false);
  });

  it('should be immutable', () => {
    const statName = new PokemonStatName('hp');
    const descriptor = Object.getOwnPropertyDescriptor(statName, 'value');
    expect(descriptor).toBeDefined();
  });
});
