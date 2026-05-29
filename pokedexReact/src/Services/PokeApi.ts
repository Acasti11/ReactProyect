import * as Types from "../types/PokemonType"


export async function getPokemon(identifier: string | number): Promise<Types.Pokemon> {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${identifier}`
    );
    if (!response.ok) throw new Error('Not found');
    return response.json();
}

export async function getGeneration(generation: number): Promise<Types.Pokemon[]> {
    const response = await fetch(
        `https://pokeapi.co/api/v2/generation/${generation}`
    );
    const data = await response.json();
    const fetchedPokemon = await Promise.all(
        data.pokemon_species.map(async (species: { name: string; url: string }) => {
        try {
            // Primero intentamos por nombre
            return await getPokemon(species.name);
        } catch {
            const idMatch = species.url.match(/\/(\d+)\/$/);
            const matchedId = idMatch?.[1];
            const id = matchedId ? parseInt(matchedId, 10) : null;
            if (id) {
            return await getPokemon(id); // tu getPokemon acepta number también
            }
            throw new Error(
            `No se pudo obtener ${species.name} ni por nombre ni por ID`
            );
        }
        })
    );
    return fetchedPokemon;
}