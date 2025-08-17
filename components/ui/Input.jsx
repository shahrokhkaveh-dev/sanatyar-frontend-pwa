'use client'
import { MdError } from "react-icons/md";

export default function Input({ data, setData, title, placeholder, error, name, setError, bg, height, dir }) {


    const changeHandler = (e) => {
        if (error && error[name]) {
            setError((perv) => ({
                ...perv,
                [name]: ''
            }))
        }
        setData((perv) => ({ ...perv, [name]: e.target.value }))

    }

    return (
        <div className="w-full">
            <label htmlFor={name} className="mt-4 w-full text-sm mb-1 font-semibold">{title}</label>
            <div className={`border-[1px] px-1  ${bg ? `bg-${bg}` : 'bg-blue-50'} border-blue-900  rounded-md w-full flex flex-row items-center justify-between relative ${height && `h-[${height}px]`}`}>
                {error && error[name] && <MdError className="text-xl text-red-600" />}
                {error && error[name] && <div className="absolute  right-0  -bottom-6">
                    <p className="backdrop-brightness-20 text-white text-xs   px-2 py-1 border-t-[6px] border-red-600 relative z-40 text-nowrap"> {error[name]}
                        <div className="absolute w-2 h-2 bg-red-600 -top-2.5 mr-0.5 rotate-45"></div>
                    </p>
                </div>}
                <input value={data[name] || ''} onChange={changeHandler} name={name} id={name} placeholder={placeholder} type="text" className={`w-full  py-1 ${dir ? `text-${dir}` : 'text-left'} text-lg placeholder:text-lg`} />
            </div>
        </div>
    );
}