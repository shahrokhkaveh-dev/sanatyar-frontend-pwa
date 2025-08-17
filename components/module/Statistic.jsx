'use client';

import { api } from "@/config/api";
import { useEffect, useState } from "react";

export default function Statistic({ t }) {

    const [statistic, setStatistic] = useState()



    useEffect(() => {
        const getstatistic = async () => {
            const res = await api.get('application/statistic').catch((err) => console.log(err))
            if (res.status == 200 && res.data && res.data.flag) {
                setStatistic(res.data.response)
            }
        }
        getstatistic()
    }, [])

    return (
        <div className="bg-blue-100 p-2 py-8 flex flex-row justify-around gap-x-2 text-base  my-4 font-semibold">
            {statistic && <>
                <div className="flex flex-col items-center justify-center">
                    <span className="text-lg font-extrabold">{statistic.total_products}+</span>
                    <p className="text-xs  font-light">{t?.total_products}</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <span className="text-lg font-extrabold" >{statistic.total_brands}+</span>
                    <p className="text-xs  font-light">{t?.total_brands}</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <span className="text-lg font-extrabold" >{statistic.today_reviews}+</span>
                    <p className="text-xs   font-light">{t?.today_reviews}</p>
                </div>
            </>}
        </div>
    );
}