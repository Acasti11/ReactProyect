// Mapeos de tipos a clases CSS
export const typeIcons: Record<string, string> = {
  normal: '⭕',
  fire: '🔥',
  water: '💧',
  grass: '🌿',
  electric: '⚡',
  ice: '❄️',
  fighting: '👊',
  poison: '☠️',
  ground: '🪨',
  flying: '🦅',
  psychic: '🧠',
  bug: '🐛',
  rock: '🪨',
  ghost: '👻',
  dragon: '🐉',
  dark: '🌑',
  steel: '⚙️',
  fairy: '✨',
};

export const toTypeClass = (type: string): string => {
    return `${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()}`;
};

export const statMap: Record<string, string> = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'sp. atk': 'SP.ATK',
  'sp. def': 'SP.DEF',
  speed: 'SPD',
};

// Dream Team management (localStorage)
export interface DreamTeamPokemon {
  id: number;
  name: string;
  sprite: string;
}

export const getDreamTeam = (): DreamTeamPokemon[] => {
  const stored = localStorage.getItem('dreamTeam');
  return stored ? JSON.parse(stored) : [];
};

export const hasDreamTeamPokemon = (name: string): boolean => {
  const team = getDreamTeam();
  return team.some(p => p.name === name);
};

export const addDreamTeamPokemon = (pokemon: DreamTeamPokemon): boolean => {
  const team = getDreamTeam();
  if (team.length >= 6 || team.some(p => p.name === pokemon.name)) {
    return false;
  }
  team.push(pokemon);
  localStorage.setItem('dreamTeam', JSON.stringify(team));
  return true;
};

export const removeDreamTeamPokemon = (name: string): void => {
  const team = getDreamTeam();
  const filtered = team.filter(p => p.name !== name);
  localStorage.setItem('dreamTeam', JSON.stringify(filtered));
};
