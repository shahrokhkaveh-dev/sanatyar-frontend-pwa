
'use client';

import dynamic from 'next/dynamic';
import faTranslations from '@/locales/fa/login.json';
import enTranslations from '@/locales/en/login.json';
import arTranslations from '@/locales/ar/login.json';
import trTranslations from '@/locales/tr/login.json';
import ruTranslations from '@/locales/ru/login.json';
import chTranslations from '@/locales/ch/login.json';

const Login = dynamic(() => import('@/components/pages/Login'), { ssr: false });

export default function page({ params }) {
    const { locale } = params;

    const translations = {
        fa: faTranslations,
        en: enTranslations,
        ar: arTranslations,
        tr: trTranslations,
        ru: ruTranslations,
        ch: chTranslations
    };

    const t = translations[locale] || faTranslations;

    return (
        <Login locale={locale} t={t} />
    );
}