// app/(game)/match/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthContext';
import {
    CardAction,
    CardChoice,
    GAME_CARDS,
    getRandomCard,
    calculateTournamentRating,
    generateMercatoOffers,
    TransferOffer
} from '@/lib/engine/gameEngine';
import { generateTournamentAwards, TournamentAwards } from '@/lib/engine/seasonEngine';
import { REGIONAL_TEAMS, TeamOption } from '@/lib/data/gameData';
import { REGIONAL_PLAYERS, ProPlayer } from '@/lib/data/proPlayers';

const PRIZE_TABLE: Record<string, { credits: number; xp: number }> = {
    '1st': { credits: 15000, xp: 500 },
    '2nd': { credits: 10000, xp: 350 },
    '3rd-4th': { credits: 6500, xp: 250 },
    '5-8th': { credits: 4800, xp: 150 },
    '9-11th': { credits: 2400, xp: 80 },
    '12-16th': { credits: 1800, xp: 40 },
};

export default function MatchEnginePage() {
    const router = useRouter();
    const { language } = useLanguage();
    const { user } = useAuth();
    const supabase = createClient();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [careerId, setCareerId] = useState<string | null>(null);
    const [playerInfo, setPlayerInfo] = useState({ pseudo: 'Vatira', teamName: 'Oxygen Spark', region: 'EU' });

    const [step, setStep] = useState(1);
    const [activeCard, setActiveCard] = useState<CardAction | null>(null);
    const [opponentTeam, setOpponentTeam] = useState<TeamOption | null>(null);
    const [tournamentScore, setTournamentScore] = useState(0);

    const [lastChoiceFeedback, setLastChoiceFeedback] = useState<CardChoice | null>(null);

    // ÉTAT MERCATO DÉTAILLÉ
    const [isMercatoPhase, setIsMercatoPhase] = useState(false);
    const [mercatoOffers, setMercatoOffers] = useState<TransferOffer[]>([]);

    // STATS & AWARDS
    const [tournamentFinished, setTournamentFinished] = useState(false);
    const [finalRank, setFinalRank] = useState('');
    const [finalRating, setFinalRating] = useState(0);
    const [earnedCredits, setEarnedCredits] = useState(0);
    const [earnedXp, setEarnedXp] = useState(0);
    const [matchStats, setMatchStats] = useState({ goals: 0, assists: 0, saves: 0 });
    const [awards, setAwards] = useState<TournamentAwards | null>(null);

    useEffect(() => {
        async function loadGameState() {
            if (!user) {
                setActiveCard(getRandomCard('event'));
                setLoading(false);
                return;
            }

            try {
                const { data } = await supabase
                    .from('careers')
                    .select('*')
                    .eq('user_id', user.id)
                    .single();

                if (data && data.game_state) {
                    setCareerId(data.id);
                    const state = data.game_state;
                    setPlayerInfo({
                        pseudo: state.pseudo || 'Pro',
                        teamName: state.team?.name || 'Mon Club',
                        region: state.region || 'EU'
                    });

                    if (state.transferRequested) {
                        const allRegionTeams = REGIONAL_TEAMS[state.region as keyof typeof REGIONAL_TEAMS] || REGIONAL_TEAMS.EU;
                        const offers = generateMercatoOffers(state.level || 12, allRegionTeams, state.team?.id);
                        setMercatoOffers(offers);
                        setIsMercatoPhase(true);
                        setLoading(false);
                        return;
                    }

                    setStep(state.stepInTournament || 1);
                    setTournamentScore(state.tournamentScore || 0);

                    const regionTeams = REGIONAL_TEAMS[state.region as keyof typeof REGIONAL_TEAMS] || REGIONAL_TEAMS.EU;
                    const filterBots = regionTeams.filter(t => t.id !== state.team?.id);
                    setOpponentTeam(filterBots[Math.floor(Math.random() * filterBots.length)]);

                    if (state.currentCardId) {
                        const savedCard = GAME_CARDS.find(c => c.id === state.currentCardId);
                        setActiveCard(savedCard || getRandomCard('event'));
                    } else {
                        const newCard = getRandomCard(state.stepInTournament === 1 ? 'event' : 'match');
                        setActiveCard(newCard);
                        await saveCurrentCard(data.id, state, newCard.id);
                    }
                }
            } catch (err) {
                console.error('Erreur chargement arène :', err);
            } finally {
                setLoading(false);
            }
        }

        loadGameState();
    }, [user]);

    const saveCurrentCard = async (cId: string, currentState: any, cardId: string) => {
        await supabase.from('careers').update({
            game_state: { ...currentState, currentCardId: cardId }
        }).eq('id', cId);
    };

    const handleAcceptTransfer = async (offer: TransferOffer) => {
        if (!careerId) return;
        setSaving(true);

        try {
            const { data } = await supabase.from('careers').select('game_state, credits').eq('id', careerId).single();
            const currentState = data?.game_state || {};
            const currentCredits = data?.credits || 0;

            await supabase.from('careers').update({
                credits: currentCredits + offer.salaryBonus,
                game_state: {
                    ...currentState,
                    team: { id: offer.teamId, name: offer.teamName, logo: offer.teamLogo, tier: offer.tier },
                    teamName: offer.teamName,
                    teamLogo: offer.teamLogo,
                    transferRequested: false,
                    rosterStatus: 'Titulaire',
                }
            }).eq('id', careerId);

            alert(`🎉 Félicitations ! Tu as signé chez ${offer.teamName} avec une prime de +${offer.salaryBonus}€ !`);
            router.push('/career');
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleMakeChoice = async (choiceIndex: number) => {
        if (!activeCard || saving) return;
        setSaving(true);

        const choice = activeCard.choices[choiceIndex];
        setLastChoiceFeedback(choice);

        const pointsEarned = choice.matchWeight || (choice.moral ? choice.moral / 2 : 5);
        const newScore = tournamentScore + pointsEarned;

        setTimeout(async () => {
            setLastChoiceFeedback(null);

            if (step < 3) {
                const nextStep = step + 1;
                const nextCard = getRandomCard('match');

                setStep(nextStep);
                setTournamentScore(newScore);
                setActiveCard(nextCard);

                if (user && careerId) {
                    try {
                        const { data } = await supabase.from('careers').select('game_state').eq('id', careerId).single();
                        const currentState = data?.game_state || {};

                        await supabase.from('careers').update({
                            game_state: {
                                ...currentState,
                                stepInTournament: nextStep,
                                tournamentScore: newScore,
                                currentCardId: nextCard.id,
                            }
                        }).eq('id', careerId);
                    } catch (err) {
                        console.error('Erreur auto-save :', err);
                    }
                }
                setSaving(false);
            } else {
                finishTournament(newScore);
            }
        }, 1200);
    };

    const finishTournament = async (finalScore: number) => {
        let rank = '12-16th';
        if (finalScore >= 40) rank = '1st';
        else if (finalScore >= 25) rank = '2nd';
        else if (finalScore >= 10) rank = '3rd-4th';
        else if (finalScore >= 0) rank = '5-8th';

        const isWinner = rank === '1st';
        const rating = calculateTournamentRating(isWinner, finalScore / 10);
        const rewards = PRIZE_TABLE[rank] || { credits: 1000, xp: 20 };

        const goals = isWinner ? Math.floor(Math.random() * 4) + 4 : Math.floor(Math.random() * 3) + 1;
        const assists = Math.floor(Math.random() * 3) + 1;
        const saves = Math.floor(Math.random() * 4) + 2;

        const regionTeams = REGIONAL_TEAMS[playerInfo.region as keyof typeof REGIONAL_TEAMS] || REGIONAL_TEAMS.EU;
        const tournamentAwards = generateTournamentAwards(regionTeams, rank, playerInfo.pseudo, playerInfo.teamName, goals, rating);

        setFinalRank(rank);
        setFinalRating(rating);
        setEarnedCredits(rewards.credits);
        setEarnedXp(rewards.xp);
        setMatchStats({ goals, assists, saves });
        setAwards(tournamentAwards);
        setTournamentFinished(true);

        if (user && careerId) {
            try {
                const { data } = await supabase.from('careers').select('game_state, credits').eq('id', careerId).single();
                const currentState = data?.game_state || {};
                const currentCredits = data?.credits || 0;

                await supabase.from('careers').update({
                    credits: currentCredits + rewards.credits,
                    game_state: {
                        ...currentState,
                        currentEventIndex: (currentState.currentEventIndex || 0) + 1,
                        stepInTournament: 1,
                        tournamentScore: 0,
                        currentCardId: null,
                        matchesPlayed: (currentState.matchesPlayed || 0) + 3,
                        goals: (currentState.goals || 0) + goals,
                        assists: (currentState.assists || 0) + assists,
                        saves: (currentState.saves || 0) + saves,
                        trophies: {
                            ...currentState.trophies,
                            opens: (currentState.trophies?.opens || 0) + (isWinner ? 1 : 0)
                        }
                    }
                }).eq('id', careerId);
            } catch (err) {
                console.error('Erreur fin de tournoi :', err);
            }
        }
        setSaving(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-vacation-pattern flex flex-col items-center justify-center font-body p-4 text-[#6B4A46]" style={{ backgroundColor: '#FFF7EC' }}>
                <div className="text-xl font-display font-extrabold animate-pulse">Entrée sur le terrain... 🏟️</div>
            </div>
        );
    }

    // INTERFACE MERCATO AVEC DÉTAIL DES JOUEURS
    if (isMercatoPhase) {
        const regionPlayerList = REGIONAL_PLAYERS[playerInfo.region as keyof typeof REGIONAL_PLAYERS] || REGIONAL_PLAYERS.EU;

        return (
            <div className="min-h-screen bg-vacation-pattern flex flex-col items-center justify-center p-4 font-body select-none text-[#6B4A46]" style={{ backgroundColor: '#FFF7EC' }}>
                <div className="w-full max-w-md bg-white border-4 border-[#FFC94A] rounded-3xl p-5 shadow-xl space-y-4 text-center">
                    <div className="text-4xl animate-bounce">✈️</div>
                    <div>
            <span className="bg-[#FFC94A] text-[#6B4A46] font-display font-extrabold text-[10px] uppercase px-3 py-1 rounded-full">
              OFFRES DE TRANSFERT
            </span>
                        <h1 className="text-lg font-display font-extrabold text-[#6B4A46] pt-1">Propositions de Roster</h1>
                    </div>

                    <div className="space-y-3">
                        {mercatoOffers.length > 0 ? (
                            mercatoOffers.map((offer) => {
                                const targetPlayers = regionPlayerList.filter(p => p.teamId === offer.teamId);
                                const teammate1 = targetPlayers[0] || { pseudo: 'Rookie_1', level: 75, potential: 80 };
                                const teammate2 = targetPlayers[1] || { pseudo: 'Rookie_2', level: 78, potential: 82 };
                                const kickedPlayer = targetPlayers[2] || { pseudo: 'Sub_Player' };

                                return (
                                    <div key={offer.teamId} className="bg-[#FFF7EC] p-3 rounded-2xl border-2 border-[#FBEAD4] text-left space-y-2">
                                        <div className="flex justify-between items-center border-b border-[#FBEAD4] pb-1.5">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-2xl">{offer.teamLogo}</span>
                                                <div>
                                                    <div className="font-display font-extrabold text-sm text-[#6B4A46]">{offer.teamName}</div>
                                                    <span className="text-[9px] bg-[#FFC94A] text-[#6B4A46] px-2 py-0.5 rounded-full font-bold">{offer.tier}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs font-mono font-extrabold text-[#4FBE99]">+{offer.salaryBonus}€</div>
                                                <div className="text-[8px] text-[#9C7C77] font-bold">PRIME</div>
                                            </div>
                                        </div>

                                        <div className="text-[10px] font-bold space-y-1 text-[#6B4A46]">
                                            <div className="text-[#9C7C77]">Futurs Coéquipiers :</div>
                                            <div className="grid grid-cols-2 gap-1.5">
                                                <div className="bg-white p-1.5 rounded-lg border border-[#FBEAD4]">
                                                    🎮 {teammate1.pseudo} <span className="text-[#5EC2CC]">(LVL {teammate1.level})</span>
                                                </div>
                                                <div className="bg-white p-1.5 rounded-lg border border-[#FBEAD4]">
                                                    🎮 {teammate2.pseudo} <span className="text-[#5EC2CC]">(LVL {teammate2.level})</span>
                                                </div>
                                            </div>
                                            <div className="text-[9px] text-[#F1668C] pt-0.5">
                                                ⚠️ <span className="font-extrabold">{kickedPlayer.pseudo}</span> sera déplacé sur le banc.
                                            </div>
                                        </div>

                                        <button
                                            disabled={saving}
                                            onClick={() => handleAcceptTransfer(offer)}
                                            className="w-full py-2 bg-[#FF8FAE] text-white font-display font-bold text-xs uppercase rounded-xl shadow-sm transition active:scale-95 cursor-pointer disabled:opacity-50"
                                        >
                                            SIGNER CHEZ {offer.teamName} ➔
                                        </button>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-xs font-bold text-[#9C7C77] py-4">Aucune offre reçue pour le moment.</div>
                        )}
                    </div>

                    <button
                        onClick={() => router.push('/career')}
                        className="w-full py-2.5 bg-[#FFF7EC] text-[#9C7C77] font-display font-bold text-xs uppercase rounded-2xl border-2 border-[#FBEAD4] cursor-pointer"
                    >
                        RESTES DANS TON CLUB ACTUEL
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-vacation-pattern flex flex-col items-center p-4 font-body select-none text-[#6B4A46]" style={{ backgroundColor: '#FFF7EC' }}>
            <div className="w-full max-w-md mx-auto flex flex-col justify-between min-h-[92vh] space-y-4">

                {/* HEADER ET AFFICHAGE ADVERSAIRE */}
                <header className="text-center pt-2 space-y-1">
                    <div className="flex items-center justify-center space-x-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase shadow-sm bg-white border border-[#FBEAD4] text-[#F1668C]">
              {activeCard?.type === 'event' ? '📝 COULISSES / VIE PRO' : `⚔️ MATCH ${step}/3`}
            </span>
                        {saving && <span className="text-[10px] font-bold text-[#8FE0C4] animate-pulse">💾 Auto-Save...</span>}
                    </div>

                    {activeCard?.type === 'match' && opponentTeam && (
                        <div className="bg-white p-2.5 rounded-2xl border-2 border-[#FBEAD4] flex justify-between items-center shadow-sm mt-2">
                            <span className="font-display font-extrabold text-xs text-[#5EC2CC]">TON ÉQUIPE</span>
                            <span className="font-display font-extrabold text-sm text-[#F1668C]">VS</span>
                            <div className="flex items-center space-x-1.5 font-display font-extrabold text-xs text-[#6B4A46]">
                                <span>{opponentTeam.logo}</span>
                                <span>{opponentTeam.name}</span>
                            </div>
                        </div>
                    )}

                    {!tournamentFinished && (
                        <div className="flex justify-center space-x-2 pt-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-2 rounded-full border border-[#FBEAD4]" style={{ backgroundColor: i <= step ? '#5EC2CC' : '#ffffff' }} />
                            ))}
                        </div>
                    )}
                </header>

                {/* FEEDBACK POP-UP */}
                {lastChoiceFeedback && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(107, 74, 70, 0.3)', backdropFilter: 'blur(2px)' }}>
                        <div className="bg-white border-4 border-[#5EC2CC] p-5 rounded-3xl text-center space-y-2 shadow-2xl animate-bounce">
                            <div className="text-3xl">⚡</div>
                            <div className="font-display font-extrabold text-sm text-[#6B4A46]">Action Validée !</div>
                            <div className="text-xs font-bold text-[#4FBE99]">Impact sur la rencontre enregistré</div>
                        </div>
                    </div>
                )}

                {/* ECRAN BILAN & DISTINCTIONS */}
                {tournamentFinished ? (
                    <div className="bg-white border-4 border-[#5EC2CC] rounded-3xl p-5 text-center space-y-4 shadow-xl my-auto">
                        <div className="text-4xl animate-bounce">{finalRank === '1st' ? '🏆' : '🏁'}</div>
                        <div>
                            <h2 className="text-xl font-display font-extrabold uppercase text-[#6B4A46]">Bilan & Cérémonie</h2>
                            <p className="text-xs font-bold text-[#9C7C77]">Résultats du Tournoi RLCS</p>
                        </div>

                        {awards && (
                            <div className="bg-[#FFF7EC] p-3 rounded-2xl border-2 border-[#FBEAD4] space-y-2 text-left text-xs font-bold text-[#6B4A46]">
                                <div className="text-[10px] font-display font-extrabold text-[#F1668C] uppercase text-center border-b border-[#FBEAD4] pb-1">
                                    🥇 DISTINCTIONS DU TOURNOI
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>🏆 Vainqueur :</span>
                                    <span className="font-extrabold text-[#5EC2CC]">{awards.winningTeam.logo} {awards.winningTeam.name}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>⭐ MVP :</span>
                                    <span className="font-extrabold text-[#FFC94A]">{awards.mvp.pseudo} ({awards.mvp.teamName})</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>⚽ Meilleur Buteur :</span>
                                    <span className="font-extrabold text-[#6B4A46]">{awards.topScorer.pseudo} ({awards.topScorer.goals} buts)</span>
                                </div>
                            </div>
                        )}

                        <div className="bg-white p-3 rounded-2xl border-2 border-[#FBEAD4] space-y-2 text-xs font-bold text-[#6B4A46]">
                            <div className="flex justify-between border-b border-[#FBEAD4] pb-1">
                                <span className="text-[#9C7C77]">Ton Classement</span>
                                <span className="font-display font-extrabold text-[#5EC2CC]">{finalRank}</span>
                            </div>
                            <div className="flex justify-between border-b border-[#FBEAD4] pb-1">
                                <span className="text-[#9C7C77]">Note du Pro</span>
                                <span className="font-display font-extrabold text-[#F1668C]">{finalRating} / 10</span>
                            </div>
                            <div className="grid grid-cols-3 gap-1 pt-1 text-center text-[10px]">
                                <div className="bg-[#FFF7EC] p-1.5 rounded-lg border border-[#FBEAD4]">⚽ {matchStats.goals} Buts</div>
                                <div className="bg-[#FFF7EC] p-1.5 rounded-lg border border-[#FBEAD4]">🎯 {matchStats.assists} Passes</div>
                                <div className="bg-[#FFF7EC] p-1.5 rounded-lg border border-[#FBEAD4]">🛡️ {matchStats.saves} Arrêts</div>
                            </div>
                        </div>

                        <button onClick={() => router.push('/career')} className="w-full py-3.5 text-white font-display font-bold text-xs uppercase rounded-2xl shadow-md cursor-pointer" style={{ backgroundColor: '#FF8FAE' }}>
                            RETOUR AU VESTIAIRE ➔
                        </button>
                    </div>
                ) : activeCard ? (

                    <div
                        className="bg-white border-4 rounded-3xl p-6 shadow-xl space-y-5 relative my-auto"
                        style={{ borderColor: activeCard.type === 'event' ? '#FFC94A' : '#FF8FAE' }}
                    >
                        <div className="flex items-start space-x-3 border-b-2 border-[#FBEAD4] pb-3">
                            <span className="text-4xl">{activeCard.icon}</span>
                            <div>
                                <div className="text-[10px] font-display font-bold uppercase text-[#FF8FAE]">
                                    {language === 'fr' ? activeCard.categoryFr : activeCard.categoryEn}
                                </div>
                                <h2 className="text-lg font-display font-extrabold text-[#6B4A46]">
                                    {language === 'fr' ? activeCard.titleFr : activeCard.titleEn}
                                </h2>
                            </div>
                        </div>

                        <p className="text-xs leading-relaxed font-bold p-3.5 rounded-2xl bg-[#FFF7EC] border border-[#FBEAD4] text-[#6B4A46]">
                            {language === 'fr' ? activeCard.descriptionFr : activeCard.descriptionEn}
                        </p>

                        <div className="space-y-2.5 pt-1">
                            {activeCard.choices.map((choice, idx) => (
                                <button
                                    key={idx}
                                    disabled={saving}
                                    onClick={() => handleMakeChoice(idx)}
                                    className="w-full text-left p-3.5 rounded-2xl transition active:scale-[0.98] cursor-pointer flex items-center justify-between font-bold text-xs bg-white border-2 border-[#FBEAD4] text-[#6B4A46] shadow-sm disabled:opacity-50"
                                >
                                    <span className="pr-2">{language === 'fr' ? choice.textFr : choice.textEn}</span>
                                    <span className="text-lg font-black text-[#5EC2CC]">➔</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : null}

            </div>
        </div>
    );
}