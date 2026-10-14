// app/(game)/standings/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { RegionKey, REGIONAL_TEAMS } from '@/lib/data/gameData';
import { generateDynamicStandings, TeamStanding } from '@/lib/engine/standingsEngine';

const MAJOR_SPOTS: Record<RegionKey, number> = {
    EU: 4, NA: 4, MENA: 2, SAM: 2, OCE: 2, APAC: 1, SSA: 1
};

export default function StandingsPage() {
    const { language } = useLanguage();
    const { user } = useAuth();
    const supabase = createClient();

    const [activeRegion, setActiveRegion] = useState<RegionKey>('EU');
    const [standings, setStandings] = useState<TeamStanding[]>([]);
    const [playerTeamId, setPlayerTeamId] = useState<string>('');

    // Récupérer le club du joueur connecté depuis Supabase
    useEffect(() => {
        async function fetchPlayerCareer() {
            if (!user) return;
            try {
                const { data } = await supabase
                    .from('careers')
                    .select('game_state')
                    .eq('user_id', user.id)
                    .single();

                if (data?.game_state) {
                    if (data.game_state.region) setActiveRegion(data.game_state.region as RegionKey);
                    if (data.game_state.team?.id) setPlayerTeamId(data.game_state.team.id);
                }
            } catch (err) {
                console.error('Erreur chargement standings :', err);
            }
        }
        fetchPlayerCareer();
    }, [user]);

    // Générer et trier le classement pour la région active
    useEffect(() => {
        const regionTeams = REGIONAL_TEAMS[activeRegion] || REGIONAL_TEAMS.EU;
        const currentStandings = generateDynamicStandings(regionTeams, playerTeamId);
        setStandings(currentStandings);
    }, [activeRegion, playerTeamId]);

    const qualificationCutoff = MAJOR_SPOTS[activeRegion];

    return (
        <div
            className="min-h-screen bg-vacation-pattern flex flex-col items-center p-4 font-body select-none"
            style={{ backgroundColor: '#FFF7EC', color: '#6B4A46' }}
        >
            <div className="w-full max-w-md mx-auto flex flex-col min-h-[92vh] space-y-4">

                {/* HEADER */}
                <header className="flex items-center justify-between pt-2">
                    <Link
                        href="/career"
                        className="p-2.5 bg-white rounded-2xl shadow-sm border-2 transition active:scale-95 flex items-center justify-center cursor-pointer"
                        style={{ borderColor: '#FBEAD4', color: '#9C7C77' }}
                    >
                        ⬅️
                    </Link>
                    <div className="text-center">
                        <h1 className="text-xl font-display font-extrabold uppercase tracking-tight" style={{ color: '#6B4A46' }}>
                            RLCS Rankings
                        </h1>
                        <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#F1668C' }}>
                            Road to Major 1
                        </p>
                    </div>
                    <div className="w-10" />
                </header>

                {/* SÉLECTEUR DE RÉGION */}
                <div
                    className="flex overflow-x-auto space-x-2 p-2 rounded-2xl shadow-inner scrollbar-hide"
                    style={{ backgroundColor: '#ffffff', border: '3px solid #FBEAD4' }}
                >
                    {(Object.keys(MAJOR_SPOTS) as RegionKey[]).map(region => (
                        <button
                            key={region}
                            onClick={() => setActiveRegion(region)}
                            className="whitespace-nowrap px-4 py-2 rounded-xl font-display font-bold text-xs transition cursor-pointer"
                            style={{
                                backgroundColor: activeRegion === region ? '#5EC2CC' : 'transparent',
                                color: activeRegion === region ? '#ffffff' : '#9C7C77',
                            }}
                        >
                            {region}
                        </button>
                    ))}
                </div>

                {/* LÉGENDE */}
                <div className="bg-[#FFF7EC] border border-[#FBEAD4] rounded-xl p-3 text-[9px] font-bold text-[#9C7C77] text-center uppercase tracking-wide">
                    En cas d'égalité : 1. Trophées ➔ 2. Face-à-Face ➔ 3. Buts Marqués
                </div>

                {/* TABLEAU DU CLASSEMENT */}
                <div className="flex-1 bg-white border-4 border-[#5EC2CC] rounded-3xl p-4 shadow-md overflow-hidden flex flex-col">

                    {/* En-tête */}
                    <div className="grid grid-cols-12 gap-2 text-[10px] font-extrabold uppercase pb-2 border-b-2 border-[#FBEAD4]" style={{ color: '#9C7C77' }}>
                        <div className="col-span-1 text-center">#</div>
                        <div className="col-span-6">Équipe</div>
                        <div className="col-span-2 text-center">Pts</div>
                        <div className="col-span-1 text-center" title="Tournois Gagnés">🏆</div>
                        <div className="col-span-2 text-center" title="Buts Marqués">⚽</div>
                    </div>

                    {/* Liste des équipes */}
                    <div className="overflow-y-auto pt-2 space-y-2 flex-1 scrollbar-hide">
                        {standings.length > 0 ? standings.map((item, index) => {
                            const isQualified = index < qualificationCutoff;
                            const isPlayerTeam = item.teamId === playerTeamId;

                            return (
                                <React.Fragment key={item.teamId}>
                                    {/* Ligne de Cutoff Major */}
                                    {index === qualificationCutoff && (
                                        <div className="relative py-2">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t-2 border-dashed border-[#F1668C]"></div>
                                            </div>
                                            <div className="relative flex justify-center">
                                                <span className="bg-[#FFF7EC] px-3 py-0.5 text-[9px] font-display font-extrabold text-[#F1668C] uppercase rounded-full border border-[#FBEAD4]">
                                                    Major Cutoff ({qualificationCutoff} Spots)
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    <div
                                        className="grid grid-cols-12 gap-2 items-center p-2 rounded-xl transition-all"
                                        style={{
                                            backgroundColor: isPlayerTeam ? '#FFF7EC' : isQualified ? '#FFFFFF' : '#FFFFFF',
                                            border: isPlayerTeam ? '2px solid #FF8FAE' : isQualified ? '2px solid #FFC94A' : '1px solid #FBEAD4',
                                        }}
                                    >
                                        <div className="col-span-1 text-xs font-display font-extrabold text-center" style={{ color: isQualified ? '#F0A80F' : '#9C7C77' }}>
                                            {index + 1}
                                        </div>
                                        <div className="col-span-6 flex items-center space-x-2 overflow-hidden">
                                            <span className="text-lg">{item.teamInfo.logo}</span>
                                            <span className="text-xs font-bold truncate" style={{ color: '#6B4A46' }}>
                                                {item.teamInfo.name} {isPlayerTeam && '⭐'}
                                            </span>
                                        </div>
                                        <div className="col-span-2 text-xs font-display font-extrabold text-center" style={{ color: '#5EC2CC' }}>
                                            {item.points}
                                        </div>
                                        <div className="col-span-1 text-[10px] font-bold text-center" style={{ color: '#9C7C77' }}>
                                            {item.tournamentsWon}
                                        </div>
                                        <div className="col-span-2 text-[10px] font-bold text-center" style={{ color: '#9C7C77' }}>
                                            {item.goalsScoredInRegionals}
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        }) : (
                            <div className="text-center py-10 text-xs font-bold" style={{ color: '#9C7C77' }}>
                                Données de classement indisponibles pour la région {activeRegion}.
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}