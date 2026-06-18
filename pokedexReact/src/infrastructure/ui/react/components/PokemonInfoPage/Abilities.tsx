import type { PokemonDetailDto } from '../../../../../application/dto/PokemonDto';
import '../../../../../styles/nomalStyles/pokeinfo.css';
import '../../../../../styles/nomalStyles/pokeType.css';

type Props = {
  pokemon: PokemonDetailDto;
};

export const Abilities = ({ pokemon }: Props) => {
  return (
    <section className="poke_abilities">
      <h2 className="section_title">Abilities</h2>
      <ul className="abilities_list">
        {pokemon.abilities.map((ability) => (
          <li
            key={ability.name}
            className={`ability_item ${ability.isHidden ? 'ability_hidden' : ''}`}
          >
            {ability.name}
          </li>
        ))}
      </ul>
    </section>
  );
};
