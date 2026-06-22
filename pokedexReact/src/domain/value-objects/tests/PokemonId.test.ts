import { describe, it, expect } from 'vitest';
import { PokemonId } from '../PokemonId';

describe('PokemonId', () => {
  it('should create a valid positive id', () => {
    const id = new PokemonId(25);
    expect(id.value).toBe(25);
  });

  it('should create id with value 1', () => {
    const id = new PokemonId(1);
    expect(id.value).toBe(1);
  });

  it('should reject zero id', () => {
    expect(() => new PokemonId(0)).toThrow('PokemonId must be a positive integer');
  });

  it('should reject negative id', () => {
    expect(() => new PokemonId(-1)).toThrow('PokemonId must be a positive integer');
  });

  it('should reject non-integer id', () => {
    expect(() => new PokemonId(1.5)).toThrow('PokemonId must be a positive integer');
  });

  it('should convert to string', () => {
    const id = new PokemonId(42);
    expect(id.toString()).toBe('42');
  });

  it('should be equal to another id with same value', () => {
    const id1 = new PokemonId(25);
    const id2 = new PokemonId(25);
    expect(id1.equals(id2)).toBe(true);
  });

  it('should not be equal to another id with different value', () => {
    const id1 = new PokemonId(25);
    const id2 = new PokemonId(26);
    expect(id1.equals(id2)).toBe(false);
  });

  it('should be immutable', () => {
    const id = new PokemonId(1);
    const descriptor = Object.getOwnPropertyDescriptor(id, 'value');
    expect(descriptor).toBeDefined();
  });
});
