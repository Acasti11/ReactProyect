import React from "react";
import "./header.css"

type LinkItem = { label: string; href: string };

const NAV_LINKS: LinkItem[] = [
  { label: "Home", href: "/" },
  { label: "Pokedex", href: "/pokedex" },
  { label: "Pokemons", href: "/pokemon?name=pikachu" },
  { label: "DreamTeam", href: "/dreamteam" },
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
            <a href="/">Pokedex</a>
          </h2>
        </div>

        <ul className="navlinks">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
