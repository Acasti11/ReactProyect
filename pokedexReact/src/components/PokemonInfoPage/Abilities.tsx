import React from "react";
import type * as Types from "../../types/PokemonType";
import "../../styles/nomalStyles/pokeinfo.css"
import "../../styles/nomalStyles/pokeType.css";

type Props = {
  pokemon: Types.Pokemon;
};

export const Abilities: React.FC<Props> = ({
  pokemon,
}) => {
  return (
    <section className="poke_abilities">
      <h2 className="section_title">
        Abilities
      </h2>

      <ul className="abilities_list">
        {pokemon.abilities.map((ability) => (
          <li
            key={ability.ability.name}
            className={`ability_item ${
              ability.is_hidden
                ? "ability_hidden"
                : ""
            }`}
          >
            {ability.ability.name}
          </li>
        ))}
      </ul>
    </section>
  );
};

