import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/reset style/normalize.css'
import './styles/reset style/reboot.css'
import './styles/reset style/reset.css'

import { PokeApiPokemonRepository } from './infrastructure/api/PokeApiPokemonRepository'
import { PokeApiEvolutionRepository } from './infrastructure/api/PokeApiEvolutionRepository'
import { LocalStorageDreamTeamRepository } from './infrastructure/cache/LocalStorageDreamTeamRepository'

import { GetPokemonByIdUseCase } from './application/use-cases/GetPokemon'
import { GetPokemonByNameUseCase } from './application/use-cases/GetPokemon'
import { GetPokemonByGenerationUseCase } from './application/use-cases/GetPokemonByGeneration'
import { GetPokemonEvolutionsUseCase } from './application/use-cases/GetPokemonEvolutions'
import { GetPokemonMegaFormsUseCase } from './application/use-cases/GetPokemonEvolutions'
import {
  GetDreamTeamUseCase,
  AddToDreamTeamUseCase,
  RemoveFromDreamTeamUseCase,
  IsInDreamTeamUseCase,
} from './application/use-cases/ManageDreamTeam'

import { UseCasesProvider } from './infrastructure/ui/state/UseCasesContext'
import { AppRouter } from './infrastructure/ui/router/AppRouter'

// === Composición Root (Dependency Injection) ===
// Aquí es el ÚNICO lugar donde se crean instancias concretas.
// Las dependencias fluyen de afuera hacia adentro:
// Infraestructura → Aplicación → UI

// Repositorios (adaptadores de infraestructura)
const pokemonRepository = new PokeApiPokemonRepository()
const evolutionRepository = new PokeApiEvolutionRepository(pokemonRepository)
const dreamTeamRepository = new LocalStorageDreamTeamRepository()

// Casos de uso (aplicación)
const useCases = {
  getPokemonById: new GetPokemonByIdUseCase(pokemonRepository),
  getPokemonByName: new GetPokemonByNameUseCase(pokemonRepository),
  getPokemonByGeneration: new GetPokemonByGenerationUseCase(pokemonRepository),
  getPokemonEvolutions: new GetPokemonEvolutionsUseCase(pokemonRepository, evolutionRepository),
  getPokemonMegaForms: new GetPokemonMegaFormsUseCase(evolutionRepository),
  getDreamTeam: new GetDreamTeamUseCase(dreamTeamRepository),
  addToDreamTeam: new AddToDreamTeamUseCase(dreamTeamRepository),
  removeFromDreamTeam: new RemoveFromDreamTeamUseCase(dreamTeamRepository),
  isInDreamTeam: new IsInDreamTeamUseCase(dreamTeamRepository),
}

const root = createRoot(document.getElementById('root')!)
root.render(
  <StrictMode>
    <BrowserRouter>
      <UseCasesProvider useCases={useCases}>
        <AppRouter />
      </UseCasesProvider>
    </BrowserRouter>
  </StrictMode>,
)
