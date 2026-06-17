import React from "react";
import type { DreamTeamPokemon } from "../../utils/pokemon";

type Props = {
    pokemon: DreamTeamPokemon;
};

export const DreamThumbnail: React.FC<Props> = ({pokemon,}) => {
    return (
        <img
        className="dream-thumb"
        src={pokemon.sprite}
        alt={pokemon.name}
        title={pokemon.name}
        />
    );
};
