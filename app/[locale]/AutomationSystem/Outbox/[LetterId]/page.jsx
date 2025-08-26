import { api } from "@/config/api";
import { servError } from "@/util/Errorhadnler";
import HeaderItems from "@/components/layout/HeaderItems";
import Attach from "@/components/ui/AutomationSystem/Attach";
import Download from "@/components/ui/AutomationSystem/Download";
import Send from "@/components/ui/AutomationSystem/Send";
import Image from "next/image";
import { loadTranslation } from "@/util/translations";


export default async function page({ params }) {

    const { LetterId, locale } = await params

    const t = loadTranslation(locale, 'automationSystem')

    const res = await api.post(`application/panel/as/show`, { id: LetterId, type: 'sended' }).catch((err) => servError(err))

    if (res.error || !res.data.flag) {
        return <p className="errortag">{res.error ? res.error : res.data.message}</p>
    }



    return (
        <div>
            <HeaderItems href={'/AutomationSystem/Outbox'} title={t.letter} />
            <div className="flex flex-row justify-between text-xs text-white bg-blue-800 px-2 p-1 py-2">
                <p>
                    {t.date}: {res.data.response.letter.created_at}
                </p>
                <p>
                    {t.letter_number}: {res.data.response.letter.number}
                </p>
            </div>
            <div className="px-2">
                <div className="flex flex-row text-sm items-center mt-2.5">
                    <p className="w-16">{t.sender}: </p>
                    <p className="w-full bg-white rounded-md p-1.5 border-[1px] border-blue-900">{res.data.response.letter.author_name}</p>
                </div>
                <div className="flex flex-row text-sm items-center mt-1.5">
                    <p className="w-16">{t.reciver}: </p>
                    <p className="w-full bg-white rounded-md p-1.5 border-[1px] border-blue-900">{res.data.response.letter.reciver_name ? res.data.response.letter.reciver_name : res.data.response.letter.group_name}</p>
                </div>
                {/* <div className="flex flex-row text-sm items-center mt-1.5">
                <p className="w-16">موضوع: </p>
                <p className="w-full bg-white rounded-md p-1.5 border-[1px] border-blue-900">{res.data.response.letter.reciver_name}</p>
            </div> */}

                <div className="w-full bg-white rounded-md p-1.5 border-[1px] border-blue-900 mt-1.5 flex flex-col items-end min-h-24 justify-between ">
                    <p className="w-full text-right">{res.data.response.letter.content}</p>
                    {res.data.response.signature && <Image className="w-10 h-10" width={200} height={200} alt="image" src={`data:image/png;base64,${res.data.response.signature}`} />}
                </div>
                <div className="grid grid-cols-3 gap-x-1 px-3 mt-2">
                    <Download id={res.data.response.letter.id} />
                    <Attach id={res.data.response.letter.id} />
                    <Send groupName={res.data.response.letter.group_name || ''} name={res.data.response.brand.name} />
                </div>
            </div>
        </div>
    );
}