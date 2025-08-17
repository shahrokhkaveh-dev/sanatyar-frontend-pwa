'use client'

import { api } from "@/config/api";
import { clienterr } from "@/util/Errorhadnler";
import HeaderDashboard from "@/components/layout/HeaderDashboard";
import HeaderItems from "@/components/layout/HeaderItems";
import Loading from "@/components/modals/Loading";
import ImageCropper from "@/components/ui/ImageCropper";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { ShowMessage } from "@/util/ShowMessage";

export default function Signature({ locale, t }) {

    const [cropModalOpen, setCropModalOpen] = useState(false);
    const [rawImage, setRawImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState('');
    const [message, setMessage] = useState()
    const [loading, setLoading] = useState(false)
    const [signature, setSignature] = useState(null);
    const [edited, setEdited] = useState(false);


    useEffect(() => {
        const fetchsignature = async () => {
            if (edited) return
            setLoading(true)
            const res = await api.get('application/panel/as/setting').catch(err => clienterr(err)).finally(() => setLoading(false))
            if (res.data && res.data.flag) {
                setSignature(res.data.response.signature)
                if (!res.data.response.signature) {
                    setEdited(true)
                }
            }
        }
        fetchsignature()
    }, [edited])

    useEffect(() => {

        const addSignature = async () => {
            if (!croppedImage) return
            setLoading(true)
            const res = await api.post('application/panel/as/setting', { signature: croppedImage }, {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            }).finally(() => setLoading(false))

            if (res.data) {
                ShowMessage(res.data.message, setMessage)
            }
            if (res.data && res.data.flag) {
                setEdited(false)
                router.refresh()
            }
        }
        addSignature()

    }, [croppedImage])

    const [isEmpty, setIsEmpty] = useState(true);

    const sigCanvas = useRef(null)
    const router = useRouter()


    const clear = () => {
        sigCanvas.current?.clear();
    };

    function dataURLtoFile(dataUrl, filename) {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }

    const save = async () => {
        if (!isEmpty) {
            const dataURL = sigCanvas.current
                .getTrimmedCanvas()
                .toDataURL("image/png");

            const image = dataURLtoFile(dataURL, "signature.png")
            setLoading(true)
            const res = await api.post('application/panel/as/setting', { signature: image }, {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            }).finally(() => setLoading(false))

            if (res.data) {
                ShowMessage(res.data.message, setMessage)
            }
            if (res.data && res.data.flag) {
                setEdited(false)
                router.refresh()
            }

        }
    }
    useEffect(() => {
        const interval = setInterval(() => {
            if (sigCanvas.current) {
                const empty = sigCanvas.current.isEmpty();
                setIsEmpty(empty);
            }
        }, 300);

        return () => clearInterval(interval);
    }, []);

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
        <div className="min-h-screen">
            <HeaderItems href={`/${locale}/Dashboard/myAccont`} title={t?.signature || "امضا"} />
            {loading && <Loading t={t} />}
            {edited ? <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                canvasProps={{
                    className: "",
                    style: { touchAction: "none", backgroundColor: "white", width: "100%", height: "200px" }
                }}
            /> :
                <Image className="w-full h-[200px] bg-white" width={200} height={200} src={`data:image/png;base64,${signature}`} alt="signature" />
            }
            <div className="grid grid-cols-2 gap-x-2.5 px-2 mt-3.5">

                {edited && <>
                    {!isEmpty ? <button onClick={clear} className="text-blue-800 border-[1px] border-blue-900 rounded-md bg-white text-sm py-1">{t?.edit_signature || "ویرایش"}</button> :
                        <label htmlFor="signature" className="text-blue-800 border-[1px] border-blue-900 rounded-md bg-white text-sm py-1 w-full text-center">{t?.select_from_gallery || "انتخاب از گالری"}</label>
                    }
                </>}
                <input onChange={handleFileChange} className="hidden" type="file" id="signature" name="signature" />
                {!edited ? <button onClick={() => setEdited(true)} className="bg-blue-800 text-white rounded-md text-sm py-1 col-span-full">{t?.edit_signature || "ویرایش"}</button> : <button onClick={save} className="bg-blue-800 text-white rounded-md text-sm py-1">{t?.confirm_and_send || "تایید و ارسال"}</button>}
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
            </div>
        </div>
    );
}