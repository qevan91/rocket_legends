// lib/data/gameData.ts
import { Team, PlayerRole, MatchDecisionEvent, PlayerStats } from '@/types/game';

/**
 * 1. RÈGLE DU TRIANGLE TACTIQUE (Pierre-Feuille-Ciseaux)
 * Équipe bat Défense | Défense bat Mécanique | Mécanique bat Équipe
 */
export const ROLE_ADVANTAGE: Record<PlayerRole, PlayerRole> = {
    teamplay: 'defense',   // Le jeu de passes/collectif contourne une grosse défense
    defense: 'mechanics',  // Un bon placement/fake challenge stoppe un solo play mécanique
    mechanics: 'teamplay', // L'exploit individuel casse une structure collective
};

export function getTacticalBonus(playerRole: PlayerRole, opponentRole: PlayerRole): number {
    if (ROLE_ADVANTAGE[playerRole] === opponentRole) return 12; // Bonus si avantage
    if (ROLE_ADVANTAGE[opponentRole] === playerRole) return -10; // Malus si désavantage
    return 0; // Neutre
}

/**
 * 2. CALCUL DE L'OVR DU JOUEUR SELON SON RÔLE
 */
export function calculatePlayerOvr(stats: PlayerStats, role: PlayerRole): number {
    const weights = {
        mechanics: role === 'mechanics' ? 0.5 : 0.25,
        teamplay: role === 'teamplay' ? 0.5 : 0.25,
        defense: role === 'defense' ? 0.5 : 0.25,
    };
    return Math.round(
        stats.mechanics * weights.mechanics +
        stats.teamplay * weights.teamplay +
        stats.defense * weights.defense
    );
}

/**
 * 3. SEUILS DE CONFIANCE DU COACH (0 à 100)
 */
export const COACH_TRUST_THRESHOLDS = {
    KICKED: 30,    // En dessous de 30 en fin de Split : Viré de l'équipe !
    SUB_RISK: 45,  // Entre 30 et 44 : Mis sur le banc (Sub) ou avertissement
    SAFE: 50,      // Valeur de départ à la signature
    STAR: 80,      // Au-dessus de 80 : Intouchable + attire les équipes du Tier supérieur
};

/**
 * 4. STATS DE DÉPART DU JOUEUR (V1 : Départ en bas de l'échelle, OVR ~63)
 */
export const INITIAL_PLAYER_STATS: Record<PlayerRole, PlayerStats> = {
    mechanics: { mechanics: 68, teamplay: 58, defense: 58 }, // OVR 63
    teamplay:  { mechanics: 58, teamplay: 68, defense: 58 }, // OVR 63
    defense:   { mechanics: 58, teamplay: 58, defense: 68 }, // OVR 63
};

/**
 * 5. BASE DE DONNÉES DES ÉQUIPES (Tiers 3, 2 et 1)
 * Le joueur commence obligatoirement dans une équipe de Tier 3 (Bubble Team).
 */
export const INITIAL_TEAMS: Team[] = [
    // ==========================================
    // EUROPE (EU) - TIER 3 (BUBBLE TEAMS - DÉPART)
    // ==========================================
    {
        id: 'eu-t3-1',
        name: 'Supernova Academy',
        tag: 'SNV',
        region: 'EU',
        tier: 3,
        ovr: 63,
        playStyle: 'aggressive',
        coachName: 'Coach Kévin',
        rlcsPoints: 0,
        logoColor: '#f97316',
        roster: [
            { id: 'p-snv-1', gamertag: 'KylianRL', age: 16, nationality: 'FR', region: 'EU', role: 'mechanics', stats: { mechanics: 66, teamplay: 60, defense: 60 }, ovr: 63 },
            { id: 'p-snv-2', gamertag: 'Lukas', age: 18, nationality: 'DE', region: 'EU', role: 'defense', stats: { mechanics: 59, teamplay: 62, defense: 66 }, ovr: 63 },
            { id: 'p-snv-3', gamertag: 'Toby', age: 17, nationality: 'UK', region: 'EU', role: 'teamplay', stats: { mechanics: 61, teamplay: 65, defense: 60 }, ovr: 63 },
        ],
    },
    {
        id: 'eu-t3-2',
        name: 'Rusty Bumpers',
        tag: 'RST',
        region: 'EU',
        tier: 3,
        ovr: 62,
        playStyle: 'defensive',
        coachName: 'Coach Bram',
        rlcsPoints: 0,
        logoColor: '#84cc16',
        roster: [
            { id: 'p-rst-1', gamertag: 'Daan', age: 19, nationality: 'NL', region: 'EU', role: 'defense', stats: { mechanics: 58, teamplay: 61, defense: 66 }, ovr: 63 },
            { id: 'p-rst-2', gamertag: 'Enzo77', age: 16, nationality: 'FR', region: 'EU', role: 'mechanics', stats: { mechanics: 64, teamplay: 58, defense: 59 }, ovr: 61 },
            { id: 'p-rst-3', gamertag: 'Paco', age: 20, nationality: 'ES', region: 'EU', role: 'teamplay', stats: { mechanics: 60, teamplay: 64, defense: 61 }, ovr: 62 },
        ],
    },
    {
        id: 'eu-t3-3',
        name: 'Flip Resetters',
        tag: 'FLR',
        region: 'EU',
        tier: 3,
        ovr: 64,
        playStyle: 'balanced',
        coachName: 'Coach Matteo',
        rlcsPoints: 0,
        logoColor: '#06b6d4',
        roster: [
            { id: 'p-flr-1', gamertag: 'Sora', age: 15, nationality: 'IT', region: 'EU', role: 'mechanics', stats: { mechanics: 68, teamplay: 60, defense: 60 }, ovr: 64 },
            { id: 'p-flr-2', gamertag: 'Niko', age: 18, nationality: 'FI', region: 'EU', role: 'teamplay', stats: { mechanics: 62, teamplay: 66, defense: 63 }, ovr: 64 },
            { id: 'p-flr-3', gamertag: 'benji', age: 17, nationality: 'BE', region: 'EU', role: 'defense', stats: { mechanics: 60, teamplay: 62, defense: 67 }, ovr: 64 },
        ],
    },

    // ==========================================
    // EUROPE (EU) - TIER 2 (SUB-TOP / TOP 8-16)
    // ==========================================
    {
        id: 'eu-t2-1',
        name: 'Solary Esport',
        tag: 'SLY',
        region: 'EU',
        tier: 2,
        ovr: 74,
        playStyle: 'balanced',
        coachName: 'Fuury',
        rlcsPoints: 6,
        logoColor: '#eab308',
        roster: [
            { id: 'p-sly-1', gamertag: 'Kaydop', age: 26, nationality: 'FR', region: 'EU', role: 'teamplay', stats: { mechanics: 71, teamplay: 78, defense: 73 }, ovr: 75 },
            { id: 'p-sly-2', gamertag: 'Chausette45', age: 23, nationality: 'FR', region: 'EU', role: 'defense', stats: { mechanics: 72, teamplay: 73, defense: 77 }, ovr: 75 },
            { id: 'p-sly-3', gamertag: 'Rizex45', age: 22, nationality: 'DE', region: 'EU', role: 'mechanics', stats: { mechanics: 75, teamplay: 71, defense: 71 }, ovr: 73 },
        ],
    },
    {
        id: 'eu-t2-2',
        name: 'Team Endpoint',
        tag: 'END',
        region: 'EU',
        tier: 2,
        ovr: 75,
        playStyle: 'defensive',
        coachName: 'Eclipse',
        rlcsPoints: 8,
        logoColor: '#3b82f6',
        roster: [
            { id: 'p-end-1', gamertag: 'Wave', age: 22, nationality: 'UK', region: 'EU', role: 'teamplay', stats: { mechanics: 73, teamplay: 78, defense: 74 }, ovr: 76 },
            { id: 'p-end-2', gamertag: 'Metsa', age: 24, nationality: 'FI', region: 'EU', role: 'defense', stats: { mechanics: 70, teamplay: 75, defense: 78 }, ovr: 75 },
            { id: 'p-end-3', gamertag: 'Crispy', age: 18, nationality: 'UK', region: 'EU', role: 'mechanics', stats: { mechanics: 77, teamplay: 71, defense: 72 }, ovr: 74 },
        ],
    },

    // ==========================================
    // EUROPE (EU) - TIER 1 (ÉLITE RLCS / WORLDS)
    // ==========================================
    {
        id: 'eu-t1-1',
        name: 'Team Vitality',
        tag: 'VIT',
        region: 'EU',
        tier: 1,
        ovr: 90,
        playStyle: 'aggressive',
        coachName: 'Fairy Peak!',
        rlcsPoints: 32,
        logoColor: '#facc15',
        roster: [
            { id: 'p-vit-1', gamertag: 'zen', age: 17, nationality: 'FR', region: 'EU', role: 'mechanics', stats: { mechanics: 96, teamplay: 89, defense: 90 }, ovr: 93 },
            { id: 'p-vit-2', gamertag: 'Alpha54', age: 21, nationality: 'FR', region: 'EU', role: 'mechanics', stats: { mechanics: 91, teamplay: 86, defense: 85 }, ovr: 88 },
            { id: 'p-vit-3', gamertag: 'Radosin', age: 20, nationality: 'FR', region: 'EU', role: 'teamplay', stats: { mechanics: 85, teamplay: 91, defense: 87 }, ovr: 89 },
        ],
    },
    {
        id: 'eu-t1-2',
        name: 'Karmine Corp',
        tag: 'KC',
        region: 'EU',
        tier: 1,
        ovr: 91,
        playStyle: 'aggressive',
        coachName: 'Ferra',
        rlcsPoints: 36,
        logoColor: '#2563eb',
        roster: [
            { id: 'p-kc-1', gamertag: 'Vatira', age: 18, nationality: 'FR', region: 'EU', role: 'defense', stats: { mechanics: 92, teamplay: 90, defense: 95 }, ovr: 93 },
            { id: 'p-kc-2', gamertag: 'Atow.', age: 17, nationality: 'BE', region: 'EU', role: 'mechanics', stats: { mechanics: 94, teamplay: 86, defense: 85 }, ovr: 90 },
            { id: 'p-kc-3', gamertag: 'Rise.', age: 19, nationality: 'UK', region: 'EU', role: 'teamplay', stats: { mechanics: 87, teamplay: 93, defense: 88 }, ovr: 90 },
        ],
    },
    {
        id: 'eu-t1-3',
        name: 'Gentle Mates',
        tag: 'M8',
        region: 'EU',
        tier: 1,
        ovr: 89,
        playStyle: 'balanced',
        coachName: 'Eversax',
        rlcsPoints: 30,
        logoColor: '#ec4899',
        roster: [
            { id: 'p-m8-1', gamertag: 'itachi', age: 21, nationality: 'MA', region: 'EU', role: 'teamplay', stats: { mechanics: 88, teamplay: 93, defense: 88 }, ovr: 91 },
            { id: 'p-m8-2', gamertag: 'seikoo', age: 20, nationality: 'FR', region: 'EU', role: 'mechanics', stats: { mechanics: 91, teamplay: 86, defense: 87 }, ovr: 89 },
            { id: 'p-m8-3', gamertag: 'juicy', age: 19, nationality: 'FR', region: 'EU', role: 'defense', stats: { mechanics: 87, teamplay: 85, defense: 89 }, ovr: 88 },
        ],
    },

    // ==========================================
    // NORTH AMERICA (NA) - TIER 3, 2, 1
    // ==========================================
    {
        id: 'na-t3-1',
        name: 'Boost Bandits',
        tag: 'BBD',
        region: 'NA',
        tier: 3,
        ovr: 63,
        playStyle: 'aggressive',
        coachName: 'Coach Mike',
        rlcsPoints: 0,
        logoColor: '#ef4444',
        roster: [
            { id: 'p-bbd-1', gamertag: 'Dash', age: 16, nationality: 'US', region: 'NA', role: 'mechanics', stats: { mechanics: 67, teamplay: 59, defense: 60 }, ovr: 63 },
            { id: 'p-bbd-2', gamertag: 'Maple', age: 18, nationality: 'CA', region: 'NA', role: 'teamplay', stats: { mechanics: 60, teamplay: 66, defense: 61 }, ovr: 63 },
            { id: 'p-bbd-3', gamertag: 'Brick', age: 19, nationality: 'US', region: 'NA', role: 'defense', stats: { mechanics: 59, teamplay: 61, defense: 67 }, ovr: 64 },
        ],
    },
    {
        id: 'na-t2-1',
        name: 'Shopify Rebellion',
        tag: 'SR',
        region: 'NA',
        tier: 2,
        ovr: 76,
        playStyle: 'balanced',
        coachName: 'Memory',
        rlcsPoints: 10,
        logoColor: '#10b981',
        roster: [
            { id: 'p-sr-1', gamertag: 'Jstn.', age: 21, nationality: 'US', region: 'NA', role: 'mechanics', stats: { mechanics: 82, teamplay: 74, defense: 74 }, ovr: 78 },
            { id: 'p-sr-2', gamertag: 'Paarth', age: 19, nationality: 'US', region: 'NA', role: 'teamplay', stats: { mechanics: 74, teamplay: 77, defense: 73 }, ovr: 75 },
            { id: 'p-sr-3', gamertag: '2Piece', age: 18, nationality: 'US', region: 'NA', role: 'defense', stats: { mechanics: 75, teamplay: 74, defense: 77 }, ovr: 76 },
        ],
    },
    {
        id: 'na-t1-1',
        name: 'G2 Stride',
        tag: 'G2',
        region: 'NA',
        tier: 1,
        ovr: 90,
        playStyle: 'aggressive',
        coachName: 'Satthew',
        rlcsPoints: 38,
        logoColor: '#dc2626',
        roster: [
            { id: 'p-g2-1', gamertag: 'BeastMode', age: 19, nationality: 'US', region: 'NA', role: 'mechanics', stats: { mechanics: 94, teamplay: 89, defense: 90 }, ovr: 92 },
            { id: 'p-g2-2', gamertag: 'Daniel', age: 17, nationality: 'US', region: 'NA', role: 'defense', stats: { mechanics: 91, teamplay: 88, defense: 93 }, ovr: 91 },
            { id: 'p-g2-3', gamertag: 'Atomic', age: 21, nationality: 'US', region: 'NA', role: 'teamplay', stats: { mechanics: 87, teamplay: 92, defense: 86 }, ovr: 89 },
        ],
    },
];

/**
 * 6. BANQUE DE SITUATIONS POUR LES 3 CHOIX MAX PAR MATCH
 */
export const MATCH_DECISION_EVENTS: MatchDecisionEvent[] = [
    {
        id: 'evt-air-1',
        minute: '3:45',
        situationText: "Le ballon rebondit haut contre le mur latéral avec 60 de boost. Le 1er défenseur adverse monte au plafond !",
        opponentRole: 'defense',
        options: [
            { id: 'opt-1', label: 'Tenter un Flip Reset Double Tap', roleType: 'mechanics', description: 'Exploit solo au-dessus du gardien' },
            { id: 'opt-2', label: 'Centrer fort vers le 2e homme (Infield)', roleType: 'teamplay', description: 'Passe tendue dans l’axe pour surprendre la défense' },
            { id: 'opt-3', label: 'Contrôler vers le bas et Fake Challenge', roleType: 'defense', description: 'Forcer l’adversaire à gaspiller son boost' },
        ],
    },
    {
        id: 'evt-def-1',
        minute: '2:10',
        situationText: "Contre-attaque adverse en 2v1 ! Tu es dernier défenseur (3e homme) avec seulement 36 de boost.",
        opponentRole: 'mechanics',
        options: [
            { id: 'opt-1', label: 'Pre-jump agressif sur le porteur', roleType: 'mechanics', description: 'Lecture rapide mais très risquée' },
            { id: 'opt-2', label: 'Temporiser pour laisser ton mate bump par derrière', roleType: 'teamplay', description: 'Gagner du temps pour le retour collectif' },
            { id: 'opt-3', label: 'Shadow Defense parfaite jusqu’à la ligne', roleType: 'defense', description: 'Couvrir l’angle et sauver au dernier instant' },
        ],
    },
    {
        id: 'evt-clutch-1',
        minute: '0:12',
        situationText: "Dernières secondes ! Le ballon flotte devant le backboard adverse, toute leur équipe est acculée dans les cages.",
        opponentRole: 'teamplay',
        options: [
            { id: 'opt-1', label: 'Psycho / Redirect angle fermé', roleType: 'mechanics', description: 'Tir mécanique quasi imparable' },
            { id: 'opt-2', label: 'Démolir le gardien et laisser marquer ton mate', roleType: 'teamplay', description: 'Bumper le dernier rempart' },
            { id: 'opt-3', label: 'Voler le corner boost et maintenir la pression', roleType: 'defense', description: 'Asphyxier l’adversaire sans se livrer' },
        ],
    },
];