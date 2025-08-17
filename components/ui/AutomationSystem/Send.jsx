'use client'

import Link from "next/link";
import { IoArrowRedoSharp } from "react-icons/io5";

export default function Send({ name, groupName, locale, t }) {
    return (
        <Link href={groupName ? `/${locale}/AutomationSystem/GroupSend?company=${groupName}` : `/${locale}/AutomationSystem/Send?company=${name}`} className="bg-white rounded-lg relative w-full overflow-hidden flex flex-col items-center justify-center h-20">
            <IoArrowRedoSharp className="text-4xl text-orange-400" />
            <p className="text-blue-800 text-sm">{t.send_message}</p>
            <div className="w-16 -right-7 -top-4 h-10 bg-blue-900 rotate-45 absolute"></div>
        </Link>
    );
}