import { useEffect, useState } from 'react';
import { useUseCases } from '../state/UseCasesContext';
import { DreamTeamPokemonDto } from '../../../application/dto/DreamTeamDto';

export function useDreamTeam(): ReadonlyArray<DreamTeamPokemonDto> {
  const { getDreamTeam } = useUseCases();
  const [team, setTeam] = useState<ReadonlyArray<DreamTeamPokemonDto>>(() => getDreamTeam.execute());

  useEffect(() => {
    const refreshTeam = (): void => {
      setTeam(getDreamTeam.execute());
    };

    window.addEventListener('storage', refreshTeam);
    window.addEventListener('dreamteam:updated', refreshTeam as EventListener);

    return () => {
      window.removeEventListener('storage', refreshTeam);
      window.removeEventListener('dreamteam:updated', refreshTeam as EventListener);
    };
  }, [getDreamTeam]);

  return team;
}
