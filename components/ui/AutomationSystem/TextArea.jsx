'use client';

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
            <textarea value={data[name]} placeholder={title} onChange={ChangeHndler} ref={textareaRef} className={`${bg ? `bg-${bg}` : 'bg-blue-50'} border-[1px] border-blue-800 mt-3 w-full rounded-lg min-h-10 text-sm p-1 overflow-hidden placeholder:text-sm px-1.5`} name={name} id={name}></textarea>
        </div>
    );
}