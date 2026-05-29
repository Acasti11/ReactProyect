import React from "react";
import type * as Types from "../../types/PokemonType";
import "../../styles/nomalStyles/pokeCard.css";
import "../../styles/nomalStyles/pokeType.css";


type Props ={
    pokemon:Types.Pokemon
}

export const CardHeader: React.FC<Props> = ({ pokemon }) => {
    return (
        <header className="pokeCard_header">
            <h2 className="pokeCard_name">{pokemon.name}</h2>
            <p className="pokeCard_number">#{pokemon.id.toString().padStart(3, "0")}</p>
        </header>
    );
};
