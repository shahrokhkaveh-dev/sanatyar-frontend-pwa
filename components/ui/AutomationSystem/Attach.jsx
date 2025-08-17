'use client';

import { api } from "@/config/api";
import { useState } from "react";
import { IoMdAttach } from "react-icons/io";
import { DownloadFile } from "@/util/Download";
import { ShowMessage } from "@/util/ShowMessage";

export default function Attach({ id, type, t }) {
    const [message, setMessage] = useState('')


    const ClicHandler = async () => {
        const res = await api.post('application/panel/as/attach', { id, type: type ? type : 'sended' }, { responseType: "blob" })
        if (res.status == 200) {
            DownloadFile(res)
        } else {
            ShowMessage(t.error_message, setMessage)
        }

    }
    return (
        <div onClick={ClicHandler} className="bg-white rounded-lg relative w-full overflow-hidden flex flex-col items-center justify-center h-20">
            {message && <p className="errortag">{message}</p>}
            <IoMdAttach className="text-4xl text-orange-400" />
            <p className="text-blue-800 text-sm">{t.download_attachment}</p>
            <div className="w-16 -right-7 -top-4 h-10 bg-blue-900 rotate-45 absolute"></div>
        </div>
    );
}