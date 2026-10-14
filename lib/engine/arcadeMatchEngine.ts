// lib/engine/arcadeMatchEngine.ts
import {
    CareerSave,
    MatchDecisionEvent,
    MatchDecisionOption,
    Player,
    PlayerRole,
    Team,
} from '@/types/game';
import { getTacticalBonus, MATCH_DECISION_EVENTS } from '@/lib/data/gameData';

export interface MatchLog {
    id: string;
    time: string;
    text: string;
    type: 'info' | 'goal_user' | 'goal_opp' | 'decision_win' | 'decision_fail';
}

export interface DecisionResolution {
    success: boolean;
    goalScoredByUserTeam: boolean;
    goalScoredByOppTeam: boolean;
    narrativeText: string;
    feelingDelta: number;
    coachTrustDelta: number;
    statUsed: PlayerRole;
    tacticalAdvantage: 'advantage' | 'neutral' | 'disadvantage';
    successChance: number;
}

// Les 3 moments clés d'un match de 300 secondes (5:00 -> 0:00)
export const DECISION_TRIGGER_SECONDS = [225, 130, 15]; // 3:45, 2:10, 0:15

/**
 * Formate les secondes restantes (ex: 225 -> "3:45")
 */
export function formatMatchClock(secondsRemaining: number, isOvertime = false): string {
    const absSec = Math.abs(secondsRemaining);
    const mins = Math.floor(absSec / 60);
    const secs = absSec % 60;
    const formatted = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    return isOvertime ? `+${formatted} (OT)` : formatted;
}

/**
 * Tire au sort 3 événements de décision uniques pour le match
 * en adaptant le rôle du défenseur adverse selon le roster d'en face.
 */
export function pickMatchDecisions(opponentTeam: Team): MatchDecisionEvent[] {
    const shuffled = [...MATCH_DECISION_EVENTS].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    return selected.map((evt, index) => {
        // On prend un joueur adverse réel pour définir son style sur l'action
        const oppPlayer = opponentTeam.roster[index % opponentTeam.roster.length];
        return {
            ...evt,
            opponentRole: oppPlayer ? oppPlayer.role : evt.opponentRole,
            situationText: oppPlayer
                ? `${evt.situationText} (${oppPlayer.gamertag} est sur l'action !)`
                : evt.situationText,
        };
    });
}

/**
 * Simulation passive d'une tranche de match entre deux décisions
 * (Possibilité de buts marqués par les coéquipiers ou encaissés selon l'OVR des équipes)
 */
export function simulatePassiveTick(
    userTeam: Team,
    oppTeam: Team,
    currentClock: number
): { userScored: boolean; oppScored: boolean; log?: MatchLog } {
    // Probabilité de base qu'il se passe un but sur un tick de 15 secondes (~12%)
    const roll = Math.random();
    if (roll > 0.12) {
        return { userScored: false, oppScored: false };
    }

    const ovrDiff = userTeam.ovr - oppTeam.ovr;
    // Si les équipes ont le même OVR, 50/50. Sinon bonus de 2% par point d'OVR d'écart.
    const userGoalProb = Math.min(0.8, Math.max(0.2, 0.5 + ovrDiff * 0.02));

    const timeStr = formatMatchClock(currentClock);

    if (Math.random() < userGoalProb) {
        constmates = userTeam.roster.filter((p) => !p.isUser);
        const scorer =
            constmates[Math.floor(Math.random() * constmates.length)]?.gamertag ||
            userTeam.roster[0].gamertag;
        return {
            userScored: true,
            oppScored: false,
            log: {
                id: `log-${ currentClock }-${ Math.random() }`,
                time: timeStr,
                text: `⚽ BUT DE ${userTeam.tag} ! Superbe action collective conclue par ${scorer}.`,
                type: 'goal_user',
            },
        };
    } else {
        const oppScorer =
            oppTeam.roster[Math.floor(Math.random() * oppTeam.roster.length)]?.gamertag ||
            oppTeam.tag;
        return {
            userScored: false,
            oppScored: true,
            log: {
                id: `log-${ currentClock }-${ Math.random() }`,
                time: timeStr,
                text: `💥 But de ${oppTeam.name} (${oppScorer}) sur une erreur de rotation...`,
                type: 'goal_opp',
            },
        };
    }
}

/**
 * Résout l'un des 3 choix du joueur pendant le match
 */
export function resolvePlayerDecision(
    player: Player,
    feeling: number,
    userTeam: Team,
    oppTeam: Team,
    event: MatchDecisionEvent,
    chosenOption: MatchDecisionOption
): DecisionResolution {
    // 1. Statistique du joueur correspondant au choix (Mécanique, Équipe ou Défense)
    const statValue = player.stats[chosenOption.roleType];

    // 2. Bonus Pierre-Feuille-Ciseaux (Équipe > Défense > Mécanique > Équipe)
    const tacticalBonus = getTacticalBonus(chosenOption.roleType, event.opponentRole);
    const tacticalAdvantage =
        tacticalBonus > 0 ? 'advantage' : tacticalBonus < 0 ? 'disadvantage' : 'neutral';

    // 3. Bonus/Malus de Feeling (centré sur 50 : entre -10% et +10%)
    const feelingModifier = (feeling - 50) * 0.2;

    // 4. Différence de niveau avec l'équipe adverse
    const teamDiffModifier = (userTeam.ovr - oppTeam.ovr) * 0.6;

    // 5. Calcul du % de réussite (borné entre 15% et 92%)
    const rawChance = statValue + tacticalBonus + feelingModifier + teamDiffModifier;
    const successChance = Math.round(Math.min(92, Math.max(15, rawChance)));

    const roll = Math.random() * 100;
    const success = roll <= successChance;

    if (success) {
        // Si c'est un choix offensif (Méca ou Équipe), forte chance de marquer/faire une passe décisive
        const isGoal = chosenOption.roleType !== 'defense' ? Math.random() < 0.78 : Math.random() < 0.35;

        return {
            success: true,
            goalScoredByUserTeam: isGoal,
            goalScoredByOppTeam: false,
            narrativeText: isGoal
                ? `🔥 INCROYABLE ! Ton choix (${chosenOption.label}) prend le dessus et se transforme en BUT décisif pour ${userTeam.tag} !`
                : `✅ Action maîtrisée ! (${chosenOption.label}) permet de stopper le danger et de relancer proprement.`,
            feelingDelta: isGoal ? +8 : +4,
            coachTrustDelta: isGoal ? +6 : +3,
            statUsed: chosenOption.roleType,
            tacticalAdvantage,
            successChance,
        };
    } else {
        // En cas d'échec, risque de prendre un contre assassin
        const oppPunishes = Math.random() < 0.55;

        return {
            success: false,
            goalScoredByUserTeam: false,
            goalScoredByOppTeam: oppPunishes,
            narrativeText: oppPunishes
                ? `❌ Contré ! L'adversaire avait anticipé (${chosenOption.label}) et marque sur la contre-attaque directe...`
                : `⚠️ Action ratée sur (${chosenOption.label}). Heureusement, ton 3e homme sauve les meubles in extremis !`,
            feelingDelta: oppPunishes ? -7 : -3,
            coachTrustDelta: oppPunishes ? -6 : -2,
            statUsed: chosenOption.roleType,
            tacticalAdvantage,
            successChance,
        };
    }
}

/**
 * Met à jour la sauvegarde après un match (Stats, Jauges, Argent, Points RLCS)
 */
export function applyMatchResultToSave(
    save: CareerSave,
    opponentTeamId: string,
    userGoals: number,
    oppGoals: number,
    playerGoals: number,
    playerAssists: number,
    playerSaves: number,
    feelingDeltaTotal: number,
    coachTrustDeltaTotal: number
): CareerSave {
    const won = userGoals > oppGoals;

    const newFeeling = Math.min(
        100,
        Math.max(0, save.gauges.feeling + feelingDeltaTotal + (won ? 5 : -5))
    );
    const newCoachTrust = Math.min(
        100,
        Math.max(0, save.gauges.coachTrust + coachTrustDeltaTotal + (won ? 4 : -4))
    );
    const newEnergy = Math.max(0, save.gauges.energy - 15);

    // Petit bonus de cashprize en cas de victoire
    const matchPrize = won ? 450 : 100;

    // Mise à jour des points RLCS si victoire
    const updatedTeams = save.teams.map((t) => {
        if (t.id === save.currentTeamId && won) {
            return { ...t, rlcsPoints: t.rlcsPoints + 3 };
        }
        if (t.id === opponentTeamId && !won) {
            return { ...t, rlcsPoints: t.rlcsPoints + 3 };
        }
        return t;
    });

    return {
        ...save,
        updatedAt: new Date().toISOString(),
        money: save.money + matchPrize,
        week: save.week + 1,
        gauges: {
            energy: newEnergy,
            feeling: newFeeling,
            coachTrust: newCoachTrust,
        },
        teams: updatedTeams,
        careerHistory: {
            ...save.careerHistory,
            matchesPlayed: save.careerHistory.matchesPlayed + 1,
            matchesWon: save.careerHistory.matchesWon + (won ? 1 : 0),
            goals: save.careerHistory.goals + playerGoals,
            assists: save.careerHistory.assists + playerAssists,
            saves: save.careerHistory.saves + playerSaves,
        },
    };
}