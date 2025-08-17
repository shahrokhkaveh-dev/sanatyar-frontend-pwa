'use client'

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import ImageCropper from "../ImageCropper";
import { clienterr } from "@/util/Errorhadnler";
import { api } from "@/config/api";
import { ShowMessage } from "@/util/ShowMessage";

export default function AddImage({ product, setProduct, setStep, hidden, t }) {
    const [cropModalOpen, setCropModalOpen] = useState(false);
    const [rawImage, setRawImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState('');
    const [message, setMessage] = useState()
    const [map, setMap] = useState(false)

    const pathName = usePathname()

    const router = useRouter()

    useEffect(() => {
        const setProfile = async () => {
            const res = await api.post('application/panel/brand/insert-image', { image: croppedImage },
                { headers: { "Content-Type": "multipart/form-data" } }).catch(err => clienterr(err))
            if (res.data) {
                ShowMessage(res.data.message, setMessage)
            }
            if (res.data.flag) {
                router.refresh()
            }
        }
        if (croppedImage) setProfile()
    }, [croppedImage])

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
        <div className="bg-white rounded-full w-10 h-10 border-[1px] border-orange-400 flex justify-center items-center fixed bottom-0 right-0 m-2 text-lg z-50">
            {message && <p className="errortag text-nowrap">{message}</p>}
            <ImageCropper
                open={cropModalOpen}
                imageSrc={rawImage}
                onClose={() => setCropModalOpen(false)}
                onCropComplete={(cropped) => {
                    setCroppedImage(cropped);
                    setCropModalOpen(false);
                }}
            />
            {!hidden && <label className="text-orange-400 " htmlFor="addimage"><FaPlus /></label>}
            <input onChange={handleFileChange} accept="image/*" type="file" className="hidden" name="addimage" id="addimage" />
        </div>
    );
}