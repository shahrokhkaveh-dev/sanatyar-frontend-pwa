'use client'

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ImageCropper from "../ImageCropper";
import { api } from "@/config/api";
import { ShowMessage } from "@/util/ShowMessage";
import { clienterr } from "@/util/Errorhadnler";
import Loading from "@/components/modals/Loading";


export default function AddLogo({ t }) {

    const [cropModalOpen, setCropModalOpen] = useState(false);
    const [rawImage, setRawImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState('');
    const [message, setMessage] = useState()
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    useEffect(() => {
        const setProfile = async () => {
            setLoading(true)
            const res = await api.post('application/panel/brand/change-logo', { image: croppedImage },
                { headers: { "Content-Type": "multipart/form-data" } }).catch(err => clienterr(err)).finally(() => setLoading(false))
            if (res.data) {
                ShowMessage(res.data.message, setMessage)
            }
            if (res.data.flag) {
                setRawImage(null)
                setCroppedImage('')
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
        <>
            {loading && <Loading t={t} />}
            {message && <p className="errortag">{message}</p>}
            <Image quality={100} Cropper
                open={cropModalOpen}
                imageSrc={rawImage}
                onClose={() => setCropModalOpen(false)}
                onCropComplete={(cropped) => {
                    setCroppedImage(cropped);
                    setCropModalOpen(false);
                }}
            />
            <input className="hidden" onChange={handleFileChange} type="file" name="logo" id="logo" accept="image/*" />
        </>
    );
}