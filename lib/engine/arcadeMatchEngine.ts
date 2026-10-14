// lib/engine/arcadeMatchEngine.ts

export interface SpecialTechnique {
    id: string;
    nameFr: string;
    nameEn: string;
    icon: string;
    type: 'Offense' | 'Defense' | 'Dribble';
    tpCost: number;
    powerMultiplier: number;
}

export const GAME_TECHNIQUES: Record<string, SpecialTechnique> = {
    meteor_shot: {
        id: 'meteor_shot',
        nameFr: 'TIR MÉTÉORE',
        nameEn: 'METEOR SHOT',
        icon: '☄️',
        type: 'Offense',
        tpCost: 30,
        powerMultiplier: 2.5,
    },
    gravity_shield: {
        id: 'gravity_shield',
        nameFr: 'BOUCLIER GRAVITATIONNEL',
        nameEn: 'GRAVITY SHIELD',
        icon: '🌀',
        type: 'Defense',
        tpCost: 25,
        powerMultiplier: 2.2,
    },
    sonic_dribble: {
        id: 'sonic_dribble',
        nameFr: 'DRIBBLE SONIQUE',
        nameEn: 'SONIC DRIBBLE',
        icon: '⚡',
        type: 'Dribble',
        tpCost: 20,
        powerMultiplier: 1.8,
    },
};

export interface DuelResult {
    winner: 'player' | 'opponent';
    descriptionFr: string;
    descriptionEn: string;
    isGoal: boolean;
    scoreHome: number;
    scoreAway: number;
}

export function resolveArcadeDuel(
    playerTp: number,
    usedTechniqueId: string | null,
    scoreHome: number,
    scoreAway: number,
    lang: 'fr' | 'en'
): { result: DuelResult; newTp: number } {
    let playerPower = Math.floor(Math.random() * 40) + 50;
    let opponentPower = Math.floor(Math.random() * 50) + 45;
    let remainingTp = playerTp;

    if (usedTechniqueId && GAME_TECHNIQUES[usedTechniqueId]) {
        const tech = GAME_TECHNIQUES[usedTechniqueId];
        if (remainingTp >= tech.tpCost) {
            remainingTp -= tech.tpCost;
            playerPower = Math.round(playerPower * tech.powerMultiplier);
        }
    }

    const isPlayerWinner = playerPower >= opponentPower;
    let newScoreHome = scoreHome;
    let newScoreAway = scoreAway;

    if (isPlayerWinner) {
        newScoreHome += 1;
    } else {
        newScoreAway += 1;
    }

    const techName = usedTechniqueId ? GAME_TECHNIQUES[usedTechniqueId] : null;

    const descFr = isPlayerWinner
        ? techName
            ? `🔥 DÉCLENCHEMENT DE [${techName.nameFr}] ! Le tir transperce la défense adverse ! BUT !`
            : `⚽ Attaque rapide réussie ! La balle termine au fond des filets !`
        : `🛡️ La défense adverse s'interpose et déclenche une contre-attaque fulgurante ! BUT ADVERSE !`;

    const descEn = isPlayerWinner
        ? techName
            ? `🔥 SPECIAL MOVE [${techName.nameEn}] ACTIVATED! The shot pierces through the defense! GOAL!`
            : `⚽ Successful quick attack! The ball hits the back of the net!`
        : `🛡️ The opponent stops your action and triggers a counter-attack! OPPONENT GOAL!`;

    return {
        result: {
            winner: isPlayerWinner ? 'player' : 'opponent',
            descriptionFr: descFr,
            descriptionEn: descEn,
            isGoal: true,
            scoreHome: newScoreHome,
            scoreAway: newScoreAway,
        },
        newTp: remainingTp,
    };
}