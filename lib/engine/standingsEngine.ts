// lib/engine/standingsEngine.ts
import { TeamOption, RegionKey } from '../data/gameData';

export interface TeamStanding {
    teamId: string;
    teamInfo: TeamOption;
    region: RegionKey;
    points: number;
    tournamentsWon: number;
    headToHeadWins: Record<string, number>; // Nombre de victoires face-à-face vs autres équipes
    goalsScoredInRegionals: number;
}

export type RegionalStandings = Record<RegionKey, TeamStanding[]>;

/**
 * Barème des points officiels RLCS
 */
export const POINTS_DISTRIBUTION = {
    open: {
        first: 16,
        second: 12,
        thirdFourth: 9,
        fifthEighth: 6,
        ninthEleventh: 4,
        twelfthSixteenth: 3,
    },
    major: {
        first: 32,
        second: 24,
        thirdFourth: 18,
        fifthEighth: 12,
        ninthEleventh: 8,
        twelfthSixteenth: 6,
    }
};

/**
 * Tri Complexe RLCS :
 * 1. Points globaux
 * 2. Nombre de tournois gagnés
 * 3. Face à face (Head-to-Head)
 * 4. Buts marqués
 */
export function sortStandings(teams: TeamStanding[]): TeamStanding[] {
    return teams.sort((a, b) => {
        // 1. Points Totaux
        if (a.points !== b.points) {
            return b.points - a.points;
        }

        // 2. Nombre de Trophées (Tournois Gagnés)
        if (a.tournamentsWon !== b.tournamentsWon) {
            return b.tournamentsWon - a.tournamentsWon;
        }

        // 3. Face à Face (Head to Head)
        const aWinsVsB = a.headToHeadWins[b.teamId] || 0;
        const bWinsVsA = b.headToHeadWins[a.teamId] || 0;

        if (aWinsVsB !== bWinsVsA) {
            return bWinsVsA - aWinsVsB;
        }

        // 4. Goals Scored
        return b.goalsScoredInRegionals - a.goalsScoredInRegionals;
    });
}

/**
 * Initialise le classement pour toutes les régions
 */
export function initializeStandings(allTeams: Record<RegionKey, TeamOption[]>): RegionalStandings {
    const standings: Partial<RegionalStandings> = {};

    for (const region in allTeams) {
        const rKey = region as RegionKey;
        standings[rKey] = allTeams[rKey].map(team => ({
            teamId: team.id,
            teamInfo: team,
            region: rKey,
            points: 0,
            tournamentsWon: 0,
            headToHeadWins: {},
            goalsScoredInRegionals: 0
        }));
    }

    return standings as RegionalStandings;
}

/**
 * Génère un classement simulé dynamique basé sur les Tiers d'équipes
 */
export function generateDynamicStandings(teams: TeamOption[], playerTeamId?: string): TeamStanding[] {
    const standings: TeamStanding[] = teams.map(team => {
        const isPlayer = team.id === playerTeamId;
        const baseBonus = team.tier === 'Worlds Contender' ? 32 : team.tier === 'Elite' ? 20 : team.tier === 'Underdog' ? 10 : 3;
        const randomVariation = Math.floor(Math.random() * 12);
        const points = baseBonus + randomVariation + (isPlayer ? 8 : 0);

        return {
            teamId: team.id,
            teamInfo: team,
            region: team.region,
            points,
            tournamentsWon: points >= 35 ? 1 : 0,
            headToHeadWins: {},
            goalsScoredInRegionals: Math.floor(points * 1.8) + Math.floor(Math.random() * 5),
        };
    });

    return sortStandings(standings);
}

/**
 * Met à jour le classement après un tournoi
 */
export function updateStandingsAfterTournament(
    currentStandings: RegionalStandings,
    region: RegionKey,
    results: { teamId: string, rank: string, goalsScored: number }[],
    tournamentType: 'open' | 'major'
): RegionalStandings {

    const newStandings = { ...currentStandings };
    const pointSystem = tournamentType === 'open' ? POINTS_DISTRIBUTION.open : POINTS_DISTRIBUTION.major;

    results.forEach(result => {
        const teamIndex = newStandings[region].findIndex(t => t.teamId === result.teamId);
        if (teamIndex === -1) return;

        const team = newStandings[region][teamIndex];

        if (result.rank === '1st') {
            team.points += pointSystem.first;
            team.tournamentsWon += 1;
        } else if (result.rank === '2nd') {
            team.points += pointSystem.second;
        } else if (result.rank === '3rd-4th') {
            team.points += pointSystem.thirdFourth;
        } else if (['5-8th', '5th', '6th', '7th', '8th'].includes(result.rank)) {
            team.points += pointSystem.fifthEighth;
        } else if (['9-11th', '9th', '10th', '11th'].includes(result.rank)) {
            team.points += pointSystem.ninthEleventh;
        } else {
            team.points += pointSystem.twelfthSixteenth;
        }

        if (tournamentType === 'open') {
            team.goalsScoredInRegionals += result.goalsScored;
        }
    });

    newStandings[region] = sortStandings(newStandings[region]);
    return newStandings;
}