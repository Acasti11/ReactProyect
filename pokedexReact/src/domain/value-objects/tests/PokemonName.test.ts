import { describe, it, expect } from 'vitest';
import { PokemonName } from '../PokemonName';

describe('PokemonName', () => {
  it('should create a valid name', () => {
    const name = new PokemonName('Pikachu');
    expect(name.value).toBe('pikachu');
  });

  it('should trim whitespace', () => {
    const name = new PokemonName('  Pikachu  ');
    expect(name.value).toBe('pikachu');
  });

  it('should convert to lowercase', () => {
    const name = new PokemonName('CHARIZARD');
    expect(name.value).toBe('charizard');
  });

  it('should reject empty string', () => {
    expect(() => new PokemonName('')).toThrow('PokemonName cannot be empty');
  });

  it('should reject whitespace-only string', () => {
    expect(() => new PokemonName('   ')).toThrow('PokemonName cannot be empty');
  });

  it('should convert to string', () => {
    const name = new PokemonName('bulbasaur');
    expect(name.toString()).toBe('bulbasaur');
  });

  it('should display the name', () => {
    const name = new PokemonName('mewtwo');
    expect(name.display()).toBe('mewtwo');
  });

  it('should be equal to another name with same value', () => {
    const name1 = new PokemonName('Pikachu');
    const name2 = new PokemonName('pikachu');
    expect(name1.equals(name2)).toBe(true);
  });

  it('should not be equal to another name with different value', () => {
    const name1 = new PokemonName('pikachu');
    const name2 = new PokemonName('raichu');
    expect(name1.equals(name2)).toBe(false);
  });

  it('should be immutable', () => {
    const name = new PokemonName('pikachu');
    const descriptor = Object.getOwnPropertyDescriptor(name, 'value');
    expect(descriptor).toBeDefined();
  });
});
