'use client';

export const dynamic = 'force-dynamic';

import Dynamic from 'next/dynamic';
import faTranslations from '@/locales/fa/dashboard.json';
import enTranslations from '@/locales/en/dashboard.json';
import arTranslations from '@/locales/ar/dashboard.json';
import trTranslations from '@/locales/tr/dashboard.json';
import ruTranslations from '@/locales/ru/dashboard.json';
import chTranslations from '@/locales/ch/dashboard.json';

const Complete = Dynamic(() => import("@/components/pages/Complete"), { ssr: false });

export default function page({ params }) {
    const { locale } = params;

    const translations = {
        fa: faTranslations,
        en: enTranslations,
        ru: ruTranslations,
        ch: chTranslations,
        ar: arTranslations,
        tr: trTranslations
    };

    const t = translations[locale] || faTranslations;

    return (
        <Complete locale={locale} t={t} />
    );
}