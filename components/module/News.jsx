'use client'

import { api } from "@/config/api";
import { useEffect, useState } from "react";
import NewsSlider from "../ui/News/NewsSlider";

export default function News() {

    const [news, setNews] = useState([])

    useEffect(() => {
        const fetchNews = async () => {
            const res = await api.get('https://mag.sanatyariran.com/api/posts').catch((err) => console.log(err))

            if (res.status == 200) {
                setNews(res.data.blogs.data)
            }
        }
        fetchNews()
    }, [])

    return (
        <div>
            <NewsSlider data={news} height={"200px"} />
        </div>
    );
}