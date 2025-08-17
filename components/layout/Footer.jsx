'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser } from "react-icons/fa6";
import { ImOffice } from "react-icons/im";
import { BsFillBox2Fill } from "react-icons/bs";
import { TbCategoryFilled } from "react-icons/tb";
import { FaHome } from "react-icons/fa";

export default function Footer({ t, locale }) {

    const pathName = usePathname()
    if (pathName.includes('Images') || pathName.includes('Login') || pathName.includes('OfficialCenter') || pathName.includes('News') || pathName.includes('brand ') || pathName.includes('Inquiry') || pathName.includes('AutomationSystem')) return

    return (


        <footer style={{ backgroundImage: "url('/Frame.png')" }} className=" bg-cover bg-center bg-no-repeat  flex flex-row  justify-between z-50  bottom-0 fixed  gap-x-4    mx-auto h-[60px] shadow-md   w-full">


            <div className="flex felx-row justify-around items-center  w-full py-2">
                <Link className="flex flex-col justify-center items-center w-fit text-blue-800 aria-checked:text-orange-400 " aria-checked={pathName.includes("Dashboard")} href={"/Dashboard/myAccont"}>
                    <FaUser className="text-2xl " />
                    <span className="text-xs mt-1">{t?.profile}</span>
                </Link>
                <Link className="flex flex-col justify-center items-center w-fit text-blue-800 aria-checked:text-orange-400" aria-checked={pathName.includes("Brand")} href={"/Brand"}>
                    <ImOffice className="text-2xl " />
                    <span className="text-xs mt-1">{t?.companies}</span>
                </Link>
            </div>


            <Link href={"/"} className="absolute z-50  -top-7 left-[50%] bg-white  rounded-full text-orange-400 -translate-x-1/2  p-2 text-4xl">
                <FaHome />
            </Link>


            <div className="flex felx-row justify-around items-center  w-full py-2">
                <Link className="flex flex-col justify-center items-center w-fit text-blue-800 aria-checked:text-orange-400" aria-checked={pathName == '/Products'} href={"/Products"}>
                    <BsFillBox2Fill className="text-2xl " />
                    <span className="text-xs mt-1">{t?.products}</span>
                </Link>
                <Link className="flex flex-col justify-center items-center w-fit text-blue-800 aria-checked:text-orange-400" aria-checked={pathName.includes("Categories")} href={"/Categories"}>
                    <TbCategoryFilled className="text-2xl " />
                    <span className="text-xs mt-1">{t?.categories}</span>
                </Link>
            </div>


        </footer>
    );
}


