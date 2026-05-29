import React from "react";
import type * as Types from "../../types/PokemonType";
import "../../styles/nomalStyles/pokeCard.css";
import "../../styles/nomalStyles/pokeType.css";


type Props ={
    pokemon:Types.Pokemon
}

export const CardImage: React.FC<Props> = ({ pokemon }) => {
    return (
        <img className="pokeCard_image" src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
    );
};
