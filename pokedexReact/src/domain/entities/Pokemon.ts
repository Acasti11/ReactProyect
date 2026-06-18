import { PokemonId } from '../value-objects/PokemonId';
import { PokemonName } from '../value-objects/PokemonName';
import { PokemonTypeName } from '../value-objects/PokemonTypeName';
import { PokemonStatName } from '../value-objects/PokemonStatName';

export class Pokemon {
  readonly id: PokemonId;
  readonly name: PokemonName;
  readonly height: number; // decimetros
  readonly weight: number; // hectogramos
  readonly speciesUrl: string;
  readonly spriteUrl: string;
  readonly types: ReadonlyArray<PokemonTypeName>;
  readonly stats: ReadonlyArray<PokemonStat>;
  readonly abilities: ReadonlyArray<PokemonAbility>;
  readonly moves: ReadonlyArray<PokemonMove>;

  constructor(props: {
    id: PokemonId;
    name: PokemonName;
    height: number;
    weight: number;
    speciesUrl: string;
    spriteUrl: string;
    types: ReadonlyArray<PokemonTypeName>;
    stats: ReadonlyArray<PokemonStat>;
    abilities: ReadonlyArray<PokemonAbility>;
    moves: ReadonlyArray<PokemonMove>;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.height = props.height;
    this.weight = props.weight;
    this.speciesUrl = props.speciesUrl;
    this.spriteUrl = props.spriteUrl;
    this.types = props.types;
    this.stats = props.stats;
    this.abilities = props.abilities;
    this.moves = props.moves;
  }

  get heightInMeters(): number {
    return this.height / 10;
  }

  get weightInKg(): number {
    return this.weight / 10;
  }

  get primaryType(): PokemonTypeName | undefined {
    return this.types[0];
  }

  hasType(typeName: string): boolean {
    return this.types.some((t) => t.value === typeName.toLowerCase());
  }
}

export class PokemonStat {
  readonly name: PokemonStatName;
  readonly baseValue: number;

  constructor(name: PokemonStatName, baseValue: number) {
    this.name = name;
    this.baseValue = baseValue;
  }
}

export class PokemonAbility {
  readonly name: string;
  readonly isHidden: boolean;

  constructor(name: string, isHidden: boolean) {
    this.name = name;
    this.isHidden = isHidden;
  }
}

export class PokemonMove {
  readonly name: string;
  readonly versionGroupDetails: ReadonlyArray<PokemonMoveDetail>;

  constructor(name: string, versionGroupDetails: ReadonlyArray<PokemonMoveDetail>) {
    this.name = name;
    this.versionGroupDetails = versionGroupDetails;
  }
}

export class PokemonMoveDetail {
  readonly levelLearnedAt: number;
  readonly learnMethodName: string;
  readonly versionGroupName: string;

  constructor(levelLearnedAt: number, learnMethodName: string, versionGroupName: string) {
    this.levelLearnedAt = levelLearnedAt;
    this.learnMethodName = learnMethodName;
    this.versionGroupName = versionGroupName;
  }
}
