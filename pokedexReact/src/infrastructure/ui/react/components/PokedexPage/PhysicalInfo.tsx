import type { PokemonListItemDto } from '../../../../../application/dto/PokemonDto';
import '../../../../../styles/nomalStyles/pokeCard.css';
import '../../../../../styles/nomalStyles/pokeType.css';

type Props = {
  pokemon: PokemonListItemDto;
};

export const PhysicalInfo = ({ pokemon }: Props) => {
  const weightKg = pokemon.weight / 10;
  const heightM = pokemon.height / 10;

  return (
    <div className="pokeCard_physical">
      <span className="pokeCard_weight">⚖️ {weightKg} kg</span>
      <span className="separationbar">|</span>
      <span className="pokeCard_height">📏 {heightM} m</span>
    </div>
  );
};
