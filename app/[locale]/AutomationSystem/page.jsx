import HeaderItems from "@/components/layout/HeaderItems";
import Image from "next/image";
import Link from "next/link";
import { BsFillEnvelopeArrowDownFill, BsFillEnvelopeArrowUpFill } from "react-icons/bs";
import { FaEnvelope, FaUsers } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { RiArchiveStackFill } from "react-icons/ri";
import { loadTranslation } from "@/util/translations";

export default async function page({ params }) {
    const { locale } = await params;
    const t = loadTranslation(locale, 'automationSystem');

    return (
        <div className="min-h-screen">
            <HeaderItems href={`/${locale}`} title={t.title} />
            <Image alt={t.banner_alt} src={'/industrial_banner.png'} width={300} height={300} className="w-full max-h-96" />


            <div className="bg-white w-full mt-6">
                <Link className="text-base font-bold flex flex-row  items-center px-2 py-2.5 w-full justify-between border-b-[2px] border-neutral-100" href={`/${locale}/AutomationSystem/Send`} >
                    <p className="flex flex-row gap-x-4">
                        <FaEnvelope className="text-2xl text-blue-900" />
                        {t.send_message}
                    </p>
                    <IoIosArrowBack className="text-2xl text-blue-900" />
                </Link>
                <Link className="text-base font-bold flex flex-row  items-center px-2 py-2.5 w-full justify-between border-b-[2px] border-neutral-100" href={`/${locale}/AutomationSystem/Inbox`} >
                    <p className="flex flex-row gap-x-4">
                        <BsFillEnvelopeArrowUpFill className="text-2xl text-blue-900" />
                        {t.inbox}
                    </p>
                    <IoIosArrowBack className="text-2xl text-blue-900" />
                </Link>
                <Link className="text-base font-bold flex flex-row  items-center px-2 py-2.5 w-full justify-between border-b-[2px] border-neutral-100" href={`/${locale}/AutomationSystem/Outbox`} >
                    <p className="flex flex-row gap-x-4">
                        <BsFillEnvelopeArrowDownFill className="text-2xl text-blue-900" />
                        {t.outbox}
                    </p>
                    <IoIosArrowBack className="text-2xl text-blue-900" />
                </Link>
                <Link className="text-base font-bold flex flex-row  items-center px-2 py-2.5 w-full justify-between border-b-[2px] border-neutral-100" href={`/${locale}/AutomationSystem/GroupSend`} >
                    <p className="flex flex-row gap-x-4">
                        <FiDownload className="text-2xl text-blue-900" />
                        {t.group_send}
                    </p>
                    <IoIosArrowBack className="text-2xl text-blue-900" />
                </Link>
                <Link className="text-base font-bold flex flex-row  items-center px-2 py-2.5 w-full justify-between border-b-[2px] border-neutral-100" href={`/${locale}/AutomationSystem/Archive`} >
                    <p className="flex flex-row gap-x-4">
                        <RiArchiveStackFill className="text-2xl text-blue-900" />
                        {t.archive}
                    </p>
                    <IoIosArrowBack className="text-2xl text-blue-900" />
                </Link>
                <Link className="text-base font-bold flex flex-row  items-center px-2 py-2.5 w-full justify-between  " href={`/${locale}/AutomationSystem/Groups`} >
                    <p className="flex flex-row gap-x-4">
                        <FaUsers className="text-2xl text-blue-900" />
                        {t.groups}
                    </p>
                    <IoIosArrowBack className="text-2xl text-blue-900" />
                </Link>

            </div>
        </div>
    );
}