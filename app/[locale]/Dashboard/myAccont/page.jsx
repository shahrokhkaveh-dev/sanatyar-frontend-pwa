import Logout from "@/components/ui/MyAccont/Logout";
import { api } from "@/config/api";
import { getDashboardLinks } from "@/constans/Links";
import { servError } from "@/util/Errorhadnler";
import Link from "next/link";
import { Fragment } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { loadTranslation } from "@/util/translations";
import { IoLanguage } from "react-icons/io5";

export default async function page({ params }) {
    const { locale } = await params;
    const t = loadTranslation(locale, 'dashboard');

    const res = await api.get('application/panel/profile/reload').catch((err) => servError(err))

    if (res.status == 200 && res.data && !res.data.flag) {
        return <p className="errortag">{res.data.message}</p>
    }

    if (res.status !== 200) {
        return <p className="errortag text-nowrap">{t.error_message}</p>
    }

    const DashboardLinks = getDashboardLinks(t);

    return (
        <div className="h-full min-h-screen  ">
            <ul className="bg-white text-xs ">
                {DashboardLinks.map((i, index) => (
                    <Fragment key={index}>
                        {res.data.response.user.is_branding === i.isbranding && <li className="flex flex-row items-center border-b-[1px] border-b-neutral-200 "><Link className="flex flex-row items-center text-base font-bold gap-x-3 p-2 py-3 w-full" href={`/${locale}${i.href}`}><i.icon className=" text-2xl text-blue-800" />{i.title} </Link><IoIosArrowBack className={`${locale == "fa" || locale == "ar" ? "rotate-0" : "rotate-180"} text-2xl ml-3`} /></li>}
                    </Fragment>
                ))}
                <li className="flex flex-row items-center border-b-[1px] border-b-neutral-200 "><Link className="flex flex-row items-center text-base font-bold gap-x-3 p-2 py-3 w-full" href={`/selectLang`}><IoLanguage className=" text-2xl text-blue-800" /> {t.changelang} </Link><IoIosArrowBack className={`${locale == "fa" || locale == "ar" ? "rotate-0" : "rotate-180"} text-2xl ml-3`} /></li>
                <li className="text-red-500 flex flex-row items-center"><Logout t={t} /> <IoIosArrowBack className="text-2xl ml-3" /> </li>
            </ul>
        </div>
    );
}