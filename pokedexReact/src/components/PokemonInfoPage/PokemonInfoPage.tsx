import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type * as Types from "../../types/PokemonType";
import { getPokemon } from "../../Services/PokeApi";
import { PokemonHeader } from "./PokemonHeader";
import { PokemonContent } from "./PokemonContent";
import "../../styles/nomalStyles/pokeinfo.css"
import "../../styles/nomalStyles/pokeType.css";

export const PokemonInfoPage = () => {
    const { name } = useParams<{ name: string }>();

    const [pokemon, setPokemon] =
        useState<Types.Pokemon | null>(null);

    useEffect(() => {
        if (!name) return;

        const load = async () => {
            const data = await getPokemon(name);
            setPokemon(data);
        };

        load();
    }, [name]);

    if (!pokemon) return <p>Loading...</p>;

    return (
        <main className="main_poke">
            <PokemonHeader pokemon={pokemon} />
            <PokemonContent pokemon={pokemon} />
        </main>
    );
};
