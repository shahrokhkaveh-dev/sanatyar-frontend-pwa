'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation({ t, locale }) {

    const pathName = usePathname();

    return (
        <div className=" grid grid-cols-2 bg-white  sticky top-0  ">
            <Link aria-checked={pathName.includes('Inbox')} className="text-center text-neutral-700 py-1.5 aria-checked:text-blue-900 aria-checked:border-b-[1px] border-blue-900" href={`/${locale}/Inquiry/Inbox`}>
                {t.send_box}
            </Link>
            <Link className="text-center text-neutral-700 py-1.5 aria-checked:text-blue-900 aria-checked:border-b-[1px] border-blue-900" aria-checked={!pathName.includes('Inbox')} href={`/${locale}/Inquiry`}>
                {t.receive_box}
            </Link>
        </div>
    );
}