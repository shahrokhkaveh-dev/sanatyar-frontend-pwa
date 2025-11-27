
'use client';

import dynamic from 'next/dynamic';
import faTranslations from '@/locales/fa/myAccont.json';
import enTranslations from '@/locales/en/myAccont.json';
import ruTranslations from '@/locales/ru/myAccont.json';
import chTranslations from '@/locales/ch/myAccont.json';
import arTranslations from '@/locales/ar/myAccont.json';
import trTranslations from '@/locales/tr/myAccont.json';

const Signature = dynamic(() => import("@/components/pages/Signature"), { ssr: false });

export default async function page({ params }) {
    const { locale } = params;

    const translations = {
        fa: faTranslations,
        en: enTranslations,
        ch: chTranslations,
        ru: ruTranslations,
        ar: arTranslations,
        tr: trTranslations
    };

    const t = translations[locale] || faTranslations;

    return (
        <Signature locale={locale} t={t} />
    );
}