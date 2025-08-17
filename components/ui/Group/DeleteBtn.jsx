'use client'

import { api } from "@/config/api";
import { ShowMessage } from "@/util/ShowMessage";
import Loading from "@/components/modals/Loading";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function DeleteBtn({ id, action, t }) {

    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const router = useRouter()


    const DelHandler = async () => {
        setLoading(true)
        const res = await api.post('application/panel/as/destroyGroup', { group_id: id }).finally(() => setLoading(false))
        if (res.data && !res.data.flag) {
            ShowMessage(res.data.message, setMessage)
        } else if (res.data && res.data.flag) {
            setMessage(t.group_removed, setMessage)
            router.refresh()
            setShow(false)
        }
    }

    const ClickHandler = async () => {
        if (action) {
            const success = await action(id)
            if (success) {
                setShow(false)
            }
        } else {
            DelHandler()
        }
    }

    return (
        <>
            {message && <p className="errortag">{message}</p>}
            {loading && <Loading />}
            {show && <div className="backdrop-brightness-50 flex justify-center items-center fixed w-full h-full top-0 right-0">
                <div className="bg-white w-64 h-fit p-2 rounded-sm">
                    <p className="text-sm font-semibold text-center w-full ">{t.delete_group_confirmation}</p>
                    <div className="grid grid-cols-2 mt-4 gap-x-1">
                        <button onClick={() => setShow(false)} className="border-[1px] border-red-600 text-red-600 rounded-md py-1 text-sm">
                            {t.cancel}
                        </button>
                        <button onClick={ClickHandler} className=" bg-blue-800 text-white rounded-md py-1 text-sm">
                            {t.yes}
                        </button>

                    </div>
                </div>
            </div>}
            <RiDeleteBin6Fill onClick={() => setShow(true)} className="text-2xl text-red-600" />
        </>
    );
}