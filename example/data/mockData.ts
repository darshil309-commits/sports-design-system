/**
 * Demo content for the example screens only — never imported by src/.
 * Photography comes from picsum.photos (seeded, so it's stable across
 * reloads) purely to prove out the image-bearing components; a real app
 * would supply its own CDN URLs or bundled assets here instead.
 */
import type { FormResult } from '../../src/components/badges/FormIndicator';

const photo = (seed: string, w: number, h: number) => ({ uri: `https://picsum.photos/seed/${seed}/${w}/${h}` });
const form = (results: FormResult[]) => results;

export const stadiumHero = photo('emirates-stadium', 900, 1200);

export const liveMatch = {
  competition: 'Premier League',
  minute: "67'",
  home: { name: 'Arsenal', score: 2 },
  away: { name: 'Chelsea', score: 1 },
};

export const scoreboardDetail = {
  competition: 'Premier League',
  state: 'live' as const,
  statusDetail: "67'",
  home: { name: 'Arsenal', score: 2, scorers: ["Saka 23'", "Trossard 61'"] },
  away: { name: 'Chelsea', score: 1, scorers: ["Palmer 54'"] },
};

export const fixtures = [
  {
    competition: 'La Liga',
    state: 'ft' as const,
    statusDetail: undefined as string | undefined,
    home: { name: 'Real Madrid', score: 3 as number | undefined },
    away: { name: 'Barcelona', score: 1 as number | undefined },
  },
  {
    competition: 'Serie A',
    state: 'upcoming' as const,
    statusDetail: '19:45' as string | undefined,
    home: { name: 'Inter Milan', score: undefined as number | undefined },
    away: { name: 'AC Milan', score: undefined as number | undefined },
  },
  {
    competition: 'Bundesliga',
    state: 'ht' as const,
    statusDetail: undefined as string | undefined,
    home: { name: 'Bayern Munich', score: 1 as number | undefined },
    away: { name: 'Dortmund', score: 1 as number | undefined },
  },
];

export const standings = [
  { position: 1, teamName: 'Arsenal', points: 68, form: form(['W', 'W', 'W', 'D', 'W']) },
  { position: 2, teamName: 'Man City', points: 65, form: form(['W', 'D', 'W', 'W', 'L']) },
  { position: 3, teamName: 'Liverpool', points: 63, form: form(['W', 'W', 'L', 'W', 'W']) },
  { position: 4, teamName: 'Chelsea', points: 58, form: form(['D', 'W', 'W', 'L', 'D']) },
  { position: 5, teamName: 'Aston Villa', points: 54, form: form(['L', 'W', 'D', 'W', 'W']) },
];

export const fullStandings = [
  ...standings,
  { position: 6, teamName: 'Tottenham', points: 52, form: form(['W', 'L', 'W', 'D', 'L']) },
  { position: 7, teamName: 'Newcastle', points: 50, form: form(['D', 'D', 'W', 'W', 'L']) },
  { position: 8, teamName: 'Man United', points: 47, form: form(['L', 'L', 'W', 'D', 'W']) },
].map((row) => ({ ...row, played: 30, won: Math.round(row.points / 3), drawn: 4, lost: 30 - Math.round(row.points / 3) - 4, goalDifference: row.points - 40 }));

export const newsFeed = [
  {
    headline: 'Arsenal close gap at the top with dominant derby win',
    category: 'Premier League',
    timestamp: '2h ago',
    thumbnail: photo('news-1', 200, 200),
  },
  {
    headline: 'Transfer window: five moves that could reshape the title race',
    category: 'Transfers',
    timestamp: '4h ago',
    thumbnail: photo('news-2', 200, 200),
  },
  {
    headline: 'Injury update: key midfielder set to return next week',
    category: 'Team News',
    timestamp: '6h ago',
    thumbnail: photo('news-3', 200, 200),
  },
];

export const featureStory = {
  headline: 'Inside the training ground: how the champions rebuilt their season',
  category: 'Feature',
  timestamp: 'Today',
  image: photo('feature-1', 900, 1125),
};

export const heroPromo = {
  headline: 'Every match. Every moment.',
  supportingText: 'Stream every Premier League fixture live this weekend.',
  image: photo('promo-1', 900, 1200),
};

export const players = [
  { playerName: 'Bukayo Saka', teamName: 'Arsenal', photo: photo('player-1', 400, 500), stat: { value: 14, label: 'Goals' } },
  { playerName: 'Martin Ødegaard', teamName: 'Arsenal', photo: photo('player-2', 400, 500), stat: { value: 9, label: 'Assists' } },
];

export const matchEvents = [
  { id: '1', minute: "23'", type: 'goal' as const, description: 'Saka', side: 'home' as const },
  { id: '2', minute: "41'", type: 'yellowCard' as const, description: 'Rice', side: 'home' as const },
  { id: '3', minute: "54'", type: 'goal' as const, description: 'Palmer', side: 'away' as const },
  { id: '4', minute: "61'", type: 'substitution' as const, description: 'Havertz in, Jesus out', side: 'home' as const },
  { id: '5', minute: "67'", type: 'goal' as const, description: 'Trossard', side: 'home' as const },
];

export const sportOptions = [
  { id: 'football', label: 'Football' },
  { id: 'cricket', label: 'Cricket' },
  { id: 'tennis', label: 'Tennis' },
  { id: 'basketball', label: 'Basketball' },
];
