'use client';

import { IoMdAttach } from "react-icons/io";

export default function FileInput({ name, data, setData, t }) {

    const ChangeHandler = (e) => {
        setData((perv) => ({ ...perv, [name]: e.target.files[0] }))
    }

    return (
        <div className="flex flex-row gap-x-3.5 items-center">
            <label htmlFor={name} className="w-fit text-nowrap text-base font-bold">{t.attachment}: </label>
            <label className="w-full bg-white h-fit py-2 rounded-md border-[1px] border-blue-900 flex flex-row justify-end text-xs items-center" htmlFor={name}>
                {data[name] && data[name].name}
                <IoMdAttach className="text-3xl text-neutral-600" />
            </label>
            <input onChange={ChangeHandler} type="file" className="hidden" name={name} id={name} />
        </div>
    );
}