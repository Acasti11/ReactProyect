import type { PokemonDetailDto } from '../../../../../application/dto/PokemonDto';
import '../../../../../styles/nomalStyles/pokeinfo.css';
import '../../../../../styles/nomalStyles/pokeType.css';

type Props = {
  pokemon: PokemonDetailDto;
  title: string;
  type: 'tm' | 'egg' | 'tutor';
};

function formatLabel(value: string): string {
  return value
    .split('-')
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ');
}

export const MovesSection = ({ pokemon, title, type }: Props) => {
  const methodMap: Record<'tm' | 'egg' | 'tutor', string> = {
    tm: 'machine',
    egg: 'egg',
    tutor: 'tutor',
  };

  const targetMethod = methodMap[type];

  const filteredMoves: string[] = Array.from(
    new Set(
      (pokemon.moves || [])
        .filter((moveEntry) => {
          return (moveEntry.versionGroupDetails || []).some(
            (detail) => detail.learnMethodName === targetMethod
          );
        })
        .map((moveEntry) => moveEntry.name)
        .filter((moveName): moveName is string => Boolean(moveName))
    )
  ).sort((a, b) => a.localeCompare(b));

  return (
    <section className={`poke_moves ${type}`}>
      <h2 className="section_title">{title}</h2>
      <ul className="moves_list">
        {filteredMoves.length > 0 ? (
          filteredMoves.map((moveName) => (
            <li key={moveName} className="move_item">
              {formatLabel(moveName)}
            </li>
          ))
        ) : (
          <li className="move_item">No moves available</li>
        )}
      </ul>
    </section>
  );
};
