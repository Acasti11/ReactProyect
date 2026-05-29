import type * as Types from "../../types/PokemonType";
import {Stats} from './Stats';
import { MovesTable } from "./MovesTable";
import "../../styles/nomalStyles/pokeinfo.css"
import "../../styles/nomalStyles/pokeType.css";

interface Props {
  pokemon: Types.Pokemon;
}

export default function PokemonRight({pokemon,}: Props) {
  return (
    <article className="poke_right">
      <Stats pokemon={pokemon} />

      <MovesTable pokemon={pokemon} />
    </article>
  );
}

