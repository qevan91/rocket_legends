// lib/data/proPlayers.ts
// Généré pour la saison 2026 — Roster complet (140 équipes x 3 joueurs = 420 joueurs)
// Les pseudos sont fictifs/inventés (aucun joueur réel), stylisés pour coller à l'esport Rocket League.

import type { TeamTier } from './gameData';

export interface ProPlayer {
    id: string; // ex: 'eu_player_1'
    pseudo: string;
    age: number;
    level: number;
    potential: number;
    teamId: string; // Doit correspondre à l'ID de l'équipe (ex: 'eu_1')
    nationality: string; // Code ISO (ex: 'FR', 'GB', 'ES', etc.)
}

// ==========================================================
// 🇪🇺 EUROPE (30 ÉQUIPES — 90 JOUEURS)
// ==========================================================
export const EU_PLAYERS: ProPlayer[] = [
    { id: 'eu_1_p1', pseudo: 'Neocael', age: 19, level: 91, potential: 98, teamId: 'eu_1', nationality: 'CZ' },
    { id: 'eu_1_p2', pseudo: 'Lioice', age: 21, level: 96, potential: 99, teamId: 'eu_1', nationality: 'IE' },
    { id: 'eu_1_p3', pseudo: 'Zulvoss', age: 19, level: 92, potential: 96, teamId: 'eu_1', nationality: 'AT' },

    { id: 'eu_2_p1', pseudo: 'Qoryael', age: 21, level: 96, potential: 99, teamId: 'eu_2', nationality: 'DE' },
    { id: 'eu_2_p2', pseudo: 'Marlyte', age: 21, level: 88, potential: 91, teamId: 'eu_2', nationality: 'FI' },
    { id: 'eu_2_p3', pseudo: 'Tonment51', age: 17, level: 98, potential: 99, teamId: 'eu_2', nationality: 'RO' },

    { id: 'eu_3_p1', pseudo: 'Nehaze83', age: 23, level: 89, potential: 93, teamId: 'eu_3', nationality: 'PT' },
    { id: 'eu_3_p2', pseudo: 'Wynstiv', age: 22, level: 97, potential: 99, teamId: 'eu_3', nationality: 'SI' },
    { id: 'eu_3_p3', pseudo: 'Rexpha', age: 24, level: 95, potential: 96, teamId: 'eu_3', nationality: 'CZ' },

    { id: 'eu_4_p1', pseudo: 'Umaidris', age: 20, level: 92, potential: 99, teamId: 'eu_4', nationality: 'AT' },
    { id: 'eu_4_p2', pseudo: 'Fenraze', age: 21, level: 87, potential: 92, teamId: 'eu_4', nationality: 'NL' },
    { id: 'eu_4_p3', pseudo: 'Elipion', age: 22, level: 95, potential: 99, teamId: 'eu_4', nationality: 'SK' },

    { id: 'eu_5_p1', pseudo: 'Zanquid', age: 22, level: 93, potential: 98, teamId: 'eu_5', nationality: 'AT' },
    { id: 'eu_5_p2', pseudo: 'Kovulfa', age: 19, level: 96, potential: 98, teamId: 'eu_5', nationality: 'NO' },
    { id: 'eu_5_p3', pseudo: 'Paxraze13', age: 21, level: 90, potential: 96, teamId: 'eu_5', nationality: 'FI' },

    { id: 'eu_6_p1', pseudo: 'Xenhaze', age: 18, level: 87, potential: 98, teamId: 'eu_6', nationality: 'CZ' },
    { id: 'eu_6_p2', pseudo: 'Ashmika', age: 19, level: 87, potential: 89, teamId: 'eu_6', nationality: 'DK' },
    { id: 'eu_6_p3', pseudo: 'Chicago', age: 25, level: 86, potential: 86, teamId: 'eu_6', nationality: 'AT' },

    { id: 'eu_7_p1', pseudo: 'Neogin', age: 22, level: 79, potential: 84, teamId: 'eu_7', nationality: 'SK' },
    { id: 'eu_7_p2', pseudo: 'Umawyn', age: 25, level: 78, potential: 79, teamId: 'eu_7', nationality: 'DK' },
    { id: 'eu_7_p3', pseudo: 'Yenonix', age: 19, level: 85, potential: 93, teamId: 'eu_7', nationality: 'ES' },

    { id: 'eu_8_p1', pseudo: 'Crusund', age: 24, level: 81, potential: 86, teamId: 'eu_8', nationality: 'GR' },
    { id: 'eu_8_p2', pseudo: 'Lucael', age: 23, level: 88, potential: 91, teamId: 'eu_8', nationality: 'BE' },
    { id: 'eu_8_p3', pseudo: 'Qorquill', age: 20, level: 81, potential: 89, teamId: 'eu_8', nationality: 'GB' },

    { id: 'eu_9_p1', pseudo: 'Rexdrin', age: 23, level: 82, potential: 86, teamId: 'eu_9', nationality: 'HR' },
    { id: 'eu_9_p2', pseudo: 'Monther', age: 17, level: 82, potential: 92, teamId: 'eu_9', nationality: 'DK' },
    { id: 'eu_9_p3', pseudo: 'Oxnoor', age: 26, level: 88, potential: 88, teamId: 'eu_9', nationality: 'NL' },

    { id: 'eu_10_p1', pseudo: 'Elypulse', age: 25, level: 78, potential: 79, teamId: 'eu_10', nationality: 'SK' },
    { id: 'eu_10_p2', pseudo: 'Vinzeph', age: 16, level: 81, potential: 92, teamId: 'eu_10', nationality: 'SI' },
    { id: 'eu_10_p3', pseudo: 'Sevkore', age: 20, level: 88, potential: 93, teamId: 'eu_10', nationality: 'CZ' },

    { id: 'eu_11_p1', pseudo: 'Kovlyte', age: 17, level: 88, potential: 97, teamId: 'eu_11', nationality: 'PT' },
    { id: 'eu_11_p2', pseudo: 'Paxn', age: 19, level: 84, potential: 90, teamId: 'eu_11', nationality: 'DK' },
    { id: 'eu_11_p3', pseudo: 'Zulyael', age: 21, level: 85, potential: 90, teamId: 'eu_11', nationality: 'PL' },

    { id: 'eu_12_p1', pseudo: 'Z0xric', age: 19, level: 85, potential: 92, teamId: 'eu_12', nationality: 'HU' },
    { id: 'eu_12_p2', pseudo: 'Kaigoro', age: 19, level: 86, potential: 91, teamId: 'eu_12', nationality: 'SE' },
    { id: 'eu_12_p3', pseudo: 'Wynsund', age: 24, level: 85, potential: 87, teamId: 'eu_12', nationality: 'PL' },

    { id: 'eu_13_p1', pseudo: 'Liojinx', age: 25, level: 73, potential: 75, teamId: 'eu_13', nationality: 'NL' },
    { id: 'eu_13_p2', pseudo: 'Keldrin', age: 22, level: 77, potential: 79, teamId: 'eu_13', nationality: 'HU' },
    { id: 'eu_13_p3', pseudo: 'Nenova', age: 24, level: 66, potential: 71, teamId: 'eu_13', nationality: 'AT' },

    { id: 'eu_14_p1', pseudo: 'Uztyko', age: 16, level: 72, potential: 85, teamId: 'eu_14', nationality: 'FR' },
    { id: 'eu_14_p2', pseudo: 'Zanyael', age: 25, level: 68, potential: 70, teamId: 'eu_14', nationality: 'NL' },
    { id: 'eu_14_p3', pseudo: 'Blagin', age: 25, level: 67, potential: 68, teamId: 'eu_14', nationality: 'DE' },

    { id: 'eu_15_p1', pseudo: 'Nepulse', age: 21, level: 66, potential: 70, teamId: 'eu_15', nationality: 'HU' },
    { id: 'eu_15_p2', pseudo: 'Hallyte', age: 24, level: 65, potential: 68, teamId: 'eu_15', nationality: 'SK' },
    { id: 'eu_15_p3', pseudo: 'Nyxvoss', age: 20, level: 71, potential: 78, teamId: 'eu_15', nationality: 'DE' },

    { id: 'eu_16_p1', pseudo: 'Sylgoro', age: 19, level: 68, potential: 73, teamId: 'eu_16', nationality: 'DE' },
    { id: 'eu_16_p2', pseudo: 'Fyryael', age: 16, level: 73, potential: 88, teamId: 'eu_16', nationality: 'AT' },
    { id: 'eu_16_p3', pseudo: 'Toryael', age: 17, level: 78, potential: 84, teamId: 'eu_16', nationality: 'CH' },

    { id: 'eu_17_p1', pseudo: 'Jorspire', age: 22, level: 66, potential: 67, teamId: 'eu_17', nationality: 'PT' },
    { id: 'eu_17_p2', pseudo: 'Nyxspire', age: 15, level: 66, potential: 78, teamId: 'eu_17', nationality: 'IT' },
    { id: 'eu_17_p3', pseudo: 'Gloraze', age: 24, level: 71, potential: 72, teamId: 'eu_17', nationality: 'SK' },

    { id: 'eu_18_p1', pseudo: 'Funova', age: 24, level: 66, potential: 70, teamId: 'eu_18', nationality: 'GR' },
    { id: 'eu_18_p2', pseudo: 'Jaxjera', age: 16, level: 72, potential: 84, teamId: 'eu_18', nationality: 'SE' },
    { id: 'eu_18_p3', pseudo: 'Rezkoo', age: 20, level: 79, potential: 84, teamId: 'eu_18', nationality: 'IE' },

    { id: 'eu_19_p1', pseudo: 'Yorxton', age: 20, level: 66, potential: 68, teamId: 'eu_19', nationality: 'NL' },
    { id: 'eu_19_p2', pseudo: 'Zank0o', age: 26, level: 76, potential: 77, teamId: 'eu_19', nationality: 'IT' },
    { id: 'eu_19_p3', pseudo: 'Sevglow', age: 25, level: 77, potential: 77, teamId: 'eu_19', nationality: 'NO' },

    { id: 'eu_20_p1', pseudo: 'Kahdric', age: 19, level: 68, potential: 74, teamId: 'eu_20', nationality: 'IE' },
    { id: 'eu_20_p2', pseudo: 'Kahwisp', age: 23, level: 69, potential: 74, teamId: 'eu_20', nationality: 'FR' },
    { id: 'eu_20_p3', pseudo: 'Veltide', age: 26, level: 79, potential: 80, teamId: 'eu_20', nationality: 'SE' },

    { id: 'eu_21_p1', pseudo: 'Oxnix', age: 23, level: 68, potential: 73, teamId: 'eu_21', nationality: 'PT' },
    { id: 'eu_21_p2', pseudo: 'Wisael', age: 19, level: 77, potential: 85, teamId: 'eu_21', nationality: 'NO' },
    { id: 'eu_21_p3', pseudo: 'Pyxn0va', age: 19, level: 68, potential: 73, teamId: 'eu_21', nationality: 'SK' },

    { id: 'eu_22_p1', pseudo: 'Hexurin', age: 23, level: 45, potential: 47, teamId: 'eu_22', nationality: 'PL' },
    { id: 'eu_22_p2', pseudo: 'Tempest', age: 18, level: 56, potential: 66, teamId: 'eu_22', nationality: 'HU' },
    { id: 'eu_22_p3', pseudo: 'Shaash', age: 18, level: 47, potential: 53, teamId: 'eu_22', nationality: 'GR' },

    { id: 'eu_23_p1', pseudo: 'Yuxstiv', age: 17, level: 51, potential: 57, teamId: 'eu_23', nationality: 'GB' },
    { id: 'eu_23_p2', pseudo: 'Quotyko', age: 25, level: 61, potential: 62, teamId: 'eu_23', nationality: 'SK' },
    { id: 'eu_23_p3', pseudo: 'Quogin', age: 22, level: 58, potential: 63, teamId: 'eu_23', nationality: 'PT' },

    { id: 'eu_24_p1', pseudo: 'Nebula', age: 16, level: 53, potential: 63, teamId: 'eu_24', nationality: 'FI' },
    { id: 'eu_24_p2', pseudo: 'Hexrion', age: 16, level: 49, potential: 63, teamId: 'eu_24', nationality: 'PL' },
    { id: 'eu_24_p3', pseudo: 'Sevspire', age: 19, level: 54, potential: 61, teamId: 'eu_24', nationality: 'CH' },

    { id: 'eu_25_p1', pseudo: 'Moxteka', age: 20, level: 46, potential: 49, teamId: 'eu_25', nationality: 'DE' },
    { id: 'eu_25_p2', pseudo: 'Jorraze', age: 24, level: 59, potential: 63, teamId: 'eu_25', nationality: 'IE' },
    { id: 'eu_25_p3', pseudo: 'Raonix', age: 16, level: 48, potential: 58, teamId: 'eu_25', nationality: 'SI' },

    { id: 'eu_26_p1', pseudo: 'Torfyr', age: 15, level: 50, potential: 63, teamId: 'eu_26', nationality: 'IT' },
    { id: 'eu_26_p2', pseudo: 'Moxric', age: 21, level: 50, potential: 54, teamId: 'eu_26', nationality: 'NL' },
    { id: 'eu_26_p3', pseudo: 'Skygoro65', age: 21, level: 68, potential: 70, teamId: 'eu_26', nationality: 'FR' },

    { id: 'eu_27_p1', pseudo: 'Chiquid', age: 22, level: 53, potential: 57, teamId: 'eu_27', nationality: 'DE' },
    { id: 'eu_27_p2', pseudo: 'Gi0pion', age: 23, level: 65, potential: 65, teamId: 'eu_27', nationality: 'CZ' },
    { id: 'eu_27_p3', pseudo: 'Yonder', age: 21, level: 46, potential: 51, teamId: 'eu_27', nationality: 'GR' },

    { id: 'eu_28_p1', pseudo: 'Yorwyn', age: 16, level: 53, potential: 69, teamId: 'eu_28', nationality: 'ES' },
    { id: 'eu_28_p2', pseudo: 'Frosund', age: 26, level: 68, potential: 68, teamId: 'eu_28', nationality: 'NO' },
    { id: 'eu_28_p3', pseudo: 'Iskquill', age: 19, level: 46, potential: 54, teamId: 'eu_28', nationality: 'FR' },

    { id: 'eu_29_p1', pseudo: 'Amirion', age: 22, level: 56, potential: 59, teamId: 'eu_29', nationality: 'NL' },
    { id: 'eu_29_p2', pseudo: 'Xentira', age: 15, level: 62, potential: 78, teamId: 'eu_29', nationality: 'SI' },
    { id: 'eu_29_p3', pseudo: 'Niospire', age: 22, level: 52, potential: 54, teamId: 'eu_29', nationality: 'NO' },

    { id: 'eu_30_p1', pseudo: 'Dovsion', age: 21, level: 53, potential: 61, teamId: 'eu_30', nationality: 'DE' },
    { id: 'eu_30_p2', pseudo: 'Crurivo', age: 19, level: 61, potential: 68, teamId: 'eu_30', nationality: 'GB' },
    { id: 'eu_30_p3', pseudo: 'Kaydop', age: 15, level: 57, potential: 67, teamId: 'eu_30', nationality: 'AT' },
];

// ==========================================================
// 🇺🇸 AMÉRIQUE DU NORD (30 ÉQUIPES — 90 JOUEURS)
// ==========================================================
export const NA_PLAYERS: ProPlayer[] = [
    { id: 'na_1_p1', pseudo: 'Uzidris', age: 25, level: 92, potential: 92, teamId: 'na_1', nationality: 'MX' },
    { id: 'na_1_p2', pseudo: 'Orowyn', age: 21, level: 90, potential: 94, teamId: 'na_1', nationality: 'MX' },
    { id: 'na_1_p3', pseudo: 'Casteka', age: 26, level: 96, potential: 96, teamId: 'na_1', nationality: 'CA' },

    { id: 'na_2_p1', pseudo: 'Skyquill', age: 22, level: 90, potential: 95, teamId: 'na_2', nationality: 'MX' },
    { id: 'na_2_p2', pseudo: 'Retals', age: 24, level: 89, potential: 89, teamId: 'na_2', nationality: 'CA' },
    { id: 'na_2_p3', pseudo: 'Qorzeck', age: 17, level: 97, potential: 99, teamId: 'na_2', nationality: 'MX' },

    { id: 'na_3_p1', pseudo: 'Rezurin', age: 25, level: 87, potential: 89, teamId: 'na_3', nationality: 'CA' },
    { id: 'na_3_p2', pseudo: 'Quension', age: 26, level: 91, potential: 91, teamId: 'na_3', nationality: 'US' },
    { id: 'na_3_p3', pseudo: 'Oxfyr', age: 20, level: 93, potential: 98, teamId: 'na_3', nationality: 'US' },

    { id: 'na_4_p1', pseudo: 'Dragoro', age: 24, level: 82, potential: 82, teamId: 'na_4', nationality: 'US' },
    { id: 'na_4_p2', pseudo: 'Marwyn', age: 26, level: 84, potential: 86, teamId: 'na_4', nationality: 'CA' },
    { id: 'na_4_p3', pseudo: 'Ryuloris31', age: 19, level: 87, potential: 89, teamId: 'na_4', nationality: 'MX' },

    { id: 'na_5_p1', pseudo: 'Oxopal', age: 18, level: 79, potential: 89, teamId: 'na_5', nationality: 'MX' },
    { id: 'na_5_p2', pseudo: 'Iskrion', age: 16, level: 81, potential: 93, teamId: 'na_5', nationality: 'CA' },
    { id: 'na_5_p3', pseudo: 'Rhapha', age: 25, level: 83, potential: 84, teamId: 'na_5', nationality: 'CA' },

    { id: 'na_6_p1', pseudo: 'Syldrin', age: 19, level: 81, potential: 84, teamId: 'na_6', nationality: 'MX' },
    { id: 'na_6_p2', pseudo: 'Blalume', age: 15, level: 80, potential: 93, teamId: 'na_6', nationality: 'CA' },
    { id: 'na_6_p3', pseudo: 'Qorteka', age: 19, level: 86, potential: 90, teamId: 'na_6', nationality: 'US' },

    { id: 'na_7_p1', pseudo: 'Zarlyte', age: 22, level: 69, potential: 69, teamId: 'na_7', nationality: 'US' },
    { id: 'na_7_p2', pseudo: 'Dungin5', age: 17, level: 78, potential: 89, teamId: 'na_7', nationality: 'MX' },
    { id: 'na_7_p3', pseudo: 'Bricael', age: 20, level: 78, potential: 86, teamId: 'na_7', nationality: 'CA' },

    { id: 'na_8_p1', pseudo: 'Wyndrin', age: 16, level: 70, potential: 83, teamId: 'na_8', nationality: 'MX' },
    { id: 'na_8_p2', pseudo: 'Luurin', age: 17, level: 69, potential: 81, teamId: 'na_8', nationality: 'US' },
    { id: 'na_8_p3', pseudo: 'Vatira', age: 18, level: 78, potential: 87, teamId: 'na_8', nationality: 'MX' },

    { id: 'na_9_p1', pseudo: 'Wexxara', age: 20, level: 66, potential: 71, teamId: 'na_9', nationality: 'US' },
    { id: 'na_9_p2', pseudo: 'Tonzeck', age: 24, level: 66, potential: 66, teamId: 'na_9', nationality: 'US' },
    { id: 'na_9_p3', pseudo: 'Seitide', age: 24, level: 67, potential: 68, teamId: 'na_9', nationality: 'CA' },

    { id: 'na_10_p1', pseudo: 'Hunonix', age: 19, level: 74, potential: 80, teamId: 'na_10', nationality: 'CA' },
    { id: 'na_10_p2', pseudo: 'Elymoon', age: 24, level: 65, potential: 65, teamId: 'na_10', nationality: 'US' },
    { id: 'na_10_p3', pseudo: 'Seiwick', age: 25, level: 77, potential: 77, teamId: 'na_10', nationality: 'US' },

    { id: 'na_11_p1', pseudo: 'Pridop', age: 25, level: 66, potential: 66, teamId: 'na_11', nationality: 'CA' },
    { id: 'na_11_p2', pseudo: 'Zesund', age: 18, level: 78, potential: 89, teamId: 'na_11', nationality: 'CA' },
    { id: 'na_11_p3', pseudo: 'Fusion', age: 22, level: 75, potential: 78, teamId: 'na_11', nationality: 'US' },

    { id: 'na_12_p1', pseudo: 'Gloxara', age: 20, level: 69, potential: 73, teamId: 'na_12', nationality: 'CA' },
    { id: 'na_12_p2', pseudo: 'Dovrivo', age: 24, level: 74, potential: 78, teamId: 'na_12', nationality: 'MX' },
    { id: 'na_12_p3', pseudo: 'Glorivo', age: 21, level: 72, potential: 77, teamId: 'na_12', nationality: 'MX' },

    { id: 'na_13_p1', pseudo: 'Alnix', age: 19, level: 69, potential: 74, teamId: 'na_13', nationality: 'US' },
    { id: 'na_13_p2', pseudo: 'Sevwray', age: 23, level: 68, potential: 73, teamId: 'na_13', nationality: 'MX' },
    { id: 'na_13_p3', pseudo: 'Qorzeph', age: 25, level: 77, potential: 79, teamId: 'na_13', nationality: 'CA' },

    { id: 'na_14_p1', pseudo: 'Krofyr', age: 22, level: 70, potential: 74, teamId: 'na_14', nationality: 'MX' },
    { id: 'na_14_p2', pseudo: 'Quenurin', age: 21, level: 67, potential: 69, teamId: 'na_14', nationality: 'CA' },
    { id: 'na_14_p3', pseudo: 'Myryorn', age: 19, level: 79, potential: 87, teamId: 'na_14', nationality: 'CA' },

    { id: 'na_15_p1', pseudo: 'Eliglow', age: 18, level: 73, potential: 81, teamId: 'na_15', nationality: 'MX' },
    { id: 'na_15_p2', pseudo: 'Rhakoo', age: 24, level: 66, potential: 67, teamId: 'na_15', nationality: 'MX' },
    { id: 'na_15_p3', pseudo: 'Prilyte', age: 23, level: 78, potential: 83, teamId: 'na_15', nationality: 'US' },

    { id: 'na_16_p1', pseudo: 'Moxsund95', age: 24, level: 74, potential: 77, teamId: 'na_16', nationality: 'CA' },
    { id: 'na_16_p2', pseudo: 'Liozeph', age: 24, level: 67, potential: 68, teamId: 'na_16', nationality: 'MX' },
    { id: 'na_16_p3', pseudo: 'Jultyko', age: 21, level: 79, potential: 85, teamId: 'na_16', nationality: 'US' },

    { id: 'na_17_p1', pseudo: 'Ashgoro', age: 21, level: 74, potential: 80, teamId: 'na_17', nationality: 'US' },
    { id: 'na_17_p2', pseudo: 'Vinonix', age: 20, level: 78, potential: 86, teamId: 'na_17', nationality: 'CA' },
    { id: 'na_17_p3', pseudo: 'Wexonix', age: 20, level: 72, potential: 74, teamId: 'na_17', nationality: 'US' },

    { id: 'na_18_p1', pseudo: 'Newray', age: 16, level: 65, potential: 79, teamId: 'na_18', nationality: 'CA' },
    { id: 'na_18_p2', pseudo: 'Oroley', age: 16, level: 77, potential: 88, teamId: 'na_18', nationality: 'CA' },
    { id: 'na_18_p3', pseudo: 'Pristiv', age: 21, level: 65, potential: 67, teamId: 'na_18', nationality: 'US' },

    { id: 'na_19_p1', pseudo: 'Vioulfa', age: 20, level: 48, potential: 56, teamId: 'na_19', nationality: 'MX' },
    { id: 'na_19_p2', pseudo: 'Rhapulse', age: 24, level: 56, potential: 61, teamId: 'na_19', nationality: 'MX' },
    { id: 'na_19_p3', pseudo: 'Cascade', age: 19, level: 55, potential: 59, teamId: 'na_19', nationality: 'CA' },

    { id: 'na_20_p1', pseudo: 'Oromora', age: 16, level: 68, potential: 81, teamId: 'na_20', nationality: 'MX' },
    { id: 'na_20_p2', pseudo: 'Casice', age: 26, level: 55, potential: 55, teamId: 'na_20', nationality: 'MX' },
    { id: 'na_20_p3', pseudo: 'Lexidris', age: 26, level: 64, potential: 65, teamId: 'na_20', nationality: 'US' },

    { id: 'na_21_p1', pseudo: 'Tuxonix', age: 20, level: 57, potential: 61, teamId: 'na_21', nationality: 'MX' },
    { id: 'na_21_p2', pseudo: 'Uzyorn', age: 20, level: 50, potential: 57, teamId: 'na_21', nationality: 'US' },
    { id: 'na_21_p3', pseudo: 'Myrgin', age: 26, level: 57, potential: 59, teamId: 'na_21', nationality: 'US' },

    { id: 'na_22_p1', pseudo: 'Daxbrix', age: 21, level: 64, potential: 67, teamId: 'na_22', nationality: 'MX' },
    { id: 'na_22_p2', pseudo: 'Tonley99', age: 22, level: 49, potential: 51, teamId: 'na_22', nationality: 'MX' },
    { id: 'na_22_p3', pseudo: 'Dunsion', age: 17, level: 55, potential: 62, teamId: 'na_22', nationality: 'MX' },

    { id: 'na_23_p1', pseudo: 'Neoulfa', age: 24, level: 67, potential: 72, teamId: 'na_23', nationality: 'MX' },
    { id: 'na_23_p2', pseudo: 'Seikoo', age: 21, level: 59, potential: 61, teamId: 'na_23', nationality: 'CA' },
    { id: 'na_23_p3', pseudo: 'Myrvash', age: 19, level: 56, potential: 60, teamId: 'na_23', nationality: 'US' },

    { id: 'na_24_p1', pseudo: 'Zoxyorn', age: 19, level: 57, potential: 62, teamId: 'na_24', nationality: 'MX' },
    { id: 'na_24_p2', pseudo: 'Wynvoss', age: 20, level: 58, potential: 63, teamId: 'na_24', nationality: 'CA' },
    { id: 'na_24_p3', pseudo: 'Dovkoo', age: 22, level: 48, potential: 51, teamId: 'na_24', nationality: 'MX' },

    { id: 'na_25_p1', pseudo: 'Pivot', age: 20, level: 50, potential: 55, teamId: 'na_25', nationality: 'US' },
    { id: 'na_25_p2', pseudo: 'Frocael', age: 24, level: 54, potential: 54, teamId: 'na_25', nationality: 'CA' },
    { id: 'na_25_p3', pseudo: 'Sylzeck', age: 19, level: 47, potential: 51, teamId: 'na_25', nationality: 'US' },

    { id: 'na_26_p1', pseudo: 'Wexwick', age: 24, level: 68, potential: 68, teamId: 'na_26', nationality: 'MX' },
    { id: 'na_26_p2', pseudo: 'Priopal', age: 24, level: 55, potential: 59, teamId: 'na_26', nationality: 'MX' },
    { id: 'na_26_p3', pseudo: 'Sylhawk', age: 26, level: 45, potential: 46, teamId: 'na_26', nationality: 'MX' },

    { id: 'na_27_p1', pseudo: 'Triraxx', age: 18, level: 50, potential: 56, teamId: 'na_27', nationality: 'US' },
    { id: 'na_27_p2', pseudo: 'Fyrxton', age: 20, level: 58, potential: 65, teamId: 'na_27', nationality: 'MX' },
    { id: 'na_27_p3', pseudo: 'Bripulse', age: 23, level: 53, potential: 58, teamId: 'na_27', nationality: 'CA' },

    { id: 'na_28_p1', pseudo: 'Dunquill', age: 19, level: 46, potential: 51, teamId: 'na_28', nationality: 'MX' },
    { id: 'na_28_p2', pseudo: 'Viodop', age: 22, level: 49, potential: 49, teamId: 'na_28', nationality: 'CA' },
    { id: 'na_28_p3', pseudo: 'Botide', age: 15, level: 54, potential: 70, teamId: 'na_28', nationality: 'MX' },

    { id: 'na_29_p1', pseudo: 'Nemika', age: 22, level: 51, potential: 51, teamId: 'na_29', nationality: 'US' },
    { id: 'na_29_p2', pseudo: 'Ilyfola', age: 21, level: 47, potential: 52, teamId: 'na_29', nationality: 'US' },
    { id: 'na_29_p3', pseudo: 'Jorlyte', age: 22, level: 60, potential: 63, teamId: 'na_29', nationality: 'MX' },

    { id: 'na_30_p1', pseudo: 'Daxtyk0', age: 23, level: 57, potential: 58, teamId: 'na_30', nationality: 'CA' },
    { id: 'na_30_p2', pseudo: 'Cornova', age: 25, level: 50, potential: 51, teamId: 'na_30', nationality: 'US' },
    { id: 'na_30_p3', pseudo: 'Hexn', age: 22, level: 53, potential: 54, teamId: 'na_30', nationality: 'CA' },
];

// ==========================================================
// 🇸🇦 MOYEN-ORIENT & AFRIQUE DU NORD (16 ÉQUIPES — 48 JOUEURS)
// ==========================================================
export const MENA_PLAYERS: ProPlayer[] = [
    { id: 'mena_1_p1', pseudo: 'Gioael', age: 20, level: 98, potential: 99, teamId: 'mena_1', nationality: 'AE' },
    { id: 'mena_1_p2', pseudo: 'Kaither', age: 17, level: 95, potential: 99, teamId: 'mena_1', nationality: 'LB' },
    { id: 'mena_1_p3', pseudo: 'Shaidris', age: 23, level: 87, potential: 90, teamId: 'mena_1', nationality: 'MA' },

    { id: 'mena_2_p1', pseudo: 'Zanraxx', age: 23, level: 88, potential: 91, teamId: 'mena_2', nationality: 'TN' },
    { id: 'mena_2_p2', pseudo: 'Kydosin', age: 25, level: 82, potential: 82, teamId: 'mena_2', nationality: 'OM' },
    { id: 'mena_2_p3', pseudo: 'Cormoon', age: 26, level: 78, potential: 80, teamId: 'mena_2', nationality: 'TN' },

    { id: 'mena_3_p1', pseudo: 'Shapulse', age: 26, level: 88, potential: 90, teamId: 'mena_3', nationality: 'EG' },
    { id: 'mena_3_p2', pseudo: 'Kovquid', age: 18, level: 80, potential: 87, teamId: 'mena_3', nationality: 'QA' },
    { id: 'mena_3_p3', pseudo: 'Neotide', age: 24, level: 78, potential: 81, teamId: 'mena_3', nationality: 'AE' },

    { id: 'mena_4_p1', pseudo: 'Zulquid', age: 25, level: 68, potential: 70, teamId: 'mena_4', nationality: 'EG' },
    { id: 'mena_4_p2', pseudo: 'Doropal', age: 25, level: 70, potential: 72, teamId: 'mena_4', nationality: 'LB' },
    { id: 'mena_4_p3', pseudo: 'Whirl', age: 18, level: 73, potential: 82, teamId: 'mena_4', nationality: 'MA' },

    { id: 'mena_5_p1', pseudo: 'Threndosin', age: 21, level: 73, potential: 78, teamId: 'mena_5', nationality: 'SA' },
    { id: 'mena_5_p2', pseudo: 'Uryfola', age: 26, level: 74, potential: 76, teamId: 'mena_5', nationality: 'LB' },
    { id: 'mena_5_p3', pseudo: 'Uzopal', age: 22, level: 67, potential: 68, teamId: 'mena_5', nationality: 'TN' },

    { id: 'mena_6_p1', pseudo: 'Juljera', age: 19, level: 79, potential: 81, teamId: 'mena_6', nationality: 'TN' },
    { id: 'mena_6_p2', pseudo: 'Lioglow', age: 25, level: 78, potential: 80, teamId: 'mena_6', nationality: 'BH' },
    { id: 'mena_6_p3', pseudo: 'Elyjinx', age: 25, level: 71, potential: 73, teamId: 'mena_6', nationality: 'JO' },

    { id: 'mena_7_p1', pseudo: 'Julxton', age: 22, level: 65, potential: 66, teamId: 'mena_7', nationality: 'KW' },
    { id: 'mena_7_p2', pseudo: 'Blitz', age: 23, level: 74, potential: 79, teamId: 'mena_7', nationality: 'IQ' },
    { id: 'mena_7_p3', pseudo: 'Varaxx', age: 22, level: 79, potential: 81, teamId: 'mena_7', nationality: 'IQ' },

    { id: 'mena_8_p1', pseudo: 'Dovash', age: 22, level: 79, potential: 81, teamId: 'mena_8', nationality: 'BH' },
    { id: 'mena_8_p2', pseudo: 'Vind0p', age: 17, level: 69, potential: 77, teamId: 'mena_8', nationality: 'JO' },
    { id: 'mena_8_p3', pseudo: 'Halquid', age: 26, level: 66, potential: 66, teamId: 'mena_8', nationality: 'EG' },

    { id: 'mena_9_p1', pseudo: 'Wexglow', age: 22, level: 77, potential: 79, teamId: 'mena_9', nationality: 'KW' },
    { id: 'mena_9_p2', pseudo: 'Rise', age: 23, level: 75, potential: 75, teamId: 'mena_9', nationality: 'QA' },
    { id: 'mena_9_p3', pseudo: 'Oxlyte', age: 22, level: 76, potential: 79, teamId: 'mena_9', nationality: 'LB' },

    { id: 'mena_10_p1', pseudo: 'Trikelt', age: 21, level: 46, potential: 52, teamId: 'mena_10', nationality: 'LB' },
    { id: 'mena_10_p2', pseudo: 'Grivane', age: 17, level: 67, potential: 77, teamId: 'mena_10', nationality: 'OM' },
    { id: 'mena_10_p3', pseudo: 'Oripulse', age: 15, level: 50, potential: 61, teamId: 'mena_10', nationality: 'QA' },

    { id: 'mena_11_p1', pseudo: 'Nivael', age: 24, level: 46, potential: 49, teamId: 'mena_11', nationality: 'SA' },
    { id: 'mena_11_p2', pseudo: 'Rexash', age: 26, level: 51, potential: 52, teamId: 'mena_11', nationality: 'BH' },
    { id: 'mena_11_p3', pseudo: 'Torwick', age: 26, level: 57, potential: 59, teamId: 'mena_11', nationality: 'AE' },

    { id: 'mena_12_p1', pseudo: 'Lupha', age: 20, level: 56, potential: 61, teamId: 'mena_12', nationality: 'TN' },
    { id: 'mena_12_p2', pseudo: 'Emyglow', age: 22, level: 63, potential: 67, teamId: 'mena_12', nationality: 'BH' },
    { id: 'mena_12_p3', pseudo: 'Fubrix', age: 21, level: 68, potential: 76, teamId: 'mena_12', nationality: 'IQ' },

    { id: 'mena_13_p1', pseudo: 'Peachy', age: 15, level: 57, potential: 67, teamId: 'mena_13', nationality: 'EG' },
    { id: 'mena_13_p2', pseudo: 'Pyxpha', age: 24, level: 52, potential: 57, teamId: 'mena_13', nationality: 'QA' },
    { id: 'mena_13_p3', pseudo: 'Nyxdex', age: 21, level: 65, potential: 70, teamId: 'mena_13', nationality: 'MA' },

    { id: 'mena_14_p1', pseudo: 'Oroova', age: 15, level: 60, potential: 71, teamId: 'mena_14', nationality: 'DZ' },
    { id: 'mena_14_p2', pseudo: 'Monzeck', age: 15, level: 52, potential: 64, teamId: 'mena_14', nationality: 'TN' },
    { id: 'mena_14_p3', pseudo: 'Kaidric', age: 25, level: 67, potential: 69, teamId: 'mena_14', nationality: 'DZ' },

    { id: 'mena_15_p1', pseudo: 'Threnraxx', age: 22, level: 56, potential: 59, teamId: 'mena_15', nationality: 'KW' },
    { id: 'mena_15_p2', pseudo: 'Myrmora', age: 21, level: 66, potential: 72, teamId: 'mena_15', nationality: 'TN' },
    { id: 'mena_15_p3', pseudo: 'Beastmode', age: 19, level: 45, potential: 51, teamId: 'mena_15', nationality: 'DZ' },

    { id: 'mena_16_p1', pseudo: 'Izjinx', age: 25, level: 62, potential: 64, teamId: 'mena_16', nationality: 'TN' },
    { id: 'mena_16_p2', pseudo: 'Amivane', age: 21, level: 66, potential: 68, teamId: 'mena_16', nationality: 'JO' },
    { id: 'mena_16_p3', pseudo: 'Wexpion', age: 17, level: 65, potential: 73, teamId: 'mena_16', nationality: 'KW' },
];

// ==========================================================
// 🇧🇷 AMÉRIQUE DU SUD (16 ÉQUIPES — 48 JOUEURS)
// ==========================================================
export const SAM_PLAYERS: ProPlayer[] = [
    { id: 'sam_1_p1', pseudo: 'Casezra', age: 21, level: 90, potential: 93, teamId: 'sam_1', nationality: 'BO' },
    { id: 'sam_1_p2', pseudo: 'Nivmika', age: 24, level: 96, potential: 99, teamId: 'sam_1', nationality: 'UY' },
    { id: 'sam_1_p3', pseudo: 'Chixara', age: 19, level: 97, potential: 99, teamId: 'sam_1', nationality: 'PE' },

    { id: 'sam_2_p1', pseudo: 'Vaova', age: 22, level: 84, potential: 87, teamId: 'sam_2', nationality: 'BR' },
    { id: 'sam_2_p2', pseudo: 'Kairion', age: 23, level: 81, potential: 83, teamId: 'sam_2', nationality: 'CO' },
    { id: 'sam_2_p3', pseudo: 'Yuxyael', age: 22, level: 88, potential: 90, teamId: 'sam_2', nationality: 'BO' },

    { id: 'sam_3_p1', pseudo: 'Yenmora', age: 20, level: 88, potential: 94, teamId: 'sam_3', nationality: 'CL' },
    { id: 'sam_3_p2', pseudo: 'Metsanauris', age: 22, level: 80, potential: 85, teamId: 'sam_3', nationality: 'PE' },
    { id: 'sam_3_p3', pseudo: 'Dorgoro', age: 23, level: 80, potential: 85, teamId: 'sam_3', nationality: 'UY' },

    { id: 'sam_4_p1', pseudo: 'Myrwray', age: 20, level: 70, potential: 73, teamId: 'sam_4', nationality: 'PE' },
    { id: 'sam_4_p2', pseudo: 'Gloglow', age: 21, level: 70, potential: 74, teamId: 'sam_4', nationality: 'VE' },
    { id: 'sam_4_p3', pseudo: 'Quohaze', age: 19, level: 72, potential: 74, teamId: 'sam_4', nationality: 'VE' },

    { id: 'sam_5_p1', pseudo: 'Wexdop', age: 23, level: 66, potential: 69, teamId: 'sam_5', nationality: 'CO' },
    { id: 'sam_5_p2', pseudo: 'Glourin', age: 22, level: 73, potential: 75, teamId: 'sam_5', nationality: 'PY' },
    { id: 'sam_5_p3', pseudo: 'Vizth3r', age: 16, level: 67, potential: 78, teamId: 'sam_5', nationality: 'UY' },

    { id: 'sam_6_p1', pseudo: 'Luice', age: 23, level: 79, potential: 82, teamId: 'sam_6', nationality: 'CL' },
    { id: 'sam_6_p2', pseudo: 'Extra', age: 20, level: 77, potential: 79, teamId: 'sam_6', nationality: 'EC' },
    { id: 'sam_6_p3', pseudo: 'Ludrin', age: 20, level: 70, potential: 77, teamId: 'sam_6', nationality: 'BR' },

    { id: 'sam_7_p1', pseudo: 'Blakoo', age: 17, level: 68, potential: 80, teamId: 'sam_7', nationality: 'CL' },
    { id: 'sam_7_p2', pseudo: 'Dorment', age: 20, level: 72, potential: 80, teamId: 'sam_7', nationality: 'AR' },
    { id: 'sam_7_p3', pseudo: 'Yenraze', age: 18, level: 75, potential: 84, teamId: 'sam_7', nationality: 'PY' },

    { id: 'sam_8_p1', pseudo: 'Zeglow', age: 22, level: 71, potential: 71, teamId: 'sam_8', nationality: 'BR' },
    { id: 'sam_8_p2', pseudo: 'Niolume71', age: 21, level: 65, potential: 69, teamId: 'sam_8', nationality: 'BO' },
    { id: 'sam_8_p3', pseudo: 'Vexvash', age: 19, level: 75, potential: 82, teamId: 'sam_8', nationality: 'CO' },

    { id: 'sam_9_p1', pseudo: 'Chidric', age: 21, level: 69, potential: 72, teamId: 'sam_9', nationality: 'AR' },
    { id: 'sam_9_p2', pseudo: 'Krobrix', age: 23, level: 69, potential: 70, teamId: 'sam_9', nationality: 'AR' },
    { id: 'sam_9_p3', pseudo: 'Pyxglow', age: 25, level: 69, potential: 70, teamId: 'sam_9', nationality: 'BO' },

    { id: 'sam_10_p1', pseudo: 'Niv3zra', age: 21, level: 58, potential: 65, teamId: 'sam_10', nationality: 'CL' },
    { id: 'sam_10_p2', pseudo: 'Wynwray', age: 22, level: 56, potential: 57, teamId: 'sam_10', nationality: 'CL' },
    { id: 'sam_10_p3', pseudo: 'Pyxidris', age: 25, level: 45, potential: 45, teamId: 'sam_10', nationality: 'CO' },

    { id: 'sam_11_p1', pseudo: 'Amiraze', age: 20, level: 51, potential: 58, teamId: 'sam_11', nationality: 'BR' },
    { id: 'sam_11_p2', pseudo: 'Toridris', age: 20, level: 48, potential: 52, teamId: 'sam_11', nationality: 'BR' },
    { id: 'sam_11_p3', pseudo: 'Gorgin', age: 21, level: 62, potential: 68, teamId: 'sam_11', nationality: 'BR' },

    { id: 'sam_12_p1', pseudo: 'Turbopolsa18', age: 19, level: 66, potential: 68, teamId: 'sam_12', nationality: 'BR' },
    { id: 'sam_12_p2', pseudo: 'Lexrion', age: 15, level: 58, potential: 71, teamId: 'sam_12', nationality: 'PY' },
    { id: 'sam_12_p3', pseudo: 'Rexyorn', age: 17, level: 60, potential: 71, teamId: 'sam_12', nationality: 'CL' },

    { id: 'sam_13_p1', pseudo: 'Jaxbrix', age: 19, level: 54, potential: 59, teamId: 'sam_13', nationality: 'AR' },
    { id: 'sam_13_p2', pseudo: 'Priael', age: 21, level: 64, potential: 70, teamId: 'sam_13', nationality: 'CL' },
    { id: 'sam_13_p3', pseudo: 'Rezxton', age: 19, level: 61, potential: 68, teamId: 'sam_13', nationality: 'VE' },

    { id: 'sam_14_p1', pseudo: 'Emyxara', age: 15, level: 48, potential: 61, teamId: 'sam_14', nationality: 'CO' },
    { id: 'sam_14_p2', pseudo: 'Skytyko', age: 21, level: 61, potential: 64, teamId: 'sam_14', nationality: 'UY' },
    { id: 'sam_14_p3', pseudo: 'Uzdrin', age: 21, level: 50, potential: 52, teamId: 'sam_14', nationality: 'BO' },

    { id: 'sam_15_p1', pseudo: 'Dovice', age: 20, level: 67, potential: 72, teamId: 'sam_15', nationality: 'UY' },
    { id: 'sam_15_p2', pseudo: 'Giotira', age: 19, level: 66, potential: 68, teamId: 'sam_15', nationality: 'AR' },
    { id: 'sam_15_p3', pseudo: 'Ryudex', age: 26, level: 60, potential: 60, teamId: 'sam_15', nationality: 'AR' },

    { id: 'sam_16_p1', pseudo: 'Myrth3r', age: 24, level: 68, potential: 73, teamId: 'sam_16', nationality: 'AR' },
    { id: 'sam_16_p2', pseudo: 'Umabrix', age: 26, level: 52, potential: 53, teamId: 'sam_16', nationality: 'PE' },
    { id: 'sam_16_p3', pseudo: 'Grihaze', age: 19, level: 48, potential: 56, teamId: 'sam_16', nationality: 'CL' },
];

// ==========================================================
// 🇦🇺 OCÉANIE (16 ÉQUIPES — 48 JOUEURS)
// ==========================================================
export const OCE_PLAYERS: ProPlayer[] = [
    { id: 'oce_1_p1', pseudo: 'Zoxnix', age: 25, level: 92, potential: 94, teamId: 'oce_1', nationality: 'NZ' },
    { id: 'oce_1_p2', pseudo: 'Ashonix', age: 19, level: 88, potential: 96, teamId: 'oce_1', nationality: 'AU' },
    { id: 'oce_1_p3', pseudo: 'Dunvoss', age: 16, level: 97, potential: 99, teamId: 'oce_1', nationality: 'AU' },

    { id: 'oce_2_p1', pseudo: 'Ilyvash', age: 22, level: 87, potential: 89, teamId: 'oce_2', nationality: 'AU' },
    { id: 'oce_2_p2', pseudo: 'Myrulfa', age: 21, level: 80, potential: 82, teamId: 'oce_2', nationality: 'NZ' },
    { id: 'oce_2_p3', pseudo: 'Gl0ael', age: 22, level: 82, potential: 85, teamId: 'oce_2', nationality: 'NZ' },

    { id: 'oce_3_p1', pseudo: 'Rexquill', age: 26, level: 79, potential: 79, teamId: 'oce_3', nationality: 'AU' },
    { id: 'oce_3_p2', pseudo: 'Ember', age: 15, level: 78, potential: 89, teamId: 'oce_3', nationality: 'AU' },
    { id: 'oce_3_p3', pseudo: 'Velrivo', age: 23, level: 72, potential: 76, teamId: 'oce_3', nationality: 'NZ' },

    { id: 'oce_4_p1', pseudo: 'Julopal', age: 22, level: 77, potential: 79, teamId: 'oce_4', nationality: 'AU' },
    { id: 'oce_4_p2', pseudo: 'Rakoo', age: 26, level: 79, potential: 79, teamId: 'oce_4', nationality: 'NZ' },
    { id: 'oce_4_p3', pseudo: 'Myrdosin', age: 24, level: 79, potential: 82, teamId: 'oce_4', nationality: 'NZ' },

    { id: 'oce_5_p1', pseudo: 'Pyxzeph', age: 17, level: 75, potential: 83, teamId: 'oce_5', nationality: 'AU' },
    { id: 'oce_5_p2', pseudo: 'Nyxley', age: 23, level: 77, potential: 82, teamId: 'oce_5', nationality: 'AU' },
    { id: 'oce_5_p3', pseudo: 'Kovcael', age: 26, level: 78, potential: 79, teamId: 'oce_5', nationality: 'AU' },

    { id: 'oce_6_p1', pseudo: 'Xension3', age: 20, level: 72, potential: 76, teamId: 'oce_6', nationality: 'NZ' },
    { id: 'oce_6_p2', pseudo: 'Gioezra', age: 15, level: 65, potential: 80, teamId: 'oce_6', nationality: 'AU' },
    { id: 'oce_6_p3', pseudo: 'Taodrin', age: 22, level: 78, potential: 81, teamId: 'oce_6', nationality: 'AU' },

    { id: 'oce_7_p1', pseudo: 'Hunash', age: 18, level: 70, potential: 77, teamId: 'oce_7', nationality: 'NZ' },
    { id: 'oce_7_p2', pseudo: 'Griopal', age: 24, level: 73, potential: 74, teamId: 'oce_7', nationality: 'NZ' },
    { id: 'oce_7_p3', pseudo: 'Solpulse', age: 20, level: 66, potential: 71, teamId: 'oce_7', nationality: 'NZ' },

    { id: 'oce_8_p1', pseudo: 'Yenglow', age: 25, level: 47, potential: 48, teamId: 'oce_8', nationality: 'NZ' },
    { id: 'oce_8_p2', pseudo: 'Eliael', age: 22, level: 68, potential: 73, teamId: 'oce_8', nationality: 'AU' },
    { id: 'oce_8_p3', pseudo: 'Quobrix', age: 18, level: 46, potential: 56, teamId: 'oce_8', nationality: 'AU' },

    { id: 'oce_9_p1', pseudo: 'Wispion', age: 26, level: 64, potential: 66, teamId: 'oce_9', nationality: 'NZ' },
    { id: 'oce_9_p2', pseudo: 'Alice', age: 26, level: 51, potential: 53, teamId: 'oce_9', nationality: 'NZ' },
    { id: 'oce_9_p3', pseudo: 'Skyloris', age: 25, level: 46, potential: 46, teamId: 'oce_9', nationality: 'NZ' },

    { id: 'oce_10_p1', pseudo: 'Boomer', age: 23, level: 64, potential: 67, teamId: 'oce_10', nationality: 'NZ' },
    { id: 'oce_10_p2', pseudo: 'Kelkelt', age: 19, level: 48, potential: 56, teamId: 'oce_10', nationality: 'AU' },
    { id: 'oce_10_p3', pseudo: 'Nyxraze', age: 17, level: 65, potential: 77, teamId: 'oce_10', nationality: 'NZ' },

    { id: 'oce_11_p1', pseudo: 'Kovgin', age: 21, level: 67, potential: 69, teamId: 'oce_11', nationality: 'AU' },
    { id: 'oce_11_p2', pseudo: 'Thrension', age: 25, level: 49, potential: 51, teamId: 'oce_11', nationality: 'NZ' },
    { id: 'oce_11_p3', pseudo: 'Gorpha', age: 16, level: 51, potential: 61, teamId: 'oce_11', nationality: 'NZ' },

    { id: 'oce_12_p1', pseudo: 'Boloris', age: 20, level: 67, potential: 71, teamId: 'oce_12', nationality: 'AU' },
    { id: 'oce_12_p2', pseudo: 'Kr0vane', age: 24, level: 65, potential: 70, teamId: 'oce_12', nationality: 'AU' },
    { id: 'oce_12_p3', pseudo: 'Hunric', age: 25, level: 59, potential: 61, teamId: 'oce_12', nationality: 'AU' },

    { id: 'oce_13_p1', pseudo: 'Oxlume', age: 24, level: 61, potential: 66, teamId: 'oce_13', nationality: 'AU' },
    { id: 'oce_13_p2', pseudo: 'Taorivo', age: 22, level: 63, potential: 66, teamId: 'oce_13', nationality: 'AU' },
    { id: 'oce_13_p3', pseudo: 'Orojinx', age: 20, level: 68, potential: 76, teamId: 'oce_13', nationality: 'AU' },

    { id: 'oce_14_p1', pseudo: 'Viovash', age: 17, level: 61, potential: 70, teamId: 'oce_14', nationality: 'NZ' },
    { id: 'oce_14_p2', pseudo: 'Rezidris', age: 26, level: 52, potential: 53, teamId: 'oce_14', nationality: 'NZ' },
    { id: 'oce_14_p3', pseudo: 'Fyrwisp', age: 25, level: 59, potential: 59, teamId: 'oce_14', nationality: 'AU' },

    { id: 'oce_15_p1', pseudo: 'Y0rice', age: 23, level: 54, potential: 59, teamId: 'oce_15', nationality: 'NZ' },
    { id: 'oce_15_p2', pseudo: 'Vioice', age: 23, level: 65, potential: 66, teamId: 'oce_15', nationality: 'AU' },
    { id: 'oce_15_p3', pseudo: 'Paxloris', age: 21, level: 66, potential: 70, teamId: 'oce_15', nationality: 'AU' },

    { id: 'oce_16_p1', pseudo: 'Archie', age: 26, level: 50, potential: 52, teamId: 'oce_16', nationality: 'NZ' },
    { id: 'oce_16_p2', pseudo: 'Solkoo', age: 21, level: 62, potential: 67, teamId: 'oce_16', nationality: 'NZ' },
    { id: 'oce_16_p3', pseudo: 'Solnoor', age: 23, level: 54, potential: 57, teamId: 'oce_16', nationality: 'AU' },
];

// ==========================================================
// 🌏 ASIE-PACIFIQUE (16 ÉQUIPES — 48 JOUEURS)
// ==========================================================
export const APAC_PLAYERS: ProPlayer[] = [
    { id: 'apac_1_p1', pseudo: 'Fyrurin', age: 19, level: 84, potential: 87, teamId: 'apac_1', nationality: 'JP' },
    { id: 'apac_1_p2', pseudo: 'Zarhawk', age: 20, level: 82, potential: 90, teamId: 'apac_1', nationality: 'TH' },
    { id: 'apac_1_p3', pseudo: 'Umastiv', age: 26, level: 82, potential: 82, teamId: 'apac_1', nationality: 'JP' },

    { id: 'apac_2_p1', pseudo: 'Ryutira', age: 21, level: 68, potential: 76, teamId: 'apac_2', nationality: 'TW' },
    { id: 'apac_2_p2', pseudo: 'Fyrmoon', age: 18, level: 66, potential: 76, teamId: 'apac_2', nationality: 'IN' },
    { id: 'apac_2_p3', pseudo: 'Trijinx', age: 20, level: 76, potential: 83, teamId: 'apac_2', nationality: 'TW' },

    { id: 'apac_3_p1', pseudo: 'Crutira21', age: 23, level: 77, potential: 82, teamId: 'apac_3', nationality: 'SG' },
    { id: 'apac_3_p2', pseudo: 'Vexxton', age: 19, level: 79, potential: 84, teamId: 'apac_3', nationality: 'ID' },
    { id: 'apac_3_p3', pseudo: 'Threnkelt', age: 21, level: 73, potential: 75, teamId: 'apac_3', nationality: 'JP' },

    { id: 'apac_4_p1', pseudo: 'Dorova', age: 20, level: 74, potential: 82, teamId: 'apac_4', nationality: 'VN' },
    { id: 'apac_4_p2', pseudo: 'Neodop', age: 26, level: 76, potential: 78, teamId: 'apac_4', nationality: 'IN' },
    { id: 'apac_4_p3', pseudo: 'Viohaze', age: 23, level: 73, potential: 78, teamId: 'apac_4', nationality: 'HK' },

    { id: 'apac_5_p1', pseudo: 'Loorivo', age: 20, level: 69, potential: 74, teamId: 'apac_5', nationality: 'TH' },
    { id: 'apac_5_p2', pseudo: 'Sylpion', age: 24, level: 67, potential: 68, teamId: 'apac_5', nationality: 'TW' },
    { id: 'apac_5_p3', pseudo: 'Oxwisp', age: 15, level: 71, potential: 83, teamId: 'apac_5', nationality: 'TW' },

    { id: 'apac_6_p1', pseudo: 'Velhaze', age: 20, level: 63, potential: 71, teamId: 'apac_6', nationality: 'SG' },
    { id: 'apac_6_p2', pseudo: 'Taowisp', age: 18, level: 67, potential: 74, teamId: 'apac_6', nationality: 'JP' },
    { id: 'apac_6_p3', pseudo: 'Tribrix', age: 17, level: 64, potential: 70, teamId: 'apac_6', nationality: 'IN' },

    { id: 'apac_7_p1', pseudo: 'Nyxquid', age: 21, level: 60, potential: 68, teamId: 'apac_7', nationality: 'HK' },
    { id: 'apac_7_p2', pseudo: 'Urylyte', age: 19, level: 67, potential: 71, teamId: 'apac_7', nationality: 'TW' },
    { id: 'apac_7_p3', pseudo: 'Dovjera', age: 20, level: 61, potential: 63, teamId: 'apac_7', nationality: 'TW' },

    { id: 'apac_8_p1', pseudo: 'Julley', age: 18, level: 47, potential: 55, teamId: 'apac_8', nationality: 'PH' },
    { id: 'apac_8_p2', pseudo: 'Gorjera', age: 26, level: 55, potential: 56, teamId: 'apac_8', nationality: 'MY' },
    { id: 'apac_8_p3', pseudo: 'Fyryorn', age: 23, level: 61, potential: 64, teamId: 'apac_8', nationality: 'TW' },

    { id: 'apac_9_p1', pseudo: 'Crudrin', age: 26, level: 45, potential: 45, teamId: 'apac_9', nationality: 'IN' },
    { id: 'apac_9_p2', pseudo: 'Rezdop', age: 20, level: 65, potential: 71, teamId: 'apac_9', nationality: 'HK' },
    { id: 'apac_9_p3', pseudo: 'Umadop', age: 19, level: 66, potential: 70, teamId: 'apac_9', nationality: 'ID' },

    { id: 'apac_10_p1', pseudo: 'Joreuz', age: 24, level: 57, potential: 59, teamId: 'apac_10', nationality: 'TW' },
    { id: 'apac_10_p2', pseudo: 'Blan', age: 19, level: 61, potential: 69, teamId: 'apac_10', nationality: 'MY' },
    { id: 'apac_10_p3', pseudo: 'Seidop', age: 23, level: 59, potential: 62, teamId: 'apac_10', nationality: 'JP' },

    { id: 'apac_11_p1', pseudo: 'Kelraxx', age: 20, level: 55, potential: 61, teamId: 'apac_11', nationality: 'KR' },
    { id: 'apac_11_p2', pseudo: 'Halzeck', age: 24, level: 62, potential: 66, teamId: 'apac_11', nationality: 'JP' },
    { id: 'apac_11_p3', pseudo: 'Amphel', age: 20, level: 66, potential: 73, teamId: 'apac_11', nationality: 'PH' },

    { id: 'apac_12_p1', pseudo: 'V3xkelt', age: 25, level: 48, potential: 48, teamId: 'apac_12', nationality: 'TW' },
    { id: 'apac_12_p2', pseudo: 'Quoquid', age: 26, level: 58, potential: 60, teamId: 'apac_12', nationality: 'KR' },
    { id: 'apac_12_p3', pseudo: 'Uzm0ra', age: 20, level: 45, potential: 50, teamId: 'apac_12', nationality: 'MY' },

    { id: 'apac_13_p1', pseudo: 'Elyzeck', age: 15, level: 46, potential: 57, teamId: 'apac_13', nationality: 'SG' },
    { id: 'apac_13_p2', pseudo: 'Yengoro', age: 23, level: 52, potential: 54, teamId: 'apac_13', nationality: 'ID' },
    { id: 'apac_13_p3', pseudo: 'Sylwyn', age: 22, level: 58, potential: 60, teamId: 'apac_13', nationality: 'JP' },

    { id: 'apac_14_p1', pseudo: 'Nesion', age: 19, level: 62, potential: 64, teamId: 'apac_14', nationality: 'IN' },
    { id: 'apac_14_p2', pseudo: 'Sevdex', age: 19, level: 68, potential: 74, teamId: 'apac_14', nationality: 'JP' },
    { id: 'apac_14_p3', pseudo: 'Briraze', age: 19, level: 56, potential: 62, teamId: 'apac_14', nationality: 'KR' },

    { id: 'apac_15_p1', pseudo: 'Thr3npion', age: 21, level: 64, potential: 66, teamId: 'apac_15', nationality: 'SG' },
    { id: 'apac_15_p2', pseudo: 'Rastiv', age: 25, level: 57, potential: 58, teamId: 'apac_15', nationality: 'IN' },
    { id: 'apac_15_p3', pseudo: 'Pyxsion', age: 16, level: 62, potential: 73, teamId: 'apac_15', nationality: 'TH' },

    { id: 'apac_16_p1', pseudo: 'Qortira', age: 23, level: 54, potential: 59, teamId: 'apac_16', nationality: 'TH' },
    { id: 'apac_16_p2', pseudo: 'Giosion', age: 21, level: 45, potential: 51, teamId: 'apac_16', nationality: 'TW' },
    { id: 'apac_16_p3', pseudo: 'Yorzeck', age: 15, level: 45, potential: 59, teamId: 'apac_16', nationality: 'HK' },
];

// ==========================================================
// 🌍 AFRIQUE SUBSAHARIENNE (16 ÉQUIPES — 48 JOUEURS)
// ==========================================================
export const SSA_PLAYERS: ProPlayer[] = [
    { id: 'ssa_1_p1', pseudo: 'Threnwisp', age: 23, level: 79, potential: 81, teamId: 'ssa_1', nationality: 'GH' },
    { id: 'ssa_1_p2', pseudo: 'Fyrspire', age: 21, level: 81, potential: 86, teamId: 'ssa_1', nationality: 'SN' },
    { id: 'ssa_1_p3', pseudo: 'Ryucael', age: 24, level: 80, potential: 81, teamId: 'ssa_1', nationality: 'GH' },

    { id: 'ssa_2_p1', pseudo: 'Velloris', age: 21, level: 68, potential: 70, teamId: 'ssa_2', nationality: 'KE' },
    { id: 'ssa_2_p2', pseudo: 'Ashvash', age: 23, level: 78, potential: 78, teamId: 'ssa_2', nationality: 'CM' },
    { id: 'ssa_2_p3', pseudo: 'Yukeo', age: 23, level: 66, potential: 68, teamId: 'ssa_2', nationality: 'SN' },

    { id: 'ssa_3_p1', pseudo: 'Daxnix85', age: 15, level: 68, potential: 83, teamId: 'ssa_3', nationality: 'CI' },
    { id: 'ssa_3_p2', pseudo: 'Iskhaze', age: 21, level: 70, potential: 73, teamId: 'ssa_3', nationality: 'SN' },
    { id: 'ssa_3_p3', pseudo: 'Skyt3ka', age: 19, level: 69, potential: 75, teamId: 'ssa_3', nationality: 'NG' },

    { id: 'ssa_4_p1', pseudo: 'Krorivo', age: 25, level: 72, potential: 73, teamId: 'ssa_4', nationality: 'TZ' },
    { id: 'ssa_4_p2', pseudo: 'Sylice', age: 21, level: 76, potential: 82, teamId: 'ssa_4', nationality: 'KE' },
    { id: 'ssa_4_p3', pseudo: 'Sevlume', age: 21, level: 77, potential: 81, teamId: 'ssa_4', nationality: 'UG' },

    { id: 'ssa_5_p1', pseudo: 'Corther', age: 17, level: 68, potential: 80, teamId: 'ssa_5', nationality: 'GH' },
    { id: 'ssa_5_p2', pseudo: 'Brikoo38', age: 22, level: 69, potential: 71, teamId: 'ssa_5', nationality: 'KE' },
    { id: 'ssa_5_p3', pseudo: 'Kelrivo', age: 21, level: 79, potential: 84, teamId: 'ssa_5', nationality: 'ZW' },

    { id: 'ssa_6_p1', pseudo: 'Bowick', age: 21, level: 60, potential: 66, teamId: 'ssa_6', nationality: 'NG' },
    { id: 'ssa_6_p2', pseudo: 'Kypulse', age: 15, level: 53, potential: 69, teamId: 'ssa_6', nationality: 'KE' },
    { id: 'ssa_6_p3', pseudo: 'Taoxton', age: 24, level: 53, potential: 58, teamId: 'ssa_6', nationality: 'SN' },

    { id: 'ssa_7_p1', pseudo: 'Jorcael', age: 15, level: 45, potential: 61, teamId: 'ssa_7', nationality: 'CM' },
    { id: 'ssa_7_p2', pseudo: 'Izley', age: 23, level: 63, potential: 66, teamId: 'ssa_7', nationality: 'CI' },
    { id: 'ssa_7_p3', pseudo: 'Dunyael', age: 19, level: 62, potential: 66, teamId: 'ssa_7', nationality: 'CM' },

    { id: 'ssa_8_p1', pseudo: 'Niofola', age: 26, level: 60, potential: 62, teamId: 'ssa_8', nationality: 'KE' },
    { id: 'ssa_8_p2', pseudo: 'Lioric', age: 20, level: 63, potential: 70, teamId: 'ssa_8', nationality: 'ET' },
    { id: 'ssa_8_p3', pseudo: 'Amixton', age: 15, level: 57, potential: 69, teamId: 'ssa_8', nationality: 'CM' },

    { id: 'ssa_9_p1', pseudo: 'Vexulfa', age: 16, level: 64, potential: 79, teamId: 'ssa_9', nationality: 'KE' },
    { id: 'ssa_9_p2', pseudo: 'Froulfa', age: 24, level: 59, potential: 60, teamId: 'ssa_9', nationality: 'KE' },
    { id: 'ssa_9_p3', pseudo: 'Skybrix', age: 23, level: 66, potential: 67, teamId: 'ssa_9', nationality: 'MZ' },

    { id: 'ssa_10_p1', pseudo: 'Vadric', age: 21, level: 46, potential: 49, teamId: 'ssa_10', nationality: 'ZW' },
    { id: 'ssa_10_p2', pseudo: 'Rhajinx', age: 21, level: 56, potential: 59, teamId: 'ssa_10', nationality: 'ZA' },
    { id: 'ssa_10_p3', pseudo: 'Yorlyte', age: 23, level: 56, potential: 59, teamId: 'ssa_10', nationality: 'ZW' },

    { id: 'ssa_11_p1', pseudo: 'Yorpulse', age: 24, level: 46, potential: 51, teamId: 'ssa_11', nationality: 'TZ' },
    { id: 'ssa_11_p2', pseudo: 'Kinetic', age: 17, level: 68, potential: 76, teamId: 'ssa_11', nationality: 'CI' },
    { id: 'ssa_11_p3', pseudo: 'Ryuwyn', age: 20, level: 57, potential: 64, teamId: 'ssa_11', nationality: 'UG' },

    { id: 'ssa_12_p1', pseudo: 'Bourin', age: 19, level: 61, potential: 65, teamId: 'ssa_12', nationality: 'UG' },
    { id: 'ssa_12_p2', pseudo: 'Paxpulse', age: 24, level: 61, potential: 64, teamId: 'ssa_12', nationality: 'TZ' },
    { id: 'ssa_12_p3', pseudo: 'Halael71', age: 25, level: 60, potential: 61, teamId: 'ssa_12', nationality: 'CI' },

    { id: 'ssa_13_p1', pseudo: 'Dunopal', age: 16, level: 59, potential: 70, teamId: 'ssa_13', nationality: 'GH' },
    { id: 'ssa_13_p2', pseudo: 'Kelxton', age: 17, level: 51, potential: 58, teamId: 'ssa_13', nationality: 'KE' },
    { id: 'ssa_13_p3', pseudo: 'W3xbrix', age: 15, level: 66, potential: 77, teamId: 'ssa_13', nationality: 'UG' },

    { id: 'ssa_14_p1', pseudo: 'Liodop', age: 26, level: 48, potential: 49, teamId: 'ssa_14', nationality: 'SN' },
    { id: 'ssa_14_p2', pseudo: 'Hunpulse', age: 20, level: 63, potential: 66, teamId: 'ssa_14', nationality: 'SN' },
    { id: 'ssa_14_p3', pseudo: 'Kahjera', age: 24, level: 52, potential: 52, teamId: 'ssa_14', nationality: 'KE' },

    { id: 'ssa_15_p1', pseudo: 'Sevsund', age: 20, level: 49, potential: 56, teamId: 'ssa_15', nationality: 'CM' },
    { id: 'ssa_15_p2', pseudo: 'Yorment', age: 16, level: 46, potential: 57, teamId: 'ssa_15', nationality: 'ET' },
    { id: 'ssa_15_p3', pseudo: 'Vizvane', age: 26, level: 57, potential: 59, teamId: 'ssa_15', nationality: 'CI' },

    { id: 'ssa_16_p1', pseudo: 'Jaxquid', age: 21, level: 47, potential: 50, teamId: 'ssa_16', nationality: 'ZW' },
    { id: 'ssa_16_p2', pseudo: 'Dunkelt', age: 22, level: 60, potential: 61, teamId: 'ssa_16', nationality: 'GH' },
    { id: 'ssa_16_p3', pseudo: 'Slug', age: 26, level: 49, potential: 51, teamId: 'ssa_16', nationality: 'KE' },
];

// ==========================================================
// 🌐 EXPORTS GLOBAUX
// ==========================================================
export const ALL_PLAYERS: ProPlayer[] = [
    ...EU_PLAYERS,
    ...NA_PLAYERS,
    ...MENA_PLAYERS,
    ...SAM_PLAYERS,
    ...OCE_PLAYERS,
    ...APAC_PLAYERS,
    ...SSA_PLAYERS,
];

export const REGIONAL_PLAYERS: Record<string, ProPlayer[]> = {
    EU: EU_PLAYERS,
    NA: NA_PLAYERS,
    MENA: MENA_PLAYERS,
    SAM: SAM_PLAYERS,
    OCE: OCE_PLAYERS,
    APAC: APAC_PLAYERS,
    SSA: SSA_PLAYERS,
};
