'use client'

import { CiSearch } from "react-icons/ci";
import { api } from "@/config/api";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Option from "./Brands/Option";
import { fetchLocation } from "@/util/FetchLocation";
import { CompanyType } from "@/constans/Brand";
import { usePathname } from "next/navigation";

export default function Filter({ setBrands, locale, t, total }) {
    const searchParams = useSearchParams();
    const pathname = usePathname()
    const router = useRouter();

    const [filter, setFilter] = useState({
        type: searchParams.get("type") || null,
        category: searchParams.get("category") || null,
        province: searchParams.get("province") || null,
        city: searchParams.get("city") || null,
        page: null,
        ipark: searchParams.get("ipark") || null,
        search: searchParams.get("search") || '',
    });

    const [data, setData] = useState({
        category: [],
        city: [],
        ipark: [],
        province: [],
        type: []
    });

    useEffect(() => {
        const newFilter = {
            type: null,
            category: null,
            province: null,
            city: null,
            page: null,
            ipark: null,
            search: '',
        };

        Object.keys(newFilter).forEach((key) => {
            const value = searchParams.get(key);
            if (value) {
                newFilter[key] = value;
            }
        });

        setFilter(newFilter);
    }, []);

    useEffect(() => {
        setBrands([]);
    }, [filter]);

    useEffect(() => {
        fetchLocation(filter.province, setData);
    }, [filter.province]);

    useEffect(() => {
        if (pathname.includes('OfficialCenter')) return
        const loadCategory = async () => {
            const res = await api.get('application/filters/category');
            if (res.data?.flag) {
                setData(prev => ({
                    ...prev,
                    category: [...prev.category, ...res.data.response.categories]
                }));
            }
        };
        loadCategory();
    }, []);

    useEffect(() => {
        const params = new URLSearchParams();

        Object.entries(filter).forEach(([key, value]) => {
            if (key == "city" && value === 0) {
                params.set(key, value)
            } else if (value && key !== 'search') {
                params.set(key, value);
            }
        });

        if (filter.search) {
            params.set('search', filter.search);
        }

        router.push(`?${params.toString()}`, { scroll: false });
    }, [filter]);

    const SearchHandler = (e) => {
        if (e.key === "Enter") {
            setFilter(prev => ({
                ...prev,
                search: e.target.value
            }));
        }
    };

    return (
        <div className="pt-2">
            <div className="bg-white rounded-md border-[1px] border-neutral-400 mx-auto flex flex-row items-center px-1.5 py-1 gap-x-0.5 w-[97%] h-10">
                <CiSearch className="text-lg" />
                <input
                    onKeyDown={SearchHandler}
                    value={filter.search}
                    onChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value }))}
                    className="placeholder:text-sm text-sm flex-1"
                    type="text"
                    placeholder={pathname.includes('OfficialCenter') ? t.search_center : t.search_brands}
                />
            </div>

            <div className="overflow-x-auto w-full p-2 flex flex-row items-center gap-x-2 overflow-y-hidden">
                <span className="text-xs text-neutral-600 text-nowrap">{t.filter_by}</span>

                {!pathname.includes("Exhibition") && <div className={`${!pathname.includes('OfficialCenter') ? 'min-w-[550px] grid-cols-5' : "min-w-3/5 w-3/5 grid-cols-1"} px-2 grid  gap-x-1.5 text-nowrap parent`}>
                    {!pathname.includes('OfficialCenter') && <Option data={filter} setData={setFilter} items={CompanyType} name={'type'} title={t.company_type} />}
                    {!pathname.includes('OfficialCenter') && <Option data={filter} setData={setFilter} items={data.category} name={'category'} title={t.category} />}
                    <Option data={filter} setData={setFilter} items={data.province} name={'province'} title={t.province} />
                    {!pathname.includes('OfficialCenter') && <Option data={filter} setData={setFilter} items={data.city} name={'city'} title={t.city} />}
                    {!pathname.includes('OfficialCenter') && <Option data={filter} setData={setFilter} items={data.ipark} name={'ipark'} title={t.industrial_city} />}
                </div>}
            </div>
            <div className="flex flex-row justify-between px-2 pt-1 text-xs text-neutral-600">
                <p>{t.total}</p>
                <p>{total} {t.product}</p>
            </div>
        </div>
    );
}
