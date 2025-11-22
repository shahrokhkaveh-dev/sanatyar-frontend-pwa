'use client';

import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";
import Link from "next/link";
import { BiSolidHelpCircle, BiSupport } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";
import { IoNewspaper } from "react-icons/io5";
import { useParams } from "next/navigation";

export default function Sidebar({ t, locale }) {
    const { sidebar, toggleSidebar } = useSidebar()
    const { dir } = useParams()



    return (
        <div onClick={toggleSidebar} className={`transition-all duration-300 ease-in-out overflow-hidden z-[999] fixed top-0 ${locale == 'fa' || locale == 'ar' ? 'right-0' : 'left-0'} ${sidebar ? 'w-full backdrop-brightness-75' : 'w-0 backdrop-brightness-200'}  h-full`}>
            <div onClick={(e) => e.stopPropagation()} className="bg-white w-4/5 h-full">
                <div className="flex flex-col gap-y-1 items-center justify-center py-2">
                    <Image quality={100} className="w h-auto w-40" width={200} height={200} src={'/Vector.svg'} alt="logo" />
                    <p className="text-blue-900 font-bold text-xl">{t?.sanatyar_system || "سامانه صنعت یار ایران"}</p>

                </div>
                <div className="flex flex-col p-2 gap-y-6 border-t-[1px] border-blue-900">
                    <Link target="_blank" href={'https://mag.sanatyariran.com/'} className="text-base font-bold flex flex-row gap-x-2"><IoNewspaper className="text-2xl" />{t?.news || "اخبار"}</Link>
                    <Link target="_blank" href={'https://sanatyariran.com/'} className="text-base font-bold flex flex-row gap-x-2"><FiGlobe className="text-2xl" />{t?.sanatyar_website || "سایت صنعت یار"}</Link>
                    <Link target="_blank" href={'https://www.instagram.com/sanatyariran_com'} className="text-base font-bold flex flex-row gap-x-2"><FaInstagram className="text-2xl" />{t?.sanatyar_instagram || "اینستاگرام صنعت یار"}</Link>
                    <Link target="_blank" href={'https://wa.me/989120220863'} className="text-base font-bold flex flex-row gap-x-2"><BiSupport className="text-2xl" />{t?.whatsapp_support || "پشتیبانی واتساپ"}</Link>
                </div>
            </div>
        </div>
    );
}