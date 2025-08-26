'use client'

import { api } from "@/config/api";
import { clienterr } from "@/util/Errorhadnler";
import { ShowMessage } from "@/util/ShowMessage";
import Loading from "@/components/modals/Loading";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiDocumentCheck } from "react-icons/hi2";
import { RiCloseLargeLine } from "react-icons/ri";
import Accept from "./Accept";
import Textarea from "./Textarea";

export default function Response({ id, t, locale }) {
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState({
        amount: "",
        prefactor: "",
        id,
        status: null,
        response_description: ""
    });
    const [show, setShow] = useState(0)
    const [reject, setReject] = useState({
        id,
        status: 3
    })

    const router = useRouter()

    const SendHandler = async () => {
        setLoading(true)
        const res = await api.post('application/panel/products/storeresponse', { ...response }).catch(err => clienterr(err, setError)).finally(() => setLoading(false))
        if (res.data && res.data.flag) {
            ShowMessage(t.response_sent, setError)
            setShow(0)
            router.refresh()
        } else if (res.data && !res.data.flag) {
            ShowMessage(res.data.message, setError)
        }

    }



    return (
        <>
            {error && typeof error == 'string' && <p className="errortag text-nowrap">{error}</p>}
            {loading && <Loading />}
            <div className="grid grid-cols-2 py-1.5 px-2 gap-x-2">
                <button className="text-blue-800 border-[1px] border-blue-800 flex flex-row justify-around items-center rounded-md w-full px-1.5 py-2 text-sm font-bold bg-white" onClick={() => { setShow(1), setResponse((perv) => ({ ...perv, status: 2 })) }}><HiDocumentCheck className="text-blue-900 text-base" />{t.accept_request}</button>
                <button className="text-orange-400 bg-white border-[1px] border-blue-800 flex flex-row justify-around items-center rounded-md w-full px-1.5 py-0.5 text-sm font-bold" onClick={() => { setShow(2), setResponse((perv) => ({ ...perv, status: 3 })) }} ><RiCloseLargeLine className="text-orange-400 text-base " />{t.reject_request}</button>
            </div>
            {show == 1 &&
                <Accept locale={locale} t={t} data={response} setShow={setShow} action={SendHandler} setData={setResponse} />
            }
            {show == 2 &&
                <div className="fixed top-0 right-0 w-full h-full backdrop-brightness-50 flex justify-center items-center z-40">
                    <div className="w-5/6 min-h-32 flex flex-col justify-between py-2 px-1 bg-white rounded-lg">
                        <Textarea bg={"white"} data={response} setData={setResponse} name={"response_description"} title={t.response_description} />
                        <div className="grid grid-cols-2 px-1 gap-x-1.5 mt-7">
                            <button onClick={() => setShow(0)} className="w-full border-[1px] border-red-500 rounded-md py-1.5  text-center text-xs text-red-500">
                                {t.cancel}
                            </button>
                            <button onClick={SendHandler} className="w-full bg-blue-900 rounded-md py-1.5  text-center text-xs text-white">
                                {t.send_response}
                            </button>

                        </div>
                    </div>
                </div>
            }
        </>
    );
}