// app/(game)/career/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthContext';
import html2canvas from 'html2canvas';
import { SEASON_CALENDAR } from '@/lib/engine/seasonEngine';
import { REGIONAL_PLAYERS, ProPlayer } from '@/lib/data/proPlayers';

export default function CareerHubPage() {
    const router = useRouter();
    const { language } = useLanguage();
    const { user } = useAuth();
    const supabase = createClient();
    const retirementCardRef = useRef<HTMLDivElement>(null);

    const [loading, setLoading] = useState(true);
    const [careerId, setCareerId] = useState<string | null>(null);

    // ÉTATS DYNAMIQUES DU JOUEUR (Reçus depuis Supabase)
    const [profile, setProfile] = useState({
        firstName: 'Lucas', pseudo: 'Vatira', lastName: 'Lefèvre',
        age: 16, nationality: 'FR', flag: '🇫🇷',
        teamName: 'Oxygen Spark', teamLogo: '🟢', teamId: '', region: 'EU',
        seasonLabel: 'Saison 26/27',
        level: 12, xp: 0, stars: 3, credits: 1500,
        matchesPlayed: 14, goals: 12, assists: 8, saves: 10,
        trophies: { worlds: 0, majors: 0, opens: 0, preSeason: 1, total: 1 },
        awards: 1, startYear: 2026, endYear: 2034,
        rosterStatus: 'Titulaire',
    });

    const [teammates, setTeammates] = useState<ProPlayer[]>([]);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);

    // MODALES
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showClubModal, setShowClubModal] = useState(false);
    const [isRetired, setIsRetired] = useState(false);

    // CHARGEMENT DES VRAIES DONNÉES DEPUIS SUPABASE
    useEffect(() => {
        async function loadData() {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const { data } = await supabase
                    .from('careers')
                    .select('*')
                    .eq('user_id', user.id)
                    .single();

                if (data) {
                    setCareerId(data.id);
                    const state = data.game_state || {};

                    setProfile(prev => ({
                        ...prev,
                        firstName: state.firstName || prev.firstName,
                        pseudo: state.pseudo || prev.pseudo,
                        lastName: state.lastName || prev.lastName,
                        age: state.age || prev.age,
                        nationality: state.nationality || prev.nationality,
                        flag: state.flag || prev.flag,
                        teamName: state.team?.name || state.teamName || prev.teamName,
                        teamLogo: state.team?.logo || state.teamLogo || prev.teamLogo,
                        teamId: state.team?.id || '',
                        region: state.region || prev.region,
                        seasonLabel: state.seasonLabel || prev.seasonLabel,
                        level: state.level || prev.level,
                        xp: state.xp || 0,
                        stars: state.stars || prev.stars,
                        credits: data.credits ?? prev.credits,
                        matchesPlayed: state.matchesPlayed || prev.matchesPlayed,
                        goals: state.goals || prev.goals,
                        assists: state.assists || prev.assists,
                        saves: state.saves || prev.saves,
                        trophies: state.trophies || prev.trophies,
                        rosterStatus: state.rosterStatus || prev.rosterStatus,
                    }));

                    setCurrentEventIndex(state.currentEventIndex || 0);

                    const regionCode = state.region || 'EU';
                    const playerList = REGIONAL_PLAYERS[regionCode] || [];
                    const clubMates = playerList.filter(p => p.teamId === state.team?.id);
                    setTeammates(clubMates.slice(0, 2));
                }
            } catch (err) {
                console.error('Erreur chargement profil :', err);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [user]);

    const currentEvent = SEASON_CALENDAR[currentEventIndex] || SEASON_CALENDAR[0];

    const careerScore = Math.min(100, Math.floor(
        (profile.trophies.worlds * 15) +
        (profile.trophies.majors * 5) +
        (profile.level * 0.2) +
        (profile.matchesPlayed * 0.05)
    ));

    const handleExportPNG = async () => {
        if (retirementCardRef.current) {
            const canvas = await html2canvas(retirementCardRef.current, {
                scale: 2,
                backgroundColor: '#6B4A46'
            });
            const link = document.createElement('a');
            link.download = `Legende_${profile.pseudo}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    };

    const handleRequestTransfer = async () => {
        if (!currentEvent.allowsMercato) {
            alert(`⛔ Le marché des transferts est fermé ! Tu ne peux être transféré qu'après un Major ou entre deux saisons.`);
            return;
        }

        if (!user || !careerId) {
            alert("Demande de transfert transmise !");
            setShowClubModal(false);
            return;
        }

        try {
            const { data } = await supabase.from('careers').select('game_state').eq('id', careerId).single();
            const currentState = data?.game_state || {};

            await supabase.from('careers').update({
                game_state: { ...currentState, transferRequested: true }
            }).eq('id', careerId);

            alert("✈️ Demande de transfert transmise à ton agent ! Des offres apparaîtront à l'arène.");
            setShowClubModal(false);
        } catch (err) {
            console.error(err);
        }
    };

    // ACTION : TENTER DE BENCH UN COÉQUIPIER
    const handleTryBenchTeammate = (matePseudo: string) => {
        const success = Math.random() > 0.4;
        if (success) {
            alert(`🔥 Succès ! Le coach a accepté de placer ${matePseudo} sur le banc au profit de la synergie d'équipe.`);
        } else {
            alert(`⚠️ Échec ! Le coach refuse de mettre ${matePseudo} sur le banc. La tension monte dans le vestiaire (-10 Relation d'Équipe).`);
        }
    };

    const handleNextSeason = async () => {
        const nextAge = profile.age + 1;
        const nextSeasonLabel = `Saison ${26 + (nextAge - 16)}/${27 + (nextAge - 16)}`;

        if (user && careerId) {
            try {
                const { data } = await supabase.from('careers').select('game_state').eq('id', careerId).single();
                const currentState = data?.game_state || {};

                await supabase.from('careers').update({
                    game_state: {
                        ...currentState,
                        age: nextAge,
                        seasonLabel: nextSeasonLabel,
                        currentEventIndex: 0,
                    }
                }).eq('id', careerId);
            } catch (err) {
                console.error('Erreur changement saison :', err);
            }
        }

        setProfile(prev => ({
            ...prev,
            age: nextAge,
            seasonLabel: nextSeasonLabel,
        }));

        setCurrentEventIndex(0);
        alert(`🎉 Bienvenue dans la ${nextSeasonLabel} ! Tu as maintenant ${nextAge} ans.`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-vacation-pattern flex items-center justify-center font-body p-4 text-[#6B4A46]" style={{ backgroundColor: '#FFF7EC' }}>
                <div className="text-xl font-display font-extrabold animate-pulse">Chargement de ta Carrière... 🚀</div>
            </div>
        );
    }

    if (isRetired) {
        return (
            <div className="min-h-screen bg-vacation-pattern flex flex-col items-center justify-center p-4 font-body select-none" style={{ backgroundColor: '#FFF7EC', color: '#6B4A46' }}>
                <div
                    ref={retirementCardRef}
                    className="max-w-md w-full rounded-[2rem] p-6 shadow-2xl relative overflow-hidden"
                    style={{ backgroundColor: '#6B4A46', border: '6px solid #FBEAD4' }}
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-b-xl font-display font-extrabold text-[10px] tracking-widest uppercase text-[#6B4A46]" style={{ backgroundColor: '#FFC94A' }}>
                        UNE ICÔNE
                    </div>

                    <div className="mt-8 text-center space-y-4">
                        <div className="relative inline-flex items-center justify-center w-28 h-28 rounded-full border-4 border-[#FFC94A]/30">
                            <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#FFC94A] animate-[spin_20s_linear_infinite]" />
                            <div className="text-center">
                                <div className="text-[9px] uppercase tracking-wider text-[#FBEAD4] opacity-80">Note Globale</div>
                                <div className="text-5xl font-display font-extrabold text-[#FFC94A] leading-none">{careerScore}</div>
                            </div>
                        </div>

                        <div>
                            <h1 className="text-3xl font-display font-extrabold text-white flex justify-center items-center gap-2">
                                <span>{profile.flag}</span> <span>{profile.firstName} {profile.lastName}</span>
                            </h1>
                            <p className="text-[#FF8FAE] font-bold text-xs uppercase tracking-wide">
                                ⚡ Légende du Rocket • {profile.startYear} – {profile.endYear}
                            </p>
                        </div>

                        <div className="bg-[#FFF7EC]/10 p-4 rounded-2xl border border-[#FBEAD4]/20 grid grid-cols-3 gap-y-4 gap-x-2 text-center text-white font-display">
                            <div><div className="text-xl font-extrabold">{profile.matchesPlayed}</div><div className="text-[8px] uppercase text-[#FBEAD4]">Matchs</div></div>
                            <div><div className="text-xl font-extrabold">{profile.goals}</div><div className="text-[8px] uppercase text-[#FBEAD4]">Buts</div></div>
                            <div><div className="text-xl font-extrabold">{profile.assists}</div><div className="text-[8px] uppercase text-[#FBEAD4]">Passes Déc.</div></div>
                            <div><div className="text-xl font-extrabold">{profile.awards}</div><div className="text-[8px] uppercase text-[#FBEAD4]">Distinctions</div></div>
                            <div><div className="text-xl font-extrabold">{profile.level}</div><div className="text-[8px] uppercase text-[#FBEAD4]">Niveau Max</div></div>
                            <div><div className="text-xl font-extrabold text-[#5EC2CC]">{profile.credits / 1000} M€</div><div className="text-[8px] uppercase text-[#FBEAD4]">Fortune</div></div>
                        </div>

                        <div className="text-left space-y-2.5 bg-[#FFF7EC]/10 p-4 rounded-2xl border border-[#FBEAD4]/20 text-sm font-bold text-white">
                            <div className="flex justify-between items-center border-b border-[#FBEAD4]/20 pb-1.5">
                                <span className="flex items-center gap-2">👑 <span className="opacity-90">World Champions</span></span>
                                <span className="bg-[#FFC94A] text-[#6B4A46] px-2 py-0.5 rounded-full text-xs">{profile.trophies.worlds}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-[#FBEAD4]/20 pb-1.5">
                                <span className="flex items-center gap-2">🏆 <span className="opacity-90">Majors RLCS</span></span>
                                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{profile.trophies.majors}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-2">🥇 <span className="opacity-90">Regional Opens</span></span>
                                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{profile.trophies.opens}</span>
                            </div>
                        </div>

                        <div className="italic text-[11px] text-[#FBEAD4] leading-relaxed pt-2 opacity-80 px-2">
                            "Votre nom restera gravé parmi les plus grands. Les joueurs du monde entier porteront vos couleurs pendant des décennies."
                        </div>

                        <div className="pt-4 border-t border-[#FBEAD4]/20">
                            <div className="font-display font-extrabold text-[#FF8FAE] tracking-widest text-sm">ROCKET LEGENDS</div>
                            <div className="text-[8px] text-[#FBEAD4] opacity-60">Écrivez votre propre légende • Edition 2026</div>
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-md mt-4 flex space-x-2">
                    <button onClick={handleExportPNG} className="flex-1 py-3 bg-[#5EC2CC] text-white font-display font-bold text-xs uppercase rounded-2xl shadow-md active:scale-95 transition cursor-pointer">
                        📸 Exporter en PNG
                    </button>
                    <button onClick={() => window.location.href = '/'} className="flex-1 py-3 bg-white text-[#6B4A46] font-display font-bold text-xs uppercase rounded-2xl shadow-md border-2 border-[#FBEAD4] active:scale-95 transition cursor-pointer">
                        Menu Principal
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-vacation-pattern flex flex-col justify-between items-center p-3 sm:p-5 font-body relative select-none"
            style={{ backgroundColor: '#FFF7EC', color: '#6B4A46' }}
        >
            {/* 📋 MODAL PROFIL & PALMARÈS */}
            {showProfileModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(107, 74, 70, 0.4)', backdropFilter: 'blur(4px)' }}>
                    <div className="w-full max-w-sm rounded-3xl p-5 space-y-4 shadow-xl bg-white border-4 border-[#FF8FAE]">
                        <div className="flex justify-between items-center border-b-2 border-[#FBEAD4] pb-2">
                            <h2 className="text-lg font-display font-extrabold uppercase text-[#6B4A46]">Profil Pro</h2>
                            <button onClick={() => setShowProfileModal(false)} className="text-[#F1668C] font-extrabold text-xs bg-[#FFF7EC] px-3 py-1 rounded-full border border-[#FBEAD4] cursor-pointer">FERMER</button>
                        </div>

                        <div className="bg-[#FFF7EC] p-3 rounded-2xl border-2 border-[#FBEAD4] text-center space-y-1">
                            <div className="text-2xl">{profile.flag}</div>
                            <div className="font-display font-extrabold text-base text-[#6B4A46]">{profile.firstName} '{profile.pseudo}' {profile.lastName}</div>
                            <div className="text-xs font-bold text-[#9C7C77]">{profile.age} ans • Région {profile.region}</div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-center font-display font-extrabold text-xs">
                            <div className="bg-white p-2 rounded-xl border border-[#FBEAD4]"><div className="text-[#5EC2CC] text-lg">{profile.goals}</div><div className="text-[8px] text-[#9C7C77]">BUTS</div></div>
                            <div className="bg-white p-2 rounded-xl border border-[#FBEAD4]"><div className="text-[#FF8FAE] text-lg">{profile.assists}</div><div className="text-[8px] text-[#9C7C77]">PASSES</div></div>
                            <div className="bg-white p-2 rounded-xl border border-[#FBEAD4]"><div className="text-[#FFC94A] text-lg">{profile.saves}</div><div className="text-[8px] text-[#9C7C77]">ARRÊTS</div></div>
                        </div>

                        <div className="space-y-1.5 pt-2 border-t border-[#FBEAD4] text-xs font-bold text-[#6B4A46]">
                            <div className="flex justify-between"><span>👑 Titres Worlds</span><span className="text-[#FFC94A] font-extrabold">{profile.trophies.worlds}</span></div>
                            <div className="flex justify-between"><span>🏆 Trophées Major</span><span className="text-[#5EC2CC] font-extrabold">{profile.trophies.majors}</span></div>
                            <div className="flex justify-between"><span>🥇 Victoires Open</span><span className="text-[#F1668C] font-extrabold">{profile.trophies.opens}</span></div>
                        </div>
                    </div>
                </div>
            )}

            {/* 🤝 MODAL CLUB & COÉQUIPIERS */}
            {showClubModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(107, 74, 70, 0.4)', backdropFilter: 'blur(4px)' }}>
                    <div className="w-full max-w-sm rounded-3xl p-5 space-y-4 shadow-xl bg-white border-4 border-[#FFC94A]">
                        <div className="flex justify-between items-center border-b-2 border-[#FBEAD4] pb-2">
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl">{profile.teamLogo}</span>
                                <h2 className="text-lg font-display font-extrabold uppercase text-[#6B4A46]">{profile.teamName}</h2>
                            </div>
                            <button onClick={() => setShowClubModal(false)} className="text-[#F1668C] font-extrabold text-xs bg-[#FFF7EC] px-3 py-1 rounded-full border border-[#FBEAD4] cursor-pointer">FERMER</button>
                        </div>

                        <div className="bg-[#FFF7EC] p-3 rounded-2xl border-2 border-[#FBEAD4] text-center">
                            <div className="text-[10px] font-bold uppercase text-[#9C7C77]">Ton Statut</div>
                            <div className="text-sm font-display font-extrabold text-[#5EC2CC]">🟢 {profile.rosterStatus.toUpperCase()}</div>
                        </div>

                        <div className="space-y-2">
                            <div className="text-[10px] font-bold uppercase text-[#9C7C77] pl-1">Coéquipiers Titulaires</div>
                            <div className="space-y-2">
                                {teammates.length > 0 ? teammates.map((mate) => (
                                    <div key={mate.id} className="bg-white p-2.5 rounded-2xl border-2 border-[#FBEAD4] flex justify-between items-center shadow-sm">
                                        <div>
                                            <div className="font-display font-extrabold text-xs text-[#6B4A46]">🎮 {mate.pseudo} ({mate.nationality})</div>
                                            <div className="text-[10px] text-[#9C7C77] font-bold">{mate.age} ans • LVL: {mate.level} | POT: {mate.potential}</div>
                                        </div>
                                        <button
                                            onClick={() => handleTryBenchTeammate(mate.pseudo)}
                                            className="px-2 py-1 text-[9px] font-display font-extrabold uppercase bg-[#FFF7EC] text-[#F1668C] border border-[#FBEAD4] rounded-lg cursor-pointer hover:bg-[#FF8FAE] hover:text-white transition"
                                        >
                                            🛋️ Bench
                                        </button>
                                    </div>
                                )) : (
                                    profile.teammates.map((mateName, idx) => (
                                        <div key={idx} className="bg-white p-2.5 rounded-xl border-2 border-[#FBEAD4] flex justify-between items-center text-xs font-bold text-[#6B4A46]">
                                            <span>🎮 {mateName}</span>
                                            <button onClick={() => handleTryBenchTeammate(mateName)} className="text-[9px] text-[#F1668C] border border-[#FBEAD4] px-2 py-0.5 rounded cursor-pointer">🛋️ Bench</button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="pt-2 border-t border-[#FBEAD4]">
                            <button
                                onClick={handleRequestTransfer}
                                disabled={!currentEvent.allowsMercato}
                                className="w-full py-2.5 text-white font-display font-bold text-xs uppercase rounded-xl shadow-md transition active:scale-95 disabled:opacity-50 cursor-pointer"
                                style={{ backgroundColor: currentEvent.allowsMercato ? '#FF8FAE' : '#9C7C77' }}
                            >
                                {currentEvent.allowsMercato ? '✈️ Demander son transfert (Mercato Ouvert)' : '🔒 Mercato Fermé'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* HEADER NAVBAR DYNAMIQUE */}
            <header className="w-full max-w-md space-y-2 pt-2">
                <div className="bg-white border-2 border-[#FBEAD4] text-[#6B4A46] px-4 py-2.5 rounded-2xl flex justify-between items-center text-xs shadow-sm font-bold">
                    <div className="flex items-center space-x-2 bg-[#FFF7EC] px-3 py-1 rounded-full text-xs font-bold border border-[#FBEAD4]">
                        <span>{profile.teamLogo}</span>
                        <span>{profile.teamName}</span>
                    </div>
                    <div>{profile.firstName} <span className="text-[#F1668C]">'{profile.pseudo}'</span></div>
                    <div className="text-[11px] text-[#9C7C77]">{profile.flag} {profile.age} ans</div>
                </div>

                <div className="grid grid-cols-6 gap-2 text-[10px] font-bold">
                    <div className="col-span-1 bg-white border-2 border-[#8FE0C4] text-[#4FBE99] py-2 rounded-2xl flex items-center justify-center font-mono">
                        💰{profile.credits / 1000}k
                    </div>

                    <div className="col-span-1 bg-white border-2 border-[#C6A6E8] text-[#A87BDB] py-2 rounded-2xl flex items-center justify-center font-mono">
                        LVL {profile.level}
                    </div>

                    <button
                        onClick={() => setShowProfileModal(true)}
                        className="col-span-1 bg-white hover:bg-[#FFF7EC] text-[#6B4A46] py-2 rounded-2xl flex items-center justify-center font-display font-extrabold uppercase shadow-sm border-2 border-[#FF8FAE] cursor-pointer transition"
                    >
                        📋 PROF
                    </button>

                    <Link
                        href="/standings"
                        className="col-span-1 bg-white hover:bg-[#FFF7EC] text-[#5EC2CC] py-2 rounded-2xl flex items-center justify-center font-display font-extrabold uppercase shadow-sm border-2 border-[#5EC2CC] cursor-pointer transition"
                    >
                        🏆 CLAS
                    </Link>

                    <button
                        onClick={() => setShowClubModal(true)}
                        className="col-span-1 bg-white hover:bg-[#FFF7EC] text-[#F0A80F] py-2 rounded-2xl flex items-center justify-center font-display font-extrabold uppercase shadow-sm border-2 border-[#FFC94A] cursor-pointer transition"
                    >
                        🤝 CLUB
                    </button>

                    {profile.age >= 24 ? (
                        <button
                            onClick={() => setIsRetired(true)}
                            className="col-span-1 bg-[#6B4A46] text-[#FFC94A] py-2 rounded-2xl flex items-center justify-center font-display font-extrabold uppercase shadow-sm border-2 border-[#6B4A46] cursor-pointer transition"
                        >
                            🚪 EXIT
                        </button>
                    ) : (
                        <div className="col-span-1 bg-white border-2 border-[#FFC94A] text-[#F0A80F] py-2 rounded-2xl flex items-center justify-center tracking-tighter">
                            {'★'.repeat(profile.stars)}
                        </div>
                    )}
                </div>

                {/* FRISE DU CALENDRIER DE SAISON */}
                <div className="bg-white p-3 rounded-2xl border-2 border-[#FBEAD4] shadow-sm mt-2 flex items-center overflow-x-auto scrollbar-hide space-x-3">
                    {SEASON_CALENDAR.map((event, idx) => (
                        <div key={event.id} className="flex flex-col items-center min-w-[75px]">
                            <div
                                className="w-4 h-4 rounded-full border-2 z-10 transition-all"
                                style={{
                                    backgroundColor: idx < currentEventIndex ? '#5EC2CC' : idx === currentEventIndex ? '#FF8FAE' : '#FFF7EC',
                                    borderColor: idx <= currentEventIndex ? '#ffffff' : '#FBEAD4',
                                    boxShadow: idx === currentEventIndex ? '0 0 0 2px #FF8FAE' : 'none'
                                }}
                            />
                            <span
                                className="text-[8px] font-bold mt-1 text-center leading-tight truncate w-full"
                                style={{ color: idx === currentEventIndex ? '#F1668C' : '#9C7C77' }}
                            >
                                {event.name}
                            </span>
                        </div>
                    ))}
                </div>
            </header>

            {/* MAIN CARD */}
            <main className="w-full max-w-md my-auto py-4 space-y-4">
                <div className="bg-white border-4 border-[#FF8FAE] rounded-3xl p-6 shadow-md text-center space-y-5">
                    <div className="text-4xl">{currentEvent.type === 'major' || currentEvent.type === 'worlds' ? '🌍' : '🏟️'}</div>

                    <div>
                        <span className="bg-[#FFF7EC] text-[#F1668C] border border-[#FBEAD4] px-3 py-1 rounded-full text-[10px] font-display font-bold uppercase">
                            Étape {currentEventIndex + 1} / 9
                        </span>
                        <h2 className="text-xl font-display font-extrabold uppercase text-[#6B4A46] pt-2">{currentEvent.name}</h2>
                        <p className="text-xs font-bold pt-1 text-[#9C7C77]">
                            {currentEvent.type === 'major' ? "Matchs internationaux contre les champions du monde !" : "Marque des points décisifs pour la qualification au Major."}
                        </p>
                    </div>

                    {currentEventIndex >= SEASON_CALENDAR.length ? (
                        <button
                            onClick={handleNextSeason}
                            className="w-full py-4 text-white font-display font-extrabold text-sm uppercase rounded-2xl shadow-md transition active:scale-95 cursor-pointer bg-[#5EC2CC]"
                        >
                            PASSER À LA SAISON SUIVANTE ➔
                        </button>
                    ) : (
                        <button
                            onClick={() => router.push('/match')}
                            className="w-full py-4 text-white font-display font-extrabold text-sm uppercase rounded-2xl shadow-md transition active:scale-95 cursor-pointer"
                            style={{ backgroundColor: '#FF8FAE' }}
                        >
                            ENTRER DANS L'ARÈNE ➔
                        </button>
                    )}
                </div>
            </main>

            <footer className="text-[10px] text-[#9C7C77] font-bold">
                Rocket Legends Mobile • {profile.seasonLabel}
            </footer>
        </div>
    );
}