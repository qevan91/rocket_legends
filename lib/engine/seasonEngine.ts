// lib/engine/seasonEngine.ts
import { TeamOption, RegionKey } from '../data/gameData';
import { ALL_PLAYERS, ProPlayer } from '../data/proPlayers';

export const TOURNAMENT_RANKS = [
    '1st', '2nd', '3rd-4th', '3rd-4th',
    '5-8th', '5-8th', '5-8th', '5-8th',
    '9-11th', '9-11th', '9-11th',
    '12-16th', '12-16th', '12-16th', '12-16th', '12-16th'
];

export interface CalendarEvent {
    id: string;
    name: string;
    type: 'open' | 'major' | 'worlds';
    allowsMercato: boolean;
}

export const SEASON_CALENDAR: CalendarEvent[] = [
    { id: 'regional_1', name: 'RLCS Regional Open 1', type: 'open', allowsMercato: false },
    { id: 'regional_2', name: 'RLCS Regional Open 2', type: 'open', allowsMercato: false },
    { id: 'regional_3', name: 'RLCS Regional Open 3', type: 'open', allowsMercato: false },
    { id: 'major_1', name: 'RLCS Major 1 (International)', type: 'major', allowsMercato: true },
    { id: 'regional_4', name: 'RLCS Regional Open 4', type: 'open', allowsMercato: false },
    { id: 'regional_5', name: 'RLCS Regional Open 5', type: 'open', allowsMercato: false },
    { id: 'regional_6', name: 'RLCS Regional Open 6', type: 'open', allowsMercato: false },
    { id: 'major_2', name: 'RLCS Major 2 (International)', type: 'major', allowsMercato: false },
    { id: 'worlds', name: 'Championnats du Monde (Worlds)', type: 'worlds', allowsMercato: true },
];

export interface TournamentResult {
    teamId: string;
    rank: string;
    goalsScored: number;
}

export interface TournamentAwards {
    winningTeam: { name: string; logo: string };
    mvp: { pseudo: string; teamName: string; rating: number };
    topScorer: { pseudo: string; teamName: string; goals: number };
    topPlaymaker: { pseudo: string; teamName: string; assists: number };
}

function getTeamPowerScore(tier: string): number {
    const randomFactor = Math.random() * 30;
    switch (tier) {
        case 'Worlds Contender': return 85 + randomFactor;
        case 'Elite': return 70 + randomFactor;
        case 'Underdog': return 45 + randomFactor;
        case 'Bubble': return 20 + randomFactor;
        default: return 50 + randomFactor;
    }
}

export function simulateRegionalTournament(
    regionTeams: TeamOption[],
    playerTeamId: string,
    playerRank: string
): TournamentResult[] {
    const availableRanks = [...TOURNAMENT_RANKS];
    const playerRankIndex = availableRanks.indexOf(playerRank);
    if (playerRankIndex > -1) {
        availableRanks.splice(playerRankIndex, 1);
    }

    const botTeams = regionTeams.filter(t => t.id !== playerTeamId);

    const simulatedTeams = botTeams.map(team => ({
        team,
        powerScore: getTeamPowerScore(team.tier)
    })).sort((a, b) => b.powerScore - a.powerScore);

    const results: TournamentResult[] = [
        { teamId: playerTeamId, rank: playerRank, goalsScored: getGoalsByRank(playerRank) }
    ];

    simulatedTeams.forEach((bot, index) => {
        const assignedRank = availableRanks[index] || '12-16th';
        results.push({
            teamId: bot.team.id,
            rank: assignedRank,
            goalsScored: getGoalsByRank(assignedRank)
        });
    });

    return results;
}

function getGoalsByRank(rank: string): number {
    const baseGoals: Record<string, number> = {
        '1st': 35, '2nd': 28, '3rd-4th': 20, '5-8th': 14, '9-11th': 8, '12-16th': 4
    };
    return (baseGoals[rank] || 5) + Math.floor(Math.random() * 6);
}

/**
 * Génère les Distinctions Individuelles du Tournoi
 */
export function generateTournamentAwards(
    regionTeams: TeamOption[],
    playerRank: string,
    playerPseudo: string,
    playerTeamName: string,
    playerGoals: number,
    playerRating: number
): TournamentAwards {
    // Équipe gagnante
    const winnerTeam = playerRank === '1st'
        ? { name: playerTeamName, logo: '🏆' }
        : {
            name: regionTeams.find(t => t.tier === 'Worlds Contender' || t.tier === 'Elite')?.name || 'Blue Wall Corp',
            logo: regionTeams.find(t => t.tier === 'Worlds Contender' || t.tier === 'Elite')?.logo || '🟦'
        };

    // Sélection d'un bot performant pour les awards si le joueur ne l'est pas
    const regionPlayerList = ALL_PLAYERS.filter(p => regionTeams.some(t => t.id === p.teamId));
    const randomTopBot = regionPlayerList[Math.floor(Math.random() * regionPlayerList.length)] || { pseudo: 'Zen', teamId: 'eu_1' };
    const botTeamName = regionTeams.find(t => t.id === randomTopBot.teamId)?.name || 'V-Hive';

    return {
        winningTeam: winnerTeam,
        mvp: playerRating >= 9.0 ? { pseudo: playerPseudo, teamName: playerTeamName, rating: playerRating } : { pseudo: randomTopBot.pseudo, teamName: botTeamName, rating: 9.4 },
        topScorer: playerGoals >= 6 ? { pseudo: playerPseudo, teamName: playerTeamName, goals: playerGoals } : { pseudo: randomTopBot.pseudo, teamName: botTeamName, goals: Math.floor(Math.random() * 4) + 7 },
        topPlaymaker: { pseudo: randomTopBot.pseudo, teamName: botTeamName, assists: Math.floor(Math.random() * 3) + 5 },
    };
}