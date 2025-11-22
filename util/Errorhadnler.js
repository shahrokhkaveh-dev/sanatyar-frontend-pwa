

import Cookies from "js-cookie"
import { redirect } from "next/navigation"


export const clienterr = async (err, seterr) => {
    'use client'
    if (err.status == 401) {
        Cookies.remove('accessToken')
        window.location.href = '/Login'
        return err
    }

    if (err.status == 422) {
        if (!seterr) return
        seterr(err.response.data.errors)
    }

    if (err.status != 422 && err.status != 403 && err.status != 401) {
        return { error: "خطا در ارتباط با سرور" }
    }

    return err

}

export const servError = (err) => {
    console.log(err)

    if (err.status == 401) {
        redirect('/fa/Login')
    }

    return { error: "مشکلی پیش امده لطفا دوباره امتحان کنید" }


}