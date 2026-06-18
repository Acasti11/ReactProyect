import { DreamTeam } from '../components/DreamTeamPage/DreamTeam';
import '../../../../styles/nomalStyles/pokeDream.css';

export const DreamTeamPage = () => {
  return (
    <main className="dream_main">
      <section className="pokeFav">
        <DreamTeam />
      </section>
    </main>
  );
};
