'use client'

import { useState } from "react";
import Input from "../Input";
import Textarea from "../Textarea";
import Loading from "@/components/modals/Loading";
import { api } from "@/config/api";
import { clienterr } from "@/util/Errorhadnler";
import HeaderItems from "@/components/layout/HeaderItems";

export default function Inquiry({ data, t }) {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [show, setShow] = useState(false)
    const [inquiry, setInquiry] = useState({
        product_id: data.id,
        destination_id: data.brand_id,
        number: '',
        unit: '',
        description: '',
    })

    const InqueryHandler = async () => {
        setLoading(true)
        const res = await api.post('application/panel/inquiry/store', { ...inquiry }).finally(() => setLoading(false)).catch(err => clienterr(err, setError))

        if (res.data.flag == false && res.data.code === 0) {
            setError(res.data.response)
        }

        if (res.data && res.data.flag === true) {
            setError(t.inquiry_success)
            setShow(false)

        } else if (res.data && res.data.flag === false && res.data.code === -1) {

            setError(res.data.response)
        }
    }

    return (
        <>
            {show &&

                <div className="fixed w-full h-screen overflow-auto bg-neutral-200 top-0 right-0 z-50">
                    <HeaderItems action={() => setShow(false)} title={t.inquiry} />
                    <p className="text-sm text-blue-800 font-semibold text-center py-2">{data.name}</p>
                    <p className="w-11/12 bg-neutral-300 rounded-lg py-1 text-center mx-auto text-xs my-1.5">{t.category}: {data.category}</p>
                    <p className="w-11/12 bg-neutral-300 rounded-lg py-1 text-center mx-auto text-xs my-1.5">{t.brand}: {data.brand}</p>
                    <p className="text-sm text-center pt-2 border-t-[1px] border-t-neutral-300 pb-1">{t.inquiry_number}</p>
                    <div className="w-11/12 mx-auto bg-neutral-300 p-3 rounded-lg ">
                        <Input data={inquiry} setData={setInquiry} name={"number"} title={t.inquiry_number} setError={setError} error={error} bg={"white"} />
                        <Input data={inquiry} setData={setInquiry} name={"unit"} title={t.unit} setError={setError} error={error} bg={"white"} />
                        <div className="mt-4">
                            <Textarea data={inquiry} setData={setInquiry} name={"description"} title={t.description} setError={setError} error={error} bg={"white"} />

                        </div>
                    </div>
                    <p onClick={InqueryHandler} className="bg-blue-800 mt-2.5 text-white rounded-lg w-11/12 py-0.5 mx-auto text-center text-nowrap">
                        {t.send_inquiry}
                    </p>


                </div>

            }
            {loading && <Loading />}

            {error && typeof error == 'string' && <p className="errortag">{error}</p>}
            <button onClick={() => setShow(true)} className="bg-orange-400 text-white text-lg p-3 rounded-md ">{t.inquiry}</button>
        </>
    );
}