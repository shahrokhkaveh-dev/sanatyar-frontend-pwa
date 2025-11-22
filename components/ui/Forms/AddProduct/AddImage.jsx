'use client'

import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MdAddPhotoAlternate } from "react-icons/md";
import ImageCropper from "../../ImageCropper";
import Image from "next/image";
import { api } from "@/config/api";
import { clienterr } from "@/util/Errorhadnler";
import { useRouter } from "next/navigation";
import Loading from "@/components/modals/Loading";
import { ShowMessage } from "@/util/ShowMessage";

export default function AddImage({ setError, product, setProduct, setStep, pervImage, t, locale }) {
    const [cropModalOpen, setCropModalOpen] = useState(false);
    const [rawImage, setRawImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState('');
    const [ImageURL, setImageURL] = useState('');
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    useEffect(() => {
        if (croppedImage) {
            setProduct((perv) => ({ ...perv, image: croppedImage }))
            const blob = new Blob([croppedImage], { type: 'image/jpeg' });
            const url = URL.createObjectURL(blob);
            setImageURL(url);
            // You can also handle the cropped image further here, e.g., upload it or display it
        }
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

    const AddHandler = async () => {
        setLoading(true)

        const res = await api.post('application/panel/products/store', { ...product }, {
            headers: {
                'Content-Type': "multipart/form-data"
            }
        }).catch(err => clienterr(err, setError)).finally(() => setLoading(false))
        if (res.data && !res.data.flag && res.data.code === -1) {
            ShowMessage(res.data.response, setError)
            return
        }
        if (res.data && res.data.flag) {
            setError(res.data.message)
            router.refresh()
            router.push(`/${locale}/Dashboard/products/myProducts`)
        } else if (res.data && !res.data.flag) {
            ShowMessage(res.data.message, setError)
        }
    }


    const sendHandler = async () => {
        setLoading(true)
        const res = await api.post(`application/panel/products/update/${product.id}`, { ...product }, {
            headers: {
                'Content-Type': "multipart/form-data"
            }
        }).finally(() => setLoading(false))


        if (res.data && res.data.code === -1) {
            setError(res.response)
            return
        }


        if (res.data && res.data.flag) {
            ShowMessage(res.data.message, setError)
            router.push('/Dashboard/products/myProducts')
        } else {
            ShowMessage(res.data.message, setError)
        }

    }

    return (
        <div className="bg-white py-2.5 pb-3.5 border-[1px] border-neutral-400 rounded-md px-1.5">
            <input className="hidden" type="file" onChange={handleFileChange} id="addimage" />
            {(!ImageURL && !pervImage) ? <div className="w-full h-48 bg-neutral-200 flex items-center justify-center rounded-md ">
                <label className="w-full h-full flex items-center justify-center" htmlFor="addimage">
                    <MdAddPhotoAlternate className="text-white text-7xl" />
                </label>
            </div> :
                <label htmlFor="addimage">
                    <Image quality={100} className="w-full h-52" alt="image" src={ImageURL ? ImageURL : `${process.env.NEXT_PUBLIC_BASE_IMAGE}${pervImage}`} width={300} height={300} />
                </label>
            }
            <div className="flex flex-row justify-between items-">
                <button onClick={() => setStep(2)} className="bg-neutral-300 text-base mt-3 px-3 py-2 font-bold text-neutral-900 flex flex-row-reverse items-center gap-x-1 rounded-md  ">{t?.previous_step || "مرحله قبل"}<IoIosArrowBack className="text-white text-sm rotate-180" /></button>
                {!product._method && <button onClick={AddHandler} className="bg-blue-800 text-xs mt-3 px-1.5 py-1 text-white flex flex-row-reverse items-center gap-x-1 rounded-md  ">{t?.final_product_registration || "ثبت نهایی محصول"}</button>}
                {product._method && <button onClick={sendHandler} className="bg-blue-800 text-base font-bold  mt-3 px-3 py-2 text-white flex flex-row-reverse items-center gap-x-1 rounded-md  ">{t?.save_changes || "ثبت تغییرات"}</button>}
            </div>
            <Image quality={100} Cropper
                open={cropModalOpen}
                imageSrc={rawImage}
                onClose={() => setCropModalOpen(false)}
                onCropComplete={(cropped) => {
                    setCroppedImage(cropped);
                    setCropModalOpen(false);
                }}
            />
            {loading && <Loading />}
        </div>
    );
}