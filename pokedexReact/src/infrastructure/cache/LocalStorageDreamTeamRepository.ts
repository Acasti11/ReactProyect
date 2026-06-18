import type { DreamTeamRepository } from '../../domain/repositories/DreamTeamRepository';
import { DreamTeamPokemon } from '../../domain/entities/DreamTeamPokemon';
import { PokemonName } from '../../domain/value-objects/PokemonName';
import { PokemonId } from '../../domain/value-objects/PokemonId';
import { DreamTeamFullError, DreamTeamDuplicateError } from '../../domain/errors/PokemonErrors';

const STORAGE_KEY = 'dreamTeam';

interface StoredPokemon {
  id: number;
  name: string;
  spriteUrl: string;
}

export class LocalStorageDreamTeamRepository implements DreamTeamRepository {
  private readonly maxSize = 10;

  getAll(): ReadonlyArray<DreamTeamPokemon> {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    try {
      const parsed: StoredPokemon[] = JSON.parse(stored);
      return parsed.map(
        (p) =>
          new DreamTeamPokemon({
            id: new PokemonId(p.id),
            name: new PokemonName(p.name),
            spriteUrl: p.spriteUrl,
          })
      );
    } catch {
      return [];
    }
  }

  add(pokemon: DreamTeamPokemon): boolean {
    const team = [...this.getAll()];
    if (team.length >= this.maxSize) {
      throw new DreamTeamFullError();
    }
    if (team.some((p) => p.name.value === pokemon.name.value)) {
      throw new DreamTeamDuplicateError(pokemon.name.value);
    }
    team.push(pokemon);
    this.save(team);
    this.notifyUpdate();
    return true;
  }

  remove(name: PokemonName): void {
    const team = this.getAll().filter((p) => p.name.value !== name.value);
    this.save(team);
    this.notifyUpdate();
  }

  has(name: PokemonName): boolean {
    return this.getAll().some((p) => p.name.value === name.value);
  }

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.notifyUpdate();
  }

  private save(team: ReadonlyArray<DreamTeamPokemon>): void {
    const toStore: StoredPokemon[] = team.map((p) => ({
      id: p.id.value,
      name: p.name.value,
      spriteUrl: p.spriteUrl,
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  }

  private notifyUpdate(): void {
    window.dispatchEvent(new CustomEvent('dreamteam:updated'));
  }
}
