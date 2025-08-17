import { api } from "@/config/api";
import { servError } from "@/util/Errorhadnler";
import HeaderItems from "@/components/layout/HeaderItems";
import AddGroup from "@/components/ui/Group/AddGroup";
import DeleteBtn from "@/components/ui/Group/DeleteBtn";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { MdGroups2 } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { loadTranslation } from "@/util/translations";

export default async function page({ params }) {
    const { locale } = await params;
    const t = loadTranslation(locale, 'automationSystem');

    const res = await api.post('application/panel/as/groupsPage').catch(err => servError(err))


    if (res.error || !res.data.flag) {
        return <p className="errortag">{res.error ? res.error : res.data.message}</p>
    }

    return (
        <div className="flex flex-col gap-y-1 pt-0 p-1 pb-12">
            <HeaderItems href={`/${locale}/AutomationSystem`} title={t.groups} />
            {res.data.response.groups.map((i) => (
                <div className="bg-white p-1 flex flex-row justify-between rounded-sm" key={i.id}>
                    <Link href={`/${locale}/AutomationSystem/Groups/${i.id}`} className="text-base font-bold flex flex-row items-center gap-x-1 w-full">
                        <MdGroups2 className="text-3xl text-blue-800" />
                        {i.name}
                    </Link>
                    <DeleteBtn id={i.id} t={t} />


                </div>
            ))}
            <AddGroup t={t} />

        </div>
    );
}