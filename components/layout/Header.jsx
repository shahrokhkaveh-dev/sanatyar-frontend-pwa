'use client'

import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiMenu } from "react-icons/fi";

export default function Header({ t, locale }) {
    const pathName = usePathname()
    const { sidebar, toggleSidebar } = useSidebar()


    if (pathName !== `/${locale}`) return

    return (
        <header className="bg-white p-2.5 py-3.5  sticky top-0 w-full z-50">
            <div className="w-full h-full relative flex justify-center items-center ">
                <FiMenu onClick={toggleSidebar} className={`text-3xl text-blue-900 items-center absolute  ${locale == 'fa' || locale == 'ar' ? 'right-0' : 'left-0'}`} />

                <Image quality={100} width={1000} height={1000} alt="logo" src={"/logo_txt.png"} className=" w-40 " />

            </div>

        </header>
    );
}