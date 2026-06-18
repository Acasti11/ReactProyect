import { useDreamTeam } from '../../hooks/useDreamTeam';
import { DreamTeamCard } from './DreamTeamCard';
import { DreamTeamEmpty } from './DreamTeamEmpty';
import '../../../../../styles/nomalStyles/pokeDream.css';

export const DreamTeam = () => {
  const team = useDreamTeam();

  return team.length === 0 ? <DreamTeamEmpty /> : <DreamTeamCard team={team} />;
};
