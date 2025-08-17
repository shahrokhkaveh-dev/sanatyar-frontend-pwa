"use client"


import dynamic from 'next/dynamic';
import HeaderItems from '../layout/HeaderItems';

const EditForm = dynamic(() => import("@/components/ui/brand/EditForm"), { ssr: false });

export default function EditBrand({ data, locale, t }) {
    return (
        <div className="min-h-screen">
            <HeaderItems href={`/${locale}/Dashboard/myAccont`} title={t?.edit_company || "صنعت یار ایران"} />
            <EditForm pervData={data} t={t} />
        </div>
    );
}