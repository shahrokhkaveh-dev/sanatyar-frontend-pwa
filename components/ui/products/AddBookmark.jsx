'use client'

import { api } from "@/config/api";
import { clienterr } from "@/util/Errorhadnler";
import { ShowMessage } from "@/util/ShowMessage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineBookmarkAdd } from "react-icons/md";

export default function AddBookmark({ wishlist, id }) {

    const [error, setError] = useState(null)

    const router = useRouter()

    const AddHandler = async () => {
        const res = await api.post('application/panel/products/wishlist', { product_id: id }).catch(err => clienterr(err))

        if (res.data && res.data.flag) {
            ShowMessage(res.data.message, setError)
            router.refresh()

        } else {
            ShowMessage("مشکلی پیش آمده لطفا دوباره امتحان کنید", setError)
        }

    }

    return (
        <>
            {error && typeof error == 'string' && <p className="errortag text-nowrap">{error}</p>}
            <MdOutlineBookmarkAdd onClick={AddHandler} className={`${wishlist ? 'text-green-500' : "text-orange-400"} text-4xl`} />
        </>
    );
}