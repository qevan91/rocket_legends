// app/(game)/saves/new/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
    CareerSave,
    Player,
    PlayerRole,
    Region,
    Team,
} from '@/types/game';
import {
    calculatePlayerOvr,
    INITIAL_PLAYER_STATS,
    INITIAL_TEAMS,
} from '@/lib/data/gameData';

const ROLES_CONFIG: {
    id: PlayerRole;
    title: string;
    subtitle: string;
    beats: string;
    losesTo: string;
    color: string;
    badge: string;
}[] = [
    {
        id: 'mechanics',
        title: 'Prodige Mécanique',
        subtitle: 'Flip resets, air dribbles et solo plays imprévisibles.',
        beats: 'Bat Équipe / Collectif',
        losesTo: 'Battu par Défense',
        color: 'border-purple-500 bg-purple-950/40 text-purple-100',
        badge: 'bg-purple-600 text-white',
    },
    {
        id: 'teamplay',
        title: 'Cerveau Collectif',
        subtitle: 'Infield passes, rotations rapides et gestion de boost.',
        beats: 'Bat Défense',
        losesTo: 'Battu par Mécanique',
        color: 'border-blue-500 bg-blue-950/40 text-blue-100',
        badge: 'bg-blue-600 text-white',
    },
    {
        id: 'defense',
        title: 'Mur Défensif',
        subtitle: 'Shadow defense, fake challenges et sauvetages miracles.',
        beats: 'Bat Mécanique',
        losesTo: 'Battu par Équipe',
        color: 'border-emerald-500 bg-emerald-950/40 text-emerald-100',
        badge: 'bg-emerald-600 text-white',
    },
];

const NATIONALITIES: { code: string; label: string; defaultRegion: Region }[] = [
    { code: 'FR', label: '🇫🇷 France', defaultRegion: 'EU' },
    { code: 'BE', label: '🇧🇪 Belgique', defaultRegion: 'EU' },
    { code: 'UK', label: '🇬🇧 Royaume-Uni', defaultRegion: 'EU' },
    { code: 'DE', label: '🇩🇪 Allemagne', defaultRegion: 'EU' },
    { code: 'ES', label: '🇪🇸 Espagne', defaultRegion: 'EU' },
    { code: 'NL', label: '🇳🇱 Pays-Bas', defaultRegion: 'EU' },
    { code: 'US', label: '🇺🇸 États-Unis', defaultRegion: 'NA' },
    { code: 'CA', label: '🇨🇦 Canada', defaultRegion: 'NA' },
];

export default function NewSavePage() {
    const router = useRouter();

    // 1. Identité du joueur
    const [gamertag, setGamertag] = useState<string>('');
    const [age, setAge] = useState<number>(16);
    const [nationality, setNationality] = useState<string>('FR');
    const [region, setRegion] = useState<Region>('EU');
    const [difficulty, setDifficulty] = useState<'bronze' | 'diamond' | 'ssl'>('diamond');

    // 2. Spécialité (Rôle)
    const [selectedRole, setSelectedRole] = useState<PlayerRole>('mechanics');

    // 3. Filtrer uniquement les Bubble Teams (Tier 3) de la région sélectionnée
    const bubbleTeams = useMemo(() => {
        return INITIAL_TEAMS.filter((t) => t.tier === 3 && t.region === region);
    }, [region]);

    const [selectedTeamId, setSelectedTeamId] = useState<string>('eu-t3-1');

    // Synchroniser l'équipe sélectionnée quand on change de région
    const handleRegionChange = (newRegion: Region) => {
        setRegion(newRegion);
        const firstTier3 = INITIAL_TEAMS.find((t) => t.tier === 3 && t.region === newRegion);
        if (firstTier3) {
            setSelectedTeamId(firstTier3.id);
        }
    };

    // Création de la carrière et redirection vers /career
    const handleCreateCareer = (e: React.FormEvent) => {
        e.preventDefault();
        const cleanTag = gamertag.trim() || 'RookieRL';

        const startingStats = { ...INITIAL_PLAYER_STATS[selectedRole] };
        // Léger bonus/malus de départ selon la difficulté choisie
        if (difficulty === 'bronze') {
            startingStats.mechanics += 3;
            startingStats.teamplay += 3;
            startingStats.defense += 3;
        } else if (difficulty === 'ssl') {
            startingStats.mechanics -= 2;
            startingStats.teamplay -= 2;
            startingStats.defense -= 2;
        }

        const playerOvr = calculatePlayerOvr(startingStats, selectedRole);

        const newPlayer: Player = {
            id: `user-${Date.now()}`,
            gamertag: cleanTag,
            age,
            nationality,
            region,
            role: selectedRole,
            stats: startingStats,
            ovr: playerOvr,
            isUser: true,
            chemistry: {},
        };

        // Intégrer le joueur dans le roster de la Bubble Team choisie (les 2 premiers restent titulaires, le 3e passe Sub)
        const updatedTeams: Team[] = INITIAL_TEAMS.map((team) => {
            if (team.id !== selectedTeamId) return team;

            const keptTeammates = team.roster.slice(0, 2);
            const benchedPlayer = team.roster[2]; // Devient le 4e joueur (Sub sous contrat)

            // Initialiser une chimie de base (50) avec ses nouveaux coéquipiers
            keptTeammates.forEach((mate) => {
                if (newPlayer.chemistry) {
                    newPlayer.chemistry[mate.id] = 50;
                }
            });

            const newRoster = [
                newPlayer,
                ...keptTeammates,
                ...(benchedPlayer ? [benchedPlayer] : []),
            ];

            const newTeamOvr = Math.round(
                (newPlayer.ovr + keptTeammates[0].ovr + keptTeammates[1].ovr) / 3
            );

            return {
                ...team,
                ovr: newTeamOvr,
                roster: newRoster,
            };
        });

        const newSave: CareerSave = {
            id: `save-${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            difficulty,
            player: newPlayer,
            gauges: {
                energy: 100,
                feeling: 60,
                coachTrust: 50, // Départ neutre : < 30 = viré en fin de Split
            },
            contractStatus: 'starter',
            currentTeamId: selectedTeamId,
            money: 500,
            monthlySalary: 600, // Salaire modeste de Bubble Team
            equipmentLevel: 1,
            season: 1,
            split: 1,
            week: 1,
            teams: updatedTeams,
            careerHistory: {
                matchesPlayed: 0,
                matchesWon: 0,
                goals: 0,
                assists: 0,
                saves: 0,
                trophies: [],
            },
        };

        // Sauvegarde dans le localStorage (actif + liste des sauvegardes)
        localStorage.setItem('rl_active_save', JSON.stringify(newSave));

        const existingSavesRaw = localStorage.getItem('rl_saves_list');
        const existingSaves: CareerSave[] = existingSavesRaw ? JSON.parse(existingSavesRaw) : [];
        localStorage.setItem('rl_saves_list', JSON.stringify([newSave, ...existingSaves]));

        router.push('/career');
    };

    const previewStats = INITIAL_PLAYER_STATS[selectedRole];
    const previewOvr = calculatePlayerOvr(previewStats, selectedRole);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 md:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* EN-TÊTE */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-5">
                    <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Mode Carrière Joueur • V1
            </span>
                        <h1 className="text-3xl font-black text-white mt-1">
                            Crée ta Légende Rocket League
                        </h1>
                        <p className="text-sm text-slate-400 mt-1">
                            Commence dans une Bubble Team (Tier 3), fais tes preuves en RLCS et grimpe jusqu&apos;aux Worlds.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => router.push('/')}
                        className="text-xs text-slate-400 hover:text-white px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer"
                    >
                        ← Retour
                    </button>
                </div>

                <form onSubmit={handleCreateCareer} className="space-y-8">
                    {/* ÉTAPE 1 : IDENTITÉ & DIFFICULTÉ */}
                    <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-center">
                1
              </span>
                            Identité du Rookie & Paramètres
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">
                                    Pseudo In-Game (Gamertag)
                                </label>
                                <input
                                    type="text"
                                    required
                                    maxLength={18}
                                    placeholder="Ex: Zen, Vatira, KylianRL..."
                                    value={gamertag}
                                    onChange={(e) => setGamertag(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-amber-400 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">
                                    Âge de départ (1 saison = 1 an)
                                </label>
                                <select
                                    value={age}
                                    onChange={(e) => setAge(Number(e.target.value))}
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-amber-400 focus:outline-none"
                                >
                                    <option value={15}>15 ans (Jeune prodige RLCS)</option>
                                    <option value={16}>16 ans (Rookie standard)</option>
                                    <option value={17}>17 ans (Joueur classé SSL)</option>
                                    <option value={18}>18 ans (Arrivée tardive)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">
                                    Nationalité
                                </label>
                                <select
                                    value={nationality}
                                    onChange={(e) => {
                                        const code = e.target.value;
                                        setNationality(code);
                                        const found = NATIONALITIES.find((n) => n.code === code);
                                        if (found) handleRegionChange(found.defaultRegion);
                                    }}
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-amber-400 focus:outline-none"
                                >
                                    {NATIONALITIES.map((nat) => (
                                        <option key={nat.code} value={nat.code}>
                                            {nat.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">
                                    Région RLCS & Difficulté
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <select
                                        value={region}
                                        onChange={(e) => handleRegionChange(e.target.value as Region)}
                                        className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                                    >
                                        <option value="EU">🇪🇺 Europe (EU)</option>
                                        <option value="NA">🇺🇸 Amérique du Nord (NA)</option>
                                    </select>

                                    <select
                                        value={difficulty}
                                        onChange={(e) =>
                                            setDifficulty(e.target.value as 'bronze' | 'diamond' | 'ssl')
                                        }
                                        className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                                    >
                                        <option value="bronze">Bronze (Facile)</option>
                                        <option value="diamond">Diamant (Normal)</option>
                                        <option value="ssl">SSL (Difficile)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ÉTAPE 2 : RÔLE & TRIANGLE TACTIQUE */}
                    <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-center">
                  2
                </span>
                                Style de Jeu (Triangle Tactique)
                            </h2>
                            <span className="text-xs text-slate-400">
                Note globale de départ :{' '}
                                <strong className="text-amber-400">OVR {previewOvr}</strong>
              </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {ROLES_CONFIG.map((role) => {
                                const isSelected = selectedRole === role.id;
                                const roleStats = INITIAL_PLAYER_STATS[role.id];

                                return (
                                    <button
                                        key={role.id}
                                        type="button"
                                        onClick={() => setSelectedRole(role.id)}
                                        className={`text-left p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                                            isSelected
                                                ? `\${role.color} ring-2 ring-amber-400`
                                                : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                                        }`}
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${role.badge}`}>
                          {role.id}
                        </span>
                                                {isSelected && (
                                                    <span className="text-xs font-bold text-amber-400">✓ Sélectionné</span>
                                                )}
                                            </div>
                                            <h3 className="font-bold text-base text-white">{role.title}</h3>
                                            <p className="text-xs text-slate-400 mt-1">{role.subtitle}</p>
                                        </div>

                                        <div className="mt-4 pt-3 border-t border-white/10 space-y-1 text-xs">
                                            <div className="flex justify-between">
                                                <span>Mécanique :</span>
                                                <strong className="text-white">{roleStats.mechanics}</strong>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Équipe :</span>
                                                <strong className="text-white">{roleStats.teamplay}</strong>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Défense :</span>
                                                <strong className="text-white">{roleStats.defense}</strong>
                                            </div>
                                            <div className="pt-2 text-[11px] text-emerald-400 font-semibold">
                                                ⚡ {role.beats}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    {/* ÉTAPE 3 : CHOIX DE LA BUBBLE TEAM (TIER 3 UNIQUEMENT) */}
                    <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
                        <div>
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-center">
                  3
                </span>
                                Choisis ta Bubble Team de départ (Tier 3 • {region})
                            </h2>
                            <p className="text-xs text-slate-400 mt-1">
                                Tu signes comme <strong>Titulaire (Starter)</strong>. Le 3e joueur actuel de l&apos;équipe passera Remplaçant (Sub) sur le banc. Attention : si la confiance du coach tombe sous 30/100, tu seras viré !
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {bubbleTeams.map((team) => {
                                const isSelected = selectedTeamId === team.id;
                                const startersWithYou = team.roster.slice(0, 2);
                                const benchedMate = team.roster[2];

                                return (
                                    <button
                                        key={team.id}
                                        type="button"
                                        onClick={() => setSelectedTeamId(team.id)}
                                        className={`text-left p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                                            isSelected
                                                ? 'border-amber-400 bg-slate-950 ring-2 ring-amber-400/50'
                                                : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'
                                        }`}
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                        <span
                            className="px-2.5 py-0.5 rounded font-black text-xs text-slate-950"
                            style={{ backgroundColor: team.logoColor }}
                        >
                          {team.tag}
                        </span>
                                                <span className="text-xs font-mono text-slate-400">
                          Tier {team.tier} • OVR {team.ovr}
                        </span>
                                            </div>

                                            <h3 className="font-bold text-white text-base">{team.name}</h3>
                                            <p className="text-xs text-slate-400 mt-0.5">
                                                Coach : <span className="text-slate-200">{team.coachName}</span> • Style{' '}
                                                <span className="capitalize text-slate-200">{team.playStyle}</span>
                                            </p>

                                            <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5 text-xs">
                                                <div className="text-slate-400 font-semibold">Futur Roster 3v3 :</div>
                                                <div className="text-amber-400 font-bold">
                                                    ★ {gamertag.trim() || 'Toi'} ({selectedRole.toUpperCase()} • {previewOvr})
                                                </div>
                                                {startersWithYou.map((mate) => (
                                                    <div key={mate.id} className="text-slate-200">
                                                        • {mate.gamertag} ({mate.role} • OVR {mate.ovr})
                                                    </div>
                                                ))}
                                                {benchedMate && (
                                                    <div className="text-slate-500 text-[11px] pt-1">
                                                        Banc (Sub) : {benchedMate.gamertag} (OVR {benchedMate.ovr})
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-2 border-t border-slate-800 text-xs font-bold text-right text-amber-400">
                                            {isSelected ? '✓ Contrat sélectionné' : 'Choisir cette équipe →'}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    {/* BOUTON DE VALIDATION */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="w-full md:w-auto px-10 py-4 rounded-xl font-black text-base bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-xl transition cursor-pointer"
                        >
                            🚀 Signer mon contrat et lancer la Saison 1
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}