'use client'

import { api } from "@/config/api";
import HeaderItems from "@/components/layout/HeaderItems";
import Loading from "@/components/modals/Loading";
import FileInput from "@/components/ui/AutomationSystem/FileInput";
import Input from "@/components/ui/AutomationSystem/Input";
import Textarea from "@/components/ui/AutomationSystem/TextArea";
import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import { IoBusiness } from "react-icons/io5";
import { ShowMessage } from "@/util/ShowMessage";


export default function SendGroup({ t, locale }) {

    const searchParams = useSearchParams()

    const [Letter, setLetter] = useState({
        attachment: "",
        reciver_id: '',
        reciver_type: '2',
        subject: '',
        content: ''
    })
    const [company, setCompany] = useState({
        name: searchParams.get('company') || '', companys: [], selected: searchParams.get('company') || ''
    })
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const router = useRouter()


    useEffect(() => {
        if (searchParams.get('company') && company.name && company.selected && company.companys.length > 0) {
            setLetter((perv) => ({ ...perv, reciver_id: company.companys[0].id }))

        }
    }, [searchParams, company.companys])

    useEffect(() => {
        const getComany = async () => {
            const res = await api.post(`application/panel/as/search?type=${Letter.reciver_type}&search=${company.name}`).catch(err => (err))
            if (res.data && res.data.flag) {
                setCompany((perv) => ({ ...perv, companys: res.data.response.items }))
            }
        }
        if (company.name.length > 2) getComany()
    }, [company.name])

    const SetHandler = (company) => {
        setCompany(() => ({ companys: [], name: '', selected: company.name }))
        setLetter((perv) => ({ ...perv, reciver_id: company.id }))
    }

    const SendHandler = async () => {
        setLoading(true)

        const res = await api.post('application/panel/as/send', { ...Letter }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).finally(() => setLoading(false)).catch(err => (err))

        if (res.data && !res.data.flag && res.data.code === -1) {
            setError(res.data.response)
            ShowMessage(Object.values(res.data.response).pop(), setMessage)
            return
        }
        if (res.data && !res.data.flag) {
            ShowMessage(res.data.message, setMessage)
            return
        }
        if (res.data && res.data.flag) {
            ShowMessage(t?.letter_sent || "نامه با موفقیت ارسال شد", setMessage)
            router.push(`/${locale}/AutomationSystem/Outbox`)

        }
    }



    return (
        <div className="min-h-screen">
            {loading && <Loading />
            }
            {message && <p className="errortag">{message}</p>}
            <HeaderItems href={`/${locale}/AutomationSystem`} title={t?.group_send || "ارسال گروهی پیام"} />
            <div className="mt-2.5 flex flex-col gap-y-2 px-2">
                <Input setinitdata={setLetter} setError={setError} data={company} setData={setCompany} bg={"white"} error={error} name={'name'} title={t?.reciver || "گیرنده"} />
                <div>
                    {company.companys && company.companys.length > 0 &&
                        <ul>
                            {company.companys.map((i) => (
                                <li onClick={() => SetHandler(i)} className="text-xs flex flex-row items-center bg-neutral-300 border-[1px] border-neutral-500 rounded-md p-1.5 gap-x-2 my-1" key={i.id}>
                                    <IoBusiness className="text-lg text-neutral-700" />
                                    {i.name}

                                </li>
                            ))}
                        </ul>
                    }
                </div>
                <Input setError={setError} data={Letter} setData={setLetter} bg={"white"} error={error} name={'subject'} title={t?.subject || "موضوع"} />
                <Textarea bg={"white"} data={Letter} setData={setLetter} title={t?.write_content || "متن خود را بنویسید..."} name={"content"} />
                <FileInput data={Letter} setData={setLetter} name={"attachment"} />
            </div>
            <div className="px-2">
                <button onClick={SendHandler} className="w-full py-3 text-sm  rounded-md bg-blue-800 text-white mt-2">{t?.send_letter || "ارسال نامه "}</button>
            </div>
        </div>
    );
}