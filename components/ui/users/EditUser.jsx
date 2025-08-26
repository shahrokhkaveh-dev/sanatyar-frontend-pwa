'use client'

import { api } from "@/config/api";
import { clienterr } from "@/util/Errorhadnler";
import { ShowMessage } from "@/util/ShowMessage";
import Loading from "@/components/modals/Loading";
import { permission } from "@/constans/permission";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";

export default function EditUser({ UserData, t }) {
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        permission: {
        }
    })

    const router = useRouter()

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

    useEffect(() => {
        if (!user) return
        setUser((perv) => ({
            ...perv,
            user_id: UserData.id,
            first_name: UserData.first_name,
            last_name: UserData.last_name,
            phone: UserData.phone,
        }))

        Object.keys(permission).forEach((key) => {
            if (UserData.permissions[key]) {
                setUser((perv) => ({ ...perv, permission: { ...perv.permission, [key]: 1 } }))

            }
        })

    }, [UserData])

    const setHadnler = async () => {
        setLoading(true)
        const res = await api.post('application/panel/brand/edit-member', { ...user }).finally(() => setLoading(false)).catch(err => clienterr(err))

        if (!res.data.flag && res.data.code === -1) {
            if (typeof res.data.response == 'object') {
                ShowMessage(Object.values(res.data.response)[0], setMessage)
                return
            }
        }

        if (res.data.flag) {
            setUser(
                {
                    first_name: '',
                    last_name: '',
                    phone: '',
                    permission: {}
                })
            ShowMessage(t?.user_edited || "کاربر ویرایش شد", setMessage)

            router.refresh()
        } else {
            toast.error(res.data.message)
        }

    }
    return (
        <>
            {loading && <Loading t={t} />}
            {message && <p className="errortag text-nowrap">{message}</p>}
            <input className="peer hidden" type="checkbox" id="edituser" />
            <label htmlFor="edituser">   <FaUserEdit className="text-green-600 text-2xl" /></label>


            <div style={{ zIndex: "999" }} className="fixed top-0 left-0 backdrop-brightness-75 w-full z-40 h-full  items-center justify-center hidden peer-checked:flex px-3">
                <div onClick={(e) => e.stopPropagation()} className=" h-fit bg-white  py-3 rounded-lg w-full">
                    <div className="flex flex-row justify-between items-center py-2 border-b-2 border-neutral-300 px-3">
                        <p>{t?.edit_user || "ویرایش کاربر"}</p>
                        <MdOutlineClose className="cursor-pointer" />
                    </div>
                    <div className="flex flex-col gap-y-2.5 mt-6 px-3 md:text-base text-sm">
                        <input className="h-7 border-[1px] border-neutral-300 placeholder:text-neutral-400 text-sm font-light rounded-md  px-1 w-full" value={user.first_name || ""} onChange={(e) => setUser(perv => ({ ...perv, first_name: e.target.value }))} placeholder={t?.first_name || "نام کاربر"} />
                        <input className="h-7 border-[1px] border-neutral-300 placeholder:text-neutral-400 text-sm font-light rounded-md  px-1 w-full" value={user.last_name || ""} onChange={(e) => setUser(perv => ({ ...perv, last_name: e.target.value }))} placeholder={t?.last_name || "نام خانوادگی کاربر"} />
                        <input className="h-7 border-[1px] border-neutral-300 placeholder:text-neutral-400 text-sm font-light rounded-md  px-1 w-full" value={user.phone || ""} onChange={(e) => setUser(perv => ({ ...perv, phone: e.target.value }))} placeholder={t?.phone_number || "شماره تلفن"} />
                        <div className="flex flex-col gap-y-2">
                            <p className="text-orange-400 text-sm  font-semibold">{t?.user_access_level || "سطح دسترسی کاربر"}</p>
                            {Object.keys(permission).map((i, index) => (
                                <div key={index} className="flex flex-row gap-x-2 justify-between items-center md:text-base sm:text-sm text-xs">

                                    <label htmlFor={i}>{t[`permission_${i}`] || permission[i]}</label>
                                    <input className="custom-checkbox" checked={!!user.permission[i]} onChange={() => ChangeHandler(i)} type="checkbox" id={i} name={i} value={1} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-1.5 mt-4 px-2">
                        <button onClick={setHadnler} className="bg-blue-900 text-sm py-1 text-white rounded-md">{t?.save_user_info || "ثبت اطلاعات"}</button>
                        <label htmlFor="edituser" className="text-red-500  text-sm py-1 border-[1px] border-red-500 rounded-md text-center">{t?.cancel || "لغو"}</label>
                    </div>
                </div>

            </div>

        </>
    );
}