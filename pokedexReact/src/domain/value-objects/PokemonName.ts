export class PokemonName {
  readonly value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('PokemonName cannot be empty');
    }
    this.value = value.trim().toLowerCase();
  }

  toString(): string {
    return this.value;
  }

  equals(other: PokemonName): boolean {
    return this.value === other.value;
  }

  display(): string {
    return this.value;
  }
}
