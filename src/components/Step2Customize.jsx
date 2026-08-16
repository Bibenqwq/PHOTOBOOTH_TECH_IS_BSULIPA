import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { renderPhotoStrip, STICKER_PACKS, THEME } from '../utils/canvasRenderer';

export const FILTERS = [
    {
        id: 'normal',
        label: 'Natural',
        renderIcon: () => (
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 3v18" />
                <path d="M3 12h18" />
            </svg>
        )
    },
    {
        id: 'vintage',
        label: 'Warm Vintage',
        renderIcon: () => (
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                <line x1="7" y1="2" x2="7" y2="22" />
                <line x1="17" y1="2" x2="17" y2="22" />
                <line x1="2" y1="12" x2="22" y2="12" />
            </svg>
        )
    },
    {
        id: 'bw',
        label: 'B&W Noir',
        renderIcon: () => (
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a10 10 0 0 0 0 20z" fill="currentColor" />
            </svg>
        )
    },
    {
        id: 'warm',
        label: 'Golden Hour',
        renderIcon: () => (
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
            </svg>
        )
    },
    {
        id: 'cool',
        label: 'Cyber Mist',
        renderIcon: () => (
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" />
            </svg>
        )
    },
    {
        id: 'film',
        label: '90s Film',
        renderIcon: () => (
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
            </svg>
        )
    },
];

export const FRAMES = [
    // VIRAL BRAINROT & GEN-Z MEME SERIES
    {
        id: 'brainrot_mewing_sigma',
        label: 'Sigma Mewing & Mog',
        sub: 'Bye Bye · Jawline Rizz',
        tag: 'SIGMA MEWING',
        pattern: 'brainrot_sigma_mockup',
        cardBg: '#121214',
        accent: '#00E5FF',
    },
    {
        id: 'brainrot_skibidi_toilet',
        label: 'Skibidi Rizz Dop Dop',
        sub: 'Dop Dop Yes Yes · Y2K Glitch',
        tag: 'SKIBIDI RIZZ',
        pattern: 'brainrot_skibidi_mockup',
        cardBg: '#0B0A12',
        accent: '#00F0FF',
    },
    {
        id: 'brainrot_chill_guy',
        label: 'Just A Chill Guy',
        sub: 'Low Stress · Unbothered King',
        tag: 'CHILL GUY',
        pattern: 'brainrot_chill_mockup',
        cardBg: '#F6EFE6',
        accent: '#8C6239',
    },
    {
        id: 'brainrot_rizzler',
        label: 'Unspoken W Rizz',
        sub: 'The Ultimate Rizzler',
        tag: 'W RIZZ ONLY',
        pattern: 'brainrot_rizzler_mockup',
        cardBg: '#4A050B',
        accent: '#FFE6A7',
    },
    {
        id: 'brainrot_grimace_shake',
        label: 'Gyatt & Grimace Shake',
        sub: 'Purple Chaos · Level 100 Gyatt',
        tag: 'LEVEL 100 GYATT',
        pattern: 'brainrot_grimace_mockup',
        cardBg: '#240046',
        accent: '#E0AAFF',
    },
    {
        id: 'brainrot_capybara',
        label: 'Ok I Pull Up Capybara',
        sub: 'Coconut Doggy · Sunset Chill',
        tag: 'OK I PULL UP',
        pattern: 'brainrot_capybara_mockup',
        cardBg: '#FFF1E6',
        accent: '#F77F00',
    },
    {
        id: 'brainrot_subo_tung',
        label: 'Tung Tung & Aura Master',
        sub: 'What Da Hell · 1,000,000 Aura',
        tag: '1M AURA TUNG',
        pattern: 'brainrot_tung_mockup',
        cardBg: '#0A0A0A',
        accent: '#CCFF00',
    },
    // CLIMATE ACTION & PASTEL SERIES
    {
        id: 'climate_sage_earth',
        label: 'Think Green Sage',
        sub: 'Template 01 · Forest Green & Earth',
        tag: 'CLIMATE ACTION T1',
        pattern: 'climate_t1_mockup',
        cardBg: '#E2EBE0',
        accent: '#1B4332',
    },
    {
        id: 'climate_bear_matcha',
        label: 'Matcha Bear Impact',
        sub: 'Template 02 · Mascot & Cream',
        tag: 'CLIMATE ACTION T2',
        pattern: 'climate_t2_mockup',
        cardBg: '#EBF3E7',
        accent: '#2D5A27',
    },
    {
        id: 'climate_lavender_heal',
        label: 'Lavender Heal Planet',
        sub: 'Template 03 · Lilac Rainbow & Heart',
        tag: 'CLIMATE ACTION T3',
        pattern: 'climate_t3_mockup',
        cardBg: '#EFEAF8',
        accent: '#5E4B8B',
    },
    // RED EDITIONS & SPARTAN PRIDE
    {
        id: 'spartan_crimson',
        label: 'Red Spartan Varsity',
        sub: 'Deep Crimson & Gold Trim',
        tag: 'RED SPARTAN PRIDE',
        pattern: 'spartan',
        cardBg: '#7A0C16',
        accent: '#F4B41A',
    },
    {
        id: 'cherry_velvet',
        label: 'Cherry Velvet & Bows',
        sub: 'French Cherry & Pearl Trim',
        tag: 'SWEET CHERRY RED',
        pattern: 'cherry_frame',
        cardBg: '#9E1B32',
        accent: '#FFCCD5',
    },
    {
        id: 'cyber_scarlet',
        label: 'Scarlet Cyber Stars',
        sub: 'Vibrant Scarlet & Gold Stars',
        tag: 'Y2K RED EDITION',
        pattern: 'scarlet_frame',
        cardBg: '#D90429',
        accent: '#FFD166',
    },
    {
        id: 'klique_scallop',
        label: 'Red Spartan Scallop',
        sub: 'Vintage Striped Lace Oval',
        tag: 'TRENDING VINTAGE',
        pattern: 'scallop',
        cardBg: '#FBF6EB',
        accent: '#681B24',
        allowedLayouts: ['2-cut'], // Exclusive to Duo Strip (2-Cut)
    },
    {
        id: 'coquette_bow',
        label: 'Coquette Ribbons',
        sub: 'Pastel Blush & Satin Bows',
        tag: 'SWEET AESTHETIC',
        pattern: 'bow',
        cardBg: '#FFF0F3',
        accent: '#C9184A',
    },
    {
        id: 'kodak_35mm',
        label: '35mm Filmstrip',
        sub: 'Authentic Sprockets & ISO',
        tag: 'ANALOG KODAK',
        pattern: 'film',
        cardBg: '#141414',
        accent: '#F4B41A',
    },
    {
        id: 'y2k_cyber',
        label: 'Y2K Cyber Stars',
        sub: 'Chrome Glow & Metallic',
        tag: 'Y2K CHROME',
        pattern: 'y2k',
        cardBg: '#18122B',
        accent: '#E5D4FF',
    },
    {
        id: 'korean_washi',
        label: 'Korean Photomaton',
        sub: 'Pastel Washi Tape & Stamps',
        tag: 'LIFE 4 CUTS',
        pattern: 'washi',
        cardBg: '#F6F4EE',
        accent: '#2E4057',
    },
    {
        id: 'climate',
        label: 'Tech Emerald',
        sub: 'Forest Green & Gold Trim',
        tag: 'OFFICIAL BOOTH',
        pattern: 'emerald',
        cardBg: '#173F30',
        accent: '#F2F0E7',
    },
    {
        id: 'noir',
        label: 'Noir Editorial',
        sub: 'Luxury Monochrome Studio',
        tag: 'HIGH FASHION',
        pattern: 'noir',
        cardBg: '#050505',
        accent: '#FFFFFF',
    },
    {
        id: 'retro_arcade',
        label: 'Retro Neon Pop',
        sub: 'Vaporwave Sunset & Lilac',
        tag: '90s ARCADE',
        pattern: 'arcade',
        cardBg: '#24103A',
        accent: '#FF6B8B',
    },
];

// Helper to render crisp SVG icons for the sticker palette
export function renderStickerSvgIcon(item, size = 32) {
    const color = item.color || '#F4B41A';

    switch (item.type) {
        case 'vector_bow':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <path d="M24 24 C14 12, 10 32, 24 24 Z" fill={color} stroke="#FFFFFF" strokeWidth="1.5" />
                    <path d="M24 24 C34 12, 38 32, 24 24 Z" fill={color} stroke="#FFFFFF" strokeWidth="1.5" />
                    <path d="M22 26 Q16 38, 12 42" stroke={color} strokeWidth="3" strokeLinecap="round" />
                    <path d="M26 26 Q32 38, 36 42" stroke={color} strokeWidth="3" strokeLinecap="round" />
                    <circle cx="24" cy="24" r="5" fill="#FFFFFF" stroke={color} strokeWidth="1.5" />
                </svg>
            );
        case 'vector_heart':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <path d="M24 40 C10 28, 4 16, 12 10 C18 6, 22 10, 24 14 C26 10, 30 6, 36 10 C44 16, 38 28, 24 40 Z" fill={color} stroke="#FFFFFF" strokeWidth="1.5" />
                    <circle cx="16" cy="14" r="3" fill="rgba(255,255,255,0.6)" />
                </svg>
            );
        case 'vector_sparkle_heart':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <path d="M24 40 C10 28, 4 16, 12 10 C18 6, 22 10, 24 14 C26 10, 30 6, 36 10 C44 16, 38 28, 24 40 Z" fill={color} stroke="#FFFFFF" strokeWidth="1.5" />
                    <path d="M34 6 Q34 14, 42 14 Q34 14, 34 22 Q34 14, 26 14 Q34 14, 34 6 Z" fill="#FFFFFF" />
                </svg>
            );
        case 'vector_star4':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <path d="M24 4 Q24 24, 44 24 Q24 24, 24 44 Q24 24, 4 24 Q24 24, 24 4 Z" fill={color} />
                    <circle cx="24" cy="24" r="3.5" fill="#FFFFFF" />
                </svg>
            );
        case 'vector_star8':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <path d="M24 4 Q24 24, 44 24 Q24 24, 24 44 Q24 24, 4 24 Q24 24, 24 4 Z" fill={color} />
                    <g transform="rotate(45 24 24)">
                        <path d="M24 10 Q24 24, 38 24 Q24 24, 24 38 Q24 24, 10 24 Q24 24, 24 10 Z" fill={color} opacity="0.85" />
                    </g>
                    <circle cx="24" cy="24" r="3.5" fill="#FFFFFF" />
                </svg>
            );
        case 'vector_butterfly':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <path d="M24 24 C12 8, 4 20, 24 24 Z" fill={color} stroke="#FFFFFF" strokeWidth="1" />
                    <path d="M24 24 C36 8, 44 20, 24 24 Z" fill={color} stroke="#FFFFFF" strokeWidth="1" />
                    <path d="M24 24 C14 36, 18 42, 24 24 Z" fill={color} stroke="#FFFFFF" strokeWidth="1" />
                    <path d="M24 24 C34 36, 30 42, 24 24 Z" fill={color} stroke="#FFFFFF" strokeWidth="1" />
                    <ellipse cx="24" cy="24" rx="2.5" ry="8" fill="#FFFFFF" />
                </svg>
            );
        case 'vector_flame':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <path d="M24 6 C28 14, 40 20, 36 34 C32 44, 16 44, 12 34 C8 24, 20 18, 24 6 Z" fill={color} stroke="#FFE3A8" strokeWidth="1" />
                    <path d="M24 20 C27 26, 32 30, 29 36 C27 40, 21 40, 19 36 C17 32, 22 28, 24 20 Z" fill="#FFD166" />
                </svg>
            );
        case 'vector_lightning':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <path d="M28 4 L14 24 L24 24 L20 44 L34 20 L24 20 Z" fill={color} stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
            );
        case 'vector_flower':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="12" r="7" fill="#FFFFFF" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
                    <circle cx="35" cy="20" r="7" fill="#FFFFFF" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
                    <circle cx="31" cy="33" r="7" fill="#FFFFFF" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
                    <circle cx="17" cy="33" r="7" fill="#FFFFFF" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
                    <circle cx="13" cy="20" r="7" fill="#FFFFFF" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
                    <circle cx="24" cy="24" r="6" fill={color} />
                </svg>
            );
        case 'vector_cherry':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <path d="M16 28 Q24 10, 32 8" stroke="#38B000" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M32 28 Q24 10, 32 8" stroke="#38B000" strokeWidth="2.5" strokeLinecap="round" />
                    <ellipse cx="28" cy="12" rx="5" ry="2.5" transform="rotate(30 28 12)" fill="#70E000" />
                    <circle cx="16" cy="32" r="7.5" fill={color} />
                    <circle cx="32" cy="32" r="7.5" fill={color} />
                    <circle cx="14" cy="29" r="2" fill="#FFFFFF" />
                    <circle cx="30" cy="29" r="2" fill="#FFFFFF" />
                </svg>
            );
        case 'vector_angel_wings':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <path d="M24 24 C16 12, 4 16, 8 28 C12 34, 20 30, 24 24 Z" fill={color} stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
                    <path d="M24 24 C32 12, 44 16, 40 28 C36 34, 28 30, 24 24 Z" fill={color} stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
                </svg>
            );
        case 'vector_camera':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <rect x="6" y="14" width="36" height="26" rx="4" fill={color} />
                    <circle cx="24" cy="27" r="8" fill="#FFFFFF" />
                    <circle cx="24" cy="27" r="5" fill="#141414" />
                    <circle cx="34" cy="20" r="2.5" fill="#F4B41A" />
                </svg>
            );
        case 'vector_kiss_lips':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <path d="M6 24 C14 14, 20 18, 24 22 C28 18, 34 14, 42 24 C34 22, 14 22, 6 24 Z" fill={color} />
                    <path d="M6 24 C14 36, 34 36, 42 24 C32 26, 16 26, 6 24 Z" fill={color} />
                    <ellipse cx="24" cy="29" rx="3" ry="1.5" fill="rgba(255,255,255,0.6)" />
                </svg>
            );
        case 'vector_rose':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <ellipse cx="14" cy="34" rx="8" ry="4" transform="rotate(30 14 34)" fill="#38B000" />
                    <ellipse cx="34" cy="34" rx="8" ry="4" transform="rotate(-30 34 34)" fill="#38B000" />
                    <circle cx="24" cy="22" r="14" fill={color} />
                    <circle cx="22" cy="20" r="9" fill="#A01A3D" />
                    <circle cx="24" cy="22" r="5" fill="#FF4D6D" stroke="#FFFFFF" strokeWidth="1" />
                </svg>
            );
        case 'vector_clover':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <circle cx="18" cy="18" r="6" fill={color} stroke="#FFFFFF" strokeWidth="1" />
                    <circle cx="30" cy="18" r="6" fill={color} stroke="#FFFFFF" strokeWidth="1" />
                    <circle cx="18" cy="30" r="6" fill={color} stroke="#FFFFFF" strokeWidth="1" />
                    <circle cx="30" cy="30" r="6" fill={color} stroke="#FFFFFF" strokeWidth="1" />
                    <path d="M24 28 Q28 38, 30 42" stroke={color} strokeWidth="3" strokeLinecap="round" />
                </svg>
            );
        case 'vector_crown':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <path d="M8 36 L8 18 L16 26 L24 14 L32 26 L40 18 L40 36 Z" fill={color} stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" />
                    <circle cx="24" cy="14" r="2.5" fill="#E63946" />
                    <circle cx="8" cy="18" r="2" fill="#E63946" />
                    <circle cx="40" cy="18" r="2" fill="#E63946" />
                </svg>
            );
        case 'vector_cyber_cross':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <path d="M24 4 L28 20 L44 24 L28 28 L24 44 L20 28 L4 24 L20 20 Z" fill={color} stroke="#FFFFFF" strokeWidth="1.5" />
                    <circle cx="24" cy="24" r="3.5" fill="#FFFFFF" />
                </svg>
            );
        case 'vector_sparkles':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <path d="M22 6 Q22 22, 38 22 Q22 22, 22 38 Q22 22, 6 22 Q22 22, 22 6 Z" fill={color} />
                    <path d="M36 4 Q36 12, 44 12 Q36 12, 36 20 Q36 12, 28 12 Q36 12, 36 4 Z" fill="#FFFFFF" />
                    <path d="M12 28 Q12 34, 18 34 Q12 34, 12 40 Q12 34, 6 34 Q12 34, 12 28 Z" fill={color} />
                </svg>
            );
        case 'vector_music_note':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <ellipse cx="16" cy="34" rx="6" ry="4" transform="rotate(-20 16 34)" fill={color} />
                    <ellipse cx="34" cy="30" rx="6" ry="4" transform="rotate(-20 34 30)" fill={color} />
                    <path d="M20 32 L20 12 L38 8 L38 28" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20 12 L38 8" stroke="#FFFFFF" strokeWidth="1.5" />
                </svg>
            );
        case 'vector_sunglasses':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <rect x="6" y="20" width="16" height="12" rx="3" fill={color} stroke="#FFFFFF" strokeWidth="1.5" />
                    <rect x="26" y="20" width="16" height="12" rx="3" fill={color} stroke="#FFFFFF" strokeWidth="1.5" />
                    <line x1="22" y1="24" x2="26" y2="24" stroke="#FFFFFF" strokeWidth="2" />
                    <line x1="8" y1="23" x2="16" y2="29" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
                    <line x1="28" y1="23" x2="36" y2="29" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
                </svg>
            );
        case 'badge':
            return (
                <span className="mini-badge-btn" style={{ background: item.bgColor, color: item.textColor, borderColor: item.borderColor || '#FFFFFF' }}>
                    {item.content}
                </span>
            );
        default:
            return null;
    }
}

function FrameMockupPreview({ pattern }) {
    switch (pattern) {
        case 'brainrot_sigma_mockup':
            return (
                <div className="mockup-brainrot-frame" style={{ background: '#121214', borderColor: '#FFD700' }}>
                    <span className="brainrot-badge-tag" style={{ background: '#00E5FF', color: '#000000' }}>MOG</span>
                    <div className="brainrot-slot" style={{ borderColor: '#FFD700' }} />
                    <span className="brainrot-icon-br">🤫</span>
                </div>
            );
        case 'brainrot_skibidi_mockup':
            return (
                <div className="mockup-brainrot-frame" style={{ background: '#0B0A12', borderColor: '#00F0FF' }}>
                    <span className="brainrot-badge-tag" style={{ background: '#FF0055', color: '#FFFFFF' }}>RIZZ</span>
                    <div className="brainrot-slot" style={{ borderColor: '#00F0FF' }} />
                    <span className="brainrot-icon-br">🚽</span>
                </div>
            );
        case 'brainrot_chill_mockup':
            return (
                <div className="mockup-brainrot-frame" style={{ background: '#F6EFE6', borderColor: '#6B4E3D' }}>
                    <span className="brainrot-badge-tag" style={{ background: '#8C6239', color: '#FFFFFF' }}>CHILL</span>
                    <div className="brainrot-slot" style={{ borderColor: '#6B4E3D' }} />
                    <span className="brainrot-icon-br">🧢</span>
                </div>
            );
        case 'brainrot_rizzler_mockup':
            return (
                <div className="mockup-brainrot-frame" style={{ background: '#4A050B', borderColor: '#FFE6A7' }}>
                    <span className="brainrot-badge-tag" style={{ background: '#FF4D6D', color: '#FFFFFF' }}>W</span>
                    <div className="brainrot-slot" style={{ borderColor: '#FFE6A7' }} />
                    <span className="brainrot-icon-br">🍷</span>
                </div>
            );
        case 'brainrot_grimace_mockup':
            return (
                <div className="mockup-brainrot-frame" style={{ background: '#240046', borderColor: '#C77DFF' }}>
                    <span className="brainrot-badge-tag" style={{ background: '#70E000', color: '#000000' }}>GYATT</span>
                    <div className="brainrot-slot" style={{ borderColor: '#C77DFF' }} />
                    <span className="brainrot-icon-br">👾</span>
                </div>
            );
        case 'brainrot_capybara_mockup':
            return (
                <div className="mockup-brainrot-frame" style={{ background: '#FFF1E6', borderColor: '#7F4F24' }}>
                    <span className="brainrot-badge-tag" style={{ background: '#F77F00', color: '#FFFFFF' }}>PULL UP</span>
                    <div className="brainrot-slot" style={{ borderColor: '#7F4F24' }} />
                    <span className="brainrot-icon-br">🍊</span>
                </div>
            );
        case 'brainrot_tung_mockup':
            return (
                <div className="mockup-brainrot-frame" style={{ background: '#0A0A0A', borderColor: '#CCFF00' }}>
                    <span className="brainrot-badge-tag" style={{ background: '#FF0033', color: '#FFFFFF' }}>1M</span>
                    <div className="brainrot-slot" style={{ borderColor: '#CCFF00' }} />
                    <span className="brainrot-icon-br">🔥</span>
                </div>
            );
        case 'climate_t1_mockup':
            return (
                <div className="mockup-climate-frame" style={{ background: '#E2EBE0', borderColor: '#1B4332' }}>
                    <span className="climate-badge-num" style={{ background: '#1B4332' }}>1</span>
                    <div className="climate-slot" style={{ borderColor: '#1B4332' }} />
                    <span className="climate-icon-br">🌍</span>
                </div>
            );
        case 'climate_t2_mockup':
            return (
                <div className="mockup-climate-frame" style={{ background: '#EBF3E7', borderColor: '#2D5A27' }}>
                    <span className="climate-badge-num" style={{ background: '#2D5A27' }}>2</span>
                    <div className="climate-slot" style={{ borderColor: '#2D5A27' }} />
                    <span className="climate-icon-br">🐻</span>
                </div>
            );
        case 'climate_t3_mockup':
            return (
                <div className="mockup-climate-frame" style={{ background: '#EFEAF8', borderColor: '#5E4B8B' }}>
                    <span className="climate-badge-num" style={{ background: '#5E4B8B' }}>3</span>
                    <div className="climate-slot" style={{ borderColor: '#5E4B8B' }} />
                    <span className="climate-icon-br">🌈</span>
                </div>
            );
        case 'spartan':
            return (
                <div className="mockup-spartan-frame">
                    <span className="spartan-star-top">✦</span>
                    <div className="spartan-slot" />
                    <span className="spartan-star-bottom">✦</span>
                </div>
            );
        case 'cherry_frame':
            return (
                <div className="mockup-cherry-frame">
                    <span className="cherry-bow-icon">🎀</span>
                    <div className="cherry-slot" />
                    <span className="cherry-duo-icon">🍒</span>
                </div>
            );
        case 'scarlet_frame':
            return (
                <div className="mockup-scarlet-frame">
                    <span className="scarlet-star-tr">★</span>
                    <div className="scarlet-slot" />
                    <span className="scarlet-star-bl">★</span>
                </div>
            );
        case 'scallop':
            return (
                <div className="mockup-scallop-oval">
                    <div className="mockup-scallop-stripes" />
                    <div className="mockup-scallop-inner" />
                </div>
            );
        case 'bow':
            return (
                <div className="mockup-bow-frame">
                    <span className="mockup-bow-icon">🎀</span>
                    <div className="mockup-bow-inner" />
                </div>
            );
        case 'film':
            return (
                <div className="mockup-film-frame">
                    <div className="film-dots-left" />
                    <div className="film-slot" />
                    <div className="film-dots-right" />
                </div>
            );
        case 'y2k':
            return (
                <div className="mockup-y2k-frame">
                    <span className="y2k-star top-left">✦</span>
                    <div className="y2k-slot" />
                    <span className="y2k-star bottom-right">✦</span>
                </div>
            );
        case 'washi':
            return (
                <div className="mockup-washi-frame">
                    <div className="washi-tape-sticker" />
                    <div className="washi-slot" />
                </div>
            );
        case 'emerald':
            return (
                <div className="mockup-emerald-frame">
                    <div className="emerald-slot" />
                </div>
            );
        case 'noir':
            return (
                <div className="mockup-noir-frame">
                    <div className="noir-slot" />
                </div>
            );
        case 'arcade':
            return (
                <div className="mockup-arcade-frame">
                    <span className="arcade-icon">👾</span>
                    <div className="arcade-slot" />
                </div>
            );
        default:
            return <div className="mockup-default-frame" />;
    }
}



export default function Step2Customize({
    shots,
    selectedLayout = '4-cut',
    selectedFrame,
    setSelectedFrame,
    selectedFilter,
    setSelectedFilter,
    stickers = [],
    setStickers,
    logoImg,
    onBack,
    onProceed,
}) {
    const canvasRef = useRef(null);
    const previewWrapperRef = useRef(null);

    const [activeTab, setActiveTab] = useState('frames'); // 'frames' | 'stickers'
    const [selectedStickerId, setSelectedStickerId] = useState(null);
    const [draggingId, setDraggingId] = useState(null);

    // Filter available frames: "Red Spartan Scallop" only available for '2-cut' (Duo Strip)
    const availableFrames = FRAMES.filter(f => !f.allowedLayouts || f.allowedLayouts.includes(selectedLayout));

    const [frameCategory, setFrameCategory] = useState('all'); // 'all' | 'brainrot' | 'climate' | 'red' | 'aesthetic'

    const categoryCounts = useMemo(() => ({
        all: availableFrames.length,
        brainrot: availableFrames.filter(f => f.id.startsWith('brainrot_')).length,
        climate: availableFrames.filter(f => f.id.startsWith('climate')).length,
        red: availableFrames.filter(f => f.id.startsWith('spartan') || f.id.startsWith('cherry') || f.id.startsWith('cyber_scarlet') || f.id.startsWith('klique')).length,
        aesthetic: availableFrames.filter(f => !f.id.startsWith('climate') && !f.id.startsWith('brainrot_') && !f.id.startsWith('spartan') && !f.id.startsWith('cherry') && !f.id.startsWith('cyber_scarlet') && !f.id.startsWith('klique')).length,
    }), [availableFrames]);

    const displayedFrames = useMemo(() => {
        if (frameCategory === 'brainrot') return availableFrames.filter(f => f.id.startsWith('brainrot_'));
        if (frameCategory === 'climate') return availableFrames.filter(f => f.id.startsWith('climate'));
        if (frameCategory === 'red') return availableFrames.filter(f => f.id.startsWith('spartan') || f.id.startsWith('cherry') || f.id.startsWith('cyber_scarlet') || f.id.startsWith('klique'));
        if (frameCategory === 'aesthetic') return availableFrames.filter(f => !f.id.startsWith('climate') && !f.id.startsWith('brainrot_') && !f.id.startsWith('spartan') && !f.id.startsWith('cherry') && !f.id.startsWith('cyber_scarlet') && !f.id.startsWith('klique'));
        return availableFrames;
    }, [availableFrames, frameCategory]);

    const currentIndex = Math.max(0, displayedFrames.findIndex(f => f.id === selectedFrame));
    const totalSlides = displayedFrames.length;
    const activeFrame = displayedFrames[currentIndex] || displayedFrames[0] || availableFrames[0];

    // Slideshow slide navigation
    const handleSlide = (direction) => {
        if (totalSlides === 0) return;
        const nextIndex = (currentIndex + direction + totalSlides) % totalSlides;
        setSelectedFrame(displayedFrames[nextIndex].id);
    };

    const handleSelectCategory = (cat) => {
        setFrameCategory(cat);
        let newFrames = availableFrames;
        if (cat === 'brainrot') newFrames = availableFrames.filter(f => f.id.startsWith('brainrot_'));
        else if (cat === 'climate') newFrames = availableFrames.filter(f => f.id.startsWith('climate'));
        else if (cat === 'red') newFrames = availableFrames.filter(f => f.id.startsWith('spartan') || f.id.startsWith('cherry') || f.id.startsWith('cyber_scarlet') || f.id.startsWith('klique'));
        else if (cat === 'aesthetic') newFrames = availableFrames.filter(f => !f.id.startsWith('climate') && !f.id.startsWith('brainrot_') && !f.id.startsWith('spartan') && !f.id.startsWith('cherry') && !f.id.startsWith('cyber_scarlet') && !f.id.startsWith('klique'));

        if (newFrames.length > 0 && !newFrames.some(f => f.id === selectedFrame)) {
            setSelectedFrame(newFrames[0].id);
        }
    };

    const handleRandomFrame = () => {
        const list = displayedFrames.length > 0 ? displayedFrames : availableFrames;
        const remaining = list.filter(f => f.id !== selectedFrame);
        if (remaining.length > 0) {
            const rand = remaining[Math.floor(Math.random() * remaining.length)];
            setSelectedFrame(rand.id);
        }
    };

    // Fallback frame if current frame is not available for this layout (e.g. 4-cut)
    useEffect(() => {
        if (selectedFrame === 'klique_scallop' && selectedLayout !== '2-cut') {
            setSelectedFrame('kodak_35mm');
        }
    }, [selectedLayout, selectedFrame, setSelectedFrame]);

    // Re-render canvas on state change
    useEffect(() => {
        if (canvasRef.current && shots && shots.length > 0) {
            renderPhotoStrip(canvasRef.current, shots, selectedFrame, selectedFilter, logoImg, selectedLayout, stickers);
        }
    }, [shots, selectedLayout, selectedFrame, selectedFilter, stickers, logoImg]);

    // Add new vector sticker to canvas
    const handleAddSticker = (item) => {
        const newStk = {
            id: 'stk_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
            content: item.content,
            label: item.label,
            type: item.type,
            bgColor: item.bgColor,
            textColor: item.textColor,
            color: item.color,
            x: 0.5 + (Math.random() * 0.2 - 0.1),
            y: 0.5 + (Math.random() * 0.2 - 0.1),
            size: item.size || 48,
            rotation: Math.floor(Math.random() * 20 - 10),
        };
        setStickers(prev => [...prev, newStk]);
        setSelectedStickerId(newStk.id);
    };

    // Remove sticker
    const handleDeleteSticker = (id, e) => {
        if (e) e.stopPropagation();
        setStickers(prev => prev.filter(s => s.id !== id));
        if (selectedStickerId === id) setSelectedStickerId(null);
    };

    // Clear all stickers
    const handleClearAllStickers = () => {
        setStickers([]);
        setSelectedStickerId(null);
    };

    // Resize active sticker
    const handleUpdateSize = (id, newSize) => {
        setStickers(prev => prev.map(s => s.id === id ? { ...s, size: Math.max(24, Math.min(110, newSize)) } : s));
    };

    // Rotate active sticker
    const handleUpdateRotation = (id, newRot) => {
        setStickers(prev => prev.map(s => s.id === id ? { ...s, rotation: newRot } : s));
    };

    // ── Drag & Drop Handling ──────────────────────────────────────────────────
    const handlePointerDown = (id, e) => {
        e.stopPropagation();
        setSelectedStickerId(id);
        setDraggingId(id);
    };

    const handlePointerMove = useCallback((e) => {
        if (!draggingId || !previewWrapperRef.current) return;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const rect = previewWrapperRef.current.getBoundingClientRect();
        if (!rect.width || !rect.height) return;

        const rawX = (clientX - rect.left) / rect.width;
        const rawY = (clientY - rect.top) / rect.height;

        const clampedX = Math.max(0.04, Math.min(0.96, rawX));
        const clampedY = Math.max(0.04, Math.min(0.96, rawY));

        setStickers(prev => prev.map(s => s.id === draggingId ? { ...s, x: clampedX, y: clampedY } : s));
    }, [draggingId, setStickers]);

    const handlePointerUp = useCallback(() => {
        setDraggingId(null);
    }, []);

    useEffect(() => {
        if (draggingId) {
            window.addEventListener('mousemove', handlePointerMove);
            window.addEventListener('mouseup', handlePointerUp);
            window.addEventListener('touchmove', handlePointerMove, { passive: false });
            window.addEventListener('touchend', handlePointerUp);
        }
        return () => {
            window.removeEventListener('mousemove', handlePointerMove);
            window.removeEventListener('mouseup', handlePointerUp);
            window.removeEventListener('touchmove', handlePointerMove);
            window.removeEventListener('touchend', handlePointerUp);
        };
    }, [draggingId, handlePointerMove, handlePointerUp]);

    const activeSticker = stickers.find(s => s.id === selectedStickerId);

    return (
        <section className="panel step2-layout">
            <div className="design-controls">
                <div className="step-title-row" style={{ marginBottom: '14px' }}>
                    <div>
                        <div className="step-title">Step 3 — Customize Design</div>
                        <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--forest-2, #40584c)' }}>
                            Personalize your frames, filters, and drag-and-drop modern vector decals!
                        </p>
                    </div>
                </div>

                {/* Customization Tabs */}
                <div className="customize-tabs">
                    <button
                        type="button"
                        className={`tab-btn ${activeTab === 'frames' ? 'active' : ''}`}
                        onClick={() => setActiveTab('frames')}
                    >
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                        </svg>
                        Frame & Filter
                    </button>
                    <button
                        type="button"
                        className={`tab-btn ${activeTab === 'stickers' ? 'active' : ''}`}
                        onClick={() => setActiveTab('stickers')}
                    >
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        Vector Decals & Badges
                        {stickers.length > 0 && <span className="tab-badge">{stickers.length}</span>}
                    </button>
                </div>

                {/* TAB 1: FRAMES & FILTERS */}
                {activeTab === 'frames' && (
                    <div className="tab-content">
                        <div className="side-subhead">PHOTO FILTER</div>
                        <div className="filters">
                            {FILTERS.map(f => (
                                <button
                                    key={f.id}
                                    type="button"
                                    className={`filter-btn ${selectedFilter === f.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedFilter(f.id)}
                                >
                                    <span style={{ marginRight: '6px', display: 'inline-flex', verticalAlign: 'middle' }}>
                                        {f.renderIcon ? f.renderIcon() : null}
                                    </span>
                                    {f.label}
                                </button>
                            ))}
                        </div>

                        {/* GRAPHIC FRAME THEME SLIDESHOW SHOWCASE */}
                        <div className="frame-slideshow-container">
                            <div className="slideshow-header-row">
                                <div className="frame-header-title">
                                    <span className="side-subhead" style={{ margin: 0 }}>GRAPHIC FRAME THEME</span>
                                    {selectedLayout === '2-cut' && (
                                        <span className="exclusive-badge">Duo Strip Exclusive</span>
                                    )}
                                </div>

                                <div className="slideshow-counter-badge">
                                    <span className="slide-num">{String(currentIndex + 1).padStart(2, '0')}</span>
                                    <span className="slide-total">/ {String(totalSlides).padStart(2, '0')}</span>
                                </div>
                            </div>

                            {/* Category Filter Pills with Clean Vector Icons */}
                            <div className="frame-category-pills">
                                <button
                                    type="button"
                                    className={`frame-cat-pill ${frameCategory === 'all' ? 'active' : ''}`}
                                    onClick={() => handleSelectCategory('all')}
                                >
                                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ marginRight: '4px' }}>
                                        <rect x="3" y="3" width="7" height="7" />
                                        <rect x="14" y="3" width="7" height="7" />
                                        <rect x="14" y="14" width="7" height="7" />
                                        <rect x="3" y="14" width="7" height="7" />
                                    </svg>
                                    All ({categoryCounts.all})
                                </button>
                                <button
                                    type="button"
                                    className={`frame-cat-pill ${frameCategory === 'brainrot' ? 'active' : ''}`}
                                    onClick={() => handleSelectCategory('brainrot')}
                                >
                                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ marginRight: '4px' }}>
                                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                                    </svg>
                                    Brainrot ({categoryCounts.brainrot})
                                </button>
                                <button
                                    type="button"
                                    className={`frame-cat-pill ${frameCategory === 'climate' ? 'active' : ''}`}
                                    onClick={() => handleSelectCategory('climate')}
                                >
                                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ marginRight: '4px' }}>
                                        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 17.93V17a3 3 0 0 0-3-3H9a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h1a2 2 0 0 0 2-2V7a1 1 0 0 1 1-1h1.5a1 1 0 0 1 1 1v1.5a1.5 1.5 0 0 0 1.5 1.5H19" />
                                    </svg>
                                    Climate ({categoryCounts.climate})
                                </button>
                                <button
                                    type="button"
                                    className={`frame-cat-pill ${frameCategory === 'red' ? 'active' : ''}`}
                                    onClick={() => handleSelectCategory('red')}
                                >
                                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ marginRight: '4px' }}>
                                        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                                    </svg>
                                    Red ({categoryCounts.red})
                                </button>
                                <button
                                    type="button"
                                    className={`frame-cat-pill ${frameCategory === 'aesthetic' ? 'active' : ''}`}
                                    onClick={() => handleSelectCategory('aesthetic')}
                                >
                                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ marginRight: '4px' }}>
                                        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                                        <line x1="7" y1="2" x2="7" y2="22" />
                                        <line x1="17" y1="2" x2="17" y2="22" />
                                        <line x1="2" y1="12" x2="22" y2="12" />
                                    </svg>
                                    Vintage ({categoryCounts.aesthetic})
                                </button>
                            </div>

                            {/* Interactive Slideshow Stage with Clean SVG Arrows */}
                            <div className="slideshow-stage">
                                <button
                                    type="button"
                                    className="slideshow-nav-btn prev-btn"
                                    onClick={() => handleSlide(-1)}
                                    aria-label="Previous Design"
                                    title="Previous Template (Left Arrow)"
                                >
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="15 18 9 12 15 6" />
                                    </svg>
                                </button>

                                <div
                                    className="slideshow-card"
                                    style={{
                                        '--card-bg': activeFrame?.cardBg || '#f7f6f2',
                                        '--accent-color': activeFrame?.accent || '#173F30'
                                    }}
                                >
                                    <div className="slideshow-card-top">
                                        <span className="slideshow-tag">{activeFrame?.tag}</span>
                                        <span className="slideshow-applied-badge">
                                            <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '3px' }}>
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            APPLIED
                                        </span>
                                    </div>

                                    <div className="slideshow-card-mockup" data-pattern={activeFrame?.pattern}>
                                        <FrameMockupPreview pattern={activeFrame?.pattern} />
                                    </div>

                                    <div className="slideshow-card-info">
                                        <div className="slideshow-card-name">{activeFrame?.label}</div>
                                        <div className="slideshow-card-sub">{activeFrame?.sub}</div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="slideshow-nav-btn next-btn"
                                    onClick={() => handleSlide(1)}
                                    aria-label="Next Design"
                                    title="Next Template (Right Arrow)"
                                >
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </button>
                            </div>

                            {/* Slideshow Bottom Navigation Bar */}
                            <div className="slideshow-bottom-bar">
                                <button
                                    type="button"
                                    className="slideshow-action-btn"
                                    onClick={handleRandomFrame}
                                    title="Pick a random template"
                                >
                                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '5px' }}>
                                        <polyline points="16 3 21 3 21 8" />
                                        <line x1="4" y1="20" x2="21" y2="3" />
                                        <polyline points="21 16 21 21 16 21" />
                                        <line x1="15" y1="15" x2="21" y2="21" />
                                        <line x1="4" y1="4" x2="9" y2="9" />
                                    </svg>
                                    Shuffle
                                </button>

                                <div className="slideshow-dots-track">
                                    {displayedFrames.map((f, idx) => {
                                        const isSelected = f.id === selectedFrame;
                                        return (
                                            <button
                                                key={f.id}
                                                type="button"
                                                className={`slideshow-dot ${isSelected ? 'active' : ''}`}
                                                onClick={() => setSelectedFrame(f.id)}
                                                title={`${f.label} (${idx + 1}/${totalSlides})`}
                                            >
                                                <span className="dot-indicator" />
                                            </button>
                                        );
                                    })}
                                </div>

                                <button
                                    type="button"
                                    className="slideshow-action-btn next-action"
                                    onClick={() => handleSlide(1)}
                                    title="Next slide"
                                >
                                    Next Theme
                                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 2: VECTOR STICKERS & BADGES */}
                {activeTab === 'stickers' && (
                    <div className="tab-content stickers-panel">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--forest-2, #40584c)', margin: '0 0 12px' }}>
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="16" x2="12" y2="12" />
                                <line x1="12" y1="8" x2="12.01" y2="8" />
                            </svg>
                            <span>Tap any vector decal to place on strip, then drag to position!</span>
                        </div>

                        {STICKER_PACKS.map(pack => (
                            <div key={pack.category} className="sticker-category-box">
                                <div className="sticker-cat-title">{pack.category}</div>
                                <div className="sticker-items-row">
                                    {pack.items.map(item => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            className="sticker-palette-btn vector-btn"
                                            onClick={() => handleAddSticker(item)}
                                            title={item.label}
                                        >
                                            {renderStickerSvgIcon(item, 34)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Active Sticker Adjustments */}
                        {activeSticker && (
                            <div className="sticker-toolbar-card">
                                <div className="toolbar-header">
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {renderStickerSvgIcon(activeSticker, 20)}
                                        <span>Selected: <strong>{activeSticker.label || activeSticker.content}</strong></span>
                                    </span>
                                    <button
                                        type="button"
                                        className="delete-stk-btn"
                                        onClick={(e) => handleDeleteSticker(activeSticker.id, e)}
                                    >
                                        <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '3px' }}>
                                            <line x1="18" y1="6" x2="6" y2="18" />
                                            <line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                        Delete
                                    </button>
                                </div>

                                <div className="toolbar-sliders">
                                    <div className="slider-row">
                                        <label>Size ({activeSticker.size}px)</label>
                                        <input
                                            type="range"
                                            min="24"
                                            max="96"
                                            value={activeSticker.size || 48}
                                            onChange={(e) => handleUpdateSize(activeSticker.id, parseInt(e.target.value))}
                                        />
                                    </div>
                                    <div className="slider-row">
                                        <label>Rotation ({activeSticker.rotation || 0}°)</label>
                                        <input
                                            type="range"
                                            min="-45"
                                            max="45"
                                            value={activeSticker.rotation || 0}
                                            onChange={(e) => handleUpdateRotation(activeSticker.id, parseInt(e.target.value))}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {stickers.length > 0 && (
                            <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                                <button
                                    type="button"
                                    className="ghost"
                                    onClick={handleClearAllStickers}
                                    style={{ fontSize: '11px', padding: '6px 12px' }}
                                >
                                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '5px' }}>
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                    </svg>
                                    Clear Decals ({stickers.length})
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <div className="step-actions" style={{ marginTop: '20px' }}>
                    <button className="ghost" onClick={onBack}>
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                        Retake Photos
                    </button>
                    <button className="highlight" onClick={onProceed}>
                        Confirm & Generate
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* LIVE PREVIEW + DRAG OVERLAY */}
            <div className="preview-pane">
                <div className="side-subhead" style={{ marginTop: 0 }}>
                    LIVE DESIGN PREVIEW
                    {stickers.length > 0 && <span style={{ opacity: 0.7, marginLeft: '6px' }}>({stickers.length} decals)</span>}
                </div>

                <div
                    ref={previewWrapperRef}
                    className="canvas-preview-wrapper"
                    style={{ position: 'relative', display: 'inline-block', maxWidth: '264px', width: '100%' }}
                >
                    <canvas
                        ref={canvasRef}
                        className="final-canvas"
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                    />

                    {/* Interactive Sticker Overlay Elements for Dragging */}
                    {stickers.map(stk => {
                        const isSelected = selectedStickerId === stk.id;
                        return (
                            <div
                                key={stk.id}
                                className={`sticker-drag-handle ${isSelected ? 'selected' : ''}`}
                                style={{
                                    left: `${stk.x * 100}%`,
                                    top: `${stk.y * 100}%`,
                                    transform: `translate(-50%, -50%) rotate(${stk.rotation || 0}deg)`,
                                }}
                                onMouseDown={(e) => handlePointerDown(stk.id, e)}
                                onTouchStart={(e) => handlePointerDown(stk.id, e)}
                            >
                                {isSelected && (
                                    <button
                                        type="button"
                                        className="stk-quick-delete"
                                        onClick={(e) => handleDeleteSticker(stk.id, e)}
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>

                {stickers.length > 0 && (
                    <p style={{ fontSize: '11px', color: 'var(--forest-2, #40584c)', marginTop: '8px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                        <span>Click & drag any decal on the photo strip to move it.</span>
                    </p>
                )}
            </div>
        </section>
    );
}
