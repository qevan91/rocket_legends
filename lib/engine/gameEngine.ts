// lib/engine/gameEngine.ts

export type Language = 'fr' | 'en';

export interface ExtendedPlayerStats {
    forme: number;        // 0-100
    moral: number;        // 0-100
    fatigue: number;      // 0-100
    stress: number;       // 0-100
    reputation: number;   // 0-100
    coachRel: number;     // 0-100
    teamRel: number;      // 0-100
    credits: number;
}

export interface CardChoice {
    textFr: string;
    textEn: string;
    forme?: number;
    moral?: number;
    fatigue?: number;
    stress?: number;
    reputation?: number;
    coachRel?: number;
    teamRel?: number;
    credits?: number;
    matchWeight?: number;
}

export interface CardAction {
    id: string;
    type: 'event' | 'match' | 'tournament_start';
    icon: string;
    categoryFr: string;
    categoryEn: string;
    titleFr: string;
    titleEn: string;
    descriptionFr: string;
    descriptionEn: string;
    choices: CardChoice[];
}

export interface TransferOffer {
    teamId: string;
    teamName: string;
    teamLogo: string;
    tier: string;
    salaryBonus: number;
    descriptionFr: string;
}

// ==========================================================
// BANQUE ENRICHIE DE CARTES (VIE & COMPÉTITION)
// ==========================================================
export const GAME_CARDS: CardAction[] = [
    // --- CARTE ANNONCE DE DÉBUT DE TOURNOI ---
    {
        id: 'tournament_announcement',
        type: 'tournament_start',
        icon: '🏆',
        categoryFr: 'COMPÉTITION · ANNONCE',
        categoryEn: 'COMPETITION · ANNOUNCEMENT',
        titleFr: 'RLCS REGIONAL OPEN #1',
        titleEn: 'RLCS REGIONAL OPEN #1',
        descriptionFr: 'Le tournoi commence aujourd\'hui ! Les meilleures équipes du continent sont présentes. Votre parcours dépendra de vos choix et de votre forme physique.',
        descriptionEn: 'The tournament starts today! The best teams in the continent are here. Your run depends on your choices and physical condition.',
        choices: [
            { textFr: 'Entrer sur le terrain avec confiance !', textEn: 'Step onto the pitch with confidence!', matchWeight: 20 },
        ],
    },

    // --- CARTES NARRATIVES (VIE DU PRO) ---
    {
        id: 'evt_stream_late',
        type: 'event',
        icon: '🎮',
        categoryFr: 'VIE PRIVÉE · STREAMING',
        categoryEn: 'PRIVATE LIFE · STREAMING',
        titleFr: 'Session Late Night',
        titleEn: 'Late Night Stream',
        descriptionFr: 'Votre stream bat des records d\'audience (25k viewers). Vos fans vous demandent de continuer jusqu\'à 4h du matin.',
        descriptionEn: 'Your stream hits record views (25k viewers). Fans ask you to keep playing until 4 AM.',
        choices: [
            { textFr: 'Continuer le stream pour la commu (+Gains)', textEn: 'Keep streaming for fans (+Money)', fatigue: +25, reputation: +15, credits: +3500, forme: -10 },
            { textFr: 'Couper le stream et aller dormir', textEn: 'End stream and go to sleep', fatigue: -15, stress: -10, reputation: -5 },
        ],
    },
    {
        id: 'evt_rival_tweet',
        type: 'event',
        icon: '📱',
        categoryFr: 'RÉSEAUX · DRAMA',
        categoryEn: 'SOCIAL MEDIA · DRAMA',
        titleFr: 'Provocation d\'un Rival',
        titleEn: 'Rival Trash Talk',
        descriptionFr: 'Un joueur star adverse twitte : "RocketPro ? Trop surcoté en LAN, hâte de les balayer ce week-end." 🍿',
        descriptionEn: 'An opponent star player tweets: "RocketPro? Overrated on LAN, can\'t wait to sweep them this weekend." 🍿',
        choices: [
            { textFr: 'Répondre avec humour et arrogance', textEn: 'Reply with banter and confidence', reputation: +20, stress: +15, moral: +10 },
            { textFr: 'Ignorer et garder son calme', textEn: 'Ignore and stay calm', stress: -10, coachRel: +10 },
            { textFr: 'Liker le tweet sans rien dire (Mentalist)', textEn: 'Like the tweet silently (Mind games)', reputation: +10, moral: +5 },
        ],
    },
    {
        id: 'evt_bootcamp_food',
        type: 'event',
        icon: '🍕',
        categoryFr: 'BOOTCAMP · DIÉTÉTIQUE',
        categoryEn: 'BOOTCAMP · DIET',
        titleFr: 'Fast-Food ou Repas Équilibré ?', titleEn: 'Fast Food or Balanced Meal?',
        descriptionFr: 'Après une journée intensive de scrims, l\'équipe hésite entre commander des pizzas et manger équilibré.',
        descriptionEn: 'After a long day of scrims, the team hesitates between ordering pizza or eating healthy.',
        choices: [
            { textFr: 'Pizzas & sodas avec les gars !', textEn: 'Pizzas & sodas with the boys!', teamRel: +15, moral: +10, forme: -10 },
            { textFr: 'Imposer un plat équilibré préparé par le chef', textEn: 'Enforce a balanced chef-prepared meal', forme: +10, fatigue: -5, teamRel: -5 },
        ],
    },
    {
        id: 'evt_coach_clash',
        type: 'event',
        icon: '🗯️',
        categoryFr: 'VESTIAIRE · TACTIQUE',
        categoryEn: 'LOCKER ROOM · TACTICS',
        titleFr: 'Désaccord avec le Staff',
        titleEn: 'Disagreement with Staff',
        descriptionFr: 'Le coach veut modifier le style de jeu pour un profil hyper défensif. Vous préférez l\'attaque agressive.',
        descriptionEn: 'The coach wants to switch to a defensive playstyle. You prefer aggressive offense.',
        choices: [
            { textFr: 'Suivre les consignes du coach à la lettre', textEn: 'Follow the coach\'s instructions strictly', coachRel: +20, moral: -10, stress: +5 },
            { textFr: 'Convaincre le coach d\'adapter le plan', textEn: 'Convince the coach to adapt', coachRel: +5, teamRel: +10, stress: -5 },
        ],
    },
    {
        id: 'evt_gear_setup',
        type: 'event',
        icon: '🖥️',
        categoryFr: 'MATÉRIEL · RÉGLAGES',
        categoryEn: 'HARDWARE · SETUP',
        titleFr: 'Nouvelle Sensibilité Manette',
        titleEn: 'New Controller Deadzone',
        descriptionFr: 'Vous hésitez à changer votre sensibilité et votre deadzone à la veille de la compétition.',
        descriptionEn: 'You consider changing your deadzone and sensitivity the day before the event.',
        choices: [
            { textFr: 'Changer les réglages (Prendre le risque)', textEn: 'Change settings (Take the risk)', stress: +20, matchWeight: +25 },
            { textFr: 'Garder ses réglages habituels', textEn: 'Keep usual settings', stress: -10, matchWeight: +10 },
        ],
    },

    // --- CARTES MATCHS ---
    {
        id: 'match_swiss_1',
        type: 'match',
        icon: '⚽',
        categoryFr: 'MATCH · ROUND SWISS 1',
        categoryEn: 'MATCH · SWISS ROUND 1',
        titleFr: 'Premier Match du Tournoi',
        titleEn: 'First Match of the Tournament',
        descriptionFr: 'Vous affrontez une équipe qualifiée via les Open Qualifiers. Ils jouent sans aucune pression.',
        descriptionEn: 'You face an Open Qualifier team. They are playing with zero pressure.',
        choices: [
            { textFr: 'Pression Haute & Démolitions', textEn: 'High Pressure & Demolitions', fatigue: +15, matchWeight: +30 },
            { textFr: 'Jeu de possession prudent', textEn: 'Cautious possession play', fatigue: +5, matchWeight: +20 },
        ],
    },
    {
        id: 'match_playoffs_quarters',
        type: 'match',
        icon: '⚔️',
        categoryFr: 'MATCH · QUART DE FINALE',
        categoryEn: 'MATCH · QUARTER-FINAL',
        titleFr: 'Le Choc des Titants',
        titleEn: 'Clash of Titans',
        descriptionFr: 'Quart de finale contre Team BDS ! Match 5 décisif. Le vainqueur va en Demi-Finale.',
        descriptionEn: 'Quarter-final against Team BDS! Decisive Game 5. Winner goes to Semi-Finals.',
        choices: [
            { textFr: 'Infield passes rapides à une touche', textEn: 'Quick one-touch infield passes', stress: +15, matchWeight: +35 },
            { textFr: 'Solos mécaniques & Pinchs', textEn: 'Solo mechanics & Pinches', stress: +25, matchWeight: +25 },
        ],
    },
    {
        id: 'evt_toxic_fans_dm',
        type: 'event',
        icon: '📱',
        categoryFr: 'RÉSEAUX · DRAMA',
        categoryEn: 'SOCIAL MEDIA · DRAMA',
        titleFr: 'Haine en ligne',
        titleEn: 'Online Hate',
        descriptionFr: 'Après une mauvaise série de matchs, tes MPs explosent de messages d\'insultes et de menaces de fans déçus.',
        descriptionEn: 'After a bad streak, your DMs are flooded with insults and threats from disappointed fans.',
        choices: [
            { textFr: 'Couper les réseaux quelques jours', textEn: 'Mute social media for a few days', stress: -15, reputation: -5 },
            { textFr: 'Répondre publiquement avec véhémence', textEn: 'Clap back publicly', stress: +20, reputation: +10, moral: -10 }
        ],
    },
    {
        id: 'evt_sketchy_sponsor',
        type: 'event',
        icon: '💸',
        categoryFr: 'FINANCES · SPONSOR',
        categoryEn: 'FINANCE · SPONSOR',
        titleFr: 'Sponsor douteux',
        titleEn: 'Shady Sponsor',
        descriptionFr: 'Un site d\'unboxing de skins douteux te propose un contrat très juteux pour promouvoir leur marque.',
        descriptionEn: 'A sketchy skin-unboxing site offers you a lucrative deal to promote their brand.',
        choices: [
            { textFr: 'Signer le contrat immédiatement', textEn: 'Sign the contract immediately', credits: +2500, reputation: -20, coachRel: -10 },
            { textFr: 'Refuser poliment l\'offre', textEn: 'Politely decline the offer', reputation: +10, credits: 0 }
        ],
    },
    {
        id: 'evt_slacking_teammate',
        type: 'event',
        icon: '🎮',
        categoryFr: 'ÉQUIPE · DISCIPLINE',
        categoryEn: 'TEAM · DISCIPLINE',
        titleFr: 'Coéquipier démotivé',
        titleEn: 'Slacking Teammate',
        descriptionFr: 'Ton duo passe ses nuits sur d\'autres jeux et séche les sessions de Freeplay prévues par l\'équipe.',
        descriptionEn: 'Your duo spends all night playing other games and skips scheduled Freeplay sessions.',
        choices: [
            { textFr: 'Couvrir ses retards auprès du staff', textEn: 'Cover for him with the staff', teamRel: +15, coachRel: -15, stress: +10 },
            { textFr: 'Provoquer une explication cash', textEn: 'Confront him directly', teamRel: -10, moral: +10 }
        ],
    },
    {
        id: 'evt_late_night_stream',
        type: 'event',
        icon: '🎥',
        categoryFr: 'MEDIA · STREAMING',
        categoryEn: 'MEDIA · STREAMING',
        titleFr: 'Marathon IRL',
        titleEn: 'Late Night Stream',
        descriptionFr: 'Tes viewers réclament un stream de 24h la veille d\'un jour d\'entraînement crucial.',
        descriptionEn: 'Your viewers are begging for a 24-hour stream the night before a crucial training day.',
        choices: [
            { textFr: 'Faire le stream pour le public', textEn: 'Do the stream for the fans', credits: +800, fatigue: +30, forme: -15, reputation: +10 },
            { textFr: 'Dormir et respecter son rythme', textEn: 'Sleep and stick to your schedule', fatigue: -10, forme: +10, reputation: -5 }
        ],
    },
    {
        id: 'evt_merch_concept',
        type: 'event',
        icon: '👕',
        categoryFr: 'MARKETING · BUSINESS',
        categoryEn: 'MARKETING · BUSINESS',
        titleFr: 'Ligne de vêtements',
        titleEn: 'Merch Drop',
        descriptionFr: 'L\'organisation souhaite lancer un maillot personnalisé à ton nom, mais tu dois participer au financement.',
        descriptionEn: 'The org wants to release a personalized jersey with your name, but you need to co-fund it.',
        choices: [
            { textFr: 'Investir ses propres économies', textEn: 'Invest your own money', credits: -1000, reputation: +20, moral: +10 },
            { textFr: 'Refuser l\'opportunité', textEn: 'Pass on the opportunity', reputation: -5 }
        ],
    },
    {
        id: 'evt_poaching_offer',
        type: 'event',
        icon: '💼',
        categoryFr: 'MERCATO · TRANSFERT',
        categoryEn: 'TRANSFER · MERCATO',
        titleFr: 'Rumeurs de transfert',
        titleEn: 'Poaching Offer',
        descriptionFr: 'Une structure rivale te contacte en secret avec un salaire doublé si tu forces ton départ.',
        descriptionEn: 'A rival org secretely approaches you with double salary if you force a trade.',
        choices: [
            { textFr: 'Négocier en sous-main', textEn: 'Negotiate behind closed doors', stress: +20, teamRel: -15, coachRel: -10 },
            { textFr: 'Avertir immédiatement son manager', textEn: 'Inform your manager immediately', coachRel: +20, stress: -10 }
        ],
    },
    {
        id: 'evt_controller_drift',
        type: 'event',
        icon: '🎮',
        categoryFr: 'MATÉRIEL · GEAR',
        categoryEn: 'GEAR · HARDWARE',
        titleFr: 'Stick Drift fatal',
        titleEn: 'Fatal Stick Drift',
        descriptionFr: 'Ta manette préférée montre des signes de fatigue majeurs juste avant un bootcamp.',
        descriptionEn: 'Your main controller is showing severe drift right before a bootcamp.',
        choices: [
            { textFr: 'Acheter un modèle haut de gamme neuf', textEn: 'Buy a brand new pro controller', credits: -250, forme: +5, stress: -10 },
            { textFr: 'Tenter de la réparer soi-même', textEn: 'Try to fix it yourself', stress: +15, forme: -10 }
        ],
    },
    {
        id: 'evt_energy_drink_crash',
        type: 'event',
        icon: '⚡',
        categoryFr: 'SANTÉ · HYGIÈNE',
        categoryEn: 'HEALTH · LIFESTYLE',
        titleFr: 'Abus de caféine',
        titleEn: 'Energy Drink Crash',
        descriptionFr: 'Tu as enchaîné 5 canettes d\'énergisant pour tenir le rythme, ton cœur s\'emballe.',
        descriptionEn: 'You chugged 5 energy drinks to stay awake, now your heart is racing.',
        choices: [
            { textFr: 'Consulter le médecin de la structure', textEn: 'Visit the team doctor', fatigue: -20, forme: -10, coachRel: +5 },
            { textFr: 'Ignorer et continuer à jouer', textEn: 'Ignore it and keep playing', stress: +25, forme: -20, moral: -10 }
        ],
    },
    {
        id: 'evt_drama_tweet',
        type: 'event',
        icon: '🐦',
        categoryFr: 'RÉSEAUX · DRAMA',
        categoryEn: 'SOCIAL MEDIA · DRAMA',
        titleFr: 'Tweet polémique',
        titleEn: 'Controversial Tweet',
        descriptionFr: 'Un ancien pro a critiqué ton style de jeu de façon méprisante sur X.',
        descriptionEn: 'A former pro publicly trashed your playstyle on X.',
        choices: [
            { textFr: 'Faire une analyse vidéo pour lui répondre', textEn: 'Make a video breaking down his claims', reputation: +15, stress: +10, fatigue: +10 },
            { textFr: 'Passer au-dessus avec humour', textEn: 'Meme it away with humor', moral: +10, stress: -5 }
        ],
    },
    {
        id: 'evt_fan_meeting',
        type: 'event',
        icon: '🤝',
        categoryFr: 'COMMUNAUTÉ · FANS',
        categoryEn: 'COMMUNITY · FANS',
        titleFr: 'Séance de dédicaces',
        titleEn: 'Meet & Greet',
        descriptionFr: 'Une convention locale t\'invite à rencontrer tes supporters pendant votre jour de repos.',
        descriptionEn: 'A local LAN invites you for a fan meetup during your day off.',
        choices: [
            { textFr: 'Y aller et prendre du temps pour chacun', textEn: 'Go and spend time with everyone', reputation: +20, fatigue: +15, moral: +10 },
            { textFr: 'Decliner pour se reposer à la gaming house', textEn: 'Decline to rest at the gaming house', fatigue: -15, reputation: -10 }
        ],
    },
    {
        id: 'evt_coach_argument',
        type: 'event',
        icon: '📋',
        categoryFr: 'TACTIQUE · TENSION',
        categoryEn: 'TACTICS · CLASH',
        titleFr: 'Désaccord tactique',
        titleEn: 'Tactical Disagreement',
        descriptionFr: 'Le coach veut te forcer à adopter un rôle de "3rd man" ultra-défensif qui bridera tes mécaniques.',
        descriptionEn: 'The coach wants to lock you into a defensive 3rd-man role that limits your mechanics.',
        choices: [
            { textFr: 'Accepter le rôle sans broncher', textEn: 'Accept the role without arguing', coachRel: +15, moral: -15, matchWeight: +5 },
            { textFr: 'Imposer sa vision agressive', textEn: 'Force your aggressive playstyle', coachRel: -15, moral: +10, matchWeight: -5 }
        ],
    },
    {
        id: 'evt_bootcamp_food',
        type: 'event',
        icon: '🍕',
        categoryFr: 'VIE D\'ÉQUIPE · LOGISTIQUE',
        categoryEn: 'TEAM LIFE · LOGISTICS',
        titleFr: 'Intoxication au Bootcamp',
        titleEn: 'Bootcamp Food Poisoning',
        descriptionFr: 'La restauration rapide livrée au bootcamp rend toute l\'équipe malade la veille d\'un Major.',
        descriptionEn: 'The takeout delivered to the bootcamp got the whole team sick before a Major.',
        choices: [
            { textFr: 'Prendre des médicaments lourds', textEn: 'Take heavy medication', forme: -15, fatigue: +20, stress: -10 },
            { textFr: 'Pousser au mental malgré la douleur', textEn: 'Power through the pain', moral: +15, fatigue: +30, forme: -25 }
        ],
    },

    // ==========================================
    // CARTES DE MATCH (MATCH CARDS)
    // ==========================================
    {
        id: 'match_high_ping',
        type: 'match',
        icon: '📶',
        categoryFr: 'MATCH · TECHNIQUE',
        categoryEn: 'MATCH · TECHNICAL',
        titleFr: 'Lag & Spikes de Ping',
        titleEn: 'High Ping & Spikes',
        descriptionFr: 'Les serveurs de qualification rament. Tu subis des micro-décalages sur chaque Aerial.',
        descriptionEn: 'The qualifier servers are lagging. You experience micro-stutters on every aerial.',
        choices: [
            { textFr: 'Simplifier le jeu, zéro prise de risque', textEn: 'Simplify playstyle, zero risks', stress: +10, matchWeight: -5 },
            { textFr: 'Demander un pause technique et râler', textEn: 'Call a tech pause and complain', stress: -10, matchWeight: -15, coachRel: -5 }
        ],
    },
    {
        id: 'match_kickoff_blunder',
        type: 'match',
        icon: '⚽',
        categoryFr: 'MATCH · IN-GAME',
        categoryEn: 'MATCH · IN-GAME',
        titleFr: 'Fail sur l\'engagement',
        titleEn: 'Kickoff Blunder',
        descriptionFr: 'Game 7, 0-0. Tu lopes complètement le Speed-Flip du Kickoff et encaisses un but gag.',
        descriptionEn: 'Game 7, 0-0. You completely whiff the Speed-Flip kickoff and concede a free goal.',
        choices: [
            { textFr: 'S\'excuser immédiatement vocalement', textEn: 'Apologize on coms immediately', teamRel: +5, stress: +15, matchWeight: -5 },
            { textFr: 'Insta-mute et se reconcentrer à bloc', textEn: 'Insta-mute and double down', teamRel: -10, moral: +5, matchWeight: +10 }
        ],
    },
    {
        id: 'match_crowd_booing',
        type: 'match',
        icon: '🏟️',
        categoryFr: 'MATCH · ARENA',
        categoryEn: 'MATCH · ARENA',
        titleFr: 'Sifflets du public',
        titleEn: 'Hostile Crowd',
        descriptionFr: 'Vous jouez à l\'extérieur. L\'arène entière vous hue à chaque fois que tu touches le ballon.',
        descriptionEn: 'You\'re playing away. The entire arena boos every single time you touch the ball.',
        choices: [
            { textFr: 'Chambreur : Faire taire la foule après un but', textEn: 'Taunt back: Silence the crowd on goal', reputation: +15, stress: +20, matchWeight: +15 },
            { textFr: 'Garder le casqué vissé et ignorer', textEn: 'Keep headset tight and ignore', stress: -10, matchWeight: +0 }
        ],
    },
    {
        id: 'match_demo_chase',
        type: 'match',
        icon: '💥',
        categoryFr: 'MATCH · STRATÉGIE',
        categoryEn: 'MATCH · STRATEGY',
        titleFr: 'Target par la méta Demo',
        titleEn: 'Targeted by Demos',
        descriptionFr: 'L\'équipe adverse a désigné un joueur pour te démolir en boucle pendant tout le match.',
        descriptionEn: 'The enemy team assigned a player to constantly demo you all game long.',
        choices: [
            { textFr: 'Esquiver et les punir en contre', textEn: 'Dodge and counter-attack', forme: -10, matchWeight: +15 },
            { textFr: 'Chasser à votre tour pour vous venger', textEn: 'Demo them back for revenge', stress: +15, moral: +10, matchWeight: -10 }
        ],
    },
    {
        id: 'match_overtime_stress',
        type: 'match',
        icon: '⏱️',
        categoryFr: 'MATCH · PRESSION',
        categoryEn: 'MATCH · PRESSURE',
        titleFr: 'Prolongations interminables',
        titleEn: 'Marathon Overtime',
        descriptionFr: '+8 minutes d\'Overtime. La moindre erreur en Flip Reset signifie l\'élimination.',
        descriptionEn: '+8 minutes in Overtime. The slightest mistake on a Flip Reset means elimination.',
        choices: [
            { textFr: 'Tenter un Solo Play risqué', textEn: 'Attempt a risky Solo Play', moral: +15, matchWeight: +20, stress: +20 },
            { textFr: 'Rester en défense et attendre l\'erreur', textEn: 'Play passive and wait for mistake', fatigue: +15, matchWeight: +5, stress: +10 }
        ],
    },
    {
        id: 'match_tilting_teammate',
        type: 'match',
        icon: '🤬',
        categoryFr: 'MATCH · MENTAL',
        categoryEn: 'MATCH · MENTAL',
        titleFr: 'Coéquipier en plein Tilt',
        titleEn: 'Tilt in Progress',
        descriptionFr: 'Après un miss-play, ton mate commence à spammer "What a save!" en comms et baisse les bras.',
        descriptionEn: 'After a misplay, your teammate starts spamming "What a save!" on comms and gives up.',
        choices: [
            { textFr: 'Prendre le Lead et rassurer le groupe', textEn: 'Take the lead and calm the team', stress: +15, teamRel: +10, matchWeight: +10 },
            { textFr: 'Le recadrer sèchement pendant la pause', textEn: 'Call him out sharply during timeout', teamRel: -20, coachRel: -5, matchWeight: -5 }
        ],
    },
    {
        id: 'match_flip_reset_bluff',
        type: 'match',
        icon: '🎯',
        categoryFr: 'MATCH · MECHANICS',
        categoryEn: 'MATCH · MECHANICS',
        titleFr: 'Dernière possession',
        titleEn: 'Final Possession',
        descriptionFr: '0 seconde au chrono, la balle doit absolument ne pas toucher le sol. Tu es au plafond.',
        descriptionEn: '0 seconds on clock, ball must not touch the ground. You\'re hanging from the ceiling.',
        choices: [
            { textFr: 'Tenter un Double Flip Reset improbable', textEn: 'Go for an insane Double Flip Reset', reputation: +20, matchWeight: +25, stress: +25 },
            { textFr: 'Faire une passe sécurisée au sol', textEn: 'Make a safe pass to ground player', matchWeight: +10, stress: +5 }
        ],
    },
    {
        id: 'match_bad_camera_settings',
        type: 'match',
        icon: '⚙️',
        categoryFr: 'MATCH · TECHNIQUE',
        categoryEn: 'MATCH · TECHNICAL',
        titleFr: 'Mauvais réglages Caméra',
        titleEn: 'Wrong Camera Settings',
        descriptionFr: 'Tu te rends compte au Game 1 que le PC du tournoi a réinitialisé la distance de ta caméra.',
        descriptionEn: 'You realize in Game 1 that the tournament PC reset your camera distance.',
        choices: [
            { textFr: 'Jouer avec sans rien toucher', textEn: 'Play through it without changes', fatigue: +10, matchWeight: -10 },
            { textFr: 'Mettre en pause et prendre un avertissement', textEn: 'Pause and take an official warning', stress: +10, coachRel: -10, matchWeight: +5 }
        ],
    },
    {
        id: 'evt_sleep_deprivation',
        type: 'event',
        icon: '🌙',
        categoryFr: 'SANTÉ · HYGIÈNE',
        categoryEn: 'HEALTH · LIFESTYLE',
        titleFr: 'Insomnie d\'avant-match',
        titleEn: 'Pre-Match Insomnia',
        descriptionFr: 'L\'enjeu du match de demain t\'a empêché de fermer l\'œil de la nuit. Tu te réveilles totalement dans le brouillard.',
        descriptionEn: 'The pressure of tomorrow\'s match kept you awake all night. You wake up in a total brain fog.',
        choices: [
            { textFr: 'Prendre un petit-déjeuner protéiné et faire du sport', textEn: 'Eat a light protein breakfast & do cardio', fatigue: -5, forme: +10, stress: -10 },
            { textFr: 'Enchaîner les cafés jusqu\'au lancement', textEn: 'Chug coffees until match time', fatigue: +20, stress: +20, forme: -10 }
        ],
    },
    {
        id: 'evt_fan_art_merch',
        type: 'event',
        icon: '🎨',
        categoryFr: 'COMMUNAUTÉ · FANS',
        categoryEn: 'COMMUNITY · FANS',
        titleFr: 'Fan-Art Volé',
        titleEn: 'Stolen Fan-Art',
        descriptionFr: 'Ta structure a imprimé un dessin fait par un fan sur un T-shirt sans lui demander son accord ni le rémunérer.',
        descriptionEn: 'Your org printed fan-art on official merch without giving credit or compensation to the artist.',
        choices: [
            { textFr: 'Payer l\'artiste sur tes propres deniers', textEn: 'Pay the artist out of your own pocket', credits: -500, reputation: +20, coachRel: -10 },
            { textFr: 'Ne rien dire pour protéger la structure', textEn: 'Stay silent to protect the organization', reputation: -15, moral: -10 }
        ],
    },
    {
        id: 'evt_vaping_in_house',
        type: 'event',
        icon: '💨',
        categoryFr: 'ÉQUIPE · DISCIPLINE',
        categoryEn: 'TEAM · DISCIPLINE',
        titleFr: 'Vapotage dans la Gaming House',
        titleEn: 'Vaping in the Gaming House',
        descriptionFr: 'Ton manager interdit strictement le vapotage dans la salle d\'entraînement, mais ton coéquipier refuse d\'arrêter.',
        descriptionEn: 'Your manager strictly banned vaping in the practice room, but your teammate refuses to stop.',
        choices: [
            { textFr: 'Demander poliment à ton coéquipier d\'aller dehors', textEn: 'Politely ask your teammate to go outside', teamRel: -5, coachRel: +10 },
            { textFr: 'Faire comme si de rien n\'était', textEn: 'Pretend you noticed nothing', coachRel: -10, stress: +5 }
        ],
    },
    {
        id: 'evt_charity_stream',
        type: 'event',
        icon: '🎗️',
        categoryFr: 'COMMUNAUTÉ · ÉVÉNEMENT',
        categoryEn: 'COMMUNITY · EVENT',
        titleFr: 'Stream Caritatif',
        titleEn: 'Charity Stream',
        descriptionFr: 'Un grand évènement caritatif en ligne t\'invite à participer le même soir qu\'une session de Scrims importante.',
        descriptionEn: 'A major online charity event invites you to play on the same evening as an important Scrim session.',
        choices: [
            { textFr: 'Annuler les Scrims et faire le stream', textEn: 'Cancel Scrims and do the charity stream', reputation: +25, coachRel: -20, teamRel: -10 },
            { textFr: 'Prioriser l\'entraînement de l\'équipe', textEn: 'Prioritize team practice', coachRel: +15, reputation: -5 }
        ],
    },
    {
        id: 'evt_crypto_ad',
        type: 'event',
        icon: '🪙',
        categoryFr: 'FINANCES · SPONSOR',
        categoryEn: 'FINANCE · SPONSOR',
        titleFr: 'Crypto-NFT Douteux',
        titleEn: 'Shady Crypto Deal',
        descriptionFr: 'Un projet Web3 te propose une somme astronomique pour tweeter une promotion sur leur nouveau token Rocket.',
        descriptionEn: 'A Web3 project offers an astronomical sum to promote their new Rocket token on your feed.',
        choices: [
            { textFr: 'Accepter le chèque et poster le tweet', textEn: 'Take the paycheck and tweet it', credits: +4000, reputation: -30, moral: -15 },
            { textFr: 'Refuser et bloquer le contact', textEn: 'Decline and block the contact', reputation: +15, moral: +10 }
        ],
    },
    {
        id: 'evt_toxic_ranked_match',
        type: 'event',
        icon: '🤬',
        categoryFr: 'SOLO Q · MENTAL',
        categoryEn: 'SOLO Q · MENTAL',
        titleFr: 'Insultes en Ranked',
        titleEn: 'Toxic Ranked Lobby',
        descriptionFr: 'Pendant un stream, tu affontes un autre pro qui passe le match à te spammer et te rabaisser devant 5000 viewers.',
        descriptionEn: 'During a stream, you play against another pro who constantly spams and mocks you in front of 5000 viewers.',
        choices: [
            { textFr: 'Activer le Tactical Quick Chat uniquement', textEn: 'Switch to Tactical Quick Chat only', stress: -10, moral: +5 },
            { textFr: 'Relancer la provoc\' en direct', textEn: 'Fight fire with fire on stream', reputation: +10, stress: +20, coachRel: -10 }
        ],
    },
    {
        id: 'evt_wrist_pain',
        type: 'event',
        icon: '🩺',
        categoryFr: 'SANTÉ · BLESSURE',
        categoryEn: 'HEALTH · INJURY',
        titleFr: 'Douleur au Poignet',
        titleEn: 'Wrist Strain',
        descriptionFr: 'Une douleur aiguë apparaît sur ton poignet droit après 10 heures de grinding intense en Freeplay.',
        descriptionEn: 'A sharp pain appears in your right wrist after 10 hours of intense Freeplay grinding.',
        choices: [
            { textFr: 'Prendre 48h de repos complet', textEn: 'Take 48 hours of complete rest', forme: +15, fatigue: -20, coachRel: -10 },
            { textFr: 'Mettre une attelle et continuer de jouer', textEn: 'Put a brace on and keep playing', forme: -25, stress: +15, moral: -10 }
        ],
    },
    {
        id: 'evt_esports_awards',
        type: 'event',
        icon: '🏆',
        categoryFr: 'MÉDIA · CÉRÉMONIE',
        categoryEn: 'MEDIA · AWARDS',
        titleFr: 'Cérémonie Esports',
        titleEn: 'Esports Awards Nomination',
        descriptionFr: 'Tu es nommé dans la catégorie "Révélation de l\'année". Il faut préparer une tenue et un discours.',
        descriptionEn: 'You are nominated for "Rookie of the Year". You need to buy a suit and prepare a speech.',
        choices: [
            { textFr: 'Acheter un costume sur-mesure coûteux', textEn: 'Buy an expensive tailored suit', credits: -1200, reputation: +25, moral: +10 },
            { textFr: 'Y aller en maillot d\'équipe décontracté', textEn: 'Go in a relaxed team jersey', reputation: +5, credits: 0 }
        ],
    },
    {
        id: 'evt_bench_threat',
        type: 'event',
        icon: '🪑',
        categoryFr: 'ÉQUIPE · STATUT',
        categoryEn: 'TEAM · STATUS',
        titleFr: 'Menace de banc',
        titleEn: 'Bench Warning',
        descriptionFr: 'Le coach te convoque : tes récentes performances en scrims remettent en cause ta place de titulaire.',
        descriptionEn: 'The coach calls a meeting: your recent scrim performances endanger your starting spot.',
        choices: [
            { textFr: 'Passer la nuit à bosser les replays', textEn: 'Pull an all-nighter studying replays', coachRel: +20, fatigue: +25, forme: -10 },
            { textFr: 'Contester ses critiques avec insolence', textEn: 'Insolently argue against his feedback', coachRel: -25, moral: +5, stress: +15 }
        ],
    },
    {
        id: 'evt_manager_birthday',
        type: 'event',
        icon: '🎂',
        categoryFr: 'VIE D\'ÉQUIPE · SOCIAL',
        categoryEn: 'TEAM LIFE · SOCIAL',
        titleFr: 'Anniversaire du Manager',
        titleEn: 'Manager\'s Birthday',
        descriptionFr: 'C\'est l\'anniversaire du Team Manager. L\'équipe organise une fête surprise improvisée.',
        descriptionEn: 'It\'s the Team Manager\'s birthday. The team is throwing a last-minute surprise party.',
        choices: [
            { textFr: 'Offrir un cadeau groupé', textEn: 'Chime in for a collective gift', credits: -150, coachRel: +15, teamRel: +10 },
            { textFr: 'Rester dans sa chambre pour jouer', textEn: 'Stay in your room to play', teamRel: -10, coachRel: -10 }
        ],
    },
    {
        id: 'match_broken_headset',
        type: 'match',
        icon: '🎧',
        categoryFr: 'MATCH · MATÉRIEL',
        categoryEn: 'MATCH · HARDWARE',
        titleFr: 'Casque Audio Défectueux',
        titleEn: 'Broken Audio Headset',
        descriptionFr: 'Pendant le Game 3, l\'implant audio gauche de ton casque coupe brutalement. Tu n\'entends plus les moteurs à gauche.',
        descriptionEn: 'During Game 3, your left audio ear-cup completely cuts out. You can\'t hear engines on your left.',
        choices: [
            { textFr: 'Compenser en surveillant constamment la caméra arrière', textEn: 'Compensate by spamming rear camera', stress: +15, matchWeight: -5 },
            { textFr: 'Interrompre le match immédiatement pour changer le casque', textEn: 'Pause the match to replace the headset', stress: -5, coachRel: -5, matchWeight: +5 }
        ],
    },
    {
        id: 'match_fake_kickoff',
        type: 'match',
        icon: '🧠',
        categoryFr: 'MATCH · STRATÉGIE',
        categoryEn: 'MATCH · STRATEGY',
        titleFr: 'Tentative de Fake Kickoff',
        titleEn: 'Fake Kickoff Call',
        descriptionFr: 'Balle de match en faveur des adversaires. Ton coéquipier propose de tenter un Fake Kickoff risqué.',
        descriptionEn: 'Match point for the opponents. Your teammate calls for a high-risk Fake Kickoff.',
        choices: [
            { textFr: 'Valider le Fake Kickoff !', textEn: 'Go for the Fake Kickoff!', moral: +10, matchWeight: +20, stress: +25 },
            { textFr: 'Refuser et faire un engagement classique', textEn: 'Stick to a standard kickoff', teamRel: -10, matchWeight: +0 }
        ],
    },
    {
        id: 'match_sweaty_hands',
        type: 'match',
        icon: '💦',
        categoryFr: 'MATCH · PHYSIQUE',
        categoryEn: 'MATCH · PHYSICAL',
        titleFr: 'Mains Moites',
        titleEn: 'Sweaty Palms',
        descriptionFr: 'La température sur scène est étouffante. Tes doigts glissent sur les gâchettes pendant les Aerials.',
        descriptionEn: 'The stage temperature is stifling. Your fingers are slipping off the triggers during aerials.',
        choices: [
            { textFr: 'Utiliser la magnésie de secours pendant le replay', textEn: 'Use backup grip chalk during replay', stress: -10, matchWeight: +10 },
            { textFr: 'Essuyer ses mains rapidement sur son maillot', textEn: 'Wipe hands quickly on jersey', stress: +10, matchWeight: -5 }
        ],
    },
    {
        id: 'match_bump_heavy_meta',
        type: 'match',
        icon: '🚗',
        categoryFr: 'MATCH · STYLE DE JEU',
        categoryEn: 'MATCH · PLAYSTYLE',
        titleFr: 'Méta Bumps & Blocks',
        titleEn: 'Bump & Block Meta',
        descriptionFr: 'L\'équipe en face ferme complètement le jeu en bloquant le gardien sur chaque rotation.',
        descriptionEn: 'The opposing team is completely locking down the play by bumping the goalie on every rotation.',
        choices: [
            { textFr: 'Prendre de la hauteur et privilégier les Ceilings', textEn: 'Play higher up and focus on Ceiling shots', forme: -5, matchWeight: +15 },
            { textFr: 'Rester en fond de court pour éviter le contact', textEn: 'Play deep in backcourt to avoid contact', stress: +10, matchWeight: -10 }
        ],
    },
    {
        id: 'match_admin_dispute',
        type: 'match',
        icon: '👨‍⚖️',
        categoryFr: 'MATCH · RÈGLEMENT',
        categoryEn: 'MATCH · RULES',
        titleFr: 'Litige d\'Arbitrage',
        titleEn: 'Admin Dispute',
        descriptionFr: 'Un but douteux est accordé à l\'adversaire après un bug de collision apparent sur la Ligne de But.',
        descriptionEn: 'A controversial goal is awarded to opponents after a apparent collision glitch on the Goal Line.',
        choices: [
            { textFr: 'Contester vivement auprès de l\'arbitre principal', textEn: 'Vigorously dispute with the head admin', stress: +20, coachRel: -10, matchWeight: -10 },
            { textFr: 'Rester professionnel et accepter la décision', textEn: 'Stay professional and accept the call', moral: -10, coachRel: +15, matchWeight: +5 }
        ],
    },
    {
        id: 'match_zero_boost_clutch',
        type: 'match',
        icon: '⛽',
        categoryFr: 'MATCH · MANAGEMENT',
        categoryEn: 'MATCH · MANAGEMENT',
        titleFr: 'Aphonie du Boost',
        titleEn: 'Zero Boost Clutch',
        descriptionFr: 'L\'adversaire contrôle tous les 100 Boosts du terrain. Tu es bloqué à 0 Boost en pleine contre-attaque.',
        descriptionEn: 'The enemy team is starving all Big Boosts. You\'re stuck at 0 boost mid-counter attack.',
        choices: [
            { textFr: 'Chasser les pads de 12 Boost et temporiser', textEn: 'Collect small pads and stall for time', matchWeight: +10, stress: +5 },
            { textFr: 'Tenter un 50/50 agressif plein centre', textEn: 'Go for an aggressive 50/50 down middle', matchWeight: -5, moral: +10, stress: +15 }
        ],
    },
    {
        id: 'match_musty_flick_opportunity',
        type: 'match',
        icon: '⚡',
        categoryFr: 'MATCH · MECHANICS',
        categoryEn: 'MATCH · MECHANICS',
        titleFr: 'Opportunité Musty Flick',
        titleEn: 'Musty Flick Window',
        descriptionFr: 'Le défenseur adverse est mal placé dans ses cages. Tu as le ballon parfait sur le toit de ta voiture.',
        descriptionEn: 'The defender is out of position in net. You have the ball sitting perfectly on your roof.',
        choices: [
            { textFr: 'Lancer un Musty Flick dévastateur', textEn: 'Unleash a devastating Musty Flick', moral: +15, reputation: +15, matchWeight: +15 },
            { textFr: 'Faire un simple lob sécurisé', textEn: 'Execute a simple safe lob', matchWeight: +10, reputation: -5 }
        ],
    },
    {
        id: 'match_bo7_fatigue',
        type: 'match',
        icon: '🪫',
        categoryFr: 'MATCH · ENDURANCE',
        categoryEn: 'MATCH · ENDURANCE',
        titleFr: 'Game 7 Décisif',
        titleEn: 'Decisive Game 7',
        descriptionFr: 'Après 6 rencontres ultra-serrées, l\'épuisement mental se fait sentir. Vos réflexes ralentissent.',
        descriptionEn: 'After 6 grueling games, mental exhaustion sets in. Your reaction speed is dropping.',
        choices: [
            { textFr: 'Prendre un temps mort pour s\'étirer et s\'hydrater', textEn: 'Call a timeout to stretch & hydrate', fatigue: -10, matchWeight: +10, stress: -10 },
            { textFr: 'Conserver la dynamique et enchaîner sans pause', textEn: 'Keep the momentum and ride the wave', fatigue: +20, matchWeight: -5, moral: +10 }
        ],
    },
    {
        id: 'match_whiff_reaction',
        type: 'match',
        icon: '🫣',
        categoryFr: 'MATCH · ERROR',
        categoryEn: 'MATCH · ERROR',
        titleFr: 'Open Goal Manqué',
        titleEn: 'Open Goal Whiff',
        descriptionFr: 'Seul face à la cage vide à 3 secondes de la fin, tu tires sur le Poteau. La balle ressort.',
        descriptionEn: 'Alone in front of an open net with 3 seconds left, you hit the Post. Ball bounces out.',
        choices: [
            { textFr: 'Replacer instantanément son véhicule en Bump', textEn: 'Instantly rotate for a recovery bump', stress: +20, matchWeight: +5 },
            { textFr: 'Lâcher sa manette de dépit', textEn: 'Drop controller in frustration', moral: -20, matchWeight: -20, teamRel: -15 }
        ],
    },
    {
        id: 'match_pinch_god_play',
        type: 'match',
        icon: '🚀',
        categoryFr: 'MATCH · HIGHLIGHT',
        categoryEn: 'MATCH · HIGHLIGHT',
        titleFr: 'Pinch Kuxir désespéré',
        titleEn: 'Desperate Kuxir Pinch',
        descriptionFr: 'Enfermé dans ton coin sans boost, la seule sortie est un Pinch sur le mur latéral vers les cages opposées.',
        descriptionEn: 'Trapped in your corner low on boost, the only escape is a side-wall Pinch aiming across the map.',
        choices: [
            { textFr: 'Tenter le Wall Pinch à 130 km/h', textEn: 'Attempt the 130 km/h Wall Pinch', reputation: +20, matchWeight: +15, stress: +15 },
            { textFr: 'Dégager doucement dans la ligne de touche', textEn: 'Softly clear it down the touchline', matchWeight: +5, stress: -5 }
        ],
    }
];

export function getRandomCard(type: 'event' | 'match' | 'tournament_start'): CardAction {
    if (type === 'tournament_start') {
        return GAME_CARDS[0]; // Carte d'annonce de tournoi
    }
    const filtered = GAME_CARDS.filter(c => c.type === type);
    return filtered[Math.floor(Math.random() * filtered.length)];
}

export function simulateMatchRound(matchWeight: number): { playerScore: number; opponentScore: number; winner: 'player'|'opponent' } {
    const basePlayer = Math.floor(Math.random() * 3);
    const bonusPlayer = matchWeight >= 25 ? 2 : (matchWeight > 10 ? 1 : 0);
    const playerScore = basePlayer + bonusPlayer;
    const opponentScore = Math.floor(Math.random() * 3) + (playerScore === 0 ? 1 : 0);

    return {
        playerScore,
        opponentScore,
        winner: playerScore >= opponentScore ? 'player' : 'opponent',
    };
}


export interface TournamentStructure {
    id: string;
    nameFr: string;
    nameEn: string;
    type: 'preseason' | 'open' | 'major' | 'worlds';
    totalCashprize: string;
    teamsCount: number;
    podium: {
        first: { place: '🥇 1st', prize: '$15,000' },
        second: { place: '🥈 2nd', prize: '$10,000' },
        thirdFourth: { place: '🥉 3rd-4th', prize: '$6,500' },
    };
    otherRanks: { place: string; prize: string }[];
}

export const PRESEASON_TOURNAMENT: TournamentStructure = {
    id: 'preseason_summer',
    nameFr: '☀️ Summer Kickoff Invitational',
    nameEn: '☀️ Summer Kickoff Invitational',
    type: 'preseason',
    totalCashprize: '$50,000',
    teamsCount: 16,
    podium: {
        first: { place: '🥇 1st', prize: '$15,000' },
        second: { place: '🥈 2nd', prize: '$10,000' },
        thirdFourth: { place: '🥉 3rd-4th', prize: '$6,500' },
    },
    otherRanks: [
        { place: '5-6th', prize: '$4,800' },
        { place: '7-8th', prize: '$3,600' },
        { place: '9-12th', prize: '$2,400' },
        { place: '13-16th', prize: '$1,800' },
    ]
};

// CALCUL DU RATING SUR 10 (Max ~9.95, 10.0 extrêmement rare)
export function calculateTournamentRating(isWinner: boolean, playerStatsContribution: number): number {
    let baseRating = isWinner ? 8.2 : 6.5;
    let variance = (Math.random() * 1.5) + (playerStatsContribution * 0.05);
    let rating = Math.min(9.95, Number((baseRating + variance).toFixed(2)));

    // 1 chance sur 1000 d'avoir 10.0 absolu
    if (isWinner && Math.random() < 0.001) {
        rating = 10.0;
    }
    return rating;
}

export function generateMercatoOffers(playerLevel: number, allTeams: any[], currentTeamId: string): TransferOffer[] {
    // Filtrer pour exclure l'équipe actuelle
    const availableTeams = allTeams.filter(t => t.id !== currentTeamId);

    // Déterminer quels Tiers d'équipes s'intéressent au joueur selon son niveau
    let eligibleTiers: string[] = ['Bubble', 'Underdog'];
    if (playerLevel >= 30) eligibleTiers = ['Underdog', 'Elite'];
    if (playerLevel >= 60) eligibleTiers = ['Elite', 'Worlds Contender'];

    const interestedTeams = availableTeams.filter(t => eligibleTiers.includes(t.tier));
    const shuffled = [...interestedTeams].sort(() => 0.5 - Math.random());

    // Sélectionner jusqu'à 3 équipes
    const selectedTeams = shuffled.slice(0, 3);

    return selectedTeams.map(team => ({
        teamId: team.id,
        teamName: team.name,
        teamLogo: team.logo,
        tier: team.tier,
        salaryBonus: team.tier === 'Worlds Contender' ? 15000 : team.tier === 'Elite' ? 8000 : 3000,
        descriptionFr: `Le club ${team.name} cherche un titulaire motivé pour la saison prochaine.`
    }));
}