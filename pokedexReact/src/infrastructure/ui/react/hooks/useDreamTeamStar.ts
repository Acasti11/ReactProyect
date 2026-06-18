import { useEffect, useState } from 'react';
import { useUseCases } from '../state/UseCasesContext';

export function useDreamTeamStar(name: string): {
  isStarred: boolean;
  toggle: () => void;
} {
  const { isInDreamTeam, addToDreamTeam, removeFromDreamTeam } = useUseCases();
  const [isStarred, setIsStarred] = useState(() => isInDreamTeam.execute(name));

  useEffect(() => {
    const syncStarState = (): void => {
      setIsStarred(isInDreamTeam.execute(name));
    };

    window.addEventListener('dreamteam:updated', syncStarState as EventListener);
    window.addEventListener('storage', syncStarState);

    return () => {
      window.removeEventListener('dreamteam:updated', syncStarState as EventListener);
      window.removeEventListener('storage', syncStarState);
    };
  }, [name, isInDreamTeam]);

  const toggle = (): void => {
    if (!isStarred) {
      // No tenemos sprite aquí, así que este hook necesita recibirlo o usarse en contexto
      // Por ahora, dejamos que el componente maneje el add con sprite
      // Este hook solo maneja remove y check
      // Ver useDreamTeamAddRemove para add completo
    } else {
      removeFromDreamTeam.execute(name);
      setIsStarred(false);
    }
  };

  return { isStarred, toggle };
}
