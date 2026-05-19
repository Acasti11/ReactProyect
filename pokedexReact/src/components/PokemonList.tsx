import React, { useEffect, useState } from "react";
import { POKEMON } from "./Pokemon";

type PokemonType = {
  type: { name: string };
};

type PokemonStat = {
  base_stat: number;
  stat: { name: string };
};

type PokemonAbility = {
  ability: { name: string };
  is_hidden: boolean;
};

type PokemonMoveDetail = {
  level_learned_at: number;
  move_learn_method: { name: string };
  version_group?: { name: string };
};

type PokemonMove = {
  move: { name: string };
  version_group_details: PokemonMoveDetail[];
};

type PokemonOfficialArtwork = {
  front_default: string;
};

type PokemonOtherSprites = {
  "official-artwork": PokemonOfficialArtwork;
};

type PokemonSprites = {
  other: PokemonOtherSprites;
};

type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  species: { url: string };
  sprites: PokemonSprites;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  moves: PokemonMove[];
};

const POKEMON_LIST: Pokemon[] = [];


export function PokemonLista(){
    const [pokemon, setPokemon] = useState(POKEMON_LIST);
    
    useEffect(()=>{
        getGeneration(1).then((data) => {
            setPokemon(data);
        });
    },[]);

    function borrar(name:string):void{
        setPokemon(p=>p.filter((p)=>p.name!=name));
    }

    return <ul>{
        pokemon.map( p => {return <POKEMON name ={p.name} type={p.name} btnClick={() => borrar(p.name)}></POKEMON>})
    }</ul>
}


async function getPokemon(identifier: string | number): Promise<Pokemon> {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${identifier}`
  );
  if (!response.ok) throw new Error('Not found');
  return response.json();
}

async function getGeneration(generation: number): Promise<any> {
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