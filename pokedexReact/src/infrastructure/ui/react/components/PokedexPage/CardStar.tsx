import type { PokemonListItemDto } from '../../../../../application/dto/PokemonDto';
import { useDreamTeamMember } from '../../hooks/useDreamTeamMember';
import '../../../../../styles/nomalStyles/pokeCard.css';

type Props = {
  pokemon: PokemonListItemDto;
};

export const CardStar = ({ pokemon }: Props) => {
  const { isStarred, add, remove } = useDreamTeamMember(
    pokemon.id,
    pokemon.name,
    pokemon.spriteUrl
  );

  const handleStarClick = (e: { preventDefault(): void; stopPropagation(): void }) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isStarred) {
      add();
    } else {
      remove();
    }
  };

  return (
    <button
      className="star_li"
      type="button"
      onClick={handleStarClick}
      title={isStarred ? 'Remove from Dream Team' : 'Add to Dream Team'}
    >
      <span className="star">{isStarred ? '⭐' : '☆'}</span>
    </button>
  );
};
