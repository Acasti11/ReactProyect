import React from "react";
import type * as Types from "../../types/PokemonType";
import "../../styles/nomalStyles/pokeinfo.css"
import "../../styles/nomalStyles/pokeType.css";

type Props = {
    pokemon: Types.Pokemon;
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

interface NormalizedMove {
  moveName: string;
  level: number | string;
  method: string;
  sourceType: string;
}

export const MovesTable: React.FC<Props> = ({pokemon,}) => {
    const normalizedMoves: NormalizedMove[] =
    pokemon.moves
        .map((moveEntry) => {
        const details =
            moveEntry.version_group_details || [];

        const preferredDetail =
            details.find(
            (detail) =>
                detail.move_learn_method?.name ===
                "level-up"
            ) || details[0];

        return {
            moveName:
            moveEntry.move?.name || "—",

            level:
            preferredDetail &&
            Number.isFinite(
                preferredDetail.level_learned_at
            )
                ? preferredDetail.level_learned_at
                : "—",

            method:
            preferredDetail?.move_learn_method
                ?.name || "—",

            sourceType:
            preferredDetail?.version_group?.name ||
            "—",
        };
        })
        .sort((a, b) => {
        const levelA =
            typeof a.level === "number"
            ? a.level
            : 999;

        const levelB =
            typeof b.level === "number"
            ? b.level
            : 999;

        if (levelA !== levelB) {
            return levelA - levelB;
        }

        return a.moveName.localeCompare(
            b.moveName
        );
        });

    return (
    <section className="poke_moves_all">
        <h2 className="section_title">
        All Moves
        </h2>

        <table className="moves_table">
        <thead>
            <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Method</th>
            <th>Source</th>
            </tr>
        </thead>

        <tbody>
            {normalizedMoves.length > 0 ? (
            normalizedMoves.map((move) => (
                <tr
                key={`${move.moveName}-${move.level}`}
                >
                <td>
                    {formatLabel(move.moveName)}
                </td>

                <td>{move.level}</td>

                <td>
                    {formatLabel(move.method)}
                </td>

                <td>
                    {formatLabel(move.sourceType)}
                </td>
                </tr>
            ))
            ) : (
            <tr>
                <td colSpan={4}>
                No moves available
                </td>
            </tr>
            )}
        </tbody>
        </table>
    </section>
    );
};