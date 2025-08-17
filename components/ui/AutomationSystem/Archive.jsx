'use client'

import { api } from "@/config/api";
import { ShowMessage } from "@/util/ShowMessage";
import { useState } from "react";
import { FaRegBookmark } from "react-icons/fa";

export default function Archive({ id }) {

    const [message, setMessage] = useState('')

    const ClickHandler = async () => {
        const res = await api.post('application/panel/as/archive', { type: "reciver", id })
        if (res.data) {
            ShowMessage(res.data.message, setMessage)
        }
    }

    return (
        <>
            {message && <p className="errortag">{message}</p>}
            <FaRegBookmark onClick={ClickHandler} className="text-orange-400 " />
        </>
    );
}