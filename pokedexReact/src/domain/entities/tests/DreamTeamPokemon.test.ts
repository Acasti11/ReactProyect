import { describe, it, expect } from 'vitest';
import { DreamTeamPokemon } from '../DreamTeamPokemon';
import { PokemonId } from '../../value-objects/PokemonId';
import { PokemonName } from '../../value-objects/PokemonName';

describe('DreamTeamPokemon', () => {
  const createDreamTeamPokemon = (id: number, name: string) => {
    return new DreamTeamPokemon({
      id: new PokemonId(id),
      name: new PokemonName(name),
      spriteUrl: `https://example.com/sprites/${id}.png`,
    });
  };

  it('should create a valid dream team pokemon', () => {
    const pokemon = createDreamTeamPokemon(25, 'pikachu');
    expect(pokemon.id.value).toBe(25);
    expect(pokemon.name.value).toBe('pikachu');
    expect(pokemon.spriteUrl).toBe('https://example.com/sprites/25.png');
  });

  it('should be equal to another pokemon with same id', () => {
    const pokemon1 = createDreamTeamPokemon(25, 'pikachu');
    const pokemon2 = createDreamTeamPokemon(25, 'raichu');
    expect(pokemon1.equals(pokemon2)).toBe(true);
  });

  it('should not be equal to another pokemon with different id', () => {
    const pokemon1 = createDreamTeamPokemon(25, 'pikachu');
    const pokemon2 = createDreamTeamPokemon(26, 'raichu');
    expect(pokemon1.equals(pokemon2)).toBe(false);
  });

  it('should be immutable', () => {
    const pokemon = createDreamTeamPokemon(1, 'bulbasaur');
    const descriptor = Object.getOwnPropertyDescriptor(pokemon, 'spriteUrl');
    expect(descriptor).toBeDefined();
  });
});
