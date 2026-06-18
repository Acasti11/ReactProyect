export class PokemonId {
  readonly value: number;

  constructor(value: number) {
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error('PokemonId must be a positive integer');
    }
    this.value = value;
  }

  toString(): string {
    return this.value.toString();
  }

  equals(other: PokemonId): boolean {
    return this.value === other.value;
  }
}
