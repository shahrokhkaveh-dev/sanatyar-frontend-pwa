import { api } from "@/config/api";
import { servError } from "@/util/Errorhadnler";
import { FaUserEdit } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoCall } from "react-icons/io5";
import { FaUserShield } from "react-icons/fa";
import AddUser from "@/components/ui/users/AddUser";
import DelUser from "@/components/ui/users/DelUser";
import EditUser from "@/components/ui/users/EditUser";
import Image from "next/image";
import HeaderItems from "@/components/layout/HeaderItems";
import { loadTranslation } from "@/util/translations";

export default async function page({ params }) {
    const { locale } = params;
    const t = await loadTranslation(locale, 'myAccont');

    const res = await api.get('application/panel/brand').catch(err => servError(err))

    const profile = await api.get('application/panel/profile/reload').catch((err) => servError(err))

    if (res.error || !res.data.flag) {
        return (
            <div>
                <HeaderItems href={`/${locale}/Dashboard/myAccont`} title={t.company_members_title} />
                <p className="errortag">{res.error ? res.error : res.data.message}</p>
            </div>
        )
    }
    if (profile.error || !profile.data.flag) {
        return (
            <div>
                <HeaderItems href={`/${locale}/Dashboard/myAccont`} title={t.company_members_title} />
                <p className="errortag">{profile.error ? profile.error : profile.data.message}</p>
            </div>
        )
    }


    return (
        <div className="px-1 min-h-screen">
            <HeaderItems href={`/${locale}/Dashboard/myAccont`} title={t.company_members_title} />
            {!res.data.response.brand.managment_name && !res.data.response.brand.managment_number ? null : <>
                <p className="text-sm mt-3 mb-1.5">{t.ceo_info}:</p>
                <div className="flex flex-row gap-x-2.5 bg-green-100 py-2 border-[1px] border-blue-800 rounded-lg px-2">
                    {res.data.response.brand.managment_profile_path && <Image className="w-12 h-12 rounded-full" alt="profile" width={100} height={100} src={`${process.env.NEXT_PUBLIC_BASE_IMAGE}${res.data.response.brand.managment_profile_path}`} />}
                    <div className="flex flex-row justify-between items-center w-full pl-1.5">
                        <div >
                            {res.data.response.brand.managment_name && <p className="text-sm">{t.ceo}: <span className="text-blue-800">{res.data.response.brand.managment_name}</span></p>}
                            {res.data.response.brand.managment_number && <p className="text-sm mt-2">{t.contact_number}: <span className="text-blue-800">{res.data.response.brand.managment_number}</span></p>}
                        </div>
                        <FaUserEdit className="text-2xl text-green-600" />
                    </div>
                </div>
            </>}
            <p className="text-sm mt-3 mb-1.5">{t.company_members_info}:</p>
            {Object.keys(res.data.response.users).map((key) => (
                <div className="bg-white p-2 rounded-lg mb-4 flex flex-row justify-between items-center" key={res.data.response.users[key].id} >
                    <div className="">
                        <p className="text-blue-800 text-lg font-bold flex flex-row gap-x-1 items-center "><FaUserLarge className="text-orange-400 text-xs" /> {res.data.response.users[key].name}</p>
                        <p className="text-lg font-bold mt-1.5 flex flex-row items-center gap-x-1"><IoCall className="text-orange-400" />{key}</p>
                        <div className="flex flex-row gap-x-1 mt-1.5">
                            <p className="text-lg font-bold flex flex-row items-center gap-x-1 h-fit"><FaUserShield className="text-orange-400" />{t.access_level}:</p>
                            <ul className="mt-1">
                                {Object.keys(res.data.response.users[key].permissions).map((i, index) => (
                                    <li key={index} className="text-xs font-bold ">{res.data.response.users[key].permissions[i]}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <EditUser UserData={res.data.response.users[key]} t={t} />
                        <DelUser id={res.data.response.users[key].id} t={t} />
                    </div>
                </div>
            ))}
            {(profile.data.response.user.is_manager || profile.data.response.is_admin) && <label htmlFor="adduser" className="fixed right-0 bottom-4 mb-12 text-orange-400 border-[1px] border-orange-400 rounded-full w-10 h-10 text-2xl bg-white m-2 flex justify-center items-center">+</label>}
            {(profile.data.response.user.is_manager || profile.data.response.is_admin) && <AddUser t={t} />}
        </div>
    );
}