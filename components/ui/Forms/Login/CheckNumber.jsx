'use client'

import Image from "next/image";
import Input from "../../Input";
import { useState } from "react";
import { clienterr } from "@/util/Errorhadnler";
import { api } from "@/config/api";
import Loading from "@/components/modals/Loading";
import { ShowMessage } from "@/util/ShowMessage";

export default function CheckNumber({ setStep, phone, setPhone, t }) {
    const [error, setError] = useState()
    const [checked, setChecked] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const sendOTP = async (e) => {
        e.preventDefault();
        if (!checked) {
            return;
        } else {
            setLoading(true)

            const res = await api.post('application/login/check-number', { phone: phone.phone }).catch(err => clienterr(err, setError)).finally(() => setLoading(false))

            if (res.data && !res.data.flag && res.data.code === -2) {
                const res = await api.post('application/register', { phone: phone.phone }).catch(err => err)
                setStep(3)
            }

            if (res.status !== 200 && res.status !== 422) {
                ShowMessage(t.error_message, setMessage)
                return;
            }

            if (res.data && res.data.flag) {
                setStep(2)
                ShowMessage(t.sms_sent, setMessage)
            } else if (res.data && !res.data.flag) {
                ShowMessage(res.data.message, setMessage)
            }
        }
    }

    return (
        <div className="bg-blue-900 min-h-screen px-3 py-5 flex items-center justify-center">
            {loading == true && <Loading />}
            {message && <p className="errortag">{message}</p>}
            <form onSubmit={sendOTP} className="bg-white w-full h-fit flex flex-col items-center px-3.5 py-8 rounded-lg ">
                <Image quality={100} className="w-36" width={1000} height={1000} alt="image" src={"/Vector.svg"} />
                <p className="text-xs font-bold  text-blue-800 text-nowrap" >{t.description}</p>
                <p className="text-orange-400 mt-2.5 text-xl font-extrabold">{t.subtitle}</p>
                <Input error={error} height={"30"} setError={setError} data={phone} setData={setPhone} title={t.phone_number} placeholder={t.phone_placeholder} name={"phone"} />
                <div className="flex flex-row-reverse items-center gap-x-1.5 mt-5">
                    <input type="checkbox" className="peer hidden" name="show" id="show" />
                    <div className="hidden peer-checked:block fixed w-full h-full top-0 right-0 backdrop-brightness-50 px-2 py-4 z-50 overflow-auto">
                        <div className="bg-white  h-fit px-2 py-5">
                            <p className=" text-sm ">
                                {t.terms_content}
                            </p>
                            <label htmlFor="show" className="text-red-500 border-[1px] border-red-500 rounded-md py-1.5 w-full  text-center text-sm mt-4 block">{t.close_window}</label>
                        </div>
                    </div>
                    <label htmlFor="show" className="text-sm  text-red-500 font-bold text-nowrap">{t.terms_acceptance}</label>
                    <input checked={checked} onChange={(e) => setChecked(e.target.checked ? 1 : 0)} type="checkbox" className="custom-checkbox" />
                </div>
                <button disabled={loading} type="submit" className="mt-2.5 bg-blue-900 text-white w-full py-1.5 rounded-lg disabled:opacity-50">{t.login_button}</button>
            </form>
        </div>
    );
}