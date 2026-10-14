// app/(game)/match/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    CareerSave,
    MatchDecisionEvent,
    MatchDecisionOption,
    PlayerRole,
    Team,
} from '@/types/game';
import { INITIAL_TEAMS, INITIAL_PLAYER_STATS } from '@/lib/data/gameData';
import {
    applyMatchResultToSave,
    DECISION_TRIGGER_SECONDS,
    formatMatchClock,
    MatchLog,
    pickMatchDecisions,
    resolvePlayerDecision,
    simulatePassiveTick,
} from '@/lib/engine/arcadeMatchEngine';

const ROLE_LABELS: Record<PlayerRole, { label: string; color: string; badge: string }> = {
    mechanics: {
        label: 'Mécanique',
        color: 'border-purple-500 bg-purple-950/50 hover:bg-purple-900/70 text-purple-200',
        badge: 'bg-purple-600 text-white',
    },
    teamplay: {
        label: 'Équipe / Collectif',
        color: 'border-blue-500 bg-blue-950/50 hover:bg-blue-900/70 text-blue-200',
        badge: 'bg-blue-600 text-white',
    },
    defense: {
        label: 'Défense / Cerveau',
        color: 'border-emerald-500 bg-emerald-950/50 hover:bg-emerald-900/70 text-emerald-200',
        badge: 'bg-emerald-600 text-white',
    },
};

export default function MatchPage() {
    const router = useRouter();

    // Chargement de la sauvegarde (avec fallback de démo si on teste la page directement)
    const [save, setSave] = useState<CareerSave | null>(null);
    const [userTeam, setUserTeam] = useState<Team | null>(null);
    const [oppTeam, setOppTeam] = useState<Team | null>(null);

    // État du match
    const [clock, setClock] = useState<number>(300); // 5:00 = 300s
    const [isOvertime, setIsOvertime] = useState<boolean>(false);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [isFinished, setIsFinished] = useState<boolean>(false);

    const [userScore, setUserScore] = useState<number>(0);
    const [oppScore, setOppScore] = useState<number>(0);

    // Stats perso sur le match
    const [playerStatsMatch, setPlayerStatsMatch] = useState({ goals: 0, assists: 0, saves: 0 });
    const [feelingDelta, setFeelingDelta] = useState<number>(0);
    const [coachTrustDelta, setCoachTrustDelta] = useState<number>(0);

    // Système des 3 décisions max
    const [decisionsQueue, setDecisionsQueue] = useState<MatchDecisionEvent[]>([]);
    const [decisionsTaken, setDecisionsTaken] = useState<number>(0);
    const [activeDecision, setActiveDecision] = useState<MatchDecisionEvent | null>(null);
    const [logs, setLogs] = useState<MatchLog[]>([]);

    useEffect(() => {
        const raw = localStorage.getItem('rl_active_save');
        let loadedSave: CareerSave;

        if (raw) {
            loadedSave = JSON.parse(raw);
        } else {
            // Sauvegarde de secours pour tester directement /match
            loadedSave = {
                id: 'demo-save',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                difficulty: 'diamond',
                player: {
                    id: 'user-1',
                    gamertag: 'RookieRL',
                    age: 16,
                    nationality: 'FR',
                    region: 'EU',
                    role: 'mechanics',
                    stats: INITIAL_PLAYER_STATS.mechanics,
                    ovr: 63,
                    isUser: true,
                },
                gauges: { energy: 85, feeling: 60, coachTrust: 50 },
                contractStatus: 'starter',
                currentTeamId: 'eu-t3-1',
                money: 500,
                monthlySalary: 800,
                equipmentLevel: 1,
                season: 1,
                split: 1,
                week: 1,
                teams: INITIAL_TEAMS,
                careerHistory: { matchesPlayed: 0, matchesWon: 0, goals: 0, assists: 0, saves: 0, trophies: [] },
            };
        }

        setSave(loadedSave);

        const myTeam =
            loadedSave.teams.find((t) => t.id === loadedSave.currentTeamId) || INITIAL_TEAMS[0];
        // Choisir un adversaire cohérent (même région et Tier proche)
        const possibleOpponents = loadedSave.teams.filter(
            (t) => t.id !== myTeam.id && t.region === myTeam.region && Math.abs(t.tier - myTeam.tier) <= 1
        );
        const enemy =
            possibleOpponents[Math.floor(Math.random() * possibleOpponents.length)] ||
            INITIAL_TEAMS[1];

        setUserTeam(myTeam);
        setOppTeam(enemy);
        setDecisionsQueue(pickMatchDecisions(enemy));
        setLogs([
            {
                id: 'kickoff',
                time: '5:00',
                text: `🚀 Coup d'envoi entre ${myTeam.name} et ${enemy.name} !`,
                type: 'info',
            },
        ]);
    }, []);

    // Boucle de défilement du chrono (1 tick = 15 secondes de jeu toutes les 700ms)
    useEffect(() => {
        if (!isRunning || activeDecision || isFinished || !userTeam || !oppTeam) return;

        const timer = setTimeout(() => {
            const nextClock = isOvertime ? clock + 15 : clock - 15;

            // 1. Vérifier si on déclenche l'un des 3 choix décisifs
            if (
                !isOvertime &&
                decisionsTaken < 3 &&
                DECISION_TRIGGER_SECONDS.includes(nextClock) &&
                decisionsQueue[decisionsTaken]
            ) {
                setClock(nextClock);
                setIsRunning(false);
                setActiveDecision({
                    ...decisionsQueue[decisionsTaken],
                    minute: formatMatchClock(nextClock, false),
                });
                return;
            }

            // 2. Fin du temps réglementaire (0:00)
            if (!isOvertime && nextClock <= 0) {
                setClock(0);
                if (userScore === oppScore) {
                    // OVERTIME ! S'il reste un choix sur les 3, on déclenche le choix décisif en OT !
                    setIsOvertime(true);
                    setLogs((prev) => [
                        {
                            id: 'ot-start',
                            time: '0:00',
                            text: '⚡ OVERTIME ! Prolongation au but en or !',
                            type: 'info',
                        },
                        ...prev,
                    ]);

                    if (decisionsTaken < 3 && decisionsQueue[decisionsTaken]) {
                        setIsRunning(false);
                        setActiveDecision({
                            ...decisionsQueue[decisionsTaken],
                            minute: '+0:15 (OT)',
                            situationText:
                                "🔥 BALLE DE MATCH EN OVERTIME ! Toute l'arène retient son souffle, le ballon arrive sur toi !",
                        });
                    }
                } else {
                    setIsRunning(false);
                    setIsFinished(true);
                }
                return;
            }

            // 3. Simulation en Overtime (But en or)
            if (isOvertime) {
                const tick = simulatePassiveTick(userTeam, oppTeam, nextClock);
                setClock(nextClock);
                if (tick.userScored || tick.oppScored || nextClock >= 60) {
                    if (tick.userScored) setUserScore((s) => s + 1);
                    else if (tick.oppScored) setOppScore((s) => s + 1);
                    else {
                        // Départage forcé après 1 min d'OT
                        if (Math.random() < 0.5) setUserScore((s) => s + 1);
                        else setOppScore((s) => s + 1);
                    }
                    if (tick.log) setLogs((prev) => [tick.log!, ...prev]);
                    setIsRunning(false);
                    setIsFinished(true);
                }
                return;
            }

            // 4. Tick normal en temps réglementaire
            const tick = simulatePassiveTick(userTeam, oppTeam, nextClock);
            setClock(nextClock);
            if (tick.userScored) setUserScore((s) => s + 1);
            if (tick.oppScored) setOppScore((s) => s + 1);
            if (tick.log) setLogs((prev) => [tick.log!, ...prev]);
        }, 650);

        return () => clearTimeout(timer);
    }, [
        isRunning,
        clock,
        activeDecision,
        isFinished,
        isOvertime,
        decisionsTaken,
        decisionsQueue,
        userTeam,
        oppTeam,
        userScore,
        oppScore,
    ]);

    // Gestion du clic sur l'un des 3 choix
    const handleSelectOption = (option: MatchDecisionOption) => {
        if (!save || !userTeam || !oppTeam || !activeDecision) return;

        const currentFeeling = Math.min(100, Math.max(0, save.gauges.feeling + feelingDelta));
        const result = resolvePlayerDecision(
            save.player,
            currentFeeling,
            userTeam,
            oppTeam,
            activeDecision,
            option
        );

        // Mise à jour du score et des stats perso
        if (result.goalScoredByUserTeam) {
            setUserScore((s) => s + 1);
            if (option.roleType === 'mechanics') {
                setPlayerStatsMatch((st) => ({ ...st, goals: st.goals + 1 }));
            } else {
                setPlayerStatsMatch((st) => ({ ...st, assists: st.assists + 1 }));
            }
        } else if (result.success && option.roleType === 'defense') {
            setPlayerStatsMatch((st) => ({ ...st, saves: st.saves + 1 }));
        }

        if (result.goalScoredByOppTeam) {
            setOppScore((s) => s + 1);
        }

        setFeelingDelta((d) => d + result.feelingDelta);
        setCoachTrustDelta((d) => d + result.coachTrustDelta);

        const newLog: MatchLog = {
            id: `dec-${Date.now()}`,
            time: activeDecision.minute,
            text: `${result.narrativeText} (Réussite: ${result.successChance}% | Feeling ${
                result.feelingDelta >= 0 ? `+\${result.feelingDelta}` : result.feelingDelta
            }, Coach ${
                result.coachTrustDelta >= 0 ? `+\${result.coachTrustDelta}` : result.coachTrustDelta
            })`,
            type: result.success ? 'decision_win' : 'decision_fail',
        };

        setLogs((prev) => [newLog, ...prev]);
        setDecisionsTaken((n) => n + 1);
        setActiveDecision(null);

        // Si on était en Overtime et qu'un but a été marqué sur le choix, le match est fini !
        if (isOvertime && (result.goalScoredByUserTeam || result.goalScoredByOppTeam)) {
            setIsFinished(true);
            setIsRunning(false);
        } else {
            setIsRunning(true);
        }
    };

    // Sauvegarder et retourner au hub Carrière
    const handleFinishMatch = () => {
        if (!save || !oppTeam) return;
        const updatedSave = applyMatchResultToSave(
            save,
            oppTeam.id,
            userScore,
            oppScore,
            playerStatsMatch.goals,
            playerStatsMatch.assists,
            playerStatsMatch.saves,
            feelingDelta,
            coachTrustDelta
        );
        localStorage.setItem('rl_active_save', JSON.stringify(updatedSave));
        router.push('/career');
    };

    if (!save || !userTeam || !oppTeam) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                Chargement de l&apos;arène RLCS...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 max-w-4xl mx-auto flex flex-col gap-6">
            {/* 1. TABLEAU D'AFFICHAGE (SCOREBOARD) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <div className="text-center text-xs uppercase tracking-widest text-slate-400 mb-3">
                    RLCS Split {save.split} • Semaine {save.week} • Mode Joueur ({decisionsTaken}/3 Choix)
                </div>

                <div className="grid grid-cols-3 items-center text-center">
                    {/* Équipe du joueur */}
                    <div>
                        <div className="text-2xl font-black text-orange-400">{userTeam.tag}</div>
                        <div className="text-sm text-slate-300 font-medium">{userTeam.name}</div>
                        <div className="text-xs text-slate-500">Tier {userTeam.tier} • OVR {userTeam.ovr}</div>
                    </div>

                    {/* Score & Chrono */}
                    <div className="flex flex-col items-center">
                        <div className="text-4xl md:text-5xl font-black tracking-tight flex items-center gap-4">
                            <span className="text-orange-400">{userScore}</span>
                            <span className="text-slate-600 text-2xl">-</span>
                            <span className="text-blue-400">{oppScore}</span>
                        </div>
                        <div
                            className={`mt-2 px-4 py-1 rounded-full text-lg font-mono font-bold ${
                                isOvertime
                                    ? 'bg-red-600/20 text-red-400 border border-red-500/40 animate-pulse'
                                    : 'bg-slate-800 text-slate-200'
                            }`}
                        >
                            {formatMatchClock(clock, isOvertime)}
                        </div>
                    </div>

                    {/* Équipe adverse */}
                    <div>
                        <div className="text-2xl font-black text-blue-400">{oppTeam.tag}</div>
                        <div className="text-sm text-slate-300 font-medium">{oppTeam.name}</div>
                        <div className="text-xs text-slate-500">Tier {oppTeam.tier} • OVR {oppTeam.ovr}</div>
                    </div>
                </div>

                {/* Barre des jauges & stats du joueur en direct */}
                <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs">
                    <div className="bg-slate-950/60 p-2.5 rounded-lg">
                        <span className="text-slate-400 block">Joueur</span>
                        <span className="font-bold text-white">{save.player.gamertag} (OVR {save.player.ovr})</span>
                    </div>
                    <div className="bg-slate-950/60 p-2.5 rounded-lg">
                        <span className="text-slate-400 block">Feeling Match</span>
                        <span className="font-bold text-amber-400">
              {Math.min(100, Math.max(0, save.gauges.feeling + feelingDelta))}/100 (
                            {feelingDelta >= 0 ? `+${feelingDelta}` : feelingDelta})
            </span>
                    </div>
                    <div className="bg-slate-950/60 p-2.5 rounded-lg">
                        <span className="text-slate-400 block">Confiance Coach</span>
                        <span className="font-bold text-emerald-400">
              {Math.min(100, Math.max(0, save.gauges.coachTrust + coachTrustDelta))}/100 (
                            {coachTrustDelta >= 0 ? `+${coachTrustDelta}` : coachTrustDelta})
            </span>
                    </div>
                    <div className="bg-slate-950/60 p-2.5 rounded-lg">
                        <span className="text-slate-400 block">Tes Stats</span>
                        <span className="font-bold text-slate-200">
              {playerStatsMatch.goals}B • {playerStatsMatch.assists}P • {playerStatsMatch.saves}S
            </span>
                    </div>
                </div>
            </div>

            {/* 2. ZONE CENTRALE : CARTE DE CHOIX DÉCISIF (MAX 3 PAR MATCH) */}
            {activeDecision && (
                <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-500/80 rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider">
              ⚡ Moment Décisif ({decisionsTaken + 1}/3) — {activeDecision.minute}
            </span>
                        <span className="text-xs text-slate-300">
              Style du vis-à-vis :{' '}
                            <strong className="text-white uppercase">
                {ROLE_LABELS[activeDecision.opponentRole].label}
              </strong>
            </span>
                    </div>

                    <p className="text-lg font-semibold text-white mb-2">{activeDecision.situationText}</p>
                    <p className="text-xs text-slate-400 mb-5">
                        💡 Rappel Tactique : <span className="text-blue-400">Équipe</span> bat{' '}
                        <span className="text-emerald-400">Défense</span> •{' '}
                        <span className="text-emerald-400">Défense</span> bat{' '}
                        <span className="text-purple-400">Mécanique</span> •{' '}
                        <span className="text-purple-400">Mécanique</span> bat{' '}
                        <span className="text-blue-400">Équipe</span>
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {activeDecision.options.map((opt) => {
                            const style = ROLE_LABELS[opt.roleType];
                            const playerStat = save.player.stats[opt.roleType];

                            return (
                                <button
                                    key={opt.id}
                                    onClick={() => handleSelectOption(opt)}
                                    className={`flex flex-col justify-between text-left p-4 rounded-xl border-2 transition-all cursor-pointer ${style.color}`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${style.badge}`}>
                        {style.label}
                      </span>
                                            <span className="text-xs font-mono font-bold text-white">
                        Stat: {playerStat}
                      </span>
                                        </div>
                                        <div className="font-bold text-white text-base mb-1">{opt.label}</div>
                                        <div className="text-xs text-slate-300">{opt.description}</div>
                                    </div>

                                    <div className="mt-4 pt-2 border-t border-white/10 text-[11px] font-semibold text-right text-white/90">
                                        Choisir cette action →
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* 3. BOUTONS DE CONTRÔLE DU MATCH */}
            {!activeDecision && !isFinished && (
                <div className="flex justify-center">
                    <button
                        onClick={() => setIsRunning((r) => !r)}
                        className="px-8 py-3 rounded-xl font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition shadow-lg cursor-pointer"
                    >
                        {isRunning
                            ? '⏸ Mettre en pause'
                            : clock === 300
                                ? '▶️ Lancer le Match'
                                : '▶️ Reprendre la simulation'}
                    </button>
                </div>
            )}

            {/* 4. ÉCRAN DE FIN DE MATCH */}
            {isFinished && (
                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 text-center space-y-4">
                    <h2 className="text-2xl font-black">
                        {userScore > oppScore ? '🏆 VICTOIRE !' : '💔 DÉFAITE...'}
                    </h2>
                    <p className="text-sm text-slate-300">
                        {userScore > oppScore
                            ? `Bravo ! Le coach est ravi de ta prestation (+${
                                coachTrustDelta + 4
                            } Confiance Coach).`
                            : `Match compliqué. Attention à ta jauge de confiance du coach (${
                                coachTrustDelta - 4
                            } Confiance Coach).`}
                    </p>
                    <button
                        onClick={handleFinishMatch}
                        className="px-8 py-3 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition cursor-pointer"
                    >
                        Continuer vers le Hub Carrière →
                    </button>
                </div>
            )}

            {/* 5. JOURNAL DES ACTIONS DU MATCH */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Fil du match
                </h3>
                <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                    {logs.map((log) => (
                        <div
                            key={log.id}
                            className={`p-3 rounded-xl text-sm flex items-start gap-3 border ${
                                log.type === 'decision_win' || log.type === 'goal_user'
                                    ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200'
                                    : log.type === 'decision_fail' || log.type === 'goal_opp'
                                        ? 'bg-red-950/30 border-red-800/60 text-red-200'
                                        : 'bg-slate-950/50 border-slate-800 text-slate-300'
                            }`}
                        >
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-200 shrink-0">
                {log.time}
              </span>
                            <span>{log.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}