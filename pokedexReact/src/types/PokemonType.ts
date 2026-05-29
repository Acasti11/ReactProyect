
export type PokemonType = {
  type: { name: string };
};

export type PokemonStat = {
  base_stat: number;
  stat: { name: string };
};

export type PokemonAbility = {
  ability: { name: string };
  is_hidden: boolean;
};

export type PokemonMoveDetail = {
  level_learned_at: number;
  move_learn_method: { name: string };
  version_group?: { name: string };
};

export type PokemonMove = {
  move: { name: string };
  version_group_details: PokemonMoveDetail[];
};

export type PokemonOfficialArtwork = {
  front_default: string;
};

export type PokemonOtherSprites = {
  "official-artwork": PokemonOfficialArtwork;
};

export type PokemonSprites = {
  other: PokemonOtherSprites;
};

export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  species: { url: string };
  sprites: PokemonSprites;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  moves: PokemonMove[];
};

export type MoveSectionType = "tm" | "egg" | "tutor";