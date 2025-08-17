
import { getCookie } from "@/util/Cookie";
import axios from "axios";


export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
})

api.interceptors.request.use(
    async (req) => {
        req.headers.Accept = "application/json"
        const token = await getCookie()

        if (token) {
            req.headers["Authorization"] = `Bearer ${token}`;
        }

        return req
    }

)

api.interceptors.response.use(
    (res) => res
);