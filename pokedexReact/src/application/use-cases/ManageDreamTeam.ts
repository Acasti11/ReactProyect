import type { DreamTeamRepository } from '../../domain/repositories/DreamTeamRepository';
import { DreamTeamPokemon } from '../../domain/entities/DreamTeamPokemon';
import { PokemonId } from '../../domain/value-objects/PokemonId';
import { PokemonName } from '../../domain/value-objects/PokemonName';
import { toDreamTeamPokemonDto } from '../dto/DreamTeamDto';
import type { DreamTeamPokemonDto } from '../dto/DreamTeamDto';

export class GetDreamTeamUseCase {
  private readonly dreamTeamRepository: DreamTeamRepository;

  constructor(dreamTeamRepository: DreamTeamRepository) {
    this.dreamTeamRepository = dreamTeamRepository;
  }

  execute(): ReadonlyArray<DreamTeamPokemonDto> {
    const team = this.dreamTeamRepository.getAll();
    return team.map(toDreamTeamPokemonDto);
  }
}

export class AddToDreamTeamUseCase {
  private readonly dreamTeamRepository: DreamTeamRepository;

  constructor(dreamTeamRepository: DreamTeamRepository) {
    this.dreamTeamRepository = dreamTeamRepository;
  }

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
  private readonly dreamTeamRepository: DreamTeamRepository;

  constructor(dreamTeamRepository: DreamTeamRepository) {
    this.dreamTeamRepository = dreamTeamRepository;
  }

  execute(name: string): void {
    const pokemonName = new PokemonName(name);
    this.dreamTeamRepository.remove(pokemonName);
  }
}

export class IsInDreamTeamUseCase {
  private readonly dreamTeamRepository: DreamTeamRepository;

  constructor(dreamTeamRepository: DreamTeamRepository) {
    this.dreamTeamRepository = dreamTeamRepository;
  }

  execute(name: string): boolean {
    const pokemonName = new PokemonName(name);
    return this.dreamTeamRepository.has(pokemonName);
  }
}
