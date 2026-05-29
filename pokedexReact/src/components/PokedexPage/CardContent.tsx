import React from "react";
import type * as Types from "../../types/PokemonType";
import { CardStar } from "./CardStar";
import { PokemonTypes } from "./Types";
import { PhysicalInfo } from "./PhysicalInfo";
import { Stats } from "./Stats";
import "../../styles/nomalStyles/pokeCard.css";
import "../../styles/nomalStyles/pokeType.css";

type Props = {
  pokemon: Types.Pokemon;
};

export const CardContent: React.FC<Props> = ({ pokemon }) => {
  return (
    <section className="pokeCard_info">
      <CardStar pokemon={pokemon} />
      <PokemonTypes pokemon={pokemon} />
      <PhysicalInfo pokemon={pokemon} />
      <Stats pokemon={pokemon} />
    </section>
  );
};
