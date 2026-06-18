import React from 'react';
import { Link } from 'react-router-dom';
import PokedexImg from '../../../../img/Pokedex.jpg';
import PokemonImg from '../../../../img/pokaball.jpg';
import '../../../../styles/nomalStyles/homepage.css';

export const HomePage: React.FC = () => {
  return (
    <main className="generalMain">
      <Link to="/pokedex" className="card_link">
        <section className="card">
          <img
            className="card_img"
            src={PokedexImg}
            alt="foto de la pokedex"
          />
          <header>
            <h2>Pokedex</h2>
          </header>
          <main className="card_Main">
            <p>
              La Pokédex es un dispositivo o aplicación que permite a los
              entrenadores Pokémon registrar y consultar información sobre las
              distintas especies que encuentran. Cada entrada muestra datos
              básicos como nombre, número en la Pokédex, tipo, altura, peso y un
              breve perfil. Funciona como una enciclopedia interactiva, ayudando
              a identificar, estudiar y seguir el progreso de cada Pokémon de
              manera rápida y sencilla.
            </p>
          </main>
        </section>
      </Link>
      <Link to="/pokemon/pikachu" className="card_link">
        <section className="card">
          <img
            className="card_img"
            src={PokemonImg}
            alt="foto del buscador de pokémon"
          />
          <header>
            <h2>Pokemons</h2>
          </header>
          <main className="card_Main">
            <p>
              Un buscador de Pokémon va más allá de la Pokédex tradicional,
              ofreciendo herramientas para explorar y filtrar Pokémon con
              detalle. Permite buscar por nombre, tipo, habilidades,
              estadísticas, evoluciones y localización en los juegos, mostrando
              además imágenes, movimientos y rareza de cada criatura. Es ideal
              para entrenadores que quieren analizar, comparar y planificar
              estrategias, convirtiéndose en una base de datos interactiva para
              conocer los Pokémon a profundidad.
            </p>
          </main>
        </section>
      </Link>
    </main>
  );
};
