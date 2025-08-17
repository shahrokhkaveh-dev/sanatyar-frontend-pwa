'use client'

import { RiDeleteBin5Fill, RiDeleteBin6Fill, RiFileEditFill } from "react-icons/ri";
import { SlOptionsVertical } from "react-icons/sl";
import { useState } from "react";
import Textarea from "../AutomationSystem/TextArea";
import { api } from "@/config/api";
import { clienterr } from "@/util/Errorhadnler";
import { useRouter } from "next/navigation";
import { ShowMessage } from "@/util/ShowMessage";
import Loading from "@/components/modals/Loading";

export default function DelImage({ image, t }) {

    const [desc, setDesc] = useState({ title: '' })
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);

    const router = useRouter()

    const DeleteHandler = async () => {
        setLoading(true)
        const res = await api.post('application/panel/brand/remove-image', { path: image }).catch(err => clienterr(err)).finally(() => setLoading(false))
        if (res.error) {
            ShowMessage(res.error, setMessage)
        }

        if (res.status == 200 && res.data.flag) {
            ShowMessage(res.data.message, setMessage)
            setChecked1(false);
            setChecked2(false);
            router.refresh()
        } else if (res.status == 200 && !res.data.flag) {
            ShowMessage(res.data.message, setMessage)
        }

    }

    const EditHandler = async () => {
        const res = await api.post('application/panel/brand/update-image', { title: desc.title, path: image }).catch(err => clienterr(err)).finally(() => setLoading(false))
        if (res.error) {
            ShowMessage(res.error, setMessage)
        }

        if (res.status == 200 && res.data.flag) {
            ShowMessage(res.data.message, setMessage)
            setChecked1(false);
            setChecked2(false);
            router.refresh()
        } else if (res.status == 200 && !res.data.flag) {
            ShowMessage(res.data.message, setMessage)
        }
    }

    return (
        <>
            {loading && <Loading t={t} />}
            {message && <p style={{ zIndex: '999' }} className="errortag">{message}</p>}
            <div className="py-2 relative flex justify-end z-0">
                <input id={`show${image}`} name={`show${image}`} type="checkbox" className="hidden peer" />
                <label htmlFor={`show${image}`}>
                    <SlOptionsVertical className="text-orange-400 text-lg" />
                </label>
                <div className="transition-all duration-200 ease-in-out opacity-0 peer-checked:opacity-100 flex flex-col gap-y-1 scale-0 peer-checked:scale-105 absolute top-8  px-2 py-1 text-xs bg-white border-[1px] border-blue-600 rounded-md w-fit  text-nowrap ">
                    <label htmlFor={`edit${image}`} className="flex flex-row items-center gap-x-1">
                        <RiFileEditFill className="text-blue-800 text-base" />
                        {t?.edit_caption || "ویرایش متن"}

                    </label>
                    <label htmlFor={`delimage${image}`} className="flex flex-row items-center gap-x-1">
                        <RiDeleteBin6Fill className="text-base text-red-600" />
                        {t?.delete_image || "حذف کلی"}
                    </label>
                </div>
            </div >
            <div>
                <input checked={checked2} onChange={(e) => setChecked2(e.target.checked)} id={`delimage${image}`} name={`delimage${image}`} type="checkbox" className="hidden peer" />
                <div className="fixed w-full h-full backdrop-brightness-50 top-0 right-0 peer-checked:flex justify-center items-center hidden z-50">
                    <div className="bg-white text-sm  px-2 py-1 rounded-lg w-64">
                        <p className="text-center">{t?.delete_image_confirmation || "آیا از حذف عکس مطمن هستید؟"}</p>
                        <div className="grid grid-cols-2 text-xs gap-x-1.5 mt-10">
                            <label htmlFor={`delimage${image}`} className="text-red-600 rounded-md border-[1px] py-0.5  border-red-600 text-center w-full h-full">{t?.cancel || "لغو"}</label>
                            <button disabled={loading} onClick={DeleteHandler} className="bg-blue-800 text-white w-full rounded-md">{t?.yes || "بله"}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <input checked={checked1} onChange={(e) => setChecked1(e.target.checked)} type="checkbox" id={`edit${image}`} className="hidden peer" />
                <div className="fixed w-full h-full backdrop-brightness-50 top-0 right-0 hidden peer-checked:flex justify-center items-center  z-50">
                    <div className="bg-white text-sm  px-2 py-1 rounded-lg w-64">
                        <Textarea data={desc} name={"title"} setData={setDesc} title={t?.image_caption || "کپشن (حداکثر 250 کاراکتر)"} bg={"white"} />
                        <p className="text-neutral-600 mt-0.5 text-left">{250 - desc.title.length}</p>
                        <div className="grid grid-cols-2 text-xs gap-x-1.5 mt-5">
                            <label htmlFor={`edit${image}`} className="text-red-600 rounded-md border-[1px] py-1.5  border-red-600 text-center w-full h-full">{t?.cancel || "لغو"}</label>
                            <button disabled={loading} onClick={EditHandler} className="bg-blue-800 text-white w-full rounded-md">{t?.send || "ارسال"}</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
