'use client'

import { useEffect, useRef, useState } from "react";
import SelectOtion from "../SelectOtion";
import { api } from "@/config/api";
import { clienterr } from "@/util/Errorhadnler";
import Textarea from "../Textarea";
import { fetchLocation } from "@/util/FetchLocation";
import Input from "../Input";
import MapComponent from "../Map";
import { IoLocation } from "react-icons/io5";

import { useRouter } from "next/navigation";
import Loading from "@/components/modals/Loading";
import { ShowMessage } from "@/util/ShowMessage";
import HeaderItems from "@/components/layout/HeaderItems";

export default function EditForm({ pervData, t }) {


    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState()
    const [show, setShow] = useState(false)
    const [error, setError] = useState()
    const [Location, setLocation] = useState({ city: [], province: [], ipark: [] })
    const [category, setCategory] = useState([])
    const [brand, setBrand] = useState({
        name: '',
        ipark_id: '',
        city_id: '',
        province_id: '',
        ipark_id: '',
        phone_number: '',
        post_code: '',
        address: '',
        category_id: '',
        description: '',
        lat: '',
        lng: ''
    })

    useEffect(() => {
        if (!pervData) return
        setBrand(perv => ({
            ...perv,
            ...pervData.brand
        }))
    }, [pervData])

    const textareaRef = useRef(null);
    const router = useRouter()

    useEffect(() => {
        const fetchCategory = async () => {
            const res = await api.get('application/filters/category').catch(err => clienterr(err))
            if (res.data && res.data.flag) {
                setCategory(res.data.response.categories)

            }
        }
        fetchCategory()
    }, [])

    useEffect(() => {
        fetchLocation(brand.province_id, setLocation)
    }, [brand.province_id])

    const EditHndler = async () => {
        setLoading(true)
        const res = await api.post('application/panel/brand/update').catch((err) => clienterr(err, setError)).finally(() => setLoading(false))
        if (res.data && res.data.flag) {
            ShowMessage(t?.company_edited || "اطلاعات شرکت ویرایش شد", setMessage)
            router.refresh()
            router.push('/Dashboard')

        } else if (res.data && res.data.flag == false) {
            ShowMessage(res.data.message, setMessage)
        }
    }

    useEffect(() => {
        if (error && typeof error == 'object') {
            ShowMessage(Object.values(error)[0], setMessage)
        }
    }, [error])


    return (
        <div className="p-1 ">
            {loading && <Loading t={t} />}
            {message && <p className="errortag">{message}</p>}
            <div className="bg-white border-[1px] border-neutral-400 rounded-md px-1 py-2 flex flex-col gap-y-2.5 font-extrabold">
                <div className="flex items-center gap-2">
                    <p className="whitespace-nowrap text-gray-800 "> {t?.company_details || "مشخصات شرکت"}</p>
                    <div className="flex-1 h-px bg-blue-800" />
                </div>
                <SelectOtion data={brand} setData={setBrand} name={"category_id"} title={t?.activity_area || 'حوزه فعالیت'} items={category} />
                <Textarea data={brand} setData={setBrand} name={'description'} ref={textareaRef} title={t?.about_company || "توضیحات شرکت"} />
                <div className="flex items-center gap-2">
                    <p className="whitespace-nowrap text-gray-800">{t?.company_location_info || "اطلاعات محل شرکت"}</p>
                    <div className="flex-1 h-px bg-blue-800" />
                </div>
                <SelectOtion data={brand} setData={setBrand} name={"province_id"} title={t?.province || "استان"} items={Location.province} />
                <SelectOtion data={brand} setData={setBrand} name={"city_id"} title={t?.city || "شهر"} items={Location.city} />
                <SelectOtion data={brand} setData={setBrand} name={"ipark_id"} title={t?.industrial_city || "شهرک صنعتی"} items={Location.ipark} />
                <div className="grid grid-cols-2 gap-x-1.5">
                    <Input data={brand} setData={setBrand} name={"phone_number"} placeholder={t?.central_phone || "تلفن مرکزی"} error={error} />
                    <Input data={brand} setData={setBrand} name={"post_code"} placeholder={t?.postal_code || "کد پستی"} error={error} />
                </div>
                <Input data={brand} setData={setBrand} name={"address"} placeholder={t?.address || "آدرس"} error={error} />
                <button className="w-full flex flex-row text-blue-800 gap-x-1 items-center text-sm" onClick={() => setShow(true)}> <IoLocation className="text-2xl" />{brand.lat && brand.lng ? t?.location_registered || "موقعیت ثبت شد" : t?.register_address_on_map || 'ثبت آدرس روی نقشه'}</button>
                {show &&
                    <div style={{ zIndex: "999" }} className="fixed top-0 right-0 w-full h-full flex flex-col">
                        <HeaderItems action={() => setShow(false)} title={t?.map || "نقشه"} />
                        <MapComponent data={brand} setdata={setBrand} t={t} />
                        <button onClick={() => setShow(false)} className=" w-full bg-blue-900 text-white text-sm text-center py-2">{t?.save_location || "ثبت موقعیت"} </button>
                    </div>
                }
                <button onClick={EditHndler} className="bg-blue-800 text-white text-sm w-full text-center py-1.5 mt-3 rounded-lg ">{t?.edit_and_save || "ویرایش و ثبت"}</button>
            </div>
        </div>
    );
}