'use client';

import dynamic from 'next/dynamic';
import faTranslations from '@/locales/fa/automationSystem.json';
import enTranslations from '@/locales/en/automationSystem.json';
import ruTranslations from '@/locales/ru/automationSystem.json';
import chTranslations from '@/locales/ch/automationSystem.json';
import arTranslations from '@/locales/ar/automationSystem.json';
import trTranslations from '@/locales/tr/automationSystem.json';
import { useParams } from 'next/navigation';

const SendGroup = dynamic(() => import("@/components/pages/SendGroup"), { ssr: false });

export default function page() {

    const params = useParams()
    const locale = params.locale

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
        <SendGroup locale={locale} t={t} />
    );
}