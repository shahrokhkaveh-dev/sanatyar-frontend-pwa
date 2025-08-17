'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Input from "../AutomationSystem/Input";
import { api } from "@/config/api";
import { ShowMessage } from "@/util/ShowMessage";
import Loading from "@/components/modals/Loading";

export default function AddGroup({ t }) {
    const [name, setName] = useState('')
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const addHandler = async () => {
        setLoading(true)
        const res = await api.post('application/panel/as/groupStore', { name }).finally(() => setLoading(false))
        if (res.data && !res.data.flag) {
            ShowMessage(res.data.message, setMessage)
        } else if (res.data && res.data.flag) {
            setMessage(t.group_added, setMessage)
            router.refresh()
            setName('')
            setShow(false)
        }
    }



    return (
        <>
            {loading && <Loading />}
            {show && <div className="backdrop-brightness-50 flex justify-center items-center fixed w-full h-full top-0 right-0">
                <div className="bg-white w-80 h-fit p-2 rounded-sm">
                    <input value={name} onChange={(e) => setName(e.target.value)} className="placeholder:text-sm p-1 py-2 text-xs border-[1px] border-neutral-400 bg-white rounded-md w-full h-12" type="text" placeholder={t.group_name_placeholder} />
                    <div className="grid grid-cols-2 mt-3 gap-x-1">
                        <button onClick={() => setShow(false)} className="border-[1px] border-red-600 text-red-600 rounded-md py-2 text-sm">
                            {t.cancel}
                        </button>
                        <button onClick={addHandler} className=" bg-blue-800 text-white rounded-md py-1 text-sm">
                            {t.save_group}
                        </button>

                    </div>
                </div>
            </div>}
            <div onClick={() => setShow(true)} className="bg-white p-2 rounded-full border-[1px] border-orange-400 m-2 fixed bottom-0 right-0">
                <FaPlus className=" text-orange-400 text-3xl" />
            </div>
            {message && <p className="errortag">{message}</p>}
        </>
    );
}