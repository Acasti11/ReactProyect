import { Pokemon } from '../../../domain/entities/Pokemon';
import { PokemonId } from '../../../domain/value-objects/PokemonId';
import { PokemonName } from '../../../domain/value-objects/PokemonName';
import { PokemonTypeName } from '../../../domain/value-objects/PokemonTypeName';
import { PokemonStatName } from '../../../domain/value-objects/PokemonStatName';
import { PokemonDetailDto } from '../../../application/dto/PokemonDto';

export function dtoToPokemonEntity(dto: PokemonDetailDto): Pokemon {
  return new Pokemon({
    id: new PokemonId(dto.id),
    name: new PokemonName(dto.name),
    height: dto.height,
    weight: dto.weight,
    speciesUrl: dto.speciesUrl,
    spriteUrl: dto.spriteUrl,
    types: dto.types.map((t) => new PokemonTypeName(t)),
    stats: dto.stats.map((s) => ({
      name: new PokemonStatName(s.name),
      baseValue: s.baseValue,
    })),
    abilities: dto.abilities.map((a) => ({
      name: a.name,
      isHidden: a.isHidden,
    })),
    moves: dto.moves.map((m) => ({
      name: m.name,
      versionGroupDetails: m.versionGroupDetails.map((d) => ({
        levelLearnedAt: d.levelLearnedAt,
        learnMethodName: d.learnMethodName,
        versionGroupName: d.versionGroupName,
      })),
    })),
  });
}
