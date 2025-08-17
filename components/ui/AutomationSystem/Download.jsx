'use client'

import { api } from "@/config/api";
import { DownloadFile } from "@/util/Download";
import { useState } from "react";
import { IoMdDownload } from "react-icons/io";
import { ShowMessage } from "@/util/ShowMessage";

export default function Download({ id, type, t }) {

    const [message, setMessage] = useState('')

    const DownloadHandler = async () => {
        const res = await api.post('application/panel/as/print', { id, type: type ? type : 'sended' }, { responseType: "blob" })
        if (res.status == 200) {
            DownloadFile(res)
        } else {
            ShowMessage(t.error_message, setMessage)
        }
    }

    return (
        <div onClick={DownloadHandler} className="bg-white rounded-lg relative w-full overflow-hidden flex flex-col items-center justify-center h-20">
            {message && <p className="errortag">{message}</p>}
            <IoMdDownload className="text-4xl text-orange-400" />
            <p className="text-blue-800 text-sm">{t.download_letter}</p>
            <div className="w-16 -right-7 -top-4 h-10 bg-blue-900 rotate-45 absolute"></div>
        </div>
    );
}