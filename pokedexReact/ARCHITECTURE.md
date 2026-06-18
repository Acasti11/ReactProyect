# ARCHITECTURE.md — Pokedex Hexagonal Architecture

## Overview

This project follows **Hexagonal Architecture (Ports & Adapters)** to separate concerns between domain logic, application use cases, and infrastructure details. The goal is to make the codebase maintainable, testable, and independent of external frameworks.

## Directory Structure

```
src/
├── domain/                    # Pure business logic (no external dependencies)
│   ├── entities/              # Domain entities (immutable)
│   ├── value-objects/         # Validated, immutable value objects
│   ├── repositories/          # Ports (interfaces) — contracts for data access
│   └── errors/                # Domain-specific errors
├── application/               # Use cases orchestrating domain logic
│   ├── use-cases/             # Individual use cases (GetPokemon, ManageDreamTeam, etc.)
│   └── dto/                   # Data Transfer Objects (input/output of use cases)
├── infrastructure/            # Concrete implementations of external concerns
│   ├── api/                   # HTTP adapters (PokeAPI repository implementations)
│   ├── cache/                 # Persistence adapters (localStorage implementation)
│   └── ui/
│       ├── react/             # React components, hooks, pages
│       ├── state/             # State management adapters (React Context for DI)
│       └── router/            # Routing configuration
└── main.tsx                   # Root composition (Dependency Injection root)
```

## Dependency Rule

Dependencies flow **inward** only:

```
Infrastructure → Application → Domain
     UI               Use Cases      Entities
```

- **Domain** knows nothing about React, fetch, localStorage, or routing.
- **Application** knows only about domain entities and repository interfaces (ports).
- **Infrastructure** contains all concrete implementations: React components, fetch calls, localStorage access.

## Key Principles

1. **Entities are immutable**: All properties use `readonly`. No mutation.
2. **Value Objects validate at creation**: `PokemonId`, `PokemonName`, etc. enforce constraints.
3. **Use cases receive repositories via constructor**: No direct `fetch` or `localStorage` in application layer.
4. **React components call hooks, not APIs**: Hooks receive use cases from context.
5. **main.tsx is the only composition root**: All concrete instances are created there and injected downward.
6. **No `any`**: Everything is strictly typed with TypeScript strict mode.

## Ports (Repository Interfaces)

| Port | Responsibility |
|------|-------------|
| `PokemonRepository` | Fetch Pokemon by ID, name, or generation |
| `EvolutionRepository` | Fetch evolution chains and mega forms |
| `DreamTeamRepository` | CRUD operations for Dream Team (localStorage) |

## Adapters (Concrete Implementations)

| Adapter | Implements | Technology |
|---------|-----------|------------|
| `PokeApiPokemonRepository` | `PokemonRepository` | `fetch` to PokeAPI |
| `PokeApiEvolutionRepository` | `EvolutionRepository` | `fetch` to PokeAPI species/evolution endpoints |
| `LocalStorageDreamTeamRepository` | `DreamTeamRepository` | `localStorage` |

## Use Cases

| Use Case | Description |
|----------|-------------|
| `GetPokemonByNameUseCase` | Returns a single Pokemon detail DTO |
| `GetPokemonByGenerationUseCase` | Returns all Pokemon from a generation |
| `GetPokemonEvolutionsUseCase` | Returns evolution chain as DTOs |
| `GetPokemonMegaFormsUseCase` | Returns mega form names |
| `GetDreamTeamUseCase` | Returns current Dream Team |
| `AddToDreamTeamUseCase` | Adds a Pokemon to Dream Team |
| `RemoveFromDreamTeamUseCase` | Removes a Pokemon from Dream Team |
| `IsInDreamTeamUseCase` | Checks membership |

## Dependency Injection Flow

```
main.tsx
  ├── Creates PokeApiPokemonRepository
  ├── Creates PokeApiEvolutionRepository(pokemonRepository)
  ├── Creates LocalStorageDreamTeamRepository
  ├── Creates all Use Cases with repositories
  └── Wraps <AppRouter /> in <UseCasesProvider useCases={...}>
        └── Components use useUseCases() hook to access cases
```

## Adding a New Feature

1. **Domain**: Define entities, value objects, or errors if needed.
2. **Ports**: Add repository interface to `domain/repositories/`.
3. **Use Case**: Implement in `application/use-cases/` using only domain and ports.
4. **Adapter**: Create concrete implementation in `infrastructure/api/` or `infrastructure/cache/`.
5. **UI**: Create/update React components and hooks in `infrastructure/ui/react/`.
6. **Composition**: Wire the new adapter and use case in `main.tsx`.

## Testing Strategy

- **Domain**: Pure unit tests (no mocks needed).
- **Application**: Mock repository interfaces (ports) to test use cases.
- **Infrastructure**: Integration tests for API adapters; component tests for React hooks.
- **UI**: Use React Testing Library with mocked use cases via `UseCasesProvider`.
