import React from 'react';

export const DreamTeamEmpty: React.FC = () => {
  return (
    <section className="dream-card dream-card--empty">
      <h2 className="dream-title">Dream Team</h2>
      <p className="dream-empty">
        Your Dream Team is empty. Mark Pokémon with the star from the Pokédex.
      </p>
    </section>
  );
};
