// app/(game)/saves/new/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthContext';
import {
    REGIONAL_TEAMS,
    RANDOM_PSEUDOS,
    ORIGIN_SCENARIOS,
    generateRandomFullName,
    RegionKey,
    OriginScenario,
    TeamOption
} from '@/lib/data/gameData';

const COUNTRY_FLAGS: Record<string, string> = {
    FR: '🇫🇷', GB: '🇬🇧', ES: '🇪🇸', DE: '🇩🇪', US: '🇺🇸', BR: '🇧🇷'
};

export default function NewCareerWizardPage() {
    const router = useRouter();
    const { language } = useLanguage();
    const { user } = useAuth();
    const supabase = createClient();

    const [step, setStep] = useState<number>(1);
    const [identity, setIdentity] = useState({ firstName: '', lastName: '' });
    const [pseudo, setPseudo] = useState('');

    const [selectedScenario, setSelectedScenario] = useState<OriginScenario | null>(null);
    const [showPerkModal, setShowPerkModal] = useState<boolean>(false);

    const [selectedRegion, setSelectedRegion] = useState<RegionKey>('EU');
    const [selectedCountry, setSelectedCountry] = useState('FR');

    const [randomizedTeams, setRandomizedTeams] = useState<TeamOption[]>([]);
    const [selectedTeamId, setSelectedTeamId] = useState<string>('');

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setIdentity(generateRandomFullName());
    }, []);

    // 🛠️ CORRECTION DU FILTRAGE ICI : Utilisation des nouveaux Tiers
    useEffect(() => {
        const regionTeams = REGIONAL_TEAMS[selectedRegion] || [];

        // On prend uniquement les équipes de bas/milieu de tableau pour commencer
        const eligibleTeams = regionTeams.filter(
            (t) => t.tier === 'Underdog' || t.tier === 'Bubble'
        );

        // Mélanger et prendre 4 clubs au hasard
        const shuffled = [...eligibleTeams].sort(() => 0.5 - Math.random());
        setRandomizedTeams(shuffled.slice(0, 4));
        setSelectedTeamId('');
    }, [selectedRegion]);

    const handleRandomPseudo = () => {
        setPseudo(RANDOM_PSEUDOS[Math.floor(Math.random() * RANDOM_PSEUDOS.length)]);
    };

    const handleValidateScenarioStep = () => {
        if (selectedScenario) setShowPerkModal(true);
    };

    const handleFinishCreation = async () => {
        if (!selectedScenario || !selectedTeamId) return;
        setLoading(true);

        try {
            const selectedTeam = randomizedTeams.find((t) => t.id === selectedTeamId) || randomizedTeams[0];

            if (user) {
                await supabase.from('careers').insert({
                    user_id: user.id,
                    player_name: `${identity.firstName} '${pseudo}' ${identity.lastName}`,
                    avatar_id: 'hero_default',
                    credits: selectedScenario.initialFortune,
                    game_state: {
                        firstName: identity.firstName,
                        lastName: identity.lastName,
                        pseudo,
                        age: 16,
                        nationality: selectedCountry,
                        flag: COUNTRY_FLAGS[selectedCountry] || '🏳️',
                        scenario: selectedScenario,
                        region: selectedRegion,
                        team: selectedTeam,
                        seasonLabel: 'Saison 26/27',
                        seasonPhase: 'Pré-Saison',
                        level: selectedScenario.baseLevel,
                        stars: selectedScenario.baseStars,
                        potential: selectedScenario.potentialLabel,
                    },
                });
            }

            router.push('/career');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen bg-vacation-pattern flex flex-col justify-between items-center p-4 font-body relative select-none"
            style={{ backgroundColor: '#FFF7EC', color: '#6B4A46' }}
        >
            {/* MODAL PERK DÉBLOQUÉ */}
            {showPerkModal && selectedScenario && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ backgroundColor: 'rgba(107, 74, 70, 0.4)', backdropFilter: 'blur(4px)' }}
                >
                    <div
                        className="w-full max-w-sm rounded-3xl p-6 text-center space-y-4 shadow-xl"
                        style={{ backgroundColor: '#ffffff', border: '4px solid #FF8FAE' }}
                    >
                        <div className="text-5xl">{selectedScenario.icon}</div>
                        <div className="space-y-1">
              <span className="inline-block font-display font-bold text-[10px] uppercase px-3 py-1 rounded-full text-white" style={{ backgroundColor: '#FF8FAE' }}>
                {language === 'fr' ? 'PERK DÉBLOQUÉ !' : 'PERK UNLOCKED!'}
              </span>
                            <h3 className="text-xl font-display font-extrabold pt-1" style={{ color: '#6B4A46' }}>
                                {language === 'fr' ? selectedScenario.perkNameFr : selectedScenario.perkNameEn}
                            </h3>
                        </div>
                        <p className="text-xs font-bold p-3.5 rounded-2xl" style={{ backgroundColor: '#FFF7EC', border: '2px solid #FBEAD4', color: '#6B4A46' }}>
                            {language === 'fr' ? selectedScenario.perkDescFr : selectedScenario.perkDescEn}
                        </p>
                        <button
                            onClick={() => {
                                setShowPerkModal(false);
                                setStep(3);
                            }}
                            className="w-full py-3.5 text-white font-display font-bold text-xs uppercase rounded-2xl cursor-pointer shadow-md transition active:scale-95"
                            style={{ backgroundColor: '#FF8FAE' }}
                        >
                            {language === 'fr' ? 'CONTINUER ➔' : 'CONTINUE ➔'}
                        </button>
                    </div>
                </div>
            )}

            <div className="w-full max-w-md mx-auto flex flex-col justify-between min-h-[92vh] space-y-4">

                {/* BARRE DE PROGRESSION */}
                <div className="w-full space-y-2 pt-2">
                    <div className="flex justify-between items-center text-xs font-display font-bold">
                        <span style={{ color: '#9C7C77' }}>{language === 'fr' ? 'Création du Pro' : 'Pro Creation'}</span>
                        <span style={{ color: '#F1668C' }}>{`Étape ${step} / 4`}</span>
                    </div>
                    <div className="w-full h-3 rounded-full overflow-hidden p-0.5 shadow-inner" style={{ backgroundColor: '#ffffff', border: '2px solid #FBEAD4' }}>
                        <div className="h-full rounded-full transition-all duration-300" style={{ width: `${(step / 4) * 100}%`, backgroundColor: '#FF8FAE' }} />
                    </div>
                </div>

                {/* ÉTAPES */}
                <div className="w-full my-auto space-y-4 py-2">

                    {/* ÉTAPE 1: PSEUDO */}
                    {step === 1 && (
                        <div className="w-full rounded-3xl p-6 shadow-md space-y-5 text-center relative" style={{ backgroundColor: '#ffffff', border: '4px solid #FF8FAE' }}>
                            <div className="space-y-1 pt-1">
                                <span className="text-4xl block mb-2">🏷️</span>
                                <h2 className="text-2xl font-display font-extrabold uppercase tracking-tight" style={{ color: '#6B4A46' }}>1. Ton Pseudo</h2>
                                <p className="text-xs font-bold" style={{ color: '#9C7C77' }}>Identité attribuée : {identity.firstName} {identity.lastName} (16 ans)</p>
                            </div>
                            <div className="space-y-2 text-xs font-bold text-left pt-2">
                                <label style={{ color: '#9C7C77' }}>Ton Pseudo In-Game :</label>
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        value={pseudo}
                                        onChange={(e) => setPseudo(e.target.value)}
                                        placeholder="Ex: Vatira"
                                        className="w-full rounded-2xl p-3 font-display font-bold text-sm focus:outline-none"
                                        style={{ backgroundColor: '#FFF7EC', border: '2px solid #FBEAD4', color: '#6B4A46' }}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRandomPseudo}
                                        className="px-4 rounded-2xl font-display font-bold cursor-pointer transition active:scale-95"
                                        style={{ backgroundColor: '#FFC94A', border: '2px solid #F0A80F', color: '#6B4A46' }}
                                    >🎲</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ÉTAPE 2: BACKGROUND */}
                    {step === 2 && (
                        <div className="space-y-3 w-full">
                            <div className="text-center space-y-1">
                                <span className="text-3xl">📜</span>
                                <h2 className="text-2xl font-display font-extrabold uppercase" style={{ color: '#6B4A46' }}>2. Ton Passé</h2>
                            </div>
                            <div className="space-y-3">
                                {ORIGIN_SCENARIOS.map((scen) => (
                                    <button
                                        key={scen.id}
                                        onClick={() => setSelectedScenario(scen)}
                                        className="w-full text-left p-4 rounded-2xl border-4 transition cursor-pointer flex flex-col space-y-2"
                                        style={{
                                            backgroundColor: '#ffffff',
                                            borderColor: selectedScenario?.id === scen.id ? '#FF8FAE' : '#FBEAD4',
                                            boxShadow: selectedScenario?.id === scen.id ? '0 5px 0 rgba(241,102,140,0.35)' : '0 3px 0 rgba(107,74,70,0.1)',
                                            color: '#6B4A46'
                                        }}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <span className="text-3xl">{scen.icon}</span>
                                            <div>
                                                <div className="font-display font-extrabold text-base">{scen.titleFr}</div>
                                                <div className="text-xs font-bold text-[#9C7C77]">{scen.taglineFr}</div>
                                            </div>
                                        </div>
                                        {selectedScenario?.id === scen.id && (
                                            <div className="mt-2 pt-2 border-t-2 space-y-1.5" style={{ borderColor: '#FFF7EC' }}>
                                                <div className="text-xs font-bold" style={{ color: '#F1668C' }}>
                                                    <span>⚡ PERK : </span>{scen.perkDescFr}
                                                </div>
                                                <div className="flex flex-wrap gap-2 text-[10px] font-bold text-[#9C7C77]">
                                                    <span className="bg-[#FFF7EC] px-2 py-0.5 rounded border border-[#FBEAD4]">💰 {scen.initialFortune / 1000}k€</span>
                                                    <span className="bg-[#FFF7EC] px-2 py-0.5 rounded border border-[#FBEAD4]">⭐ {scen.baseStars}/5</span>
                                                    <span className="bg-[#FFF7EC] px-2 py-0.5 rounded border border-[#FBEAD4]">📈 Potentiel: {scen.potentialLabel}</span>
                                                </div>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ÉTAPE 3: RÉGION & PAYS */}
                    {step === 3 && (
                        <div className="w-full rounded-3xl p-6 shadow-md space-y-4" style={{ backgroundColor: '#ffffff', border: '4px solid #5EC2CC', color: '#6B4A46' }}>
                            <div className="text-center space-y-1">
                                <span className="text-4xl">🌍</span>
                                <h2 className="text-2xl font-display font-extrabold uppercase" style={{ color: '#6B4A46' }}>3. Tes Origines</h2>
                            </div>

                            <div className="space-y-3 text-xs font-bold">
                                <div>
                                    <label className="block mb-1" style={{ color: '#9C7C77' }}>Région Compétitive (RLCS) :</label>
                                    <select
                                        value={selectedRegion}
                                        onChange={(e) => setSelectedRegion(e.target.value as RegionKey)}
                                        className="w-full rounded-2xl p-3 font-display font-bold focus:outline-none"
                                        style={{ backgroundColor: '#FFF7EC', border: '2px solid #FBEAD4', color: '#6B4A46' }}
                                    >
                                        <option value="EU">🇪🇺 Europe (EU)</option>
                                        <option value="NA">🇺🇸 Amérique du Nord (NA)</option>
                                        <option value="MENA">🇸🇦 Moyen-Orient (MENA)</option>
                                        <option value="SAM">🇧🇷 Amérique du Sud (SAM)</option>
                                        <option value="OCE">🇦🇺 Océanie (OCE)</option>
                                        <option value="APAC">🌏 Asie-Pacifique (APAC)</option>
                                        <option value="SSA">🌍 Afrique Subsaharienne (SSA)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-1" style={{ color: '#9C7C77' }}>Ta Nationalité :</label>
                                    <select
                                        value={selectedCountry}
                                        onChange={(e) => setSelectedCountry(e.target.value)}
                                        className="w-full rounded-2xl p-3 font-display font-bold focus:outline-none"
                                        style={{ backgroundColor: '#FFF7EC', border: '2px solid #FBEAD4', color: '#6B4A46' }}
                                    >
                                        <option value="FR">🇫🇷 France</option>
                                        <option value="GB">🇬🇧 Royaume-Uni</option>
                                        <option value="ES">🇪🇸 Espagne</option>
                                        <option value="DE">🇩🇪 Allemagne</option>
                                        <option value="US">🇺🇸 États-Unis</option>
                                        <option value="BR">🇧🇷 Brésil</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ÉTAPE 4: CHOIX DU CLUB */}
                    {step === 4 && (
                        <div className="space-y-3 w-full">
                            <div className="text-center space-y-1">
                                <span className="text-4xl">🛡️</span>
                                <h2 className="text-2xl font-display font-extrabold uppercase" style={{ color: '#6B4A46' }}>4. Choix du Club</h2>
                                <p className="text-xs font-bold text-[#9C7C77]">
                                    Voici 4 clubs prêts à t'accueillir dans la région {selectedRegion}.
                                </p>
                            </div>

                            <div className="space-y-2.5">
                                {randomizedTeams.map((team) => (
                                    <button
                                        key={team.id}
                                        onClick={() => setSelectedTeamId(team.id)}
                                        className="w-full text-left p-3.5 rounded-2xl border-4 transition flex items-center justify-between cursor-pointer"
                                        style={{
                                            backgroundColor: '#ffffff',
                                            borderColor: selectedTeamId === team.id ? '#FFC94A' : '#FBEAD4',
                                            boxShadow: selectedTeamId === team.id ? '0 5px 0 rgba(240,168,15,0.35)' : '0 3px 0 rgba(107,74,70,0.1)',
                                            color: '#6B4A46'
                                        }}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="text-3xl">{team.logo}</div>
                                            <div>
                                                <div className="font-display font-extrabold text-sm" style={{ color: '#6B4A46' }}>{team.name}</div>
                                                <div className="flex items-center space-x-2 mt-1">
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-display font-bold" style={{ backgroundColor: '#FFC94A', color: '#6B4A46' }}>
                            {team.tierLabelFr}
                          </span>
                                                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: '#FFF7EC', color: '#6B4A46', border: '1px solid #FBEAD4' }}>
                            {team.region}
                          </span>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                </div>

                {/* NAVIGATION */}
                <div className="w-full pt-2 flex space-x-2">
                    {step > 1 && (
                        <button
                            onClick={() => setStep(step - 1)}
                            className="w-1/3 py-4 font-display font-bold text-sm uppercase rounded-2xl cursor-pointer shadow-md transition active:scale-95"
                            style={{ backgroundColor: '#ffffff', border: '2px solid #FBEAD4', color: '#9C7C77' }}
                        >
                            RETOUR
                        </button>
                    )}

                    {step < 4 ? (
                        <button
                            onClick={() => {
                                if (step === 2) handleValidateScenarioStep();
                                else setStep(step + 1);
                            }}
                            disabled={(step === 1 && !pseudo) || (step === 2 && !selectedScenario)}
                            className="flex-1 py-4 text-white font-display font-bold text-sm uppercase rounded-2xl cursor-pointer shadow-md disabled:opacity-50 transition active:scale-95"
                            style={{ backgroundColor: step === 3 ? '#5EC2CC' : '#FF8FAE' }}
                        >
                            SUIVANT ➔
                        </button>
                    ) : (
                        <button
                            onClick={handleFinishCreation}
                            disabled={!selectedTeamId || loading}
                            className="flex-1 py-4 font-display font-bold text-sm uppercase rounded-2xl cursor-pointer shadow-md disabled:opacity-50 transition active:scale-95"
                            style={{ backgroundColor: '#FFC94A', color: '#6B4A46' }}
                        >
                            {loading ? '...' : '🚀 SIGNER LE CONTRAT'}
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
}