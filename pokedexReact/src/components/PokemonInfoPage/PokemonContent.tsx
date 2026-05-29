import React from "react";
import type * as Types from "../../types/PokemonType";

import PokemonLeft from "./PokemonLeft";
import PokemonRight from "./PokemonRigth";
import "../../styles/nomalStyles/pokeinfo.css"
import "../../styles/nomalStyles/pokeType.css";
import { toTypeClass } from "../../utils/pokemon";

type Props = {
    pokemon: Types.Pokemon;
};

export const PokemonContent: React.FC<Props> = ({
    pokemon,
    }) => {
    return (
        <section
        className={`poke_content ${toTypeClass(
            pokemon.types[0]?.type.name || ""
        )}`}
        >
        <PokemonLeft pokemon={pokemon} />
        <PokemonRight pokemon={pokemon} />
        </section>
    );
};

