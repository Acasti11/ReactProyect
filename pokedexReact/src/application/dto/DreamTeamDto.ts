import { DreamTeamPokemon } from '../../domain/entities/DreamTeamPokemon';

export interface DreamTeamPokemonDto {
  readonly id: number;
  readonly name: string;
  readonly spriteUrl: string;
}

export function toDreamTeamPokemonDto(pokemon: DreamTeamPokemon): DreamTeamPokemonDto {
  return {
    id: pokemon.id.value,
    name: pokemon.name.value,
    spriteUrl: pokemon.spriteUrl,
  };
}
