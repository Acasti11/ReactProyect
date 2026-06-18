import type { PokemonListItemDto } from '../../../../../application/dto/PokemonDto';
import '../../../../../styles/nomalStyles/pokeCard.css';
import '../../../../../styles/nomalStyles/pokeType.css';

type Props = {
  pokemon: PokemonListItemDto;
};

export const CardImage = ({ pokemon }: Props) => {
  return (
    <img className="pokeCard_image" src={pokemon.spriteUrl} alt={pokemon.name} />
  );
};
