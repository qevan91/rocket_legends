// lib/engine/seasonEngine.ts
import {
    CareerSave,
    Team,
    TeamTier,
    TransferOffer,
} from '@/types/game';
import {
    calculatePlayerOvr,
    COACH_TRUST_THRESHOLDS,
} from '@/lib/data/gameData';

export type WeeklyActivityType = 'ranked' | 'scrims' | 'stream' | 'rest';

export const WEEKS_PER_SPLIT = 5; // 4 semaines de compétition + Semaine 5 = Mercato / Fin de Split

/**
 * Exécute l'activité hebdomadaire choisie par le joueur avant son match
 */
export function performWeeklyActivity(
    save: CareerSave,
    activity: WeeklyActivityType
): { updatedSave: CareerSave; feedback: string } {
    const stats = { ...save.player.stats };
    const gauges = { ...save.gauges };
    let money = save.money;
    let feedback = '';

    if (activity !== 'rest' && gauges.energy < 15) {
        return {
            updatedSave: save,
            feedback: '⚠️ Tu es épuisé ! Choisis "Repos" avant de pouvoir t’entraîner.',
        };
    }

    switch (activity) {
        case 'ranked': {
            // Grind Solo/Duo Ranked : booste les mécaniques et la défense
            stats.mechanics = Math.min(99, stats.mechanics + 2);
            stats.defense = Math.min(99, stats.defense + 1);
            gauges.energy = Math.max(0, gauges.energy - 15);
            gauges.feeling = Math.min(100, gauges.feeling + 5);
            feedback = '🔥 Grosse session de Grind Ranked ! (+2 Mécanique, +1 Défense, +5 Feeling, -15 Énergie)';
            break;
        }
        case 'scrims': {
            // Scrims avec l'équipe : booste le jeu d'équipe et la confiance du coach
            stats.teamplay = Math.min(99, stats.teamplay + 2);
            stats.defense = Math.min(99, stats.defense + 1);
            gauges.energy = Math.max(0, gauges.energy - 15);
            gauges.coachTrust = Math.min(100, gauges.coachTrust + 6);
            feedback = '🤝 Scrims solides avec tes mates ! (+2 Équipe, +1 Défense, +6 Confiance Coach, -15 Énergie)';
            break;
        }
        case 'stream': {
            // Stream : rapporte de l'argent et du feeling
            money += 350;
            gauges.energy = Math.max(0, gauges.energy - 10);
            gauges.feeling = Math.min(100, gauges.feeling + 6);
            feedback = '🎥 Super stream devant la commu ! (+350€, +6 Feeling, -10 Énergie)';
            break;
        }
        case 'rest': {
            // Repos : recharge l'énergie et le moral
            gauges.energy = Math.min(100, gauges.energy + 35);
            gauges.feeling = Math.min(100, gauges.feeling + 8);
            feedback = '😴 Semaine de récupération bien méritée ! (+35 Énergie, +8 Feeling)';
            break;
        }
    }

    const newOvr = calculatePlayerOvr(stats, save.player.role);
    const updatedPlayer = {
        ...save.player,
        stats,
        ovr: newOvr,
    };

    // Mettre à jour le joueur dans le roster de son équipe actuelle
    const updatedTeams = save.teams.map((team) => {
        if (team.id !== save.currentTeamId) return team;
        const newRoster = team.roster.map((p) => (p.isUser ? updatedPlayer : p));
        const starters = newRoster.slice(0, 3);
        const avgOvr = Math.round(
            starters.reduce((sum, p) => sum + p.ovr, 0) / starters.length
        );
        return { ...team, roster: newRoster, ovr: avgOvr };
    });

    return {
        updatedSave: {
            ...save,
            updatedAt: new Date().toISOString(),
            money,
            player: updatedPlayer,
            gauges,
            teams: updatedTeams,
        },
        feedback,
    };
}

/**
 * Génère le bilan de fin de Split (Semaine 5) :
 * - Vérifie si le coach IA vire le joueur (coachTrust < 30)
 * - Génère des offres de transfert cohérentes avec l'OVR et la réputation du joueur
 */
export function evaluateEndOfSplitMercato(save: CareerSave): {
    updatedSave: CareerSave;
    wasKicked: boolean;
    headline: string;
} {
    const currentTeam = save.teams.find((t) => t.id === save.currentTeamId)!;
    const trust = save.gauges.coachTrust;
    const playerOvr = save.player.ovr;

    const wasKicked = trust < COACH_TRUST_THRESHOLDS.KICKED;

    // Filtrer les autres équipes de la même région (ou internationales si Tier 1)
    const otherTeams = save.teams.filter((t) => t.id !== save.currentTeamId);
    const offers: TransferOffer[] = [];

    if (wasKicked) {
        // VIRÉ PAR LE COACH IA : Le joueur n'a pas le choix, il doit partir dans une petite équipe (Tier 3 ou bas Tier 2)
        const reboundTeams = otherTeams
            .filter((t) => t.tier >= currentTeam.tier) // Équipes de niveau égal ou inférieur (Tier 3)
            .sort((a, b) => Math.abs(a.ovr - playerOvr) - Math.abs(b.ovr - playerOvr))
            .slice(0, 2);

        reboundTeams.forEach((team) => {
            offers.push({
                teamId: team.id,
                teamName: team.name,
                teamTier: team.tier,
                teamOvr: team.ovr,
                offeredStatus: 'starter',
                monthlySalary: 500,
                reason: 'rebound_after_kick',
            });
        });

        return {
            updatedSave: {
                ...save,
                contractStatus: 'free_agent',
                pendingOffers: offers,
            },
            wasKicked: true,
            headline: `🚨 RUPTURE DE CONTRAT : ${currentTeam.coachName} et ${currentTeam.name} ont décidé de te virer (Confiance : ${trust}/100). Tu dois trouver un nouveau club !`,
        };
    }

    // NON VIRÉ : On cherche des offres logiques par rapport à son OVR et sa confiance
    const targetTier: TeamTier =
        trust >= 70 && playerOvr >= 70 && currentTeam.tier > 1
            ? ((currentTeam.tier - 1) as TeamTier)
            : currentTeam.tier;

    const logicalTeams = otherTeams
        .filter(
            (t) =>
                t.tier === targetTier ||
                Math.abs(t.ovr - playerOvr) <= 8
        )
        .sort((a, b) => Math.abs(a.ovr - playerOvr) - Math.abs(b.ovr - playerOvr))
        .slice(0, 3);

    logicalTeams.forEach((team) => {
        const isPromotion = team.tier < currentTeam.tier || team.ovr > currentTeam.ovr + 3;
        offers.push({
            teamId: team.id,
            teamName: team.name,
            teamTier: team.tier,
            teamOvr: team.ovr,
            offeredStatus: 'starter',
            monthlySalary: team.tier === 1 ? 3500 : team.tier === 2 ? 1500 : 750,
            reason: isPromotion ? 'promotion' : 'lateral',
        });
    });

    return {
        updatedSave: {
            ...save,
            pendingOffers: offers,
        },
        wasKicked: false,
        headline:
            trust >= 75
                ? `🌟 MERCATO : Tes performances attirent l'œil de meilleures structures ! Tu peux signer ailleurs ou prolonger chez ${currentTeam.name}.`
                : `📋 MERCATO FIN DE SPLIT : ${currentTeam.name} souhaite te conserver, mais d'autres équipes ont aussi envoyé une offre.`,
    };
}

/**
 * Applique le choix du joueur lors du Mercato (Rester ou Changer d'équipe)
 * et passe au Split suivant (ou à la Saison suivante après le Split 3).
 */
export function acceptTransferOrStay(
    save: CareerSave,
    targetTeamId: string
): { updatedSave: CareerSave; summaryMessage: string } {
    const isStaying = targetTeamId === save.currentTeamId;
    const chosenOffer = save.pendingOffers?.find((o) => o.teamId === targetTeamId);

    let updatedTeams: Team[] = [...save.teams];

    if (!isStaying) {
        // 1. Retirer le joueur de son ancienne équipe
        updatedTeams = updatedTeams.map((team) => {
            if (team.id === save.currentTeamId) {
                const remaining = team.roster.filter((p) => !p.isUser);
                return { ...team, roster: remaining };
            }
            return team;
        });

        // 2. Insérer le joueur comme Titulaire dans sa nouvelle équipe (Règle des 2/3 conservée par ses 2 nouveaux mates)
        updatedTeams = updatedTeams.map((team) => {
            if (team.id === targetTeamId) {
                const mates = team.roster.filter((p) => !p.isUser).slice(0, 2);
                const benched = team.roster.filter((p) => !p.isUser)[2];
                const newRoster = [save.player, ...mates, ...(benched ? [benched] : [])];
                const newOvr = Math.round(
                    (save.player.ovr + mates[0].ovr + mates[1].ovr) / 3
                );
                return {
                    ...team,
                    ovr: newOvr,
                    roster: newRoster,
                };
            }
            return team;
        });
    }

    // Avancement du Split / de la Saison
    let nextSplit = save.split;
    let nextSeason = save.season;
    let nextAge = save.player.age;
    const newTrophies = [...save.careerHistory.trophies];
    let worldsNote = '';

    if (save.split === 3) {
        // Fin de la saison -> Vérification de la qualification aux Worlds (Top 5 de la région)
        const targetTeam = updatedTeams.find((t) => t.id === targetTeamId)!;
        const regionStandings = updatedTeams
            .filter((t) => t.region === targetTeam.region)
            .sort((a, b) => b.rlcsPoints - a.rlcsPoints);

        const rank = regionStandings.findIndex((t) => t.id === targetTeam.id) + 1;
        if (rank <= 5 && targetTeam.tier === 1) {
            newTrophies.push(`S${save.season} World Championship Contender (${targetTeam.tag})`);
            worldsNote = ` 🏆 Saison terminée dans le Top ${rank} (${targetTeam.region}) : Qualification aux Worlds validée !`;
        } else {
            worldsNote = ` Fin de la Saison ${save.season} (Classé #${rank} en ${targetTeam.region}).`;
        }

        nextSeason += 1;
        nextSplit = 1;
        nextAge += 1;

        // Réinitialiser les points RLCS en début de nouvelle saison
        updatedTeams = updatedTeams.map((t) => ({ ...t, rlcsPoints: 0 }));
    } else {
        nextSplit = (save.split + 1) as 1 | 2 | 3;
    }

    const newSalary = chosenOffer ? chosenOffer.monthlySalary : save.monthlySalary;
    const newTeamObj = updatedTeams.find((t) => t.id === targetTeamId)!;

    const updatedSave: CareerSave = {
        ...save,
        updatedAt: new Date().toISOString(),
        currentTeamId: targetTeamId,
        contractStatus: 'starter',
        monthlySalary: newSalary,
        money: save.money + newSalary, // Versement du salaire de fin de split
        season: nextSeason,
        split: nextSplit,
        week: 1,
        player: {
            ...save.player,
            age: nextAge,
        },
        gauges: {
            energy: 100, // Repos inter-split
            feeling: Math.max(55, save.gauges.feeling),
            coachTrust: isStaying ? save.gauges.coachTrust : 55, // Reset à 55 dans un nouveau club
        },
        teams: updatedTeams,
        careerHistory: {
            ...save.careerHistory,
            trophies: newTrophies,
        },
        pendingOffers: undefined,
    };

    return {
        updatedSave,
        summaryMessage: isStaying
            ? `✅ Tu prolonges l'aventure chez ${newTeamObj.name} pour le Split ${nextSplit} !${worldsNote}`
            : `✍️ Nouveau départ ! Tu signes chez ${newTeamObj.name} (Tier ${newTeamObj.tier}) pour ${newSalary}€/mois.${worldsNote}`,
    };
}