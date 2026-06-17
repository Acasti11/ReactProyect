import React, { useEffect, useState } from "react";
import { getDreamTeam, type DreamTeamPokemon } from "../../utils/pokemon";

import { DreamTeamCard } from "./DreamTeamCard";
import { DreamTeamEmpty } from "./DreamTeamEmpty";

export const DreamTeam: React.FC = () => {
  const [team, setTeam] = useState<DreamTeamPokemon[]>(() => getDreamTeam());

  useEffect(() => {
    const refreshTeam = (): void => {
      setTeam(getDreamTeam());
    };

    window.addEventListener("storage", refreshTeam);
    window.addEventListener("dreamteam:updated", refreshTeam as EventListener);

    return () => {
      window.removeEventListener("storage", refreshTeam);
      window.removeEventListener("dreamteam:updated", refreshTeam as EventListener);
    };
  }, []);

  return team.length === 0 ? <DreamTeamEmpty /> : <DreamTeamCard team={team} />;
};
