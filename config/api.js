
import { getCookie } from "@/util/Cookie";
import { getLanguage } from "@/util/getLanguage";
import axios from "axios";


export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
})

api.interceptors.request.use(
    async (req) => {

        req.headers.Accept = "application/json"
        const cookie = await getCookie()
        const token = cookie.accessToken
        const ip = cookie.ip
        const lang = await getLanguage()
        if (lang) {
            req.headers["X-Lang"] = lang
        }
        if (token) {
            req.headers["Authorization"] = `Bearer ${token}`;
        }

        if (ip) {
            req.headers["X-Forwarded-For"] = ip;
        }

        return req
    }

)

api.interceptors.response.use(
    (res) => res
);