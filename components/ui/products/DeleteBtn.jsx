'use client'

import Loading from "@/components/modals/Loading";
import { api } from "@/config/api";
import { clienterr } from "@/util/Errorhadnler";
import { ShowMessage } from "@/util/ShowMessage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";

export default function DeleteBtn({ id }) {

    const [message, setMessage] = useState()
    const [loading, setloading] = useState(false)


    const router = useRouter()

    const DelHandler = async () => {
        setloading(true)
        const res = await api.delete(`application/panel/products/delete/${id}`).catch(err => clienterr(err)).finally(() => setloading(false))
        if (res.data && res.data.flag) {
            ShowMessage("محصول حذف شد", setMessage)
            router.refresh()
        } else if (res.data && !res.data.flag) {
            ShowMessage(res.data.message, setMessage)
        }
    }

    return (
        <>
            {loading && <Loading />}
            <div className="fixed top-0 right-0 backdrop-brightness-50 hidden justify-center items-center peer-checked:flex w-full h-full">
                <div className="w-80 h-40 bg-white rounded-lg p-2 flex flex-col justify-between items-center">
                    <p>آیا از حذف محصول اطمینان دارید؟</p>
                    <div className="grid grid-cols-2 gap-x-2 w-full ">
                        <label htmlFor={`del${id}`} className=" w-full h-full text-center  py-1 border-[1px] border-red-600 text-red-600 rounded-md">لغو</label>
                        <button onClick={DelHandler} className="bg-blue-800 text-white w-full rounded-md py-1">بله</button>
                    </div>
                </div>
            </div>
            {message && <p className="errortag text-nowrap">{message}</p>}
        </>
    );
}