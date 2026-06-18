import type { DreamTeamPokemonDto } from '../../../../../application/dto/DreamTeamDto';
import { DreamPokemonImage } from './DreamPokemonImage';
import { DreamThumbnail } from './DreamThumbnail';

type Props = {
  team: ReadonlyArray<DreamTeamPokemonDto>;
};

export const DreamTeamCard = ({ team }: Props) => {
  return (
    <section className="dream-card">
      <h2 className="dream-title">Dream Team</h2>
      <div className="dream-stage">
        {team
          .slice(0, 10)
          .map((pokemon, index) => (
            <DreamPokemonImage
              key={pokemon.id}
              pokemon={pokemon}
              index={index}
            />
          ))}
      </div>
      <div className="dream-strip">
        {team
          .slice(0, 10)
          .map((pokemon) => (
            <DreamThumbnail
              key={pokemon.id}
              pokemon={pokemon}
            />
          ))}
      </div>
    </section>
  );
};
