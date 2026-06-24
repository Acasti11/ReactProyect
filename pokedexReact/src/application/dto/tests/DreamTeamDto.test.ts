import { describe, it, expect } from 'vitest';
import { toDreamTeamPokemonDto } from '../DreamTeamDto';
import { DreamTeamPokemon } from '../../../domain/entities/DreamTeamPokemon';
import { PokemonId } from '../../../domain/value-objects/PokemonId';
import { PokemonName } from '../../../domain/value-objects/PokemonName';

describe('toDreamTeamPokemonDto', () => {
    const createTestDreamTeamPokemon = (overrides?: Partial<{ id: number; name: string; spriteUrl: string }>): DreamTeamPokemon => {
        return new DreamTeamPokemon({
        id: new PokemonId(overrides?.id ?? 25),
        name: new PokemonName(overrides?.name ?? 'Pikachu'),
        spriteUrl: overrides?.spriteUrl ?? 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        });
    };

    describe('field mapping', () => {
        it('should extract number from PokemonId', () => {
        const pokemon = createTestDreamTeamPokemon({ id: 150 });
        const dto = toDreamTeamPokemonDto(pokemon);

        expect(dto.id).toBe(150);
        expect(typeof dto.id).toBe('number');
        });

        it('should extract string from PokemonName', () => {
        const pokemon = createTestDreamTeamPokemon({ name: 'Mewtwo' });
        const dto = toDreamTeamPokemonDto(pokemon);

        expect(dto.name).toBe('mewtwo');
        expect(typeof dto.name).toBe('string');
        });

        it('should pass spriteUrl unchanged', () => {
        const url = 'https://example.com/my-sprite.png';
        const pokemon = createTestDreamTeamPokemon({ spriteUrl: url });
        const dto = toDreamTeamPokemonDto(pokemon);

        expect(dto.spriteUrl).toBe(url);
        });
    });

    describe('return type', () => {
        it('should return exactly 3 fields from the DTO', () => {
        const pokemon = createTestDreamTeamPokemon();
        const dto = toDreamTeamPokemonDto(pokemon);

        expect(dto).toHaveProperty('id');
        expect(dto).toHaveProperty('name');
        expect(dto).toHaveProperty('spriteUrl');
        expect(Object.keys(dto)).toHaveLength(3);
        });

        it('should not expose domain properties', () => {
        const pokemon = createTestDreamTeamPokemon();
        const dto = toDreamTeamPokemonDto(pokemon);

        expect(dto).not.toHaveProperty('id.value');
        expect(dto).not.toHaveProperty('name.value');
        });
    });

    describe('corner cases', () => {
        it('should handle id 0', () => {
            expect(()=>{
                createTestDreamTeamPokemon({ id: 0 });
            }).toThrow('PokemonId must be a positive integer');
        });

        it('should handle empty name', () => {
            expect(() => {
                createTestDreamTeamPokemon({ name: '' });
            }).toThrow('PokemonName cannot be empty');
        });

        it('should handle empty spriteUrl', () => {
            const pokemon = createTestDreamTeamPokemon({ spriteUrl: '' });
            const dto = toDreamTeamPokemonDto(pokemon);

            expect(dto.spriteUrl).toBe('');
        });

        it('should handle very long name', () => {
            const longName = 'A'.repeat(100);
            const pokemon = createTestDreamTeamPokemon({ name: longName });
            const dto = toDreamTeamPokemonDto(pokemon);

            expect(dto.name).toBe(longName.toLowerCase());
        });
    });

    describe('consistency with original entity', () => {
        it('should not change when original Pokemon is mutated', () => {
        const pokemon = createTestDreamTeamPokemon({ name: 'Original' });
        const dto = toDreamTeamPokemonDto(pokemon);

        (pokemon as any).name = new PokemonName('Mutated');

        expect(dto.name).toBe('original');
        });
    });
});