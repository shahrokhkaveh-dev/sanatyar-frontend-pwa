'use client'

import { api } from "@/config/api";
import { ShowMessage } from "@/util/ShowMessage";
import { permission } from "@/constans/permission";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddUser({ t }) {

    const [message, setMessage] = useState('')
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        permission: {
        }
    })

    const router = useRouter()

    const AddHandler = async () => {

        const res = await api.post('application/panel/brand/add-member', { ...user })

        if (!res.data.flag && res.data.code === -1) {

            if (typeof res.data.response == 'object') {
                ShowMessage(Object.values(res.data.response)[0], setMessage)
                return
            }
        }
        //    if (error && typeof error == 'object') {
        //     ShowMessage(Object.values(error)[0], setMessage)
        // }

        if (res.data && res.data.flag) {
            setUser(
                {
                    first_name: '',
                    last_name: '',
                    phone: '',
                    permission: {}
                })
            ShowMessage(t?.user_added || "کاربر افزوده شد", setMessage)
            router.refresh()

        } else if (res.data && res.data.message) {
            ShowMessage(res.data.message, setMessage)
        }

    }

    const ChangeHandler = (i) => {
        setUser((prev) => {
            const isExist = prev.permission.hasOwnProperty(i);
            const newPermission = { ...prev.permission };

            if (isExist) {
                delete newPermission[i]; // اگه بود پاک کن
            } else {
                newPermission[i] = 1; // اگه نبود اضافه کن
            }

            return {
                ...prev,
                permission: newPermission
            };
        });
    };


    return (
        <>
            {message && <p className="errortag text-nowrap">{message}</p>}

            <input className="hidden peer" type="checkbox" id="adduser" />

            <div style={{ zIndex: "999" }} className="fixed top-0 w-full h-full right-0 backdrop-brightness-25 peer-checked:block hidden ">
                <div className="bg-white  py-2 px-2.5 w-[260px] rounded-lg mx-auto flex flex-col gap-y-2.5 mt-5">
                    <input className="h-7 border-[1px] border-neutral-300 placeholder:text-neutral-400 text-sm font-light rounded-md  px-1 w-full" value={user.first_name || ""} onChange={(e) => setUser(perv => ({ ...perv, first_name: e.target.value }))} placeholder={t?.first_name || "نام کاربر"} />
                    <input className="h-7 border-[1px] border-neutral-300 placeholder:text-neutral-400 text-sm font-light rounded-md  px-1 w-full" value={user.last_name || ""} onChange={(e) => setUser(perv => ({ ...perv, last_name: e.target.value }))} placeholder={t?.last_name || "نام خانوادگی کاربر"} />
                    <input className="h-7 border-[1px] border-neutral-300 placeholder:text-neutral-400 text-sm font-light rounded-md  px-1 w-full" value={user.phone || ""} onChange={(e) => setUser(perv => ({ ...perv, phone: e.target.value }))} placeholder={t?.phone_number || "شماره موبایل کاربر (غیرقابل ویرایش)"} />
                    <p className="text-orange-400 text-sm px-1 font-semibold">{t?.user_access_level || "سطح دسترسی کاربر"}</p>
                    <div className="flex flex-col gap-y-2">
                        {Object.keys(permission).map((i, index) => (
                            <div key={index} className="flex flex-row justify-between gap-x-2 items-center md:text-base sm:text-sm text-xs">

                                <label htmlFor={i}>{permission[i]}</label>
                                <input className="custom-checkbox" checked={!!user.permission[i]} onChange={() => ChangeHandler(i)} type="checkbox" id={i} name={i} value={1} />
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-x-1.5">
                        <button onClick={AddHandler} className="bg-blue-900 text-sm py-1 text-white rounded-md">{t?.save_user_info || "ثبت اطلاعات"}</button>
                        <label htmlFor="adduser" className="text-red-500  text-sm py-1 border-[1px] border-red-500 rounded-md text-center">{t?.cancel || "لغو"}</label>
                    </div>
                </div>
            </div>
        </>

    );
}