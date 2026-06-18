import type { PokemonListItemDto } from '../../../../../application/dto/PokemonDto';
import { typeIcons, toTypeClass } from '../../../../../utils/pokemon';
import '../../../../../styles/nomalStyles/pokeType.css';
import '../../../../../styles/nomalStyles/pokeCard.css';

type Props = {
  pokemon: PokemonListItemDto;
};

export const PokemonTypes = ({ pokemon }: Props) => {
  return (
    <div className="pokeCard_types">
      {pokemon.types.map((t, idx) => (
        <span
          key={idx}
          className={`pokeCard_type ${toTypeClass(t)}`}
        >
          {typeIcons[t] || '•'} {toTypeClass(t)}
        </span>
      ))}
    </div>
  );
};
