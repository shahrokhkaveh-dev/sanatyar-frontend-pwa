'use client';

import getCroppedImg from "@/util/getCroppedImage";
import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { IoMdClose } from "react-icons/io";
import { IoCheckmarkSharp } from "react-icons/io5";
export default function ImageCropper({ open, imageSrc, onClose, onCropComplete }) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const handleCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleCrop = async () => {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        onCropComplete(croppedImage);
    };

    if (!open || !imageSrc) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center z-50 backdrop-brightness-10 flex-col ">
            <div className="bg-white w-full text-xl flex flex-row justify-between py-2.5 px-1">
                <button onClick={onClose}>
                    <IoMdClose />
                </button>
                <button onClick={handleCrop}><IoCheckmarkSharp /></button>
            </div>
            <div style={{ position: "relative", width: "100%", height: 400 }}>
                <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={handleCropComplete}
                    objectFit="contain"
                />
            </div>

        </div>
    );
}
