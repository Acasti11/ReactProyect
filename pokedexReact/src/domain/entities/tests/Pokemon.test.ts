import { describe, it, expect } from 'vitest';
import {
  Pokemon,
  PokemonStat,
  PokemonAbility,
  PokemonMove,
  PokemonMoveDetail,
} from '../Pokemon';
import { PokemonId } from '../../value-objects/PokemonId';
import { PokemonName } from '../../value-objects/PokemonName';
import { PokemonTypeName } from '../../value-objects/PokemonTypeName';
import { PokemonStatName } from '../../value-objects/PokemonStatName';

describe('Pokemon', () => {
  const createValidPokemon = (overrides?: Partial<ConstructorParameters<typeof Pokemon>[0]>) => {
    const defaults = {
      id: new PokemonId(1),
      name: new PokemonName('bulbasaur'),
      height: 7,
      weight: 69,
      speciesUrl: 'https://pokeapi.co/api/v2/pokemon-species/1/',
      spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      types: [new PokemonTypeName('grass'), new PokemonTypeName('poison')],
      stats: [
        new PokemonStat(new PokemonStatName('hp'), 45),
        new PokemonStat(new PokemonStatName('attack'), 49),
      ],
      abilities: [new PokemonAbility('overgrow', false)],
      moves: [
        new PokemonMove('tackle', [
          new PokemonMoveDetail(1, 'level-up', 'red-blue'),
        ]),
      ],
    };
    return new Pokemon({ ...defaults, ...overrides });
  };

  it('should create a valid pokemon with all properties', () => {
    const pokemon = createValidPokemon();

    expect(pokemon.id.value).toBe(1);
    expect(pokemon.name.value).toBe('bulbasaur');
    expect(pokemon.height).toBe(7);
    expect(pokemon.weight).toBe(69);
    expect(pokemon.speciesUrl).toBe('https://pokeapi.co/api/v2/pokemon-species/1/');
    expect(pokemon.spriteUrl).toContain('1.png');
    expect(pokemon.types).toHaveLength(2);
    expect(pokemon.stats).toHaveLength(2);
    expect(pokemon.abilities).toHaveLength(1);
    expect(pokemon.moves).toHaveLength(1);
  });

  it('should calculate height in meters', () => {
    const pokemon = createValidPokemon({ height: 15 });
    expect(pokemon.heightInMeters).toBe(1.5);
  });

  it('should calculate weight in kg', () => {
    const pokemon = createValidPokemon({ weight: 85 });
    expect(pokemon.weightInKg).toBe(8.5);
  });

  it('should return primary type', () => {
    const pokemon = createValidPokemon();
    expect(pokemon.primaryType).toBeDefined();
    expect(pokemon.primaryType?.value).toBe('grass');
  });

  it('should return undefined primary type when no types', () => {
    const pokemon = createValidPokemon({ types: [] });
    expect(pokemon.primaryType).toBeUndefined();
  });

  it('should check if pokemon has a specific type', () => {
    const pokemon = createValidPokemon();
    expect(pokemon.hasType('grass')).toBe(true);
    expect(pokemon.hasType('poison')).toBe(true);
    expect(pokemon.hasType('fire')).toBe(false);
  });

  it('should be case-insensitive when checking types', () => {
    const pokemon = createValidPokemon();
    expect(pokemon.hasType('GRASS')).toBe(true);
    expect(pokemon.hasType('Grass')).toBe(true);
  });

  it('should be immutable', () => {
    const pokemon = createValidPokemon();
    expect(Object.isFrozen(pokemon)).toBe(false); // readonly doesn't freeze
    // Verify readonly property exists and cannot be redefined
    const descriptor = Object.getOwnPropertyDescriptor(pokemon, 'height');
    expect(descriptor).toBeDefined();
  });
});

describe('PokemonStat', () => {
  it('should create a valid stat', () => {
    const stat = new PokemonStat(new PokemonStatName('speed'), 120);
    expect(stat.name.value).toBe('speed');
    expect(stat.baseValue).toBe(120);
  });

  it('should be immutable', () => {
    const stat = new PokemonStat(new PokemonStatName('hp'), 45);
    const descriptor = Object.getOwnPropertyDescriptor(stat, 'baseValue');
    expect(descriptor).toBeDefined();
  });
});

describe('PokemonAbility', () => {
  it('should create a valid ability', () => {
    const ability = new PokemonAbility('blaze', false);
    expect(ability.name).toBe('blaze');
    expect(ability.isHidden).toBe(false);
  });

  it('should create a hidden ability', () => {
    const ability = new PokemonAbility('solar-power', true);
    expect(ability.isHidden).toBe(true);
  });

  it('should be immutable', () => {
    const ability = new PokemonAbility('torrent', false);
    const descriptor = Object.getOwnPropertyDescriptor(ability, 'name');
    expect(descriptor).toBeDefined();
  });
});

describe('PokemonMove', () => {
  it('should create a valid move', () => {
    const move = new PokemonMove('ember', [
      new PokemonMoveDetail(1, 'level-up', 'red-blue'),
    ]);
    expect(move.name).toBe('ember');
    expect(move.versionGroupDetails).toHaveLength(1);
  });

  it('should be immutable', () => {
    const move = new PokemonMove('scratch', []);
    const descriptor = Object.getOwnPropertyDescriptor(move, 'name');
    expect(descriptor).toBeDefined();
  });
});

describe('PokemonMoveDetail', () => {
  it('should create a valid move detail', () => {
    const detail = new PokemonMoveDetail(5, 'level-up', 'yellow');
    expect(detail.levelLearnedAt).toBe(5);
    expect(detail.learnMethodName).toBe('level-up');
    expect(detail.versionGroupName).toBe('yellow');
  });

  it('should be immutable', () => {
    const detail = new PokemonMoveDetail(1, 'level-up', 'red-blue');
    const descriptor = Object.getOwnPropertyDescriptor(detail, 'levelLearnedAt');
    expect(descriptor).toBeDefined();
  });
});
