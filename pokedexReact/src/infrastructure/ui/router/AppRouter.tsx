import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../../../../components/Layout';
import { HomePage } from '../../../../components/HomePage';
import { PokemonLista } from './PokemonListPage';
import { PokemonInfoPage } from './PokemonInfoPage';
import { DreamTeamPage } from './DreamTeamPage';

export function AppRouter(): React.ReactElement {
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
