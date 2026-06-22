import { describe, it, expect } from 'vitest';
import { PokemonTypeName } from '../PokemonTypeName';

describe('PokemonTypeName', () => {
  it('should create a valid type name', () => {
    const typeName = new PokemonTypeName('fire');
    expect(typeName.value).toBe('fire');
  });

  it('should trim whitespace and convert to lowercase', () => {
    const typeName = new PokemonTypeName('  FIRE  ');
    expect(typeName.value).toBe('fire');
  });

  it('should reject empty string', () => {
    expect(() => new PokemonTypeName('')).toThrow('PokemonTypeName cannot be empty');
  });

  it('should reject whitespace-only string', () => {
    expect(() => new PokemonTypeName('   ')).toThrow('PokemonTypeName cannot be empty');
  });

  it('should convert to string', () => {
    const typeName = new PokemonTypeName('water');
    expect(typeName.toString()).toBe('water');
  });

  it('should generate correct css class', () => {
    const typeName = new PokemonTypeName('electric');
    expect(typeName.cssClass()).toBe('Electric');
  });

  it('should generate correct css class for single char', () => {
    const typeName = new PokemonTypeName('x');
    expect(typeName.cssClass()).toBe('X');
  });

  it('should be equal to another type name with same value', () => {
    const typeName1 = new PokemonTypeName('fire');
    const typeName2 = new PokemonTypeName('fire');
    expect(typeName1.equals(typeName2)).toBe(true);
  });

  it('should not be equal to another type name with different value', () => {
    const typeName1 = new PokemonTypeName('fire');
    const typeName2 = new PokemonTypeName('water');
    expect(typeName1.equals(typeName2)).toBe(false);
  });

  it('should be case-insensitive in equality', () => {
    const typeName1 = new PokemonTypeName('FIRE');
    const typeName2 = new PokemonTypeName('fire');
    expect(typeName1.equals(typeName2)).toBe(true);
  });

  it('should be immutable', () => {
    const typeName = new PokemonTypeName('grass');
    const descriptor = Object.getOwnPropertyDescriptor(typeName, 'value');
    expect(descriptor).toBeDefined();
  });
});
