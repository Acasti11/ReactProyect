import React from "react";
import type * as Types from "../../types/PokemonType";
import { PokemonInfoTypes } from "./PokeTypes";
import { PokemonInfo } from "./PokemonInfo";
import { EvolutionSection } from "./PokemonEvolution";
import { toTypeClass } from "../../utils/pokemon";
import "../../styles/nomalStyles/pokeType.css";
import "../../styles/nomalStyles/pokeinfo.css"


type Props = {
    pokemon: Types.Pokemon;
};

export const PokemonHeader: React.FC<Props> = ({pokemon,}) => {
    return (
        <header
        id="poke_header"
        className={`poke_header ${toTypeClass(pokemon.types[0]!.type.name)}`}
        >
        <h1 className="poke_name">
            {pokemon.name}
        </h1>

        <PokemonInfoTypes pokemon={pokemon} />

        <PokemonInfo pokemon={pokemon} />

        <EvolutionSection pokemon={pokemon} />
        </header>
    );
};

