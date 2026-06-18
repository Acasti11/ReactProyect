import { PokemonId } from '../value-objects/PokemonId';
import { PokemonName } from '../value-objects/PokemonName';

export class DreamTeamPokemon {
  readonly id: PokemonId;
  readonly name: PokemonName;
  readonly spriteUrl: string;

  constructor(props: {
    id: PokemonId;
    name: PokemonName;
    spriteUrl: string;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.spriteUrl = props.spriteUrl;
  }

  equals(other: DreamTeamPokemon): boolean {
    return this.id.equals(other.id);
  }
}
