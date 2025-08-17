'use client'

import { useEffect, useRef } from "react";

export default function Textarea({ title, name, data, setData, bg }) {

    const textareaRef = useRef(null);

    const ChangeHndler = (e) => {
        setData((perv) => ({ ...perv, [name]: e.target.value }))
    }
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // ریست کردن ارتفاع
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // تنظیم ارتفاع
        }
    }, [data[name]]); // اجرای مجدد هر بار که مقدار تغییر می‌کند

    return (
        <div className="flex flex-col">
            <textarea value={data[name]} placeholder={title} onChange={ChangeHndler} ref={textareaRef} className={`bg-white border-[1px] border-neutral-400 w-full rounded-lg min-h-3 text-sm p-1 overflow-hidden placeholder:text-sm px-1.5`} name={name} id={name}></textarea>
        </div>
    );
}