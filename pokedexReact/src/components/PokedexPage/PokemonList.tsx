import { useEffect, useState } from "react";
import { PokemonCard } from "./PokemonCard";
import type * as Types from "../../types/PokemonType";
import { SearchBar } from "./SearchBar";
import { FilterPanel } from "./FilterPanel";
import { ErrorMessage } from "./ErrorMessage";
import {getGeneration } from "../../Services/PokeApi";
import PokeballImg from "../../img/Pokeball.png";

const SELECTED_KEY = "filter_selected_types";

const POKEMON_LIST: Types.Pokemon[] = [];

type LoadingState = "idle" | "loading" | "error" | "success";

export function PokemonLista(){
    const [pokemon, setPokemon] = useState(POKEMON_LIST);
  const [searchValue, setSearchValue] = useState("");
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

    const renderLoadingCards = (): React.ReactNode => {
      return Array.from({ length: 30 }, (_, index) => (
        <article key={`loading-${index}`} className="pokeCard loading">
          <div>
            <img src={PokeballImg} alt="Loading" />
          </div>
        </article>
      ));
    };

    const renderContainer = (): React.ReactNode => {
      if (loadingState === "loading") {
        return renderLoadingCards();
      }

      if (loadingState === "error") {
        return (
          <ErrorMessage
            title="Error"
            message="An error occurred while loading Pokémon"
            secondaryMessage="Please try again later"
            imageSrc="alert"
          />
        );
      }

      if (hasNoResultsByCombined) {
        const typesList = selectedTypes.join(", ");
        return (
          <ErrorMessage
            title="Not Found"
            message={`No Pokémon found matching "${searchValue}" with type${selectedTypes.length > 1 ? "s" : ""}: ${typesList}`}
            imageSrc="pokenot"
          />
        );
      }

      if (hasNoResultsBySearch) {
        return (
          <ErrorMessage
            title="Not Found"
            message={`There are no results for "${searchValue}"`}
            imageSrc="pokenot"
          />
        );
      }

      if (hasNoResultsByType) {
        const typesList = selectedTypes.join(", ");
        return (
          <ErrorMessage
            title="Not Found"
            message={`No Pokémon found with the selected type${selectedTypes.length > 1 ? "s" : ""}: ${typesList}`}
            imageSrc="pokenot"
          />
        );
      }

      return filteredPokemon.map((currentPokemon) => {
        return <PokemonCard key={currentPokemon.id} pokemon={currentPokemon}></PokemonCard>;
      });
    };

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
          {renderContainer()}
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


