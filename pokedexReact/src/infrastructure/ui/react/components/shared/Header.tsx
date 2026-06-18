import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../../../../styles/nomalStyles/navbar.css';

type LinkItem = { label: string; to: string };

const NAV_LINKS: LinkItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Pokedex', to: '/pokedex' },
  { label: 'Pokemons', to: '/pokemon/pikachu' },
  { label: 'Dream Team', to: '/dreamteam' },
];

export const Header: React.FC = () => {
  return (
    <header className="navheader">
      <nav className="navbar">
        <div className="Logo">
          <div className="LogoIcon black">
            <div className="LogoIconD black" />
          </div>
          <h2 className="Logotext">
            <NavLink to="/">Pokedex</NavLink>
          </h2>
        </div>

        <ul className="navlinks">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to}>{link.label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
