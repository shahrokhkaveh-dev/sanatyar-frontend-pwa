import { api } from "@/config/api";
import { servError } from "@/util/Errorhadnler";
import { IoDiamond } from "react-icons/io5";
import { FaCalendarDays } from "react-icons/fa6";
import { sp } from "@/util/number";
import ByBtn from "@/components/ui/plan/ByBtn";
import HeaderItems from "@/components/layout/HeaderItems";
import { loadTranslation } from "@/util/translations";

export default async function page({ params }) {
    const { locale } = params;
    const t = await loadTranslation(locale, 'myAccont');

    const res = await api.get('application/panel/plan').catch(err => servError(err))

    if (res.error || (res.data && res.data.flag)) {
        return <div>
            <HeaderItems href={`/${locale}/AutomationSystem`} title={t.archive} />
            <p className="errortag">{res.error ? res.error : res.data.message}</p>
        </div>
    }

    return (
        <>
            <HeaderItems href={`/${locale}/Dashboard/myAccont`} title={t.subscription_plans} />
            <div className="felx flex-col gap-y-3 px-2 min-h-screen">
                {res.data.plans.map((i) => (
                    <div key={i.id} className="w-full flex flex-col justify-center items-center bg-white  rounded-lg my-2">
                        <p className="text-orange-400 py-1.5 text-center w-full flex flex-row items-center justify-center gap-x-1.5 border-b-[1px] border-b-orange-400"><IoDiamond className="text-lg" />{i.name}</p>
                        <p className="text-sm flex flex-row items-center justify-center mt-2"><FaCalendarDays className="text-blue-900" />{t.subscription} {i.period} {t.month}</p>
                        <span className="text-xs w-fit py-1 px-2.5 border-[1px] border-neutral-300 rounded-md my-2 mb-3">{sp(i.price)} {t.toman}</span>
                        <ByBtn id={i.id} t={t} />
                    </div>
                ))}
            </div>
        </>
    );
}