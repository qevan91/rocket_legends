// types/game.ts

export type Region = 'EU' | 'NA' | 'MENA' | 'SAM' | 'OCE' | 'APAC' | 'SSA';

// Le fameux Pierre-Feuille-Ciseaux : mechanics > teamplay > defense > mechanics
export type PlayerRole = 'mechanics' | 'teamplay' | 'defense';

// Tier 3 = Bubble Team (Départ), Tier 2 = Top 16 Régional, Tier 1 = Élite / Major & Worlds
export type TeamTier = 1 | 2 | 3;

export type PlayStyle = 'aggressive' | 'balanced' | 'defensive';

export type ContractStatus = 'starter' | 'sub' | 'free_agent';

export interface PlayerStats {
    mechanics: number; // 1-99 (Air dribble, flip reset, solo play)
    teamplay: number;  // 1-99 (Passes, comms, rotation, boost management)
    defense: number;   // 1-99 (Saves, shadow defense, fake challenge)
}

export interface PlayerGauges {
    energy: number;     // 0-100 : Baisse à l'entraînement/match, remonte au repos
    feeling: number;    // 0-100 : Confiance/Sensation en jeu (influe sur les choix en match)
    coachTrust: number; // 0-100 : < 30 en fin de Split = mis sur le banc ou viré !
}

export interface Player {
    id: string;
    gamertag: string;
    age: number;
    nationality: string;
    region: Region;
    role: PlayerRole;
    stats: PlayerStats;
    ovr: number; // Moyenne pondérée des 3 stats
    isUser?: boolean;
    // Affinité (0-100) avec d'autres joueurs (ID du joueur -> score de chimie)
    chemistry?: Record<string, number>;
}

export interface Team {
    id: string;
    name: string;
    tag: string;
    region: Region;
    tier: TeamTier;
    ovr: number;
    playStyle: PlayStyle;
    coachName: string;
    roster: Player[]; // 3 titulaires (+ 1 sub optionnel)
    rlcsPoints: number;
    logoColor: string;
}

export interface TransferOffer {
    teamId: string;
    teamName: string;
    teamTier: TeamTier;
    teamOvr: number;
    offeredStatus: 'starter' | 'sub';
    monthlySalary: number;
    reason: 'promotion' | 'lateral' | 'rebound_after_kick';
}

// Pour les 3 choix max par match (Mode Joueur)
export interface MatchDecisionOption {
    id: string;
    label: string;
    roleType: PlayerRole; // Indique si le choix repose sur Méca, Équipe ou Défense
    description: string;
}

export interface MatchDecisionEvent {
    id: string;
    minute: string; // ex: "3:42" ou "+0:25 (OT)"
    situationText: string;
    opponentRole: PlayerRole; // Rôle du défenseur/attaquant en face pour le Pierre-Feuille-Ciseaux
    options: [MatchDecisionOption, MatchDecisionOption, MatchDecisionOption];
}

export interface CareerSave {
    id: string;
    userId?: string;
    createdAt: string;
    updatedAt: string;
    difficulty: 'bronze' | 'diamond' | 'ssl';

    // Infos du joueur incarné
    player: Player;
    gauges: PlayerGauges;
    contractStatus: ContractStatus;
    currentTeamId: string;

    // Économie & Équipement (préparé pour la V1.1)
    money: number;
    monthlySalary: number;
    equipmentLevel: 1 | 2 | 3; // 1 = Setup de base, 2 = PC 144Hz, 3 = Setup Pro 360Hz

    // Progression de la saison
    season: number;
    split: 1 | 2 | 3; // Split 1 (Fall), Split 2 (Winter), Split 3 (Spring) -> Worlds
    week: number;     // Semaine dans le Split (ex: Semaines 1 à 6, Semaine 6 = Mercato)

    // Historique & État des équipes de la sauvegarde
    teams: Team[];
    careerHistory: {
        matchesPlayed: number;
        matchesWon: number;
        goals: number;
        assists: number;
        saves: number;
        trophies: string[];
    };

    // Offres disponibles si le joueur est en période de mercato ou s'est fait virer
    pendingOffers?: TransferOffer[];
}