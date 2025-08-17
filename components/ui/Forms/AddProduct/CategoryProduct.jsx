'use client'

import { api } from "@/config/api";
import Loading from "@/components/modals/Loading";
import { useEffect, useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

export default function CategoryProduct({ product, setProduct, pervCategory, t, locale }) {
    const [showCategory, setShowCategory] = useState(false);
    const [selected, setSelected] = useState(null);
    const [categories, setCategories] = useState([]);
    const [parrents, setparrents] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (pervCategory) {
            setSelected(pervCategory)
        }
    }, [pervCategory])


    useEffect(() => {
        const fetchCategory = async () => {
            setLoading(true)
            const res = await api.post('data/fetchCategories', { category_id: (selected && !selected.has_children) ? "" : product.category_id }).finally(() => setLoading(false));

            if (res.data.flag) {
                setCategories(res.data.response)
            }
        }
        fetchCategory()
    }, [product.category_id])

    const BackHndler = () => {
        const parent = parrents[parrents.length - 2];
        if (parent) {
            setSelected(parent);
            setProduct((prev) => ({ ...prev, category_id: parent.id }));
            setparrents((perv) => perv.slice(0, -1));
        } else {
            setSelected('');
            setProduct((prev) => ({ ...prev, category_id: '' }));
        }
    }
    const categoryHndler = (category) => {
        setProduct((prev) => ({ ...prev, category_id: category.id }));
        setSelected(category);
        setparrents((perv) => ([...perv, category]))
        if (!category.has_children) {
            setShowCategory(false)
        }
    }

    return (
        <>
            {loading && <Loading />}
            {showCategory && <div className="fixed backdrop-brightness-50 w-full h-full top-0 right-0 flex justify-center items-center p-4  ">
                <div className="bg-white h-full overflow-y-auto w-full rounded-md ">
                    <p className="sticky top-0 bg-white p-2 border-b border-neutral-300 flex flex-row justify-between items-center text-orange-400">
                        <span className="text-sm  flex flex-row items-center gap-x-1 ">
                            <BiSolidCategory />
                            {selected ? selected.name : t?.category}
                        </span>
                        {selected && <FaArrowLeftLong className="cursor-pointer" onClick={BackHndler} />}

                    </p>
                    <ul>
                        {categories.map((category) => (
                            <li key={category.id} className="p-2 hover:bg-gray-200  text-sm cursor-pointer" onClick={() => categoryHndler(category)}>
                                {category.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>}
            <div className="w-full p-2 flex flex-row justify-between rounded-md border-neutral-300 border-[1px] text-xs  text-right cursor-pointer">
                <button onClick={() => setShowCategory(true)} >{selected ? selected.name : t?.select_category}</button>
                {selected && !selected.has_children && <IoMdClose onClick={() => {
                    setSelected(null);
                    setProduct((prev) => ({ ...prev, category_id: '' }));
                    setparrents([]);
                }} className="text-red-500 text-lg" />}
            </div>
        </>
    );
}