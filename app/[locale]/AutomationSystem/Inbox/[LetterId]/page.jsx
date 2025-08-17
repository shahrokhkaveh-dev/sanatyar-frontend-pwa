import { api } from "@/config/api";
import HeaderItems from "@/components/layout/HeaderItems";
import Archive from "@/components/ui/AutomationSystem/Archive";
import Attach from "@/components/ui/AutomationSystem/Attach";
import Download from "@/components/ui/AutomationSystem/Download";
import Send from "@/components/ui/AutomationSystem/Send";
import Image from "next/image";


export default async function page({ params }) {

    const { LetterId } = await params

    const res = await api.post(`application/panel/as/show`, { id: LetterId, type: 'reciver' }).catch((err) => servError(err))

    if (res.error || !res.data.flag) {
        return <p className="errortag">{res.error ? res.error : res.data.message}</p>
    }

    return (
        <div>
            <HeaderItems href={'/AutomationSystem/Inbox'} title={"صنعت نامه"} />
            <div className="flex flex-row justify-between text-xs text-white bg-blue-800 p-1 py-2">
                <p className="flex flex-row gap-x-3 items-center">
                    <Archive id={res.data.response.letter.id} />
                    تاریخ: {res.data.response.letter.created_at}
                </p>
                <p>
                    شماره نامه: {res.data.response.letter.number}
                </p>
            </div>
            <div className="px-2">
                <div className="flex flex-row text-sm items-center mt-2.5">
                    <p className="w-16">نویسنده: </p>
                    <p className="w-full bg-white rounded-md p-1.5 border-[1px] border-blue-900">{res.data.response.letter.author_name}</p>
                </div>
                <div className="flex flex-row text-sm items-center mt-1.5">
                    <p className="w-16">فرستنده: </p>
                    <p className="w-full bg-white rounded-md p-1.5 border-[1px] border-blue-900">{res.data.response.brand.name}</p>
                </div>
                {/* <div className="flex flex-row text-sm items-center mt-1.5">
                <p className="w-16">موضوع: </p>
                <p className="w-full bg-white rounded-md p-1.5 border-[1px] border-blue-900">{res.data.response.letter.reciver_name}</p>
            </div> */}

                <div className="w-full bg-white rounded-md p-1.5 border-[1px] border-blue-900 mt-1.5 flex flex-col items-end min-h-24 justify-between ">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: res.data.response.letter.content
                        }}

                        className="w-full text-right text-sm" />
                    {res.data.response.signature && <Image className="w-10 h-10" width={200} height={200} alt="image" src={`data:image/png;base64,${res.data.response.signature}`} />}
                </div>
                <div className="grid grid-cols-3 gap-x-1 px-3 mt-2">
                    <Download type={'reciver'} id={res.data.response.letter.id} />
                    <Attach type={'reciver'} id={res.data.response.letter.id} />
                    <Send name={res.data.response.brand.name} />
                </div>
            </div>
        </div>
    );
}