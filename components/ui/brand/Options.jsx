import { RiImageAddFill, RiUserFill } from "react-icons/ri";
import { PiImageFill } from "react-icons/pi";
import AddUser from "../users/AddUser";
import { HiUserAdd } from "react-icons/hi";
import AddLogo from "../Image/AddLogo";
import AddImage from "../Image/AddImage";

export default function Options({ t }) {
    return (
        <div className="absolute left-0 top-8 bg-white text-nowrap text-blue-900 rounded-md shadow-lg p-2 hidden peer-checked:block border-[1px] border-blue-900 z-50">
            <ul className="flex flex-col gap-y-1">

                <li className="hover:bg-blue-100 px-2 py-1 w-full rounded-md cursor-pointer flex flex-row gap-x-1">
                    <label className="text-nowrap flex flex-row gap-x-1 items-center" htmlFor="logo">
                        <PiImageFill className="text-lg" />{t?.change_company_logo || "تغییر لوگو"}
                    </label>
                </li>

                <li className="hover:bg-blue-100 px-2 py-1 w-full rounded-md cursor-pointer flex flex-row gap-x-1">
                    <label className="text-nowrap flex flex-row gap-x-1 items-center" htmlFor="adduser">
                        <HiUserAdd className="text-lg" /> {t?.add_user_max_3 || "افزودن کاربر(حداکثر 3 تا)"}
                    </label>
                </li>
                <li className="hover:bg-blue-100 px-2 py-1 rounded-md cursor-pointer flex flex-row gap-x-1">
                    <label className="text-nowrap flex flex-row gap-x-1 items-center " htmlFor="addimage">
                        <RiImageAddFill className="text-lg" />{t?.add_images || "افزودن تصاویر"}
                    </label>
                </li>
            </ul>
            <AddLogo t={t} />
            <AddUser t={t} />
            <AddImage hidden={true} t={t} />
        </div>
    );
}