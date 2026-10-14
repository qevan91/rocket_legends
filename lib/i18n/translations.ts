// lib/i18n/translations.ts

export type Language = 'fr' | 'en';

export const translations = {
    fr: {
        common: {
            play: "JOUER",
            continue: "CONTINUER",
            newCareer: "NOUVELLE CARRIÈRE",
            settings: "OPTIONS",
            profile: "PROFIL",
            credits: "CRÉDITS",
            back: "RETOUR",
            level: "NIV.",
            energy: "ÉNERGIE (PT)",
        },
        menu: {
            title: "ROCKET LEGENDS",
            subtitle: "Mode Carrière Pro & Special Moves",
            selectSave: "SÉLECTIONNER UNE CARRIÈRE",
            noSave: "Aucune sauvegarde trouvée",
        },
        stats: {
            strike: "TIR PUISSANT",
            dribble: "TECHNIQUE",
            defense: "DÉFENSE",
            speed: "VITESSE",
        },
        actions: {
            specialMove: "TECHNIQUE SPÉCIALE !",
            train: "ENTRAÎNEMENT",
            match: "MATCH DE LIGUE",
        }
    },
    en: {
        common: {
            play: "PLAY",
            continue: "CONTINUE",
            newCareer: "NEW CAREER",
            settings: "SETTINGS",
            profile: "PROFILE",
            credits: "CREDITS",
            back: "BACK",
            level: "LVL.",
            energy: "ENERGY (TP)",
        },
        menu: {
            title: "ROCKET LEGENDS",
            subtitle: "Pro Career & Special Moves",
            selectSave: "SELECT A CAREER",
            noSave: "No save file found",
        },
        stats: {
            strike: "POWER SHOT",
            dribble: "TECHNIQUE",
            defense: "DEFENSE",
            speed: "SPEED",
        },
        actions: {
            specialMove: "SPECIAL MOVE!",
            train: "TRAINING",
            match: "LEAGUE MATCH",
        }
    }
};