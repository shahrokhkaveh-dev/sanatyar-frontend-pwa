'use client'

import { api } from "@/config/api";
import { ShowMessage } from "@/util/ShowMessage";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoLogOut } from "react-icons/io5";

export default function Logout({ t }) {
    const [message, setMessage] = useState()

    const router = useRouter()

    const LogoutHandler = async () => {

        const res = await api.post('application/logout')
        if (res.data && res.data.flag) {
            ShowMessage(t?.logout_success || "شما با موفقیت خارج شدید", setMessage)
            Cookies.remove('accessToken')
            router.push('/Login')
        } else if (res.data && !res.data.flag) {
            ShowMessage(res.data.message, setMessage)
        }

    }

    return (
        <>
            {message && <p className="errortag ">{message}</p>}
            <button onClick={LogoutHandler} className="flex flex-row items-center gap-x-3 p-2 py-3 w-full text-base font-bold" ><IoLogOut className="text-2xl" /> {t?.logout || "خروج از حساب کاربری"} </button>
        </>
    );
}