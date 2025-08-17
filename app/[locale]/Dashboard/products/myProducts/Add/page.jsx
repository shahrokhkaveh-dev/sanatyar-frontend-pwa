'use client';

import dynamic from 'next/dynamic';
const AddProduct = dynamic(() => import("@/components/pages/AddProduct"), { ssr: false });
import faTranslations from '@/locales/fa/myProducts.json';
import enTranslations from '@/locales/en/myProducts.json';
import arTranslations from '@/locales/ar/myProducts.json';
import trTranslations from '@/locales/tr/myProducts.json';
import { useParams } from 'next/navigation';



export default function page() {

    const { locale } = useParams();

    const translations = {
        fa: faTranslations,
        en: enTranslations,
        ar: arTranslations,
        tr: trTranslations
    };

    const t = translations[locale] || faTranslations;

    return (
        <AddProduct t={t} locale={locale} />
    );
}