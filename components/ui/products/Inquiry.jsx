'use client'

import { useState } from "react";
import Input from "../Input";
import Textarea from "../Textarea";
import Loading from "@/components/modals/Loading";
import { api } from "@/config/api";
import { clienterr } from "@/util/Errorhadnler";

export default function Inquiry({ data }) {

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

        if (res.data && res.data.flag === true) {
            setError('استعلام با موفقیت انجام شد')
            setShow(false)

        } else if (res.data && res.data.flag === false && res.data.code === -1) {

            setError(res.data.response)
        }
    }

    return (
        <>
            {show &&
                <div className="fixed w-full h-screen overflow-auto bg-neutral-200 top-0 right-0 z-50">
                    <p className="text-sm text-blue-800 font-semibold text-center py-2">{data.name}</p>
                    <p className="w-11/12 bg-neutral-300 rounded-lg py-1 text-center mx-auto text-xs my-1.5">دسته بندی: {data.category}</p>
                    <p className="w-11/12 bg-neutral-300 rounded-lg py-1 text-center mx-auto text-xs my-1.5">نام شرکت: {data.brand}</p>
                    <p className="text-sm text-center pt-2 border-t-[1px] border-t-neutral-300 pb-1">تعداد درخواست</p>
                    <div className="w-11/12 mx-auto bg-neutral-300 p-3 rounded-lg ">
                        <Input data={inquiry} setData={setInquiry} name={"number"} title={"مقدار درخواستی از محصول"} setError={setError} error={error} bg={"white"} />
                        <Input data={inquiry} setData={setInquiry} name={"unit"} title={"واحد"} setError={setError} error={error} bg={"white"} />
                        <div className="mt-4">
                            <Textarea data={inquiry} setData={setInquiry} name={"description"} title={"توضیحات"} setError={setError} error={error} bg={"white"} />

                        </div>
                    </div>
                    <p onClick={InqueryHandler} className="bg-blue-800 mt-2.5 text-white rounded-lg w-11/12 py-0.5 mx-auto text-center text-nowrap">
                        ارسال درخواست
                    </p>


                </div>

            }
            {loading && <Loading />}

            {error && typeof error == 'string' && <p className="errortag">{error}</p>}
            <button onClick={() => setShow(true)} className="bg-orange-400 text-white text-lg p-3 rounded-md ">استعلام</button>
        </>
    );
}