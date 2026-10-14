// app/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export default function MainMenuPage() {
    const { user, signOut } = useAuth();
    const { language, setLanguage, t } = useLanguage();

    return (
        <div
            className="min-h-screen bg-vacation-pattern flex flex-col justify-between items-center p-4 font-sans select-none"
            style={{ backgroundColor: '#FFF7EC', color: '#6B4A46' }}
        >

            {/* CADRE MOBILE STRICT DE 420PX CENTRÉ */}
            <div className="w-full max-w-md mx-auto flex flex-col justify-between min-h-[92vh] space-y-6">

                {/* HEADER : LANGUE & AUTH */}
                <header className="flex justify-between items-center w-full pt-2">
                    <div
                        className="flex p-1 rounded-full shadow-sm"
                        style={{ backgroundColor: '#ffffff', border: '2px solid #FBEAD4' }}
                    >
                        <button
                            onClick={() => setLanguage('fr')}
                            className="px-3 py-1 rounded-full text-[11px] font-bold cursor-pointer transition"
                            style={{
                                backgroundColor: language === 'fr' ? '#FF8FAE' : 'transparent',
                                color: language === 'fr' ? '#ffffff' : '#9C7C77',
                            }}
                        >
                            🇫🇷 FR
                        </button>
                        <button
                            onClick={() => setLanguage('en')}
                            className="px-3 py-1 rounded-full text-[11px] font-bold cursor-pointer transition"
                            style={{
                                backgroundColor: language === 'en' ? '#5EC2CC' : 'transparent',
                                color: language === 'en' ? '#ffffff' : '#9C7C77',
                            }}
                        >
                            🇬🇧 EN
                        </button>
                    </div>

                    <div className="text-xs font-bold">
                        {user ? (
                            <div
                                className="flex items-center space-x-2 px-3 py-1.5 rounded-full shadow-sm"
                                style={{ backgroundColor: '#ffffff', border: '2px solid #FBEAD4' }}
                            >
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#8FE0C4' }} />
                                <span className="truncate max-w-[100px]" style={{ color: '#6B4A46' }}>
                  {user.email?.split('@')[0]}
                </span>
                                <button onClick={() => signOut()} className="font-bold ml-1 cursor-pointer" style={{ color: '#F1668C' }}>✕</button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="px-4 py-1.5 font-bold rounded-full text-xs shadow-sm cursor-pointer inline-block"
                                style={{ backgroundColor: '#FFC94A', color: '#6B4A46', border: '2px solid #F0A80F' }}
                            >
                                🔑 {t.common.profile}
                            </Link>
                        )}
                    </div>
                </header>

                {/* CONTENU CENTRAL : TITRE & BOUTONS CIBLÉS */}
                <main className="w-full my-auto space-y-6 text-center py-4">

                    <div className="space-y-2">
                        <div
                            className="inline-block px-4 py-1 rounded-full shadow-sm text-[10px] font-bold uppercase tracking-widest"
                            style={{ backgroundColor: '#ffffff', border: '2px solid #FBEAD4', color: '#F1668C' }}
                        >
                            {language === 'fr' ? 'Choisis ton mode de jeu' : 'Select your playmode'}
                        </div>

                        <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
                            <span style={{ color: '#F1668C' }}>ROCKET</span>{' '}
                            <span style={{ color: '#3DA3AE' }}>LEGENDS</span>
                        </h1>

                        <p className="text-sm font-bold" style={{ color: '#9C7C77' }}>
                            {language === 'fr' ? 'Édition vacances d\'été 🏖️' : 'Summer break edition 🏖️'}
                        </p>
                    </div>

                    {/* LES 2 MODES DE JEU (CARTES RESTREINTES ET PROPRES) */}
                    <div className="space-y-4 pt-2 w-full">

                        {/* MODE 1 : CARRIÈRE JOUEUR PRO */}
                        <Link
                            href="/saves/new?mode=player"
                            className="block w-full p-4 rounded-3xl transition active:scale-95 text-left shadow-md cursor-pointer"
                            style={{
                                backgroundColor: '#ffffff',
                                border: '3px solid #FF8FAE',
                                boxShadow: '0 5px 0 rgba(241,102,140,0.3)',
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                  <span
                      className="text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase"
                      style={{ backgroundColor: '#FF8FAE', color: '#ffffff' }}
                  >
                    {language === 'fr' ? 'Mode 1' : 'Mode 1'}
                  </span>
                                    <div className="font-extrabold text-base pt-0.5" style={{ color: '#6B4A46' }}>
                                        ⚽ {language === 'fr' ? 'Carrière Joueur Pro' : 'Pro Player Career'}
                                    </div>
                                    <div className="text-xs font-bold" style={{ color: '#9C7C77' }}>
                                        {language === 'fr' ? 'Cartes narratives, choix & ascension' : 'Story cards, choices & solo grind'}
                                    </div>
                                </div>
                                <span className="text-2xl font-black" style={{ color: '#F1668C' }}>➔</span>
                            </div>
                        </Link>

                        {/* MODE 2 : CARRIÈRE MANAGER */}
                        <Link
                            href="/saves/new?mode=manager"
                            className="block w-full p-4 rounded-3xl transition active:scale-95 text-left shadow-md cursor-pointer"
                            style={{
                                backgroundColor: '#ffffff',
                                border: '3px solid #5EC2CC',
                                boxShadow: '0 5px 0 rgba(61,163,174,0.3)',
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                  <span
                      className="text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase"
                      style={{ backgroundColor: '#5EC2CC', color: '#ffffff' }}
                  >
                    {language === 'fr' ? 'Mode 2' : 'Mode 2'}
                  </span>
                                    <div className="font-extrabold text-base pt-0.5" style={{ color: '#6B4A46' }}>
                                        📋 {language === 'fr' ? 'Carrière Manager' : 'Head Coach Career'}
                                    </div>
                                    <div className="text-xs font-bold" style={{ color: '#9C7C77' }}>
                                        {language === 'fr' ? 'Gestion de club, tactiques & draft' : 'Club management & rookie draft'}
                                    </div>
                                </div>
                                <span className="text-2xl font-black" style={{ color: '#3DA3AE' }}>➔</span>
                            </div>
                        </Link>

                        {/* MES SAUVEGARDES */}
                        {user && (
                            <Link
                                href="/saves"
                                className="flex items-center justify-center w-full py-3.5 px-6 font-bold text-xs uppercase tracking-wide rounded-2xl shadow-sm transition active:scale-95 cursor-pointer"
                                style={{ backgroundColor: '#ffffff', border: '2px solid #FBEAD4', color: '#6B4A46' }}
                            >
                                📁 {language === 'fr' ? 'Charger une carrière' : 'Load career save'}
                            </Link>
                        )}

                    </div>

                </main>

                {/* FOOTER */}
                <footer className="w-full text-center text-xs font-bold pt-2" style={{ color: '#9C7C77' }}>
                    Rocket Legends Mobile • Summer Season 2026
                </footer>

            </div>

        </div>
    );
}