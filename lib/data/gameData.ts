// lib/data/gameData.ts

export type RegionKey = 'EU' | 'NA' | 'MENA' | 'SAM' | 'OCE' | 'APAC' | 'SSA';
export type TeamTier = 'Worlds Contender' | 'Elite' | 'Underdog' | 'Bubble';

export interface TeamOption {
    id: string;
    name: string;
    shortTag: string;
    logo: string;
    tier: TeamTier;
    tierLabelFr: string;
    tierLabelEn: string;
    region: RegionKey;
}

export interface OriginScenario {
    id: string;
    icon: string;
    titleFr: string;
    titleEn: string;
    taglineFr: string;
    taglineEn: string;
    initialFortune: number;
    baseLevel: number;
    baseStars: number;
    potentialLabel: string;
    perkNameFr: string;
    perkNameEn: string;
    perkDescFr: string;
    perkDescEn: string;
}

export const ORIGIN_SCENARIOS: OriginScenario[] = [
    {
        id: 'ranked_prodigy',
        icon: '⚡',
        titleFr: 'Prodige de la Ranked',
        titleEn: 'Ranked Prodigy',
        taglineFr: 'Top 1 SSL en 2v2, repéré par la communauté.',
        taglineEn: 'Rank 1 SSL in 2v2, noticed by the scene.',
        initialFortune: 2500,
        baseLevel: 10,
        baseStars: 2,
        potentialLabel: 'S (Future Legend)',
        perkNameFr: 'Mécanique Éclair',
        perkNameEn: 'Lightning Mechanics',
        perkDescFr: 'Bonus de +15% de chance de victoire sur les actions mécaniques (Ceiling, Reset).',
        perkDescEn: '+15% win chance on mechanical actions.',
    },
    {
        id: 'academy_rookie',
        icon: '🎓',
        titleFr: 'Rookie d\'Académie',
        titleEn: 'Academy Prospect',
        taglineFr: 'Formé dans le centre d\'entraînement d\'un grand club.',
        taglineEn: 'Trained in a major org academy system.',
        initialFortune: 5000,
        baseLevel: 12,
        baseStars: 3,
        potentialLabel: 'A+ (Solid Pro)',
        perkNameFr: 'Discipline Tactique',
        perkNameEn: 'Tactical Discipline',
        perkDescFr: 'Relation avec le Coach démarre à 85% et le stress augmente 20% moins vite.',
        perkDescEn: 'Coach relation starts at 85% and stress builds up 20% slower.',
    },
    {
        id: 'bubble_grinder',
        icon: '🛠️',
        titleFr: 'Grinder de l\'Ombre',
        titleEn: 'Bubble Grinder',
        taglineFr: 'Deux ans à jouer des LANs locales sans sponsor.',
        taglineEn: 'Two years grinding local LANs without sponsors.',
        initialFortune: 500,
        baseLevel: 8,
        baseStars: 1,
        potentialLabel: 'S+ (Unstoppable)',
        perkNameFr: 'Mental d\'Acier',
        perkNameEn: 'Iron Mental',
        perkDescFr: 'Le Moral ne descend jamais en dessous de 40% même en cas de lourde défaite.',
        perkDescEn: 'Morale never drops below 40% even after a heavy loss.',
    }
];

export const RANDOM_PSEUDOS = [
    'Vortex', 'Zenith', 'Kira', 'Aero', 'Pulse', 'Shadow', 'Apex', 'Nova',
    'Hyper', 'Striker', 'Phantom', 'Flux', 'Drift', 'Blaze', 'Slayer', 'Echo'
];

export function generateRandomFullName() {
    const firstNames = ['Lucas', 'Hugo', 'Enzo', 'Leo', 'Gabriel', 'Arthur', 'Louis', 'Jules', 'Mathis', 'Adam'];
    const lastNames = ['Lefèvre', 'Moreau', 'Roux', 'Fournier', 'Girard', 'Bonnet', 'Mercier', 'Blanc', 'Guerin', 'Boyer'];
    return {
        firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
        lastName: lastNames[Math.floor(Math.random() * lastNames.length)]
    };
}

// ==========================================================
// 🇪🇺 EUROPE (30 ÉQUIPES)
// ==========================================================
export const EU_TEAMS: TeamOption[] = [
    { id: 'eu_1', name: 'Blue Wall Corp', shortTag: 'BWC', logo: '🟦', tier: 'Worlds Contender', tierLabelFr: 'Prétendant Mondial', tierLabelEn: 'Worlds Contender', region: 'EU' },
    { id: 'eu_2', name: 'Yellow V-Hive', shortTag: 'YVH', logo: '🐝', tier: 'Worlds Contender', tierLabelFr: 'Prétendant Mondial', tierLabelEn: 'Worlds Contender', region: 'EU' },
    { id: 'eu_3', name: 'Swiss BDS', shortTag: 'BDS', logo: '🛡️', tier: 'Worlds Contender', tierLabelFr: 'Prétendant Mondial', tierLabelEn: 'Worlds Contender', region: 'EU' },
    { id: 'eu_4', name: 'Gentle Mates Esport', shortTag: 'M8S', logo: '🤝', tier: 'Worlds Contender', tierLabelFr: 'Prétendant Mondial', tierLabelEn: 'Worlds Contender', region: 'EU' },
    { id: 'eu_5', name: 'Oxygen Surge', shortTag: 'OXG', logo: '💨', tier: 'Worlds Contender', tierLabelFr: 'Prétendant Mondial', tierLabelEn: 'Worlds Contender', region: 'EU' },
    { id: 'eu_6', name: 'Splash Waves', shortTag: 'SPL', logo: '💦', tier: 'Elite', tierLabelFr: 'Élite', tierLabelEn: 'Elite', region: 'EU' },
    { id: 'eu_7', name: 'Nigma Galaxy Gaming', shortTag: 'NIG', logo: '🌌', tier: 'Elite', tierLabelFr: 'Élite', tierLabelEn: 'Elite', region: 'EU' },
    { id: 'eu_8', name: 'Endpoint CeX', shortTag: 'END', logo: '🎯', tier: 'Elite', tierLabelFr: 'Élite', tierLabelEn: 'Elite', region: 'EU' },
    { id: 'eu_9', name: 'Ninjas in Pyjamas EU', shortTag: 'NIP', logo: '🥷', tier: 'Elite', tierLabelFr: 'Élite', tierLabelEn: 'Elite', region: 'EU' },
    { id: 'eu_10', name: 'Resolut1on Esports', shortTag: 'RES', logo: '⚡', tier: 'Elite', tierLabelFr: 'Élite', tierLabelEn: 'Elite', region: 'EU' },
    { id: 'eu_11', name: 'Team Liquidators', shortTag: 'TLQ', logo: '🐴', tier: 'Elite', tierLabelFr: 'Élite', tierLabelEn: 'Elite', region: 'EU' },
    { id: 'eu_12', name: 'Solary Apex', shortTag: 'SLY', logo: '☀️', tier: 'Elite', tierLabelFr: 'Élite', tierLabelEn: 'Elite', region: 'EU' },
    { id: 'eu_13', name: 'Williams Resolve', shortTag: 'WRS', logo: '🏎️', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'EU' },
    { id: 'eu_14', name: 'Suprballers', shortTag: 'SUP', logo: '🔮', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'EU' },
    { id: 'eu_15', name: 'Guild Esports UK', shortTag: 'GLD', logo: '🏆', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'EU' },
    { id: 'eu_16', name: 'Team Jobless', shortTag: 'JBL', logo: '🧢', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'EU' },
    { id: 'eu_17', name: 'Nordic Vipers', shortTag: 'VIP', logo: '🐍', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'EU' },
    { id: 'eu_18', name: 'Grosvenors Esport', shortTag: 'GRS', logo: '🦁', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'EU' },
    { id: 'eu_19', name: 'Monaco Gaming Club', shortTag: 'MGC', logo: '🇲🇨', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'EU' },
    { id: 'eu_20', name: 'Atonium Knights', shortTag: 'ATN', logo: '⚔️', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'EU' },
    { id: 'eu_21', name: 'Aethon Dynamic', shortTag: 'AET', logo: '🦅', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'EU' },
    { id: 'eu_22', name: 'Freeplay Warriors', shortTag: 'FPW', logo: '🎮', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'EU' },
    { id: 'eu_23', name: 'Rule One-One', shortTag: 'R11', logo: '🚗', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'EU' },
    { id: 'eu_24', name: 'Ceiling Pinchers', shortTag: 'PCH', logo: '📐', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'EU' },
    { id: 'eu_25', name: 'Musty Masters', shortTag: 'MST', logo: '🌀', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'EU' },
    { id: 'eu_26', name: 'Kuxir Pinch Squad', shortTag: 'KUX', logo: '📐', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'EU' },
    { id: 'eu_27', name: 'Zero Boost Gaming', shortTag: 'ZBG', logo: '🪫', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'EU' },
    { id: 'eu_28', name: 'Overtime Heroes', shortTag: 'OTH', logo: '⏱️', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'EU' },
    { id: 'eu_29', name: 'Open Net Missers', shortTag: 'ONM', logo: '🥅', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'EU' },
    { id: 'eu_30', name: 'Demo Merchants', shortTag: 'DEM', logo: '💥', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'EU' },
];

// ==========================================================
// 🇺🇸 AMÉRIQUE DU NORD (30 ÉQUIPES)
// ==========================================================
export const NA_TEAMS: TeamOption[] = [
    { id: 'na_1', name: 'G2 Stride NA', shortTag: 'G2', logo: '🔴', tier: 'Worlds Contender', tierLabelFr: 'Prétendant Mondial', tierLabelEn: 'Worlds Contender', region: 'NA' },
    { id: 'na_2', name: 'Gen.K Mobil 2', shortTag: 'GEN', logo: '🐯', tier: 'Worlds Contender', tierLabelFr: 'Prétendant Mondial', tierLabelEn: 'Worlds Contender', region: 'NA' },
    { id: 'na_3', name: 'SSG Astronauts', shortTag: 'SSG', logo: '🚀', tier: 'Worlds Contender', tierLabelFr: 'Prétendant Mondial', tierLabelEn: 'Worlds Contender', region: 'NA' },
    { id: 'na_4', name: 'Shopify Rebels NA', shortTag: 'SR', logo: '🛍️', tier: 'Elite', tierLabelFr: 'Élite', tierLabelEn: 'Elite', region: 'NA' },
    { id: 'na_5', name: 'NRG Titans', shortTag: 'NRG', logo: '⚡', tier: 'Elite', tierLabelFr: 'Élite', tierLabelEn: 'Elite', region: 'NA' },
    { id: 'na_6', name: 'Complexity Gaming', shortTag: 'COL', logo: '⭐', tier: 'Elite', tierLabelFr: 'Élite', tierLabelEn: 'Elite', region: 'NA' },
    { id: 'na_7', name: 'Dignitas NA', shortTag: 'DIG', logo: '🦉', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'NA' },
    { id: 'na_8', name: 'M80 Squad', shortTag: 'M80', logo: '💣', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'NA' },
    { id: 'na_9', name: 'OG Esports NA', shortTag: 'OG', logo: '🌻', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'NA' },
    { id: 'na_10', name: 'Pioneers NA', shortTag: 'PIO', logo: '🤠', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'NA' },
    { id: 'na_11', name: 'Snowmen Squad', shortTag: 'SNW', logo: '☃️', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'NA' },
    { id: 'na_12', name: 'Luminosity Gaming', shortTag: 'LG', logo: '💡', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'NA' },
    { id: 'na_13', name: 'Sentinels NA', shortTag: 'SEN', logo: '🛡️', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'NA' },
    { id: 'na_14', name: 'Cloud9 Reborn', shortTag: 'C9', logo: '☁️', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'NA' },
    { id: 'na_15', name: '100 Thieves RL', shortTag: '100T', logo: '💯', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'NA' },
    { id: 'na_16', name: 'FaZe Clan Legacy', shortTag: 'FAZE', logo: '🎯', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'NA' },
    { id: 'na_17', name: 'Ghost Gaming NA', shortTag: 'GHST', logo: '👻', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'NA' },
    { id: 'na_18', name: 'Version1 Stars', shortTag: 'V1', logo: '💜', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'NA' },
    { id: 'na_19', name: 'Soniqs NA', shortTag: 'SQ', logo: '🦔', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'NA' },
    { id: 'na_20', name: 'Torrent Esports', shortTag: 'TOR', logo: '🌊', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'NA' },
    { id: 'na_21', name: 'Rogue Squad', shortTag: 'RGG', logo: '🥷', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'NA' },
    { id: 'na_22', name: 'Charlotte Phoenix', shortTag: 'CLT', logo: '🦅', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'NA' },
    { id: 'na_23', name: '7000 Boost Boys', shortTag: '7K', logo: '⛽', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'NA' },
    { id: 'na_24', name: 'Kickoff Kings NA', shortTag: 'KOK', logo: '👑', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'NA' },
    { id: 'na_25', name: 'Air Dribble Alliance', shortTag: 'ADA', logo: '🪁', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'NA' },
    { id: 'na_26', name: 'Flip Reset Farmers', shortTag: 'FRF', logo: '🚜', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'NA' },
    { id: 'na_27', name: 'Mainstage Misfits', shortTag: 'MSM', logo: '🎭', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'NA' },
    { id: 'na_28', name: 'Pinch Prodigies', shortTag: 'PRD', logo: '💥', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'NA' },
    { id: 'na_29', name: 'Overtime Outlaws', shortTag: 'OTO', logo: '⌛', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'NA' },
    { id: 'na_30', name: 'Ranked Resetters', shortTag: 'RR', logo: '🔄', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'NA' },
];

// ==========================================================
// 🇸🇦 MOYEN-ORIENT & AFRIQUE DU NORD (16 ÉQUIPES)
// ==========================================================
export const MENA_TEAMS: TeamOption[] = [
    { id: 'mena_1', name: 'Team Falcons', shortTag: 'FLC', logo: '🦅', tier: 'Worlds Contender', tierLabelFr: 'Prétendant Mondial', tierLabelEn: 'Worlds Contender', region: 'MENA' },
    { id: 'mena_2', name: 'Twisted Minds', shortTag: 'TM', logo: '🧠', tier: 'Elite', tierLabelFr: 'Élite', tierLabelEn: 'Elite', region: 'MENA' },
    { id: 'mena_3', name: 'Rule One Gaming', shortTag: 'R1', logo: '☝️', tier: 'Elite', tierLabelFr: 'Élite', tierLabelEn: 'Elite', region: 'MENA' },
    { id: 'mena_4', name: 'R8 Esports', shortTag: 'R8', logo: '🏎️', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'MENA' },
    { id: 'mena_5', name: 'Infinity', shortTag: 'INF', logo: '♾️', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'MENA' },
    { id: 'mena_6', name: 'Ooredoo Thunders', shortTag: 'OOR', logo: '⚡', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'MENA' },
    { id: 'mena_7', name: 'Geekay Esports', shortTag: 'GK', logo: '🤓', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'MENA' },
    { id: 'mena_8', name: 'Dragons', shortTag: 'DRG', logo: '🐉', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'MENA' },
    { id: 'mena_9', name: 'Veloce Esports Arabia', shortTag: 'VEL', logo: '🚀', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'MENA' },
    { id: 'mena_10', name: 'Goated Squad', shortTag: 'SCM', logo: '⛺', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'MENA' },
    { id: 'mena_11', name: 'Desert Kings', shortTag: 'DK', logo: '👑', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'MENA' },
    { id: 'mena_12', name: 'Sandstorm Racers', shortTag: 'SSR', logo: '🌪️', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'MENA' },
    { id: 'mena_13', name: 'Riyadh Rascals', shortTag: 'RYD', logo: '🏙️', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'MENA' },
    { id: 'mena_14', name: 'Oasis Strikers', shortTag: 'OAS', logo: '🌴', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'MENA' },
    { id: 'mena_15', name: 'Falconry Academy', shortTag: 'FAC', logo: '🐥', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'MENA' },
    { id: 'mena_16', name: 'Zero Ping MENA', shortTag: 'ZPM', logo: '📶', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'MENA' },
];

// ==========================================================
// 🇧🇷 AMÉRIQUE DU SUD (16 ÉQUIPES)
// ==========================================================
export const SAM_TEAMS: TeamOption[] = [
    { id: 'sam_1', name: 'Furia Esports SAM', shortTag: 'FUR', logo: '🐾', tier: 'Worlds Contender', tierLabelFr: 'Prétendant Mondial', tierLabelEn: 'Worlds Contender', region: 'SAM' },
    { id: 'sam_2', name: 'Complexity South', shortTag: 'COL', logo: '⭐', tier: 'Elite', tierLabelFr: 'Élite', tierLabelEn: 'Elite', region: 'SAM' },
    { id: 'sam_3', name: 'KRÜ Esports', shortTag: 'KRU', logo: '💖', tier: 'Elite', tierLabelFr: 'Élite', tierLabelEn: 'Elite', region: 'SAM' },
    { id: 'sam_4', name: 'Secret Squad SAM', shortTag: 'TS', logo: '🕵️', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'SAM' },
    { id: 'sam_5', name: 'Ninjas Brazil', shortTag: 'NIP', logo: '🥷', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'SAM' },
    { id: 'sam_6', name: 'LOUD Esports RL', shortTag: 'LOUD', logo: '🔊', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'SAM' },
    { id: 'sam_7', name: 'pAIn Gaming SAM', shortTag: 'PNG', logo: '🖤', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'SAM' },
    { id: 'sam_8', name: 'MIBR Rocket', shortTag: 'MIBR', logo: '🇧🇷', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'SAM' },
    { id: 'sam_9', name: 'W7M Esports', shortTag: 'W7M', logo: '🐂', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'SAM' },
    { id: 'sam_10', name: 'Red Canids RL', shortTag: 'RED', logo: '🐺', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'SAM' },
    { id: 'sam_11', name: 'Samba Strikers', shortTag: 'SMB', logo: '⚽', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'SAM' },
    { id: 'sam_12', name: 'Favela Pinchers', shortTag: 'FVP', logo: '🇧🇷', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'SAM' },
    { id: 'sam_13', name: 'Rio Drift Club', shortTag: 'RIO', logo: '🏖️', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'SAM' },
    { id: 'sam_14', name: 'Copacabana Crew', shortTag: 'CPC', logo: '🌊', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'SAM' },
    { id: 'sam_15', name: 'Tango Tactics', shortTag: 'TNG', logo: '💃', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'SAM' },
    { id: 'sam_16', name: 'Amazonian Force', shortTag: 'AMZ', logo: '🌴', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'SAM' },
];

// ==========================================================
// 🇦🇺 OCÉANIE (16 ÉQUIPES)
// ==========================================================
export const OCE_TEAMS: TeamOption[] = [
    { id: 'oce_1', name: 'PWR Speed OCE', shortTag: 'PWR', logo: '⚡', tier: 'Worlds Contender', tierLabelFr: 'Prétendant Mondial', tierLabelEn: 'Worlds Contender', region: 'OCE' },
    { id: 'oce_2', name: 'Pioneers Oceania', shortTag: 'PIO', logo: '🦘', tier: 'Elite', tierLabelFr: 'Élite', tierLabelEn: 'Elite', region: 'OCE' },
    { id: 'oce_3', name: 'Ground Zero', shortTag: 'GZ', logo: '💥', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'OCE' },
    { id: 'oce_4', name: 'Chiefs Esports', shortTag: 'CHF', logo: '🛡️', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'OCE' },
    { id: 'oce_5', name: 'Renegades Legacy', shortTag: 'RNG', logo: '🤠', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'OCE' },
    { id: 'oce_6', name: 'Mindfreak OCE', shortTag: 'MF', logo: '🔮', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'OCE' },
    { id: 'oce_7', name: 'Dire Wolves OCE', shortTag: 'DW', logo: '🐺', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'OCE' },
    { id: 'oce_8', name: 'Order Esports', shortTag: 'ORD', logo: '📜', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'OCE' },
    { id: 'oce_9', name: 'Sydney Strikers', shortTag: 'SYD', logo: '🇦🇺', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'OCE' },
    { id: 'oce_10', name: 'Outback Overdrive', shortTag: 'OBK', logo: '🦎', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'OCE' },
    { id: 'oce_11', name: 'Kangaroo Pinchers', shortTag: 'KGP', logo: '🦘', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'OCE' },
    { id: 'oce_12', name: 'Boomer Drivers', shortTag: 'BMR', logo: '💥', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'OCE' },
    { id: 'oce_13', name: 'Tasmanian Tigers', shortTag: 'TAS', logo: '🐯', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'OCE' },
    { id: 'oce_14', name: 'Auckland Alliance', shortTag: 'AKL', logo: '🇳🇿', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'OCE' },
    { id: 'oce_15', name: 'Coral Reefers', shortTag: 'CRL', logo: '🪸', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'OCE' },
    { id: 'oce_16', name: 'Surfside Racers', shortTag: 'SRF', logo: '🏄', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'OCE' },
];

// ==========================================================
// 🌏 ASIE-PACIFIQUE (16 ÉQUIPES)
// ==========================================================
export const APAC_TEAMS: TeamOption[] = [
    { id: 'apac_1', name: 'Elevate APAC', shortTag: 'ELV', logo: '🐉', tier: 'Elite', tierLabelFr: 'Élite', tierLabelEn: 'Elite', region: 'APAC' },
    { id: 'apac_2', name: 'Gladiators Asia', shortTag: 'GLD', logo: '⚔️', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'APAC' },
    { id: 'apac_3', name: 'DetonatioN Focus', shortTag: 'DFM', logo: '🎯', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'APAC' },
    { id: 'apac_4', name: 'NORTHEPTION RL', shortTag: 'NTH', logo: '❄️', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'APAC' },
    { id: 'apac_5', name: 'Realize Esports', shortTag: 'RLZ', logo: '🌸', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'APAC' },
    { id: 'apac_6', name: 'Tokyo Drift Club', shortTag: 'TDC', logo: '🎌', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'APAC' },
    { id: 'apac_7', name: 'Seoul Strikers', shortTag: 'SEO', logo: '🇰🇷', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'APAC' },
    { id: 'apac_8', name: 'Bangkok Boosters', shortTag: 'BKK', logo: '🇹🇭', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'APAC' },
    { id: 'apac_9', name: 'Dragon Pinchers', shortTag: 'DPN', logo: '🐲', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'APAC' },
    { id: 'apac_10', name: 'Samurai Speed', shortTag: 'SMR', logo: '🗡️', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'APAC' },
    { id: 'apac_11', name: 'Lotus Esports APAC', shortTag: 'LTS', logo: '🪷', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'APAC' },
    { id: 'apac_12', name: 'Singapore Racers', shortTag: 'SGP', logo: '🇸🇬', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'APAC' },
    { id: 'apac_13', name: 'Kyoto Knights', shortTag: 'KYT', logo: '🏯', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'APAC' },
    { id: 'apac_14', name: 'Manila Monkeys', shortTag: 'MNL', logo: '🇵🇭', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'APAC' },
    { id: 'apac_15', name: 'Panda Pinchers', shortTag: 'PND', logo: '🐼', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'APAC' },
    { id: 'apac_16', name: 'Zero Lag Tokyo', shortTag: 'ZLT', logo: '🎮', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'APAC' },
];

// ==========================================================
// 🌍 AFRIQUE SUBSAHARIENNE (16 ÉQUIPES)
// ==========================================================
export const SSA_TEAMS: TeamOption[] = [
    { id: 'ssa_1', name: 'Limitless SSA', shortTag: 'LMT', logo: '🦁', tier: 'Elite', tierLabelFr: 'Élite', tierLabelEn: 'Elite', region: 'SSA' },
    { id: 'ssa_2', name: 'Orlando Pirates SSA', shortTag: 'OP', logo: '🏴‍☠️', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'SSA' },
    { id: 'ssa_3', name: 'White Wolf SSA', shortTag: 'WW', logo: '🐺', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'SSA' },
    { id: 'ssa_4', name: 'Nixus Esports SSA', shortTag: 'NIX', logo: '⚡', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'SSA' },
    { id: 'ssa_5', name: 'Bravado Gaming', shortTag: 'BVD', logo: '🛡️', tier: 'Underdog', tierLabelFr: 'Outsider', tierLabelEn: 'Underdog', region: 'SSA' },
    { id: 'ssa_6', name: 'Cape Town Lions', shortTag: 'CTL', logo: '🇿🇦', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'SSA' },
    { id: 'ssa_7', name: 'Joburg Jaguars', shortTag: 'JBG', logo: '🐆', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'SSA' },
    { id: 'ssa_8', name: 'Nairobi Nitro', shortTag: 'NRO', logo: '🇰🇪', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'SSA' },
    { id: 'ssa_9', name: 'Lagos Lightning', shortTag: 'LGS', logo: '🇳🇬', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'SSA' },
    { id: 'ssa_10', name: 'Sahara Strikers', shortTag: 'SHR', logo: '🏜️', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'SSA' },
    { id: 'ssa_11', name: 'Baobab Boosters', shortTag: 'BBB', logo: '🌳', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'SSA' },
    { id: 'ssa_12', name: 'Vuvuzela Victory', shortTag: 'VVV', logo: '🎺', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'SSA' },
    { id: 'ssa_13', name: 'Zambezi Zippers', shortTag: 'ZZP', logo: '🐊', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'SSA' },
    { id: 'ssa_14', name: 'Kilimanjaro Kings', shortTag: 'KLM', logo: '🏔️', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'SSA' },
    { id: 'ssa_15', name: 'Serengeti Speed', shortTag: 'SNG', logo: '🦒', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'SSA' },
    { id: 'ssa_16', name: 'African Aerials', shortTag: 'AAR', logo: '🌍', tier: 'Bubble', tierLabelFr: 'Bubble', tierLabelEn: 'Bubble', region: 'SSA' },
];

export const REGIONAL_TEAMS: Record<RegionKey, TeamOption[]> = {
    EU: EU_TEAMS,
    NA: NA_TEAMS,
    MENA: MENA_TEAMS,
    SAM: SAM_TEAMS,
    OCE: OCE_TEAMS,
    APAC: APAC_TEAMS,
    SSA: SSA_TEAMS,
};