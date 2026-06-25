import { describe, it, expect } from 'vitest';
import { toPokemonListItemDto, toPokemonDetailDto } from '../PokemonDto';
import { Pokemon, PokemonStat, PokemonAbility, PokemonMove, PokemonMoveDetail } from '../../../domain/entities/Pokemon';
import { PokemonId } from '../../../domain/value-objects/PokemonId';
import { PokemonName } from '../../../domain/value-objects/PokemonName';
import { PokemonTypeName } from '../../../domain/value-objects/PokemonTypeName';
import { PokemonStatName } from '../../../domain/value-objects/PokemonStatName';

describe('Pokemon DTO Mappers', () => {
const createTestPokemon = (overrides?: Partial<{
    id: number;
    name: string;
    spriteUrl: string;
    types: string[];
    height: number;
    weight: number;
    stats: { name: string; baseValue: number }[];
    abilities: { name: string; isHidden: boolean }[];
    speciesUrl: string;
    moves: { name: string; versionGroupDetails: { levelLearnedAt: number; learnMethodName: string; versionGroupName: string }[] }[];
}>): Pokemon => {
    return new Pokemon({
    id: new PokemonId(overrides?.id ?? 25),
    name: new PokemonName(overrides?.name ?? 'pikachu'),
    spriteUrl: overrides?.spriteUrl ?? 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    types: (overrides?.types ?? ['electric']).map((t) => new PokemonTypeName(t)),
    height: overrides?.height ?? 4,
    weight: overrides?.weight ?? 60,
    stats: (overrides?.stats ?? [{ name: 'hp', baseValue: 35 }, { name: 'attack', baseValue: 55 }]).map(
        (s) => new PokemonStat(new PokemonStatName(s.name), s.baseValue)
    ),
    abilities: (overrides?.abilities ?? [{ name: 'static', isHidden: false }]).map(
        (a) => new PokemonAbility(a.name, a.isHidden)
    ),
    speciesUrl: overrides?.speciesUrl ?? 'https://pokeapi.co/api/v2/pokemon-species/25/',
    moves: (overrides?.moves ?? [
        {
        name: 'thunder-shock',
        versionGroupDetails: [{ levelLearnedAt: 1, learnMethodName: 'level-up', versionGroupName: 'red-blue' }],
        },
    ]).map(
        (m) =>
        new PokemonMove(
            m.name,
            m.versionGroupDetails.map((d) => new PokemonMoveDetail(d.levelLearnedAt, d.learnMethodName, d.versionGroupName))
        )
    ),
    });
};

describe('toPokemonListItemDto', () => {
    it('should map basic fields correctly', () => {
    const pokemon = createTestPokemon({ id: 150, name: 'mewtwo', height: 20, weight: 1220 });
    const dto = toPokemonListItemDto(pokemon);

    expect(dto.id).toBe(150);
    expect(dto.name).toBe('mewtwo');
    expect(dto.height).toBe(20);
    expect(dto.weight).toBe(1220);
    });

    it('should extract spriteUrl unchanged', () => {
    const url = 'https://example.com/custom-sprite.png';
    const pokemon = createTestPokemon({ spriteUrl: url });
    const dto = toPokemonListItemDto(pokemon);

    expect(dto.spriteUrl).toBe(url);
    });

    it('should map types to array of strings', () => {
    const pokemon = createTestPokemon({ types: ['electric', 'fairy'] });
    const dto = toPokemonListItemDto(pokemon);

    expect(dto.types).toEqual(['electric', 'fairy']);
    expect(dto.types).toHaveLength(2);
    });

    it('should map single type correctly', () => {
    const pokemon = createTestPokemon({ types: ['normal'] });
    const dto = toPokemonListItemDto(pokemon);

    expect(dto.types).toEqual(['normal']);
    expect(dto.types).toHaveLength(1);
    });

    it('should map stats to plain objects with name and baseValue', () => {
    const pokemon = createTestPokemon({
        stats: [
        { name: 'hp', baseValue: 35 },
        { name: 'attack', baseValue: 55 },
        { name: 'defense', baseValue: 40 },
        ],
    });
    const dto = toPokemonListItemDto(pokemon);

    expect(dto.stats).toEqual([
        { name: 'hp', baseValue: 35 },
        { name: 'attack', baseValue: 55 },
        { name: 'defense', baseValue: 40 },
    ]);
    });

    it('should map abilities with isHidden flag', () => {
    const pokemon = createTestPokemon({
        abilities: [
        { name: 'static', isHidden: false },
        { name: 'lightning-rod', isHidden: true },
        ],
    });
    const dto = toPokemonListItemDto(pokemon);

    expect(dto.abilities).toEqual([
        { name: 'static', isHidden: false },
        { name: 'lightning-rod', isHidden: true },
    ]);
    });

    it('should return exactly 8 fields', () => {
    const pokemon = createTestPokemon();
    const dto = toPokemonListItemDto(pokemon);

    expect(Object.keys(dto)).toHaveLength(8);
    expect(dto).toHaveProperty('id');
    expect(dto).toHaveProperty('name');
    expect(dto).toHaveProperty('spriteUrl');
    expect(dto).toHaveProperty('types');
    expect(dto).toHaveProperty('height');
    expect(dto).toHaveProperty('weight');
    expect(dto).toHaveProperty('stats');
    expect(dto).toHaveProperty('abilities');
    });
});

describe('toPokemonDetailDto', () => {
    it('should include all list item fields', () => {
    const pokemon = createTestPokemon();
    const dto = toPokemonDetailDto(pokemon);

    expect(dto.id).toBe(25);
    expect(dto.name).toBe('pikachu');
    expect(dto.spriteUrl).toBeDefined();
    expect(dto.types).toEqual(['electric']);
    expect(dto.height).toBe(4);
    expect(dto.weight).toBe(60);
    expect(dto.stats).toHaveLength(2);
    expect(dto.abilities).toHaveLength(1);
    });

    it('should map speciesUrl correctly', () => {
    const url = 'https://pokeapi.co/api/v2/pokemon-species/150/';
    const pokemon = createTestPokemon({ speciesUrl: url });
    const dto = toPokemonDetailDto(pokemon);

    expect(dto.speciesUrl).toBe(url);
    });

    it('should map moves with nested versionGroupDetails', () => {
    const pokemon = createTestPokemon({
        moves: [
        {
            name: 'tackle',
            versionGroupDetails: [
            { levelLearnedAt: 1, learnMethodName: 'level-up', versionGroupName: 'red-blue' },
            { levelLearnedAt: 5, learnMethodName: 'level-up', versionGroupName: 'yellow' },
            ],
        },
        ],
    });
    const dto = toPokemonDetailDto(pokemon);

    expect(dto.moves).toHaveLength(1);
    expect(dto.moves[0].name).toBe('tackle');
    expect(dto.moves[0].versionGroupDetails).toHaveLength(2);
    expect(dto.moves[0].versionGroupDetails[0]).toEqual({
        levelLearnedAt: 1,
        learnMethodName: 'level-up',
        versionGroupName: 'red-blue',
    });
    expect(dto.moves[0].versionGroupDetails[1]).toEqual({
        levelLearnedAt: 5,
        learnMethodName: 'level-up',
        versionGroupName: 'yellow',
    });
    });

    it('should return exactly 10 fields', () => {
    const pokemon = createTestPokemon();
    const dto = toPokemonDetailDto(pokemon);

    expect(Object.keys(dto)).toHaveLength(10);
    expect(dto).toHaveProperty('speciesUrl');
    expect(dto).toHaveProperty('moves');
    });

    it('should handle empty moves array', () => {
    const pokemon = createTestPokemon({ moves: [] });
    const dto = toPokemonDetailDto(pokemon);

    expect(dto.moves).toEqual([]);
    });
});

describe('edge cases', () => {
    it('should handle zero height and weight', () => {
    const pokemon = createTestPokemon({ height: 0, weight: 0 });
    const dto = toPokemonListItemDto(pokemon);

    expect(dto.height).toBe(0);
    expect(dto.weight).toBe(0);
    });

    it('should handle empty types array', () => {
    const pokemon = createTestPokemon({ types: [] });
    const dto = toPokemonListItemDto(pokemon);

    expect(dto.types).toEqual([]);
    });

    it('should handle empty stats array', () => {
    const pokemon = createTestPokemon({ stats: [] });
    const dto = toPokemonListItemDto(pokemon);

    expect(dto.stats).toEqual([]);
    });

    it('should handle empty abilities array', () => {
    const pokemon = createTestPokemon({ abilities: [] });
    const dto = toPokemonListItemDto(pokemon);

    expect(dto.abilities).toEqual([]);
    });

    it('should handle single stat', () => {
    const pokemon = createTestPokemon({ stats: [{ name: 'hp', baseValue: 10 }] });
    const dto = toPokemonListItemDto(pokemon);

    expect(dto.stats).toEqual([{ name: 'hp', baseValue: 10 }]);
    });

    it('should handle single ability', () => {
    const pokemon = createTestPokemon({ abilities: [{ name: 'overgrow', isHidden: false }] });
    const dto = toPokemonListItemDto(pokemon);

    expect(dto.abilities).toEqual([{ name: 'overgrow', isHidden: false }]);
    });
});
});
