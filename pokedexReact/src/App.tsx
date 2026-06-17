import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './components/HomePage'
import { PokemonLista } from './components/PokedexPage/PokemonList'
import { PokemonInfoPage } from './components/PokemonInfoPage/PokemonInfoPage'
import { DreamTeamPage } from './components/DreamTeamPage/DreamTeamPage'


function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokedex" element={<PokemonLista />} />
        <Route path="/pokemon/:name" element={<PokemonInfoPage />} />
        <Route path="/dreamteam" element={<DreamTeamPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
