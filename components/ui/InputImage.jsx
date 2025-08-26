'use client'

import { useParams } from "next/navigation";
import { FaFileUpload } from "react-icons/fa";

export default function InputImage({ data, setData, title, name, error }) {

    const params = useParams() || {}

    const locale = params.locale || 'fa'

    const ChangeHandler = async (e) => {
        setData((perv) => ({ ...perv, [name]: e.target.files[0] }))
    }

    return (
        <div className=" text-blue-800 flex flex-col">
            <input onChange={ChangeHandler} type="file" className="hidden" name={name} id={name} />
            <label className="flex flex-row items-center gap-x-1.5 text-sm" htmlFor={name}>
                <FaFileUpload className="text-base" />
                <p>{data[name] ? locale === 'fa' ? "فایل بارگذاری شد" : locale == 'en' ? "File uploaded" : locale == 'ar' ? "تم التحميل" : locale == 'tr' ? "Dosya yüklendi" : "فایل بارگذاری شد" : title}</p>
            </label>
            <p className="text-red-500 text-xs mt-1">{(error && error[name]) && error[name]}</p>
        </div>
    );
}