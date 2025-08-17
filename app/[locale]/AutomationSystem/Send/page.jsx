'use client'

import dynamic from 'next/dynamic';
import faTranslations from '@/locales/fa/automationSystem.json';
import enTranslations from '@/locales/en/automationSystem.json';
import arTranslations from '@/locales/ar/automationSystem.json';
import trTranslations from '@/locales/tr/automationSystem.json';

const Send = dynamic(() => import("@/components/pages/Send"), { ssr: false });

export default function page({ params }) {
    const { locale } = params;

    const translations = {
        fa: faTranslations,
        en: enTranslations,
        ar: arTranslations,
        tr: trTranslations
    };

    const t = translations[locale] || faTranslations;

    return (
        <Send locale={locale} t={t} />
    );
}