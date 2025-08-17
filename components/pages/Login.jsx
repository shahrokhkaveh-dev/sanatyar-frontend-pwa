'use client'

import { useState } from "react";
import CheckNumber from "../ui/Forms/Login/CheckNumber";
import CheckCode from "../ui/Forms/Login/CheckCode";
import RegisterForm from "../ui/Forms/Signup/RegisterForm";

export default function Login({ locale, t }) {
    const [step, setStep] = useState(1)
    const [phone, setPhone] = useState({ phone: '' })

    return (
        <>
            {step == 1 && <CheckNumber phone={phone} setPhone={setPhone} setStep={setStep} t={t} />}
            {step == 2 && <CheckCode phone={phone.phone} setStep={setStep} t={t} />}
            {step == 3 && <RegisterForm phone={phone.phone} t={t} />}
        </>
    );
}