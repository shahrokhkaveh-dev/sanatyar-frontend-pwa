import { api } from "@/config/api"
import { clienterr } from "./Errorhadnler"


export const fetchLocation = async (province_id, setdata, setpervData) => {

    const res = await api.get(`application/filters/province`).catch(err => clienterr(err))
    if (res.status == 200 && res.data.flag) {
        setdata((perv) => ({ ...perv, province: res.data.province }))
    }
    setdata((perv) => ({ ...perv, province: res.data.response.provinces }))

    if (province_id) {
        const city = await api.get(`application/filters/city?province=${province_id}`).catch(err => clienterr(err))
        const ipark = await api.get(`application/filters/ipark?province=${province_id}`).catch(err => clienterr(err))
        if (city.status == 200 && city.data.flag) {
            setdata((perv) => ({ ...perv, city: city.data.response.cities }))
        }
        if (ipark.status == 200 && ipark.data.flag) {
            setdata((perv) => ({ ...perv, ipark: ipark.data.response.iparks }))
        }
    }
}