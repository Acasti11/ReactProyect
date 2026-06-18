export class PokemonNotFoundError extends Error {
  readonly identifier: string | number;

  constructor(identifier: string | number) {
    super(`Pokemon not found: ${identifier}`);
    this.name = 'PokemonNotFoundError';
    this.identifier = identifier;
  }
}

export class GenerationNotFoundError extends Error {
  readonly generation: number;

  constructor(generation: number) {
    super(`Generation not found: ${generation}`);
    this.name = 'GenerationNotFoundError';
    this.generation = generation;
  }
}

export class DreamTeamFullError extends Error {
  constructor() {
    super('Dream Team is full (max 10 Pokemon)');
    this.name = 'DreamTeamFullError';
  }
}

export class DreamTeamDuplicateError extends Error {
  readonly pokemonName: string;

  constructor(pokemonName: string) {
    super(`Pokemon already in Dream Team: ${pokemonName}`);
    this.name = 'DreamTeamDuplicateError';
    this.pokemonName = pokemonName;
  }
}
