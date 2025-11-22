'use client'

import { api } from "@/config/api";
import { clienterr } from "@/util/Errorhadnler";
import { ShowMessage } from "@/util/ShowMessage";
import Loading from "@/components/modals/Loading";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { toast, ToastContainer } from "react-toastify";

export default function CheckCode({ setStep, phone, t }) {
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [timeLeft, setTimeLeft] = useState(120);
    const [message, setMessage] = useState('')

    const router = useRouter()

    const sendOTP = async () => {
        setLoading(true)
        setOtp('')

        const res = await api.post('application/login/check-number', { phone }).catch(err => clienterr(err, setError)).finally(() => setLoading(false))
        if (res.data && res.data.flag) {
            setStep(2)
            setError(t.sms_sent)
            setTimeLeft(120)
        }
    }

    const otpHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        setError()
        const res = await api.post('application/login/check-code', { code: otp, phone }).catch((err) => clienterr(err, setError)).finally(() => setLoading(false))

        if (res.status !== 200 && res.status !== 422) {
            ShowMessage(t.error_message, setMessage)
        }

        if (res.data && res.data.flag) {
            toast.success(t.welcome_message)
            Cookies.set("accessToken", res.data.response.personal_access_token, { expires: 100 })
            window.location.href = "/"
        } else if (res.data && !res.flag) {
            setError(res.data.message)
        }
    }

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

    return (
        <div dir="ltr" className="bg-blue-900 min-h-screen px-3 py-5">
            <ToastContainer />
            {loading == true && <Loading />}

            <form onSubmit={otpHandler} className="bg-white w-full h-fit flex flex-col items-center px-3.5 py-8 rounded-lg ">
                {(error && error["code"]) ? <p className="errortag">{error["code"][0]}</p> : error && <p className="errortag">{error}</p>}
                <Image quality={100} className="w-36" width={1000} height={1000} alt="image" src={"/Vector.svg"} />
                <p className="text-xs  text-blue-800 text-nowrap" >{t.description}</p>
                <p className="text-orange-400 mt-2.5 text-lg font-semibold ">{t.subtitle}</p>
                <p className="text-base font-extrabold mb-1.5 mt-2 ">{t.otp_title} {phone}</p>
                <OTPInput
                    inputType="number"
                    value={otp}
                    onChange={setOtp}
                    inputStyle={{
                        width: '100%',
                        aspectRatio: '4/3',
                        backgroundColor: '#eff6ff',
                        border: '1px solid #1447e6',
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
                <p className="text-sm mt-2.5 text-neutral-700 font-bold">{timeLeft ? formatTime(timeLeft) : t.time_expired}</p>
                <button type="submit" className="mt-6 bg-blue-900 text-white w-full py-1.5 rounded-lg disabled:opacity-50">{t.login_button}</button>

                {timeLeft == 0 && <button onClick={sendOTP} className="mt-10 text-xs font-bold">{t.resend_code}</button>}
            </form>
        </div>
    );
}