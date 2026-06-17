import { useEffect, useState } from "react";
import type * as Types from "../../types/PokemonType";
import { SearchBar } from "./SearchBar";
import { FilterPanel } from "./FilterPanel";
import {getGeneration } from "../../Services/PokeApi";
import { PokemonListContainer } from "./PokemonListContainer";

const SELECTED_KEY = "filter_selected_types";

const POKEMON_LIST: Types.Pokemon[] = [];

type LoadingState = "idle" | "loading" | "error" | "success";

export function PokemonLista(){
    const [pokemon, setPokemon] = useState(POKEMON_LIST);
  const [searchValue, setSearchValue] = useState<string>("");
  const [loadingState, setLoadingState] = useState<LoadingState>("loading");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(SELECTED_KEY);
      if (!raw) return [];
      const restored: string[] = JSON.parse(raw);
      return restored.map((type) => type.toLowerCase());
    } catch {
      return [];
    }
  });
    
    useEffect(()=>{
        getGeneration(1)
          .then((data) => {
            setPokemon(data);
            setLoadingState("success");
          })
          .catch((error) => {
            console.error("Error loading pokemon:", error);
            setLoadingState("error");
          });
    },[]);

    const allTypes = Array.from(
      new Set(
        pokemon.flatMap((currentPokemon) =>
          currentPokemon.types.map((currentType) => currentType.type.name.toLowerCase())
        )
      )
    ).sort();

    const normalizedSearch = searchValue.trim().toLowerCase();

    const filteredPokemon = pokemon.filter((currentPokemon) => {
      const matchesSearch =
        normalizedSearch.length === 0 || currentPokemon.name.toLowerCase().includes(normalizedSearch);

      const pokemonTypes = currentPokemon.types.map((currentType) => currentType.type.name.toLowerCase());
      const matchesType =
        selectedTypes.length === 0 || selectedTypes.every((selectedType) => pokemonTypes.includes(selectedType));

      return matchesSearch && matchesType;
    });

    const handleToggleType = (type: string): void => {
      setSelectedTypes((previousTypes) => {
        const next = previousTypes.includes(type)
          ? previousTypes.filter((previousType) => previousType !== type)
          : [...previousTypes, type];

        localStorage.setItem(SELECTED_KEY, JSON.stringify(next));

        return next;
      });
    };

    const handleClearFilters = (): void => {
      setSelectedTypes([]);
      localStorage.setItem(SELECTED_KEY, JSON.stringify([]));
    };

    const hasNoResults = filteredPokemon.length === 0;
    const hasNoResultsByCombined = hasNoResults && normalizedSearch.length > 0 && selectedTypes.length > 0;
    const hasNoResultsBySearch = hasNoResults && normalizedSearch.length > 0 && selectedTypes.length === 0;
    const hasNoResultsByType = hasNoResults && selectedTypes.length > 0 && normalizedSearch.length === 0;

    const containerClass = loadingState === "loading"
      ? "pokeCard_grid"
      : (hasNoResults || loadingState === "error")
        ? "pokeCard_flex"
        : "pokeCard_grid";

    /*function borrar(name:string):void{
        setPokemon(p=>p.filter((p)=>p.name!=name));
    }*/

    return (
      <main className="pokedex_main">
        <SearchBar value={searchValue} onChange={setSearchValue} />

        <section className={containerClass} id="pokemon_container">
          <PokemonListContainer
            loadingState={loadingState}
            hasNoResultsByCombined={hasNoResultsByCombined}
            hasNoResultsBySearch={hasNoResultsBySearch}
            hasNoResultsByType={hasNoResultsByType}
            selectedTypes={selectedTypes}
            searchValue={searchValue}
            filteredPokemon={filteredPokemon}
          />
        </section>

        <FilterPanel
          types={allTypes}
          selectedTypes={selectedTypes}
          onToggleType={handleToggleType}
          onClear={handleClearFilters}
        />
      </main>
    );
}


