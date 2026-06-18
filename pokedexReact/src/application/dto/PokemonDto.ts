import { Pokemon } from '../../domain/entities/Pokemon';

export interface PokemonListItemDto {
  readonly id: number;
  readonly name: string;
  readonly spriteUrl: string;
  readonly types: ReadonlyArray<string>;
  readonly height: number;
  readonly weight: number;
  readonly stats: ReadonlyArray<{ name: string; baseValue: number }>;
  readonly abilities: ReadonlyArray<{ name: string; isHidden: boolean }>;
}

export interface PokemonDetailDto extends PokemonListItemDto {
  readonly speciesUrl: string;
  readonly moves: ReadonlyArray<{
    readonly name: string;
    readonly versionGroupDetails: ReadonlyArray<{
      readonly levelLearnedAt: number;
      readonly learnMethodName: string;
      readonly versionGroupName: string;
    }>;
  }>;
}

export function toPokemonListItemDto(pokemon: Pokemon): PokemonListItemDto {
  return {
    id: pokemon.id.value,
    name: pokemon.name.value,
    spriteUrl: pokemon.spriteUrl,
    types: pokemon.types.map((t) => t.value),
    height: pokemon.height,
    weight: pokemon.weight,
    stats: pokemon.stats.map((s) => ({ name: s.name.value, baseValue: s.baseValue })),
    abilities: pokemon.abilities.map((a) => ({ name: a.name, isHidden: a.isHidden })),
  };
}

export function toPokemonDetailDto(pokemon: Pokemon): PokemonDetailDto {
  return {
    ...toPokemonListItemDto(pokemon),
    speciesUrl: pokemon.speciesUrl,
    moves: pokemon.moves.map((m) => ({
      name: m.name,
      versionGroupDetails: m.versionGroupDetails.map((d) => ({
        levelLearnedAt: d.levelLearnedAt,
        learnMethodName: d.learnMethodName,
        versionGroupName: d.versionGroupName,
      })),
    })),
  };
}
