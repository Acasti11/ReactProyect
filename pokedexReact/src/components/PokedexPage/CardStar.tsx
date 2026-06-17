import React, { useEffect, useState } from "react";
import type * as Types from "../../types/PokemonType";
import {
  hasDreamTeamPokemon,
  addDreamTeamPokemon,
  removeDreamTeamPokemon,
} from "../../utils/pokemon";
import "../../styles/nomalStyles/pokeCard.css";


type Props = {
  pokemon: Types.Pokemon;
};

export const CardStar: React.FC<Props> = ({ pokemon }) => {
  const [isStarred, setIsStarred] = useState(
    hasDreamTeamPokemon(pokemon.name)
  );

  useEffect(() => {
    const syncStarState = (): void => {
      setIsStarred(hasDreamTeamPokemon(pokemon.name));
    };

    window.addEventListener("dreamteam:updated", syncStarState as EventListener);
    window.addEventListener("storage", syncStarState);

    return () => {
      window.removeEventListener("dreamteam:updated", syncStarState as EventListener);
      window.removeEventListener("storage", syncStarState);
    };
  }, [pokemon.name]);

  const handleStarClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isStarred) {
      const added = addDreamTeamPokemon({
        id: pokemon.id,
        name: pokemon.name,
        sprite: pokemon.sprites.other["official-artwork"].front_default,
      });
      if (added) {
        setIsStarred(true);
      }
    } else {
      removeDreamTeamPokemon(pokemon.name);
      setIsStarred(false);
    }
  };

  return (
    <button
      className="star_li"
      type="button"
      onClick={handleStarClick}
      title={isStarred ? "Remove from Dream Team" : "Add to Dream Team"}
    >
      <span className="star">{isStarred ? "⭐" : "☆"}</span>
    </button>
  );
};
