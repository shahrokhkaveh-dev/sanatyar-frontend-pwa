'use client'

import { api } from "@/config/api"
import { clienterr } from "@/util/Errorhadnler"
import { ShowMessage } from "@/util/ShowMessage"
import { useRouter } from "next/navigation"
import { useState } from "react"


export default function ByBtn({ id, t }) {

    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [message, setMessage] = useState('')

    const ByHandler = async () => {
        setLoading(true)
        const res = await api.post('application/panel/plan/buy', { plan_id: id }).catch(err => clienterr(err)).finally(() => setLoading(false))
        if (res.error) {
            ShowMessage(res.error, setMessage)
            return
        }
        if (res.data && res.data.flag) {
            router.push(res.data.response.url)
        } else {
            ShowMessage(res.data.message, setMessage)
        }
    }

    return (
        <>
            {message && <p className="errortag">{message}</p>}
            <button onClick={ByHandler} className="bg-blue-800 text-white w-full text-sm py-1.5 rounded-b-lg">{t?.order_registered || "ثبت سفارش"}</button>
        </>
    );
}