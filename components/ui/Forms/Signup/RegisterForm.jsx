'use client'

import { api } from "@/config/api";
import { clienterr } from "@/util/Errorhadnler";
import { fetchLocation } from "@/util/FetchLocation";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import Input from "../../Input";
import SelectOtion from "../../SelectOtion";

export default function RegisterForm({ phone, t }) {
    const [message, setmessage] = useState('')
    const [error, setError] = useState()
    const [timeLeft, setTimeLeft] = useState(120);
    const [code, setCode] = useState('')
    const [profile, setProfile] = useState({
        phone: phone,
        code: '',
        first_name: '',
        last_name: '',
        identification_code: '',
        city_id: "",
        province_id: ""
    })
    const [location, setLocation] = useState({ province: [], city: [] })

    const router = useRouter()

    useEffect(() => {
        fetchLocation(profile.province_id, setLocation, setProfile)
    }, [profile.province_id, profile.city_id])

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const RegisterHandler = async () => {
        const res = await api.post('application/do-register', profile).catch(err => clienterr(err, setError))
        if (res.data && res.data.flag) {
            Cookies.set("accessToken", res.data.response.token, { expires: 100, secure: true })
            window.location.href = "/"
        } else if (res.data && res.data.flag == false) {
            setmessage(null)
            setTimeout(() => {
                setmessage(res.data.message)
            }, 1);
        }
    }

    const otpHandler = async () => {
        setProfile((perv) => ({ ...perv, code: '' }))
        const res = await api.post('application/register', { phone }).catch(err => clienterr(err, setError))
        if (res.error) {
            setmessage(null);
            setTimeout(() => {
                setmessage(t.error_message)
            }, 1);
            return
        }
        if (res.data && res.data.flag) {
            setmessage(t.sms_sent)
            setTimeLeft(120)
        } else if (res.data && res.data.flag == false) {
            setmessage(res.data.message)
        }
    }

    return (
        <div className="bg-neutral-200 min-h-screen  w-full p-1.5">
            <div dir="ltr" className="bg-white px-1.5 py-3 border-blue-900 border-[1px] rounded-lg">
                {message && <p className="errortag">{message}</p>}
                <p className="text-xs px-3.5 text-right">{t.otp_title}</p>
                <OTPInput
                    value={profile.code}
                    onChange={(otp) => setProfile((perv) => ({ ...perv, code: otp }))}
                    inputStyle={{
                        width: '42px',
                        height: '42px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        textAlign: 'center',
                        fontSize: '18px'
                    }}
                    numInputs={4}
                    isInputNum
                    shouldAutoFocus
                    containerStyle="w-full flex mt-4 gap-2 justify-around"
                    renderInput={(props) => (
                        <input
                            {...props}
                        />
                    )}
                />

                <p className="text-center text-xs font-extralight text-neutral-500 mt-2">{timeLeft ? formatTime(timeLeft) : t.time_expired}</p>
                {!timeLeft ? <button onClick={otpHandler} className="text-center text-xs font-light w-full mt-1.5 text-blue-700">{t.resend_code}</button> : null}
            </div>
            <div className="bg-white px-1.5 py-3 border-blue-900 border-[1px] rounded-lg mt-2.5 flex flex-col gap-y-2">
                <h1 className=" text-sm mb-2 px-0.5">{t.personal_info}</h1>
                <div className="grid grid-cols-2 gap-x-1.5  mb-2.5" >
                    <Input dir={"right"} data={profile} error={error} name={"first_name"} placeholder={t.first_name} setData={setProfile} setError={setError} />
                    <Input dir={"right"} data={profile} error={error} name={"last_name"} placeholder={t.last_name} setData={setProfile} setError={setError} />
                </div>
                <Input dir={"right"} data={profile} error={error} name={"identification_code"} placeholder={t.national_code} setData={setProfile} setError={setError} />
                <SelectOtion data={profile} error={error} items={location.province} name={"province_id"} title={t.province} setData={setProfile} />
                <SelectOtion data={profile} error={error} items={location.city} name={"city_id"} title={t.city} setData={setProfile} />
                <button onClick={RegisterHandler} className="bg-blue-800 py-1.5 rounded-md text-white w-full text-center ">{t.register_button}</button>
            </div>
        </div >
    );
}