'use client'

import { api } from "@/config/api";
import { clienterr } from "@/util/Errorhadnler";
import HeaderItems from "@/components/layout/HeaderItems";
import DeleteBtn from "@/components/ui/Group/DeleteBtn";
import { TbUsersPlus } from "react-icons/tb";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { useEffect, useState } from "react";
import Loading from "@/components/modals/Loading";
import { useParams, useRouter } from "next/navigation";
import { IoBusiness } from "react-icons/io5";
import { ShowMessage } from "@/util/ShowMessage";
import fatranslate from "@/locales/fa/automationSystem.json"
import enTranslate from "@/locales/en/automationSystem.json"
import arTranslate from "@/locales/ar/automationSystem.json"
import trTranslate from "@/locales/tr/automationSystem.json"


export default function page() {

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [group, setGroup] = useState()
    const [search, setSearch] = useState('')
    const [brands, setBrands] = useState([])

    const params = useParams()
    const GroupId = params.GroupId
    const router = useRouter()
    const locale = params.locale

    const tr = {
        fa: fatranslate,
        en: enTranslate,
        ar: arTranslate,
        tr: trTranslate
    }
    const t = tr[locale]




    const fetchGroup = async () => {
        setLoading(true)
        const res = await api.post('application/panel/as/groupShow', { id: GroupId }).catch(err => clienterr(err)).finally(() => setLoading(false))
        if (res.status !== 200) {
            setMessage(t.error_message)
            return
        }
        if (res.data && !res.data.flag) {
            setMessage(res.data.message)
        } else if (res.data && res.data.flag) {
            setGroup(res.data.response)
        }

    }


    useEffect(() => {

        fetchGroup()
    }, [])

    useEffect(() => {
        const SearchBrands = async () => {
            const res = await api.post(`application/panel/as/search?type=1&search=${search}`).catch(err => (err))
            if (res.data && res.data.flag) {
                setBrands(res.data.response.items)
            }
        }
        if (search && search.length > 2) SearchBrands()
    }, [search])

    const AddHandler = async (id) => {
        setLoading(true)
        const res = await api.post('application/panel/as/addBrandToGroup', { group_id: group.group.id, brand_id: id }).catch(err => clienterr(err)).finally(() => setLoading(false))
        if (!res.data) {
            ShowMessage(t.error_message, setMessage)
        }

        if (res.data && res.data.flag) {
            ShowMessage(t.company_added, setMessage)
            setSearch('')
            setBrands([])
            fetchGroup()
        } else if (res.data && !res.data.flag) {
            ShowMessage(res.data.message, setMessage)
        }
    }
    const reamoveBrand = async (id) => {
        const res = await api.post('application/panel/as/removeBrandFromGroup', { group_id: group.group.id, brand_id: id }).catch(err => clienterr(err))
        if (res.data && res.data.flag) {

            setMessage(t.company_removed, setMessage)
            fetchGroup()
            return true
        } else if (res.data && !res.data.flag) {
            ShowMessage(res.data.message, setMessage)
            return false
        }
    }

    return (
        <div className="min-h-screen">
            {message && <p className="errortag">{message}</p>}
            {loading && <Loading />}
            <HeaderItems href={`/${locale}/AutomationSystem/Groups`} title={group && group.group.name} />
            <div className="flex flex-row gap-x-3 px-2 mt-2 items-center text-neutral-700 text-xs">
                <label htmlFor="search">{t.company}: </label>
                <div className="bg-white w-full rounded-md border-[1px] border-blue-900 flex flex-row items-center p-1">
                    <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-full p-1 text-xs pl-0" type="text" id="search" />
                    <TbUsersPlus className="text-neutral-600 text-lg" />
                </div>
            </div>
            <div>
                {brands && brands.length > 0 &&
                    <ul>
                        {brands.map((i) => (
                            <li onClick={() => AddHandler(i.id)} className="text-xs flex flex-row items-center bg-neutral-300 border-[1px] border-neutral-500 rounded-md p-1.5 gap-x-2 my-1" key={i.id}>
                                <IoBusiness className="text-lg text-neutral-700" />
                                {i.name}

                            </li>
                        ))}
                    </ul>
                }
            </div>
            <div className="mt-3 px-2 flex flex-col gap-y-1.5">
                {group && group.brands.length > 0 && group.brands.map((i) => (
                    <div className="bg-white p-1 flex flex-row justify-between rounded-sm" key={i.id}>
                        <p className="text-xs flex flex-row items-center gap-x-1">
                            <HiMiniBuildingOffice2 className="text-xl text-blue-800" />
                            {i.name}
                        </p>
                        <DeleteBtn action={reamoveBrand} id={i.id} t={t} />


                    </div>
                ))}
            </div>
        </div>
    );
}