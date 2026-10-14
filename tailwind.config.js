/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Palette "carnet de vacances" — chaude, sucrée, jamais grise
                sand: '#FFF7EC',        // fond de page, sable chaud
                sandDark: '#FBEAD4',    // fond secondaire / sections
                bubblegum: '#FF8FAE',   // accent principal (pastèque)
                bubblegumDark: '#F1668C',
                lagoon: '#5EC2CC',      // accent secondaire (piscine / océan)
                lagoonDark: '#3DA3AE',
                sun: '#FFC94A',         // accent tertiaire (soleil, badges, étoiles)
                sunDark: '#F0A80F',
                guava: '#C6A6E8',       // accent rare / légendaire (glace parfum raisin)
                guavaDark: '#A87BDB',
                mint: '#8FE0C4',        // succès / positif
                mintDark: '#4FBE99',
                cocoa: '#6B4A46',       // texte encre chaude (remplace le gris slate générique)
                cocoaLight: '#9C7C77',
            },
            fontFamily: {
                display: ['"Baloo 2"', 'ui-rounded', 'sans-serif'],
                body: ['"Quicksand"', 'ui-sans-serif', 'sans-serif'],
                hand: ['"Caveat"', 'cursive'],
            },
            borderRadius: {
                sticker: '1.75rem',
            },
            boxShadow: {
                sticker: '0 4px 0 rgba(107,74,70,0.15)',
                'sticker-lg': '0 6px 0 rgba(107,74,70,0.15)',
                'sticker-pink': '0 5px 0 rgba(241,102,140,0.35)',
                'sticker-lagoon': '0 5px 0 rgba(61,163,174,0.35)',
                'sticker-sun': '0 5px 0 rgba(240,168,15,0.35)',
                'sticker-guava': '0 5px 0 rgba(168,123,219,0.35)',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(var(--tilt, 0deg))' },
                    '50%': { transform: 'translateY(-5px) rotate(var(--tilt, 0deg))' },
                },
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-1.5deg)' },
                    '50%': { transform: 'rotate(1.5deg)' },
                },
                bob: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '50%': { transform: 'translateX(-12px)' },
                },
            },
            animation: {
                float: 'float 4.5s ease-in-out infinite',
                wiggle: 'wiggle 6s ease-in-out infinite',
                bob: 'bob 9s ease-in-out infinite',
            },
        },
    },
    plugins: [],
}