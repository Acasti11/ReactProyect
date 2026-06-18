import { useState } from 'react';
import type { ReactElement } from 'react';
import { usePokemonList } from '../hooks/usePokemonList';
import { SearchBar } from '../../../../components/PokedexPage/SearchBar';
import { FilterPanel } from '../../../../components/PokedexPage/FilterPanel';
import { PokemonListContainer } from '../components/PokedexPage/PokemonListContainer';
import '../../../../styles/nomalStyles/pokeCard.css';
import '../../../../styles/nomalStyles/pokeType.css';

const SELECTED_KEY = 'filter_selected_types';

type LoadingState = 'idle' | 'loading' | 'error' | 'success';

export function PokemonLista(): ReactElement {
  const { pokemonList, loadingState, error } = usePokemonList(1);
  const [searchValue, setSearchValue] = useState<string>('');
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

  const allTypes = Array.from(
    new Set(
      pokemonList.flatMap((currentPokemon) =>
        currentPokemon.types.map((currentType) => currentType.toLowerCase())
      )
    )
  ).sort();

  const normalizedSearch = searchValue.trim().toLowerCase();

  const filteredPokemon = pokemonList.filter((currentPokemon) => {
    const matchesSearch =
      normalizedSearch.length === 0 || currentPokemon.name.toLowerCase().includes(normalizedSearch);

    const pokemonTypes = currentPokemon.types.map((currentType) => currentType.toLowerCase());
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

  const containerClass =
    loadingState === 'loading'
      ? 'pokeCard_grid'
      : hasNoResults || loadingState === 'error' || error !== null
        ? 'pokeCard_flex'
        : 'pokeCard_grid';

  return (
    <main className="pokedex_main">
      <SearchBar value={searchValue} onChange={setSearchValue} />

      <section className={containerClass} id="pokemon_container">
        <PokemonListContainer
          loadingState={loadingState as LoadingState}
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
