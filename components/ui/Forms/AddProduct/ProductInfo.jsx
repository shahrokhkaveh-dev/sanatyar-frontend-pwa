'use client';

import { useEffect, useRef } from "react";
import { IoIosArrowBack } from "react-icons/io";
import CategoryProduct from "./CategoryProduct";

export default function ProductInfo({ product, setProduct, setStep, pervCategory, t, locale }) {

    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // ریست کردن ارتفاع
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // تنظیم ارتفاع
        }
    }, [product.description]); // اجرای مجدد هر بار که مقدار تغییر می‌کند

    const ChangeHndler = (e) => {
        setProduct((prev) => ({ ...prev, description: e.target.value }));
    }
    return (
        <div>
            <div className="grid grid-cols-2 gap-x-2 bg-white border-neutral-300 border-[1px] rounded-md pt-5 p-1.5">
                <p className="text-sm col-span-full mb-1">{t?.export_capability}</p>
                <div className="border-[1px] border-neutral-300 rounded-md p-2 flex flex-row justify-between text-sm items-center">
                    <label htmlFor="have">{t?.has_export}</label>
                    <input checked={!!product.isExportable} onChange={() => setProduct((perv) => ({ ...perv, isExportable: 1 }))} type="radio" className="appearance-none w-2 h-2 rounded-full checked:bg-green-300 ring-2 ring-green-300 ring-offset-2" />
                </div>
                <div className="border-[1px] border-neutral-300 rounded-md p-2 flex flex-row justify-between text-sm items-center">
                    <label htmlFor="nothave">{t?.no_export}</label>
                    <input checked={!product.isExportable} onChange={() => setProduct((perv) => ({ ...perv, isExportable: 0 }))} type="radio" className="appearance-none w-2 h-2 rounded-full checked:bg-green-300 ring-2 ring-green-300 ring-offset-2" />
                </div>
            </div>
            <div className="text-right bg-white border-neutral-300 border-[1px] rounded-md pt-5 p-1.5 mt-2.5">
                <p className="text-sm col-span-full mb-1">{t?.product_specifications}</p>
                <CategoryProduct t={t} locale={locale} pervCategory={pervCategory} product={product} setProduct={setProduct} />
                <input className="w-full p-2 rounded-md border-neutral-300 border-[1px] text-xs  text-right mt-2" value={product['name']} onChange={(e) => setProduct((perv) => ({ ...perv, name: e.target.value }))} type="text" placeholder={t?.product_name || "نام محصول (حداکثر 250 کارکتر)"} />
                <textarea placeholder={t?.description} value={product.description} onChange={ChangeHndler} ref={textareaRef} className=" border-[1px] border-neutral-400 mt-3 w-full rounded-lg   p-1 overflow-hidden min-h-32 text-[10px]" name={"dec"} id={"desc"}></textarea>
                <input className="w-full p-2 rounded-md border-neutral-300 border-[1px] text-xs  text-right mt-2" value={product['HSCode']} onChange={(e) => setProduct((perv) => ({ ...perv, HSCode: e.target.value }))} type="text" placeholder="HSCode" />
                <div className="flex justify-end">

                    <button onClick={() => setStep(2)} className="bg-neutral-300 text-base font-bold mt-3 px-1.5 py-1 text-neutral-900 flex flex-row items-center gap-x-1 rounded-md ">{t?.product_features}<IoIosArrowBack className="text-white text-sm" /></button>
                </div>
            </div>

        </div>
    );
}