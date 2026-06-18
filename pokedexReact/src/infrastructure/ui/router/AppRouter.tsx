import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../react/components/shared/Layout';
import { HomePage } from '../react/pages/HomePage';
import { PokemonLista } from '../react/pages/PokemonListPage';
import { PokemonInfoPage } from '../react/pages/PokemonInfoPage';
import { DreamTeamPage } from '../react/pages/DreamTeamPage';
import type { ReactElement } from 'react';

export function AppRouter(): ReactElement {
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
  );
}
