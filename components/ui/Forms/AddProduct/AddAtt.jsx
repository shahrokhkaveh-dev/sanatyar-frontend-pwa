'use client'

import { useState } from "react";
import { FaSquarePlus } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { MdClose } from "react-icons/md";

export default function AddAtt({ product, setProduct, setStep, t, locale }) {

    const [Att, setAtt] = useState(
        {
            key: [""],
            value: [""]
        }
    )
    const Addhandler = () => {
        if (!Att.key || !Att.value) return
        setProduct((prev) => ({
            ...prev,
            key: [...prev.key, Att.key],
            value: [...prev.value, Att.value]
        }));
        setAtt({
            key: "",
            value: ""
        });
    }
    const RemoveHandler = (index) => {
        setProduct((prev) => {
            const newKeys = [...prev.key];
            const newValues = [...prev.value];
            newKeys.splice(index, 1);
            newValues.splice(index, 1);
            return {
                ...prev,
                key: newKeys,
                value: newValues
            };
        });
    }

    return (
        <div className="bg-white py-2.5 pb-3.5 border-[1px] border-neutral-400  rounded-md px-1.5">
            <p className="text-sm">{t?.product_att || "ویژگی های محصول"}</p>
            <div className="flex flex-row gap-x-1.5 my-2 ">
                <div className="grid grid-cols-2 gap-x-1 w-full">
                    <input value={Att.key} onChange={(e) => setAtt((perv) => ({ ...perv, key: e.target.value }))} className="placeholder:text-sm h-11 border-[1px] border-neutral-400 p-1 rounded-md text-xs" type="text" placeholder={t?.feature_title} />
                    <input className="placeholder:text-xs border-[1px] border-neutral-400 p-1 rounded-md text-xs" type="text" value={Att.value} onChange={(e) => setAtt((perv) => ({ ...perv, value: e.target.value }))} placeholder={t?.feature_value} />
                </div>
                <FaSquarePlus onClick={Addhandler} className="text-blue-800 text-4xl mt-1" />
            </div>
            {product.key.length > 0 && product.key.map((item, index) => (
                <div className="flex flex-row justify-between text-sm py-2 border-b-[1px] border-neutral-500 items-center" key={index}>
                    <span>{item}</span>
                    <span>{product.value[index]}</span>
                    <MdClose onClick={() => RemoveHandler(index)} className="text-base text-red-600" />
                </div>
            ))}
            <div className="flex flex-row justify-between">
                <button onClick={() => setStep(1)} className="bg-neutral-300 text-base font-bold mt-3 px-1.5 py-1 text-neutral-900 flex flex-row-reverse items-center gap-x-1 rounded-md  ">{t?.previous_step || "مرحله قبل"}<IoIosArrowBack className="text-white text-sm rotate-180" /></button>
                <button onClick={() => setStep(3)} className="bg-neutral-300 text-base font-bold mt-3 px-1.5 py-1 text-neutral-900 flex flex-row items-center gap-x-1 rounded-md  ">{t?.product_image || "تصویر محصول"}<IoIosArrowBack className="text-white text-sm " /></button>
            </div>

        </div>
    );
}