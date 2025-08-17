'use client';

import { useEffect, useState } from "react";
import ProductInfo from "../ui/Forms/AddProduct/ProductInfo";
import AddAtt from "../ui/Forms/AddProduct/AddAtt";
import AddImage from "../ui/Forms/AddProduct/AddImage";

export default function AddProduct({ pervData, t, locale }) {

    const [error, setError] = useState(null)
    const [step, setStep] = useState(1);
    const [product, setProduct] = useState({
        name: "",
        category_id: '',
        key: [],
        value: [],
        description: '',
        image: '',
        price: '',
        isExportable: 0,
        HSCode: "",

    })

    useEffect(() => {
        if (!pervData) return
        setProduct((perv) => ({ ...perv, ...pervData.product, image: "", _method: "PUT" }))
        if (pervData.attributes.length > 0) {
            pervData.attributes.map((i) => {
                setProduct((perv) => ({
                    ...perv
                    , key: [...perv.key, i.name]
                    , value: [...perv.value, i.value]
                }))
            })
        }
    }, [pervData])




    return (
        <div className="min-h-screen">
            {error !== null && typeof error === 'object'
                ? <p className="errortag">{Object.values(error).at(-1)}</p> :
                <>
                    {error && typeof error == 'string' &&
                        <p className="errortag">{error}</p>
                    }
                </>
            }
            <div className="bg-blue-100 text-sm font-bold flex felx-row justify-between px-1.5 mb-2">
                <button onClick={() => setStep(1)} className={`${step == 1 ? "border-b-[1px] border-b-green-300" : ' py-3 cursor-pointer'}`}>{t?.product_info || "مشحصات محصول"}</button>
                <button onClick={() => setStep(2)} className={`${step == 2 ? "border-b-[1px] border-b-green-300" : ' py-3 cursor-pointer'}`}>{t?.product_att || "ویژگی های محصول"}</button>
                <button onClick={() => setStep(3)} className={`${step == 3 ? "border-b-[1px] border-b-green-300" : ' py-3 cursor-pointer'}`}>{t?.product_image || "عکس محصول"}</button>
            </div>
            {step == 1 && <ProductInfo t={t} locale={locale} pervCategory={pervData && pervData.category} product={product} setProduct={setProduct} setStep={setStep} />}
            {step == 2 && <AddAtt t={t} locale={locale} product={product} setProduct={setProduct} setStep={setStep} />}
            {step == 3 && <AddImage t={t} locale={locale} pervImage={pervData && pervData.product.image} setError={setError} product={product} setProduct={setProduct} setStep={setStep} />}
        </div>
    );
}