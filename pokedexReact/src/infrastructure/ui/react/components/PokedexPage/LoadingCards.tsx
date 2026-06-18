import PokeballImg from '../../../../../img/Pokeball.png';

interface LoadingCardsProps {
  count?: number;
}

export function LoadingCards({ count = 30 }: LoadingCardsProps): React.ReactNode {
  return Array.from({ length: count }, (_, index) => (
    <article key={`loading-${index}`} className="pokeCard loading">
      <div>
        <img src={PokeballImg} alt="Loading" />
      </div>
    </article>
  ));
}
