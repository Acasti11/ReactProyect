import React, { useEffect, useState } from "react";
import type * as Types from "../../types/PokemonType";

import { getPokemon } from "../../Services/PokeApi";
import "../../styles/nomalStyles/pokeinfo.css"
import "../../styles/nomalStyles/pokeType.css";

type EvolutionChain = {
    species: { name: string };
    evolves_to: EvolutionChain[];
};

type Props = {
    pokemon: Types.Pokemon;
};

export const EvolutionSection: React.FC<Props> = ({pokemon,}) => {
    const [evolutions, setEvolutions] = useState<
        Types.Pokemon[]
    >([]);

    useEffect(() => {
        const getNames = (chain: EvolutionChain): string[] => {
            let result: string[] = [];

            result.push(chain.species.name);

            chain.evolves_to.forEach((evo: EvolutionChain) => {
            result = result.concat(getNames(evo));
            });

            return result;
        };

        const getMegaForms = async (basePokemon: Types.Pokemon): Promise<string[]> => {
            try {
                const speciesRes = await fetch(basePokemon.species.url);
                const species: {
                    varieties?: Array<{ pokemon: { name: string; url?: string } }>;
                } = await speciesRes.json();

                const megas: string[] = (species.varieties || [])
                    .map((v) => v.pokemon.name)
                    .filter((name) => name.includes("mega"));

                return megas;
            } catch (err) {
                console.error("Error fetching mega forms:", err);
                return [];
                
            }
        };

        const load = async () => {
            try {
                const speciesRes = await fetch(pokemon.species.url);
                const species = await speciesRes.json();

                const evoRes = await fetch(species.evolution_chain.url);
                const evo = await evoRes.json();

                let names = getNames(evo.chain);

                // try to include mega forms for the last evolution (if any)
                if (names.length > 0) {
                    const lastName = names[names.length - 1]!;
                    const lastPokemon = await getPokemon(lastName);
                    const megas = await getMegaForms(lastPokemon);
                    // append only non-duplicated mega names
                    const extra = megas.filter((m) => !names.includes(m));
                    names = names.concat(extra);
                }

                const data = await Promise.all(names.map((name) => getPokemon(name)));

                setEvolutions(data);
            } catch (err) {
                console.error(err);
            }
        };

        load();
    }, [pokemon]);

    return (
        <section className="poke_evolution">
        <h2 className="section_title">
            Evolution Chain
        </h2>

        <div className="evolution_chain">
            {evolutions.map((poke, index) => (
            <React.Fragment key={poke.id}>
                <div className="evolution_item">
                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`}
                    alt={poke.name}
                />
                <span>{poke.name}</span>
                </div>

                {index < evolutions.length - 1 && (
                <div className="evolution_arrow">
                    →
                </div>
                )}
            </React.Fragment>
            ))}
        </div>
        </section>
    );
};

