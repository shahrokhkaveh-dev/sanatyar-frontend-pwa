'use client'
import { IoCloseSharp } from "react-icons/io5";
import { MdError } from "react-icons/md";

export default function Input({ disable, setinitdata, data, setData, title, placeholder, error, name, setError, bg }) {


    const changeHandler = (e) => {
        if (error && error[name]) {
            setError((perv) => ({
                ...perv,
                [name]: ''
            }))
        }
        setData((perv) => ({ ...perv, [name]: e.target.value }))

    }

    const DelHandler = () => {
        if (!setinitdata) return
        setData({
            name: '', companys: [], selected: ''
        })
        setinitdata((perv) => ({ ...perv, ['reciver_id']: '' }))

    }


    return (
        <div className="w-full flex flex-row items-center gap-x-6">
            <label htmlFor={name} className=" w-14 text-base font-bold mb-1 ">{title}: </label>
            <div className={`border-[1px] px-1  ${bg ? `bg-${bg}` : 'bg-blue-50'} border-blue-900  rounded-md w-full flex flex-row items-center justify-between relative `}>
                {!disable && name == "name" && <IoCloseSharp onClick={DelHandler} className="text-red-600 absolute left-1" />}
                {error && error[name] && <MdError className="text-xl text-red-600" />}
                {error && error[name] && <div className="absolute  right-0  -bottom-6">
                    <p className="backdrop-brightness-20 text-white text-xs   px-2 py-1 border-t-[6px] border-red-600 relative z-40 text-nowrap"> {error[name]}
                        <div className="absolute w-2 h-2 bg-red-600 -top-2.5 mr-0.5 rotate-45"></div>
                    </p>
                </div>}
                <input disabled={disable ? disable : false} value={data.selected ? data.selected : data[name] || ''} onChange={changeHandler} name={name} id={name} placeholder={placeholder} type="text" className="w-full text-right py-3 placeholder:text-lg text-base" />
            </div>
        </div>
    );
}