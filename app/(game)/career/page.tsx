// app/(game)/career/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CareerSave, Team } from '@/types/game';
import {
    acceptTransferOrStay,
    evaluateEndOfSplitMercato,
    performWeeklyActivity,
    WEEKS_PER_SPLIT,
    WeeklyActivityType,
} from '@/lib/engine/seasonEngine';
import { COACH_TRUST_THRESHOLDS } from '@/lib/data/gameData';

export default function CareerHubPage() {
    const router = useRouter();
    const [save, setSave] = useState<CareerSave | null>(null);
    const [trainedThisWeek, setTrainedThisWeek] = useState<boolean>(false);
    const [bannerMessage, setBannerMessage] = useState<string>('');
    const [mercatoHeadline, setMercatoHeadline] = useState<string>('');
    const [wasKickedByCoach, setWasKickedByCoach] = useState<boolean>(false);

    useEffect(() => {
        const raw = localStorage.getItem('rl_active_save');
        if (!raw) {
            router.push('/saves/new');
            return;
        }
        const loaded: CareerSave = JSON.parse(raw);

        // Si on arrive à la semaine 5 (Fin de Split) et que le mercato n'a pas encore été généré
        if (loaded.week >= WEEKS_PER_SPLIT && !loaded.pendingOffers) {
            const mercato = evaluateEndOfSplitMercato(loaded);
            localStorage.setItem('rl_active_save', JSON.stringify(mercato.updatedSave));
            setSave(mercato.updatedSave);
            setMercatoHeadline(mercato.headline);
            setWasKickedByCoach(mercato.wasKicked);
        } else {
            setSave(loaded);
            if (loaded.pendingOffers) {
                const kicked = loaded.gauges.coachTrust < COACH_TRUST_THRESHOLDS.KICKED;
                setWasKickedByCoach(kicked);
                setMercatoHeadline(
                    kicked
                        ? '🚨 Tu as été écarté du roster par le coach ! Choisis une nouvelle équipe pour rebondir.'
                        : '📋 Fenêtre de Mercato RLCS ouverte : reste dans ton équipe ou signe ailleurs.'
                );
            }
        }
    }, [router]);

    if (!save) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                Chargement de ta carrière...
            </div>
        );
    }

    const currentTeam: Team =
        save.teams.find((t) => t.id === save.currentTeamId) || save.teams[0];

    const regionalStandings = [...save.teams]
        .filter((t) => t.region === currentTeam.region)
        .sort((a, b) => b.rlcsPoints - a.rlcsPoints || b.ovr - a.ovr);

    const handleActivity = (activity: WeeklyActivityType) => {
        if (trainedThisWeek) {
            setBannerMessage('ℹ️ Tu as déjà effectué ton activité cette semaine. Lance le match RLCS !');
            return;
        }
        const { updatedSave, feedback } = performWeeklyActivity(save, activity);
        setSave(updatedSave);
        localStorage.setItem('rl_active_save', JSON.stringify(updatedSave));
        setBannerMessage(feedback);
        setTrainedThisWeek(true);
    };

    const handleMercatoChoice = (targetTeamId: string) => {
        const { updatedSave, summaryMessage } = acceptTransferOrStay(save, targetTeamId);
        setSave(updatedSave);
        localStorage.setItem('rl_active_save', JSON.stringify(updatedSave));
        setBannerMessage(summaryMessage);
        setMercatoHeadline('');
        setWasKickedByCoach(false);
        setTrainedThisWeek(false);
    };

    const isMercatoWeek = save.week >= WEEKS_PER_SPLIT && !!save.pendingOffers;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* 1. BARRE SUPÉRIEURE : JOUEUR, CLUB & CALENDRIER */}
                <header className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl text-slate-950 shrink-0"
                            style={{ backgroundColor: currentTeam.logoColor }}
                        >
                            {currentTeam.tag}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-black text-white">{save.player.gamertag}</h1>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-400 text-slate-950">
                  OVR {save.player.ovr}
                </span>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 uppercase">
                  {save.player.role}
                </span>
                            </div>
                            <p className="text-sm text-slate-400 mt-0.5">
                                {currentTeam.name} (Tier {currentTeam.tier} • {currentTeam.region}) •{' '}
                                {save.player.age} ans • Salaire : {save.monthlySalary}€/mois
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-center">
                            <span className="text-[11px] uppercase text-slate-400 block">Calendrier</span>
                            <span className="font-bold text-amber-400 text-sm">
                Saison {save.season} • Split {save.split}/3 • Semaine {save.week}/{WEEKS_PER_SPLIT}
              </span>
                        </div>

                        <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-center">
                            <span className="text-[11px] uppercase text-slate-400 block">Banque</span>
                            <span className="font-bold text-emerald-400 text-sm">{save.money} €</span>
                        </div>

                        <button
                            onClick={() => router.push('/saves/new')}
                            className="px-3 py-2 rounded-xl text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                        >
                            Nouvelle Partie
                        </button>
                    </div>
                </header>

                {/* NOTIFICATION / FEEDBACK */}
                {bannerMessage && (
                    <div className="bg-amber-500/10 border border-amber-500/40 text-amber-200 px-4 py-3 rounded-xl text-sm font-medium">
                        {bannerMessage}
                    </div>
                )}

                {/* 2. LES 3 JAUGES CLÉS + STATISTIQUES DU JOUEUR */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Jauges d'état */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                            État de forme & Confiance du Coach
                        </h2>

                        {/* Énergie */}
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-300 font-semibold">⚡ Énergie</span>
                                <span className="font-mono font-bold text-sky-400">{save.gauges.energy}/100</span>
                            </div>
                            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-sky-500 transition-all"
                                    style={{ width: `${save.gauges.energy}%` }}
                                />
                            </div>
                        </div>

                        {/* Feeling */}
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-semibold">
                  🔥 Feeling (Bonus de réussite en match)
                </span>
                                <span className="font-mono font-bold text-amber-400">
                  {save.gauges.feeling}/100
                </span>
                            </div>
                            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-amber-400 transition-all"
                                    style={{ width: `${save.gauges.feeling}%` }}
                                />
                            </div>
                        </div>

                        {/* Confiance du Coach */}
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-semibold">
                  👔 Confiance de {currentTeam.coachName} (&lt;30 = Viré en fin de Split)
                </span>
                                <span
                                    className={`font-mono font-bold ${
                                        save.gauges.coachTrust < 35 ? 'text-red-400' : 'text-emerald-400'
                                    }`}
                                >
                  {save.gauges.coachTrust}/100
                </span>
                            </div>
                            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all ${
                                        save.gauges.coachTrust < 35 ? 'bg-red-500' : 'bg-emerald-500'
                                    }`}
                                    style={{ width: `${save.gauges.coachTrust}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Attributs du Triangle Tactique */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
                            Attributs Rocket League & Bilan
                        </h2>

                        <div className="grid grid-cols-3 gap-3 text-center">
                            <div className="bg-purple-950/40 border border-purple-700/50 p-3 rounded-xl">
                                <span className="text-xs text-purple-300 block">Mécanique</span>
                                <span className="text-2xl font-black text-white">
                  {save.player.stats.mechanics}
                </span>
                            </div>
                            <div className="bg-blue-950/40 border border-blue-700/50 p-3 rounded-xl">
                                <span className="text-xs text-blue-300 block">Équipe</span>
                                <span className="text-2xl font-black text-white">
                  {save.player.stats.teamplay}
                </span>
                            </div>
                            <div className="bg-emerald-950/40 border border-emerald-700/50 p-3 rounded-xl">
                                <span className="text-xs text-emerald-300 block">Défense</span>
                                <span className="text-2xl font-black text-white">
                  {save.player.stats.defense}
                </span>
                            </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between text-xs text-slate-400">
              <span>
                Matchs :{' '}
                  <strong className="text-white">
                  {save.careerHistory.matchesWon}V /{' '}
                      {save.careerHistory.matchesPlayed - save.careerHistory.matchesWon}D
                </strong>
              </span>
                            <span>
                Buts : <strong className="text-white">{save.careerHistory.goals}</strong>
              </span>
                            <span>
                Passes : <strong className="text-white">{save.careerHistory.assists}</strong>
              </span>
                            <span>
                Saves : <strong className="text-white">{save.careerHistory.saves}</strong>
              </span>
                        </div>
                    </div>
                </section>

                {/* 3. FENÊTRE DE MERCATO / RENVOI (SEMAINE 5) OU PROGRAMME DE LA SEMAINE */}
                {isMercatoWeek ? (
                    <section
                        className={`rounded-2xl p-6 border-2 space-y-5 ${
                            wasKickedByCoach
                                ? 'bg-red-950/30 border-red-500'
                                : 'bg-slate-900 border-amber-400'
                        }`}
                    >
                        <div>
              <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-amber-400 text-slate-950">
                Fin du Split {save.split} • Mercato Officiel RLCS
              </span>
                            <h2 className="text-xl font-black text-white mt-3">{mercatoHeadline}</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Option 1 : Rester dans son équipe (UNIQUMENT SI LE COACH NE T'A PAS VIRÉ) */}
                            {!wasKickedByCoach && (
                                <div className="bg-slate-950 border-2 border-emerald-500/70 rounded-xl p-4 flex flex-col justify-between">
                                    <div>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-600 text-white">
                      Prolongation
                    </span>
                                        <h3 className="text-lg font-bold text-white mt-2">{currentTeam.name}</h3>
                                        <p className="text-xs text-slate-400">
                                            Tier {currentTeam.tier} • OVR {currentTeam.ovr} • Salaire :{' '}
                                            {save.monthlySalary}€/mois
                                        </p>
                                        <p className="text-xs text-slate-300 mt-3">
                                            Conserve la synergie actuelle et les points RLCS acquis avec tes coéquipiers.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleMercatoChoice(currentTeam.id)}
                                        className="mt-4 w-full py-2.5 rounded-lg font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 cursor-pointer"
                                    >
                                        Rester chez {currentTeam.tag} →
                                    </button>
                                </div>
                            )}

                            {/* Offres des autres clubs */}
                            {save.pendingOffers?.map((offer) => (
                                <div
                                    key={offer.teamId}
                                    className="bg-slate-950 border border-slate-700 hover:border-amber-400 rounded-xl p-4 flex flex-col justify-between transition"
                                >
                                    <div>
                    <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                            offer.reason === 'promotion'
                                ? 'bg-amber-400 text-slate-950'
                                : offer.reason === 'rebound_after_kick'
                                    ? 'bg-red-500 text-white'
                                    : 'bg-blue-600 text-white'
                        }`}
                    >
                      {offer.reason === 'promotion'
                          ? '🔥 Promotion'
                          : offer.reason === 'rebound_after_kick'
                              ? 'Contrat de Rebond'
                              : 'Transfert'}
                    </span>
                                        <h3 className="text-lg font-bold text-white mt-2">{offer.teamName}</h3>
                                        <p className="text-xs text-slate-400">
                                            Tier {offer.teamTier} • OVR {offer.teamOvr} • Statut : Titulaire
                                        </p>
                                        <p className="text-xs text-emerald-400 font-semibold mt-2">
                                            Salaire proposé : {offer.monthlySalary}€ / mois
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleMercatoChoice(offer.teamId)}
                                        className="mt-4 w-full py-2.5 rounded-lg font-bold text-xs bg-amber-400 hover:bg-amber-300 text-slate-950 cursor-pointer"
                                    >
                                        Signer chez {offer.teamName} →
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : (
                    /* PROGRAMME NORMAL DE LA SEMAINE (ENTRAÎNEMENT + MATCH) */
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* 4 Actions d'entraînement de la semaine */}
                        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-base font-bold text-white">
                                    1. Choisis ton activité de la semaine
                                </h2>
                                <span className="text-xs text-slate-400">
                  {trainedThisWeek ? '✓ Activité terminée' : '1 activité dispo avant le match'}
                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <button
                                    disabled={trainedThisWeek}
                                    onClick={() => handleActivity('ranked')}
                                    className="text-left p-4 rounded-xl border border-slate-800 bg-slate-950/70 hover:border-purple-500 disabled:opacity-40 transition cursor-pointer"
                                >
                                    <div className="font-bold text-white text-sm">🎮 Grind Ranked (Solo/Duo)</div>
                                    <div className="text-xs text-slate-400 mt-1">
                                        Travailler tes mécaniques en classé SSL.
                                    </div>
                                    <div className="text-[11px] text-purple-400 font-semibold mt-2">
                                        +2 Méca • +1 Défense • +5 Feeling • -15 Énergie
                                    </div>
                                </button>

                                <button
                                    disabled={trainedThisWeek}
                                    onClick={() => handleActivity('scrims')}
                                    className="text-left p-4 rounded-xl border border-slate-800 bg-slate-950/70 hover:border-blue-500 disabled:opacity-40 transition cursor-pointer"
                                >
                                    <div className="font-bold text-white text-sm">🤝 Scrims & Analyse Coach</div>
                                    <div className="text-xs text-slate-400 mt-1">
                                        Travailler les rotations 3v3 avec {currentTeam.coachName}.
                                    </div>
                                    <div className="text-[11px] text-blue-400 font-semibold mt-2">
                                        +2 Équipe • +1 Défense • +6 Confiance Coach • -15 Énergie
                                    </div>
                                </button>

                                <button
                                    disabled={trainedThisWeek}
                                    onClick={() => handleActivity('stream')}
                                    className="text-left p-4 rounded-xl border border-slate-800 bg-slate-950/70 hover:border-amber-500 disabled:opacity-40 transition cursor-pointer"
                                >
                                    <div className="font-bold text-white text-sm">🎥 Streamer sur Twitch</div>
                                    <div className="text-xs text-slate-400 mt-1">
                                        Gagner en confiance et encaisser des dons/subs.
                                    </div>
                                    <div className="text-[11px] text-amber-400 font-semibold mt-2">
                                        +350 € • +6 Feeling • -10 Énergie
                                    </div>
                                </button>

                                <button
                                    disabled={trainedThisWeek}
                                    onClick={() => handleActivity('rest')}
                                    className="text-left p-4 rounded-xl border border-slate-800 bg-slate-950/70 hover:border-emerald-500 disabled:opacity-40 transition cursor-pointer"
                                >
                                    <div className="font-bold text-white text-sm">😴 Repos & Vie Perso</div>
                                    <div className="text-xs text-slate-400 mt-1">
                                        Recharger les batteries avant l&apos;Open Régional.
                                    </div>
                                    <div className="text-[11px] text-emerald-400 font-semibold mt-2">
                                        +35 Énergie • +8 Feeling
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Carte de lancement du Match RLCS */}
                        <div className="bg-gradient-to-b from-amber-500/20 to-slate-900 border border-amber-500/50 rounded-2xl p-6 flex flex-col justify-between">
                            <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  2. Compétition du Week-End
                </span>
                                <h3 className="text-xl font-black text-white mt-1">
                                    Open Régional {currentTeam.region} • Semaine {save.week}
                                </h3>
                                <p className="text-xs text-slate-300 mt-2">
                                    Joue ton match officiel avec <strong>3 choix décisifs maximum</strong>. Gagne des points RLCS et fais monter la confiance de ton coach !
                                </p>
                            </div>

                            <button
                                onClick={() => router.push('/match')}
                                className="mt-6 w-full py-4 rounded-xl font-black text-slate-950 bg-amber-400 hover:bg-amber-300 transition shadow-lg cursor-pointer"
                            >
                                ⚽ Jouer le Match RLCS →
                            </button>
                        </div>
                    </section>
                )}

                {/* 4. ROSTER ACTUEL & CLASSEMENT RLCS DE LA RÉGION */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Roster 3v3 */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
                            Roster {currentTeam.name} (OVR {currentTeam.ovr})
                        </h2>
                        <div className="space-y-2.5">
                            {currentTeam.roster.slice(0, 3).map((mate) => (
                                <div
                                    key={mate.id}
                                    className={`p-3 rounded-xl border flex items-center justify-between ${
                                        mate.isUser
                                            ? 'bg-amber-500/10 border-amber-500/40'
                                            : 'bg-slate-950/60 border-slate-800'
                                    }`}
                                >
                                    <div>
                    <span className="font-bold text-white text-sm">
                      {mate.gamertag} {mate.isUser && ' (Toi)'}
                    </span>
                                        <span className="block text-xs text-slate-400 uppercase">
                      Titulaire • Rôle : {mate.role}
                    </span>
                                    </div>
                                    <div className="text-right">
                    <span className="font-mono font-bold text-amber-400 text-sm">
                      OVR {mate.ovr}
                    </span>
                                        <span className="block text-[11px] text-slate-400">
                      M:{mate.stats.mechanics} E:{mate.stats.teamplay} D:{mate.stats.defense}
                    </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Classement RLCS Régional */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                                Classement RLCS ({currentTeam.region})
                            </h2>
                            <span className="text-xs text-slate-400">Top 5 = Qualif Majeur/Worlds</span>
                        </div>

                        <div className="space-y-2">
                            {regionalStandings.map((team, idx) => {
                                const isMyTeam = team.id === currentTeam.id;
                                return (
                                    <div
                                        key={team.id}
                                        className={`px-3 py-2.5 rounded-xl flex items-center justify-between text-xs border ${
                                            isMyTeam
                                                ? 'bg-amber-500/10 border-amber-500/50 text-white font-bold'
                                                : 'bg-slate-950/50 border-slate-800/80 text-slate-300'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="font-mono w-5 text-slate-400">#{idx + 1}</span>
                                            <span
                                                className="px-2 py-0.5 rounded font-black text-[10px] text-slate-950"
                                                style={{ backgroundColor: team.logoColor }}
                                            >
                        {team.tag}
                      </span>
                                            <span>{team.name}</span>
                                            <span className="text-[10px] text-slate-500">Tier {team.tier}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-slate-400">OVR {team.ovr}</span>
                                            <span className="font-mono font-bold text-amber-400">
                        {team.rlcsPoints} pts
                      </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}