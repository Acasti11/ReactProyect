/// <reference types="vitest/globals" />

import { beforeEach, describe, expect, it } from 'vitest';
import {
  addDreamTeamPokemon,
  getDreamTeam,
  hasDreamTeamPokemon,
  removeDreamTeamPokemon,
} from './pokemon';

describe('Dream Team utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('adds a pokemon to the dream team', () => {
    const added = addDreamTeamPokemon({
      id: 25,
      name: 'pikachu',
      sprite: 'pikachu.png',
    });

    expect(added).toBe(true);
    expect(getDreamTeam()).toHaveLength(1);
    expect(hasDreamTeamPokemon('pikachu')).toBe(true);
  });

  it('does not add duplicated pokemon', () => {
    addDreamTeamPokemon({ id: 25, name: 'pikachu', sprite: 'pikachu.png' });
    const addedAgain = addDreamTeamPokemon({ id: 25, name: 'pikachu', sprite: 'pikachu.png' });

    expect(addedAgain).toBe(false);
    expect(getDreamTeam()).toHaveLength(1);
  });

  it('removes a pokemon from the dream team', () => {
    addDreamTeamPokemon({ id: 25, name: 'pikachu', sprite: 'pikachu.png' });
    removeDreamTeamPokemon('pikachu');

    expect(getDreamTeam()).toHaveLength(0);
    expect(hasDreamTeamPokemon('pikachu')).toBe(false);
  });
});
