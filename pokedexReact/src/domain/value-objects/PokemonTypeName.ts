export class PokemonTypeName {
  readonly value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('PokemonTypeName cannot be empty');
    }
    this.value = value.trim().toLowerCase();
  }

  toString(): string {
    return this.value;
  }

  equals(other: PokemonTypeName): boolean {
    return this.value === other.value;
  }

  cssClass(): string {
    return `${this.value.charAt(0).toUpperCase()}${this.value.slice(1)}`;
  }
}
