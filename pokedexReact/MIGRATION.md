# MIGRATION.md — Hexagonal Architecture Migration Plan

## Estado actual del proyecto (pre-hexagonal)

### Entidades que existen o deberían existir
- **Pokemon**: id, name, height, weight, species, sprites, types, stats, abilities, moves
- **PokemonType**: type con name
- **PokemonStat**: base_stat, stat con name
- **PokemonAbility**: ability con name, is_hidden
- **PokemonMove**: move con name, version_group_details
- **PokemonMoveDetail**: level_learned_at, move_learn_method, version_group
- **PokemonSprites / PokemonOfficialArtwork**: URLs de imágenes
- **DreamTeamPokemon**: id, name, sprite (entidad de dominio separada)
- **EvolutionChain**: species, evolves_to (solo usada en UI, no modelada como entidad)

### Llamadas a API actuales
1. `getPokemon(identifier)` → `GET https://pokeapi.co/api/v2/pokemon/${identifier}`
2. `getGeneration(generation)` → `GET https://pokeapi.co/api/v2/generation/${generation}`
3. `fetch(pokemon.species.url)` → obtiene species data (evolution_chain.url, varieties)
4. `fetch(species.evolution_chain.url)` → obtiene cadena de evolución
5. `fetch(basePokemon.species.url)` → obtiene mega forms (varieties)

### Estado global actual
- **NO hay estado global** (no Zustand, no Redux, no Context). Todo es local state con `useState`.
- Estado local en componentes:
  - `PokemonLista`: lista de pokemon, searchValue, loadingState, selectedTypes
  - `PokemonInfoPage`: pokemon individual
  - `EvolutionSection`: evolutions
  - `DreamTeam`: team (lee de localStorage)
  - `CardStar`: isStarred (lee/escribe localStorage)
  - `FilterPanel`: collapsed (localStorage)

### Dependencias externas usadas
- `react` + `react-dom` (UI)
- `react-router-dom` (routing)
- `chart.js` (gráfico de stats en radar)
- `fetch` (API nativa, no axios)
- `localStorage` (persistencia Dream Team y filtros)
- `vitest` + `@testing-library/react` + `@testing-library/jest-dom` (testing)

### Patrón de dependencias problemáticas
- Componentes React llaman `fetch` directamente via `getPokemon`/`getGeneration`
- `EvolutionSection` hace fetch directamente (no pasa por PokeApi.ts)
- `localStorage` accedido desde `utils/pokemon.ts` y componentes directamente
- No hay inyección de dependencias
- Tipos compartidos entre API y UI (acoplados)

### Plan de migración
1. Crear capa de dominio con entidades puras inmutables
2. Crear puertos (interfaces de repositorios)
3. Crear casos de uso en aplicación
4. Crear adaptadores API (infraestructura)
5. Crear adaptadores de estado/UI
6. Componer todo en main.tsx
7. Limpiar código antiguo

### Notas
- Se mantendrá `chart.js` como dependencia de infraestructura UI
- Se mantendrá `react-router-dom` como infraestructura de routing
- No se añaden nuevas dependencias
- Todos los nombres de código en inglés
