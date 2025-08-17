'use client'

import { api } from "@/config/api"
import { clienterr } from "@/util/Errorhadnler"
import { ShowMessage } from "@/util/ShowMessage"
import Loading from "@/components/modals/Loading"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { RiDeleteBin6Fill } from "react-icons/ri"

export default function DelUser({ id, t }) {

    const [message, setmessage] = useState('')
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const DeleteHadnler = async () => {
        setLoading(true)
        const res = await api.post('application/panel/brand/remove-member', { user_id: id }).finally(() => setLoading(false)).catch((err) => clienterr(err))
        if (res.data && res.data.flag) {
            ShowMessage(t?.user_removed || "کاربر حذف شد", setmessage)
            router.refresh()
        } else if (res.data && !res.data.flag) {
            ShowMessage(res.data.message)
        }
    }

    return (
        <>
            {loading && <Loading t={t} />}

            {message && <p className="errortag">{message}</p>}
            <input id="deluser" type="checkbox" className="hidden peer" />
            <label htmlFor="deluser"><RiDeleteBin6Fill className="text-red-500 text-2xl" /></label>

            <div className="fixed top-0 right-0 w-full h-full backdrop-brightness-50 hidden peer-checked:flex  items-center justify-center">
                <div className="bg-white rounded-lg p-1 w-[250px]">
                    <p className="text-center text-sm  text-black">{t?.delete_user_confirmation || "آیا از حذف کاربر مطمئن هستید؟"}</p>
                    <div className="grid grid-cols-2 mt-5 gap-x-2">
                        <button onClick={DeleteHadnler} className="w-full text-center bg-blue-800 text-white rounded-md">{t?.yes || "بله"}</button>
                        <label htmlFor="deluser" className="text-red-500 border-[1px] border-red-500 text-center rounded-md">{t?.cancel || "لغو"}</label>
                    </div>
                </div>
            </div>

        </>
    );
}