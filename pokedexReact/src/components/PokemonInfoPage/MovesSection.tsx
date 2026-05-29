import React from "react";
import type * as Types from "../../types/PokemonType";
import "../../styles/nomalStyles/pokeinfo.css"
import "../../styles/nomalStyles/pokeType.css";

type Props = {
    pokemon: Types.Pokemon;
    title: string;
    type: Types.MoveSectionType;
};

function formatLabel(value: string): string {
    return value
        .split("-")
        .map(
        (part) =>
            `${part.charAt(0).toUpperCase()}${part.slice(
            1
            )}`
        )
        .join(" ");
}

export const MovesSection: React.FC<Props> = ({pokemon,title,type,}) => {
    const methodMap: Record<
        Types.MoveSectionType,
        string
    > = {
        tm: "machine",
        egg: "egg",
        tutor: "tutor",
    };

    const targetMethod = methodMap[type];

    const filteredMoves: string[] = Array.from(
        new Set(
        (pokemon.moves || [])
            .filter((moveEntry) => {
            return (
                moveEntry.version_group_details || []
            ).some(
                (detail) =>
                detail.move_learn_method?.name ===
                targetMethod
            );
            })
            .map((moveEntry) => moveEntry.move?.name)
            .filter(
            (moveName): moveName is string =>
                Boolean(moveName)
            )
        )
    ).sort((a, b) => a.localeCompare(b));

    return (
        <section className={`poke_moves ${type}`}>
        <h2 className="section_title">
            {title}
        </h2>

        <ul className="moves_list">
            {filteredMoves.length > 0 ? (
            filteredMoves.map((moveName) => (
                <li
                key={moveName}
                className="move_item"
                >
                {formatLabel(moveName)}
                </li>
            ))
            ) : (
            <li className="move_item">
                No moves available
            </li>
            )}
        </ul>
        </section>
    );
};

