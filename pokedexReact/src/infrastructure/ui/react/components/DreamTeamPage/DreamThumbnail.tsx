import type { DreamTeamPokemonDto } from '../../../../../application/dto/DreamTeamDto';

type Props = {
  pokemon: DreamTeamPokemonDto;
};

export const DreamThumbnail = ({ pokemon }: Props) => {
  return (
    <img
      className="dream-thumb"
      src={pokemon.spriteUrl}
      alt={pokemon.name}
      title={pokemon.name}
    />
  );
};
