import React from "react";
import type { DreamTeamPokemon } from "../../utils/pokemon";

type Props = {
    pokemon: DreamTeamPokemon;
    index: number;
};

export const DreamPokemonImage: React.FC<Props> = ({pokemon,index,}) => {
    return (
        <img
            className={`dream-pokemon dream-pokemon--${index + 1}`}
            src={pokemon.sprite}
            alt={pokemon.name}
            title={pokemon.name}
        />
        );
};