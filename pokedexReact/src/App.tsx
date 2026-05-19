import './App.css'
import { Header } from './components/header'
import { PokemonLista } from './components/PokemonList';
/*
type IndexCard = { href: string; src: string; p: string; h2: string };

const card: IndexCard[] = [
  { href:"estructura/pokedex.html", src:"img/Pokedex.jpg", p: "La Pokédex es un dispositivo o aplicación que permite a los entrenadores Pokémon registrar y consultar información sobre las distintas especies que encuentran. Cada entrada muestra datos básicos como nombre, número en la Pokédex, tipo, altura, peso y un breve perfil. Funciona como una enciclopedia interactiva, ayudando a identificar, estudiar y seguir el progreso de cada Pokémon de manera rápida y sencilla.",h2: "Pokedex" }
];*/

function App() {
  return <PokemonLista></PokemonLista>
}

export default App


/*<React.Fragment>
    <Header />
    <main className="generalMain"></main>
    <a href="estructura/pokedex.html" className="card_link">
        <section className="card">
          <img
            className="card_img"
            src="img/Pokedex.jpg"
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
      </a>
  </React.Fragment>*/
/*
 <main class="generalMain">
      
      <a href="estructura/pokemon.html?name=pikachu" class="card_link">
        <section class="card">
          <img
            class="card_img"
            src="img/pokaball.jpg"
            alt="foto de la pokedex"
          />
          <header>
            <h2>Pokemons</h2>
          </header>
          <main class="card_Main">
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
      </a>
    </main>*/