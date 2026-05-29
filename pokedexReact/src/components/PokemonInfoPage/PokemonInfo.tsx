import React from "react";
import type * as Types from "../../types/PokemonType";
import "../../styles/nomalStyles/pokeinfo.css"
import "../../styles/nomalStyles/pokeType.css";

type Props = {
    pokemon: Types.Pokemon;
};

export const PokemonInfo: React.FC<Props> = ({
    pokemon,
}) => {
    return (
        <div className="poke_info">
        <span className="poke_id">
            #{pokemon.id.toString().padStart(3, "0")}
        </span>

        <span className="poke_height">
            Height: {pokemon.height / 10} m
        </span>

        <span className="poke_weight">
            Weight: {pokemon.weight / 10} kg
        </span>
        </div>
    );
};

