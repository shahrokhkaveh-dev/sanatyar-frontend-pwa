'use client'

import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GrLanguage } from "react-icons/gr";
import { IoIosSearch } from "react-icons/io";

export default function page() {

    const [search, setSearch] = useState('')

    const [selectedLang, setSelectedLang] = useState(null)

    const router = useRouter()

    const langs = [
        {
            name: 'فارسی',
            value: 'fa',
            label: 'persian',
            flag: '/Iran.png'
        },
        {
            name: 'انگلیسی',
            value: 'en',
            label: 'english',
            flag: '/England.png'
        },
        {
            name: 'عربی',
            value: 'ar',
            label: 'arabic',
            flag: '/Arabia.png'
        },
        {
            name: 'ترکی',
            value: 'tr',
            label: 'turkish',
            flag: '/turkish.png'
        }
    ]

    const [filteredLangs, setFilteredLangs] = useState(langs)
    useEffect(() => {
        setFilteredLangs(() => langs.filter((i) => i.name.toLowerCase().includes(search.toLowerCase())))
    }, [search])

    const SelectHandler = () => {
        Cookies.set('lang', selectedLang)
        window.location.href = `/${selectedLang}/login`
    }

    return (
        <div className="w-full h-full bg-white px-4 pt-8 pb-7">
            <div className="w-full flex flex-col items-center justify-center mb-6 ">
                <GrLanguage className="text-4xl" color="#00378E" />
                <p className="font-bold">لطفا زبان مورد نظر خود را انتخاب کنید</p>
            </div>
            <div className=" flex flex-row items-center justify-between gap-x-2 bg-[#F2F2F2] p-2 rounded-sm w-full  mb-3 border-[1px] border-[#D5DEEC]">
                <IoIosSearch className="text-xl text-[#809BC7]" />
                <input className="w-full flex-1 placeholder:text-[#809BC7] text-black" type="text" placeholder="جست و جو" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="flex flex-col gap-y-2">
                {filteredLangs.map((i) => (
                    <div aria-checked={selectedLang == i.value} onClick={() => setSelectedLang(i.value)} className="group py-3.5 px-3 border-[1px] border-[#D5DEEC] rounded-sm flex flex-row items-center gap-x-2 aria-checked:bg-[#FEECDB] ">
                        <Image src={i.flag} alt={i.label} width={50} height={50} />
                        <div className="text-xs flex flex-col justify-baseline h-full gap-y-1.5">
                            <p className="group-aria-checked:text-[#FA8C26]">{i.name}</p>
                            <p className="group-aria-checked:text-[#A75D19] text-[#809BC7]">{i.label}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={SelectHandler} disabled={!selectedLang} className="w-full text-[13px] rounded-lg disabled:text-[#535353] text-white bg-[#FA8C26] text-center h-10 mt-2 disabled:bg-[#D9D9D9] ">ورود</button>
        </div>
    );
}