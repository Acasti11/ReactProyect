import { DreamTeamRepository } from '../../domain/repositories/DreamTeamRepository';
import { DreamTeamPokemon } from '../../domain/entities/DreamTeamPokemon';
import { PokemonId } from '../../domain/value-objects/PokemonId';
import { PokemonName } from '../../domain/value-objects/PokemonName';
import { DreamTeamPokemonDto, toDreamTeamPokemonDto } from '../dto/DreamTeamDto';

export class GetDreamTeamUseCase {
  constructor(private readonly dreamTeamRepository: DreamTeamRepository) {}

  execute(): ReadonlyArray<DreamTeamPokemonDto> {
    const team = this.dreamTeamRepository.getAll();
    return team.map(toDreamTeamPokemonDto);
  }
}

export class AddToDreamTeamUseCase {
  constructor(private readonly dreamTeamRepository: DreamTeamRepository) {}

  execute(props: { id: number; name: string; spriteUrl: string }): boolean {
    const pokemon = new DreamTeamPokemon({
      id: new PokemonId(props.id),
      name: new PokemonName(props.name),
      spriteUrl: props.spriteUrl,
    });
    return this.dreamTeamRepository.add(pokemon);
  }
}

export class RemoveFromDreamTeamUseCase {
  constructor(private readonly dreamTeamRepository: DreamTeamRepository) {}

  execute(name: string): void {
    const pokemonName = new PokemonName(name);
    this.dreamTeamRepository.remove(pokemonName);
  }
}

export class IsInDreamTeamUseCase {
  constructor(private readonly dreamTeamRepository: DreamTeamRepository) {}

  execute(name: string): boolean {
    const pokemonName = new PokemonName(name);
    return this.dreamTeamRepository.has(pokemonName);
  }
}
