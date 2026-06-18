import { useEffect, useState, useCallback } from 'react';
import { useUseCases } from '../state/UseCasesContext';

export function useDreamTeamMember(
  id: number,
  name: string,
  spriteUrl: string
): {
  isStarred: boolean;
  add: () => boolean;
  remove: () => void;
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

  const add = useCallback((): boolean => {
    const result = addToDreamTeam.execute({ id, name, spriteUrl });
    if (result) {
      setIsStarred(true);
    }
    return result;
  }, [id, name, spriteUrl, addToDreamTeam]);

  const remove = useCallback((): void => {
    removeFromDreamTeam.execute(name);
    setIsStarred(false);
  }, [name, removeFromDreamTeam]);

  return { isStarred, add, remove };
}
