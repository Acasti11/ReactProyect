export class PokemonStatName {
  readonly value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('PokemonStatName cannot be empty');
    }
    this.value = value.trim().toLowerCase();
  }

  toString(): string {
    return this.value;
  }

  equals(other: PokemonStatName): boolean {
    return this.value === other.value;
  }

  abbreviation(): string {
    const map: Record<string, string> = {
      hp: 'HP',
      attack: 'ATK',
      defense: 'DEF',
      'sp. atk': 'SP.ATK',
      'sp. def': 'SP.DEF',
      speed: 'SPD',
    };
    return map[this.value] || this.value.toUpperCase();
  }
}
