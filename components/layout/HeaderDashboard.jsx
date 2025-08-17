'use client'

import Image from "next/image";
import { SlOptionsVertical } from "react-icons/sl";
import { FaImage } from "react-icons/fa";
import ImageCropper from "../ui/ImageCropper";
import { useEffect, useState } from "react";
import { api } from "@/config/api";
import { usePathname } from "next/navigation";
import Map from "../ui/brand/Map";
import Link from "next/link";
import { FaUserGear } from "react-icons/fa6";
import { RiBox3Fill } from "react-icons/ri";
import { MdMiscellaneousServices } from "react-icons/md";
import { ShowMessage } from "@/util/ShowMessage";
import { useRouter } from "next/navigation";
import Loading from "../modals/Loading";

export default function HeaderDashboard({ user, t, locale }) {
    const [cropModalOpen, setCropModalOpen] = useState(false);
    const [rawImage, setRawImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState('');
    const [message, setMessage] = useState()
    const [map, setMap] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const setProfile = async () => {
            setLoading(true)

            const res = await api.post('application/panel/profile/change_avatar', { image: croppedImage }, { headers: { "Content-Type": "multipart/form-data" } }).finally(() => setLoading(false))
            ShowMessage(res.data.message, setMessage)
            if (res.data && res.status == 200 && res.data.flag) {
                setRawImage(null)
                setCroppedImage('')
                router.refresh()
            }
        }
        if (croppedImage) setProfile()
    }, [croppedImage])

    const router = useRouter()

    const pathName = usePathname()
    if (!user || pathName.includes('products/myProducts/Add') || pathName.includes('/Archive') || pathName.includes('Plan') || pathName.includes('Dashboard/myAccont/brand') || pathName.includes('Dashboard/products/myProducts') || pathName.includes('Dashboard/myAccont/Signature') || pathName.includes('Dashboard/myAccont/Images') || pathName.includes('/myAccont/brand/Edit') || pathName.includes('/myAccont/users')) {
        return null;
    }



    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setRawImage(reader.result);
            setCropModalOpen(true);
        };
        reader.readAsDataURL(file);
    };

    return (
        <header className="bg-blue-800 ">
            {loading && <Loading t={t} />}
            <div className="flex flex-row justify-between items-center py-6 pr-4 pl-1 ">
                {map && <Map t={t} />}
                {message && <p className="errortag">{message}</p>}

                <div className={`flex flex-row w-fit gap-x-2`}>
                    {!pathName.includes("brand") && <Image className="bg-white w-24 h-auto rounded-md aspect-square" width={300} height={300} alt="profile" src={user.user.avatar ? `${process.env.NEXT_PUBLIC_BASE_IMAGE}${user.user.avatar}` : '/profile.png'} />}
                    {pathName.includes("brand") && <Image className="bg-white w-24 rounded-md aspect-square h-auto" width={300} height={300} alt="profile" src={user.brand.logo_path ? `https://app.sanatyariran.com/${user.brand.logo_path}` : '/profile.png'} />}
                    {!pathName.includes("brand") && <div className="py-2 text-white text-sm">
                        {(user.brand && user.brand.name) && <p className=" text-orange-300 font-bold text-lg ">{user.brand.name}</p>}
                        <p className="mt-3 mb-1">{user.user.name}</p>
                        <span>{user.user.phone}</span>
                    </div>}
                    {pathName.includes("brand") && <div className="py-2 relative text-white text-xs">
                        {(user.brand && user.brand.name) && <p className="text-sm text-orange-300 font-semibold">{user.brand.name}</p>}
                        <p className="mt-3">{user.brand.category_id}</p>
                        <div className="flex flex-row absolute gap-x-2 mt-2">
                            <a href={`tel:${user.brand.phone_number}`} className="bg-white h-fit text-blue-900 px-2 py-1 rounded-md">{t?.contact || "تماس"}</a>
                            <button onClick={() => setMap(true)} className="bg-white h-fit text-nowrap text-blue-900 px-2 py-1 rounded-md">{t?.show_on_map || "نمایش روی نقشه"}</button>
                        </div>
                    </div>}
                </div>
                <div className="relative">
                    <input type="checkbox" name="show" id="show" className="hidden peer" />
                    <label htmlFor="show" className="text-xl px-8 text-white " >
                        <SlOptionsVertical />
                    </label>

                    <label htmlFor="profile" className={`transition-all duration-200 ease-in-out 0 opacity-0 peer-checked:opacity-100  overflow-hidden scale-0 peer-checked:scale-100 flex flex-row items-center gap-x-2 text-nowrap bg-white rounded-md peer-checked:px-3 peer-checked:py-1.5 absolute text-base font-bold ${locale == 'fa' || locale == 'ar' ? 'left-0' : "right-0"}  mt-1.5 top-14`}>
                        <FaImage className="text-4xl text-blue-800" />
                        {t?.change_profile_image || "تغییر تصویر پروفایل"}
                    </label>
                    <input
                        id="profile"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>
                <ImageCropper
                    open={cropModalOpen}
                    imageSrc={rawImage}
                    onClose={() => setCropModalOpen(false)}
                    onCropComplete={(cropped) => {
                        setCroppedImage(cropped);
                        setCropModalOpen(false);
                    }}
                />
            </div>
            <div className="bg-neutral-200 py-3.5 flex flex-row justify-around">
                <Link aria-checked={pathName.includes('myAccont')} className="text-sm font-bold flex items-center flex-col w-fit px-3.5 aria-checked:border-b-[2px] pb-1.5 border-blue-800" href={`/${locale}/Dashboard/myAccont`} >
                    <FaUserGear className="text-blue-800 text-3xl" />
                    {t?.basic_info || "اطلاعات پایه"}
                </Link>
                <Link aria-checked={pathName.includes('products')} className="text-sm font-bold flex items-center flex-col w-fit px-3.5 aria-checked:border-b-[2px] pb-1.5 border-blue-800" href={`/${locale}/Dashboard/products`} >
                    <RiBox3Fill className="text-blue-800 text-3xl" />
                    {t?.products || "محصولات"}
                </Link>
                <button className="text-sm font-bold flex items-center flex-col w-fit px-3.5 aria-checked:border-b-[2px] pb-1.5 border-blue-800" aria-checked={pathName.includes('services')} >
                    <MdMiscellaneousServices className="text-blue-800 text-3xl" />
                    {t?.services || "خدمات"}
                </button>
            </div>

        </header>
    );
}