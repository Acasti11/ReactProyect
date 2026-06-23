# Arquitectura del Proyecto - Flujo de Llamadas

## 1. Visión General

Este proyecto sigue una **Arquitectura Hexagonal (Ports & Adapters)** con tres capas principales:

```
┌─────────────────────────────────────────────────────────┐
│                      CAPA DE UI                          │
│  React Components → Hooks → Context (UseCasesProvider)   │
│         ↑                                                │
│    DTOs planos (datos serializables)                    │
│         ↓                                                │
├─────────────────────────────────────────────────────────┤
│                   CAPA DE APLICACIÓN                     │
│  Use Cases → DTOs de entrada/salida → Mapeo              │
│         ↑                                                │
│    Entidades / Value Objects del dominio                │
│         ↓                                                │
├─────────────────────────────────────────────────────────┤
│                      CAPA DE DOMINIO                     │
│  Entities, Value Objects, Repositories (interfaces),    │
│  Errors — Sin dependencias externas                     │
│         ↑                                                │
│    Interfaces (puertos)                                 │
│         ↓                                                │
├─────────────────────────────────────────────────────────┤
│                   CAPA DE INFRAESTRUCTURA                │
│  Adaptadores: API (fetch), LocalStorage, React Router   │
│  Implementan los puertos del dominio                     │
└─────────────────────────────────────────────────────────┘
```

**Regla de dependencias:** Las flechas apuntan hacia arriba. El dominio no sabe de la aplicación, la aplicación no sabe de la UI, y la UI no sabe de la infraestructura. Solo `main.tsx` conoce a todas las capas para componerlas.

---

## 2. Capas y Responsabilidades

### 2.1 Dominio (`src/domain/`)

**Contiene:**
- `entities/` — Objetos de negocio con identidad y comportamiento (`Pokemon`, `DreamTeamPokemon`, `PokemonStat`, `PokemonAbility`, `PokemonMove`, `PokemonMoveDetail`)
- `value-objects/` — Objetos inmutables sin identidad propia, validados en construcción (`PokemonId`, `PokemonName`, `PokemonTypeName`, `PokemonStatName`)
- `repositories/` — **Interfaces** (puertos) que definen contratos (`PokemonRepository`, `DreamTeamRepository`, `EvolutionRepository`)
- `errors/` — Excepciones de dominio (`PokemonNotFoundError`, `GenerationNotFoundError`, `DreamTeamFullError`, `DreamTeamDuplicateError`)

**Por qué no depende de nada externo:**
El dominio es el núcleo. No importa `react`, `fetch`, `localStorage` ni ninguna librería de terceros. Solo usa TypeScript puro. Esto permite:
- Testear la lógica de negocio sin montar un navegador ni un servidor.
- Cambiar la API de PokeAPI por otra sin tocar el dominio.
- Cambiar React por Vue/Svelte sin tocar el dominio.

**Ejemplo concreto:**
```typescript
// src/domain/value-objects/PokemonId.ts
export class PokemonId {
  readonly value: number;
  constructor(value: number) {
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error('PokemonId must be a positive integer');
    }
    this.value = value;
  }
}
```
Si alguien intenta crear `new PokemonId(-1)`, el dominio rechaza la operación **antes** de que llegue a la red o a la UI.

---

### 2.2 Aplicación (`src/application/`)

**Contiene:**
- `use-cases/` — Orquestadores que coordinan el flujo de una operación de usuario (`GetPokemon`, `GetPokemonByGeneration`, `GetPokemonEvolutions`, `ManageDreamTeam`)
- `dto/` — Objetos de transferencia de datos planos (`PokemonDto`, `DreamTeamDto`)

**Por qué separa use-cases de DTOs:**
- **Use Cases** = lógica de orquestación (qué pasos seguir, en qué orden, qué validar).
- **DTOs** = contrato de datos entre capas (qué campos viajan, en qué formato).
Separarlos permite cambiar el contrato de datos sin cambiar la orquestación, y viceversa.

---

### 2.3 Infraestructura (`src/infrastructure/`)

**Contiene:**
- `api/` — Adaptadores que implementan los repositorios del dominio usando `fetch` a la PokeAPI (`PokeApiPokemonRepository`, `PokeApiEvolutionRepository`)
- `cache/` — Adaptadores que persisten en `localStorage` (`LocalStorageDreamTeamRepository`)
- `ui/react/` — Componentes React, hooks, páginas, router y estado global (`UseCasesContext`)

**Cómo adapta el mundo externo al dominio:**
Los adaptadores reciben datos crudos de la API (JSON con `snake_case`, estructuras anidadas) y los **mapean** a entidades del dominio (clases con `camelCase`, validaciones, métodos). El dominio nunca ve el JSON crudo.

---

## 3. Flujo de una Petición (ejemplo: "Buscar Pokémon por nombre")

### Paso a paso con código real:

```
1. Usuario escribe "pikachu" en la barra de búsqueda
   ↓
2. Componente React: PokemonListPage.tsx
   ↓
3. Hook: usePokemon(name) → llama a useUseCases() para obtener getPokemonByName
   ↓
4. Use Case: GetPokemonByNameUseCase.execute("pikachu")
   ↓
5. Use Case crea Value Object: new PokemonName("pikachu")
   ↓
6. Use Case llama al puerto: pokemonRepository.getByName(pokemonName)
   ↓
7. Adaptador: PokeApiPokemonRepository.getByName()
              → fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
   ↓
8. Respuesta JSON cruda → mapToDomain() → new Pokemon({...}) [entidad de dominio]
   ↓
9. Use Case recibe Pokemon → toPokemonDetailDto(pokemon) → PokemonDetailDto
   ↓
10. Hook recibe DTO → setPokemon(data) → React re-renderiza
   ↓
11. Componente PokemonInfo.tsx muestra datos al usuario
```

**Código real del flujo:**

```typescript
// 1-2. Componente + Hook
// src/infrastructure/ui/react/pages/PokemonInfoPage.tsx
const { pokemon, loadingState } = usePokemon(name);

// src/infrastructure/ui/react/hooks/usePokemon.ts
export function usePokemon(name: string | undefined) {
  const { getPokemonByName } = useUseCases();  // ← del Context
  useEffect(() => {
    getPokemonByName.execute(name)
      .then((data: PokemonDetailDto) => setPokemon(data));
  }, [name, getPokemonByName]);
}

// 3-4. Use Case
// src/application/use-cases/GetPokemon.ts
export class GetPokemonByNameUseCase {
  constructor(private readonly pokemonRepository: PokemonRepository) {}
  async execute(name: string): Promise<PokemonDetailDto> {
    const pokemonName = new PokemonName(name);        // ← Value Object
    const pokemon = await this.pokemonRepository.getByName(pokemonName);
    return toPokemonDetailDto(pokemon);               // ← DTO de salida
  }
}

// 5-7. Adaptador de infraestructura
// src/infrastructure/api/PokeApiPokemonRepository.ts
async getByName(name: PokemonName): Promise<Pokemon> {
  const data = await this.fetchPokemon(name.value);   // ← fetch real
  return this.mapToDomain(data);                      // ← JSON → Entidad
}

// 8. Mapeo inverso (entidad → DTO)
// src/application/dto/PokemonDto.ts
export function toPokemonDetailDto(pokemon: Pokemon): PokemonDetailDto {
  return {
    id: pokemon.id.value,           // ← Value Object → primitivo
    name: pokemon.name.value,
    types: pokemon.types.map(t => t.value),
    // ...resto de campos
  };
}
```

---

## 4. DTOs - Por qué existen

| DTO | Ubicación | Quién lo crea | Quién lo consume | Por qué |
|-----|-----------|---------------|------------------|---------|
| `PokemonListItemDto` | `src/application/dto/PokemonDto.ts` | `toPokemonListItemDto()` (llamado por use cases) | Hooks (`usePokemonList`), Componentes (`PokemonCard`, `PokemonListContainer`) | Desacoplar la UI de las entidades del dominio. La UI no necesita saber qué es un `PokemonTypeName` o un `PokemonStatName`. |
| `PokemonDetailDto` | `src/application/dto/PokemonDto.ts` | `toPokemonDetailDto()` (llamado por use cases) | Hooks (`usePokemon`, `usePokemonEvolutions`), Componentes (`PokemonInfo`, `PokemonHeader`, `PokemonContent`) | Extensión de `PokemonListItemDto` con datos de detalle (moves, speciesUrl). Mismo principio: la UI trabaja con primitivos. |
| `DreamTeamPokemonDto` | `src/application/dto/DreamTeamDto.ts` | `toDreamTeamPokemonDto()` (llamado por `GetDreamTeamUseCase`) | Hooks (`useDreamTeam`), Componentes (`DreamTeam`, `DreamTeamCard`) | El equipo soñado se persiste en `localStorage` como JSON; el DTO es la forma "serializable" de la entidad. |

### 4.1 DTO de Entrada

En este proyecto, **los DTOs de entrada son primitivos simples** (`string`, `number`, objetos planos) que recibe el `execute()` del use case:

```typescript
// GetPokemonByNameUseCase recibe un string primitivo
async execute(name: string): Promise<PokemonDetailDto>

// AddToDreamTeamUseCase recibe un objeto plano
execute(props: { id: number; name: string; spriteUrl: string }): boolean
```

**Por qué no pasamos la entidad directamente:**
- Las entidades del dominio tienen validaciones en su constructor. Si la UI creara una entidad, la UI tendría que conocer las reglas de validación del dominio (acoplamiento invertido).
- Los DTOs/primitivos son serializables. Una entidad con métodos (`equals()`, `cssClass()`) no se puede pasar fácilmente por props o guardar en `localStorage`.
- El use case es el **único** que decide cuándo crear una entidad y con qué reglas.

### 4.2 DTO de Salida

```typescript
export interface PokemonDetailDto {
  readonly id: number;           // ← primitivo, no PokemonId
  readonly name: string;         // ← primitivo, no PokemonName
  readonly types: ReadonlyArray<string>;  // ← string[], no PokemonTypeName[]
  // ...
}
```

**Por qué no exponemos métodos del dominio a React:**
- React espera datos planos para renderizar. Si un componente recibiera `pokemon.types[0].cssClass()`, el componente dependería del dominio.
- Si mañana cambiamos `PokemonTypeName.cssClass()` por otra implementación, tendríamos que revisar todos los componentes.
- Con DTOs, el componente recibe `types: string[]` y aplica su propia lógica de presentación (ej: `toTypeClass(type)` en `utils/pokemon.ts`).

**Caso especial: Evoluciones**

```typescript
// src/infrastructure/ui/react/hooks/usePokemonEvolutions.ts
const entity = dtoToPokemonEntity(pokemon);  // ← DTO → Entidad (inverso!)
getPokemonEvolutions.execute(entity);
```

Aquí el hook **reconstruye una entidad** a partir del DTO porque `GetPokemonEvolutionsUseCase` necesita un `Pokemon` (entidad) para obtener su `speciesUrl`. Este mapeo inverso vive en `dtoToEntity.ts` y es una excepción justificada: el dato ya fue validado cuando se creó la primera vez.

---

## 5. Use Cases - Por qué existen

| Use Case | Dependencias inyectadas | Qué orquesta | Ejecutado por |
|----------|------------------------|--------------|---------------|
| `GetPokemonByIdUseCase` | `PokemonRepository` | Valida ID, obtiene Pokémon, mapea a DTO | `usePokemon` (cuando se busca por ID) |
| `GetPokemonByNameUseCase` | `PokemonRepository` | Valida nombre, obtiene Pokémon, mapea a DTO | `usePokemon` (cuando se navega a `/pokemon/:name`) |
| `GetPokemonByGenerationUseCase` | `PokemonRepository` | Obtiene lista de una generación, mapea cada uno a DTO | `usePokemonList` (carga inicial de la Pokédex) |
| `GetPokemonEvolutionsUseCase` | `EvolutionRepository` | Recibe entidad Pokemon, obtiene cadena evolutiva, mapea a DTOs | `usePokemonEvolutions` |
| `GetPokemonMegaFormsUseCase` | `EvolutionRepository` | Recibe entidad Pokemon, obtiene nombres de mega formas | `usePokemonEvolutions` (indirectamente) |
| `GetDreamTeamUseCase` | `DreamTeamRepository` | Lee equipo desde localStorage, mapea a DTOs | `useDreamTeam` |
| `AddToDreamTeamUseCase` | `DreamTeamRepository` | Valida datos, crea entidad, delega a repositorio | `useDreamTeamMember` (al clicar la estrella) |
| `RemoveFromDreamTeamUseCase` | `DreamTeamRepository` | Valida nombre, delega eliminación al repositorio | `useDreamTeamMember`, `useDreamTeamStar` |
| `IsInDreamTeamUseCase` | `DreamTeamRepository` | Verifica si un nombre está en el equipo | `useDreamTeamMember`, `useDreamTeamStar` |

### 5.1 Constructor vs execute()

**Constructor — se llama UNA VEZ en `main.tsx`:**

```typescript
// src/main.tsx (líneas 37-48)
const useCases = {
  getPokemonByName: new GetPokemonByNameUseCase(pokemonRepository),
  addToDreamTeam: new AddToDreamTeamUseCase(dreamTeamRepository),
  // ...
};
```

- **Qué hace:** Recibe las dependencias (repositorios) por inyección y las guarda.
- **Cuándo se llama:** Al arrancar la aplicación. Es el momento de "composición".
- **Por qué importa:** Si creáramos un use case nuevo en cada render, perderíamos caché, re-crearíamos conexiones, etc.

**execute() — se llama en CADA interacción de usuario:**

```typescript
// src/infrastructure/ui/react/hooks/usePokemon.ts
getPokemonByName.execute(name);   // ← cada vez que cambia el name

// src/infrastructure/ui/react/hooks/useDreamTeamMember.ts
addToDreamTeam.execute({ id, name, spriteUrl });  // ← cada clic en la estrella
```

- **Qué hace:** Ejecuta la lógica de negocio (validar, llamar al repositorio, mapear a DTO).
- **Cuándo se llama:** Cuando el usuario interactúa (busca, filtra, clica, navega).
- **Por qué importa:** Es el punto de entrada a la capa de aplicación desde la UI. La UI nunca llama al repositorio directamente.

---

## 6. Context de React

### 6.1 ¿Hay Context?

**Sí.** Existe un contexto llamado `UseCasesContext` que inyecta los casos de uso a toda la aplicación.

**Dónde se crea:**
```typescript
// src/infrastructure/ui/state/UseCasesContext.tsx
const UseCasesContext = createContext<UseCases | null>(null);

export function UseCasesProvider({ children, useCases }) {
  return React.createElement(UseCasesContext.Provider, { value: useCases }, children);
}

export function useUseCases(): UseCases {
  const context = useContext(UseCasesContext);
  if (!context) throw new Error('useUseCases must be used within a UseCasesProvider');
  return context;
}
```

**Quién lo provee:**
```typescript
// src/main.tsx (líneas 54-56)
<UseCasesProvider useCases={useCases}>
  <AppRouter />
</UseCasesProvider>
```

**Quién lo consume:**
Todos los hooks que necesitan casos de uso:
- `usePokemon.ts` → `getPokemonByName`
- `usePokemonList.ts` → `getPokemonByGeneration`
- `usePokemonEvolutions.ts` → `getPokemonEvolutions`
- `useDreamTeam.ts` → `getDreamTeam`
- `useDreamTeamMember.ts` → `isInDreamTeam`, `addToDreamTeam`, `removeFromDreamTeam`
- `useDreamTeamStar.ts` → `isInDreamTeam`, `removeFromDreamTeam`

### 6.2 Flujo de inyección de dependencias

```
main.tsx (composición root)
│
├── Crea repositorios concretos (infraestructura)
│   ├── PokeApiPokemonRepository
│   ├── PokeApiEvolutionRepository
│   └── LocalStorageDreamTeamRepository
│
├── Crea use cases (aplicación) inyectando repositorios
│   ├── GetPokemonByNameUseCase(pokemonRepository)
│   ├── AddToDreamTeamUseCase(dreamTeamRepository)
│   └── ...
│
└── Pasa el objeto useCases al UseCasesProvider
    │
    ▼
UseCasesContext.Provider value={useCases}
    │
    ├── AppRouter
    │   ├── PokemonListPage → usePokemonList → useUseCases → getPokemonByGeneration
    │   ├── PokemonInfoPage → usePokemon → useUseCases → getPokemonByName
    │   └── DreamTeamPage → useDreamTeam → useUseCases → getDreamTeam
    │
    └── Cualquier componente/hook puede llamar a useUseCases()
```

**Ventajas de este patrón:**
1. **Testabilidad:** En tests, podemos envolver un componente con `<UseCasesProvider useCases={mockUseCases}>` sin tocar `main.tsx`.
2. **Desacoplamiento:** Los hooks no saben qué implementación concreta de repositorio usan. Solo conocen la interfaz del use case.
3. **Sustituibilidad:** Podemos cambiar `PokeApiPokemonRepository` por un mock, un caché, o una API diferente sin modificar ni un hook ni un componente.

---

## 7. Reglas de Oro de esta Arquitectura

| Regla | Ejemplo concreto |
|-------|------------------|
| **Dominio puro** | `Pokemon.ts` no importa `react`, `fetch`, ni `localStorage` |
| **Aplicación orquesta** | `GetPokemonByNameUseCase` crea `PokemonName`, llama al repo, mapea a DTO |
| **Infraestructura adapta** | `PokeApiPokemonRepository` hace `fetch()` y mapea JSON a `new Pokemon(...)` |
| **UI solo consume DTOs** | `PokemonCard` recibe `PokemonListItemDto`, no una entidad `Pokemon` |
| **DI en main.tsx** | Único archivo que importa de todas las capas para componerlas |
| **Context inyecta use cases** | `useUseCases()` da acceso a todos los casos de uso sin prop drilling |
