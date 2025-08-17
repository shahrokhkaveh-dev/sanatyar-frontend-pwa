'use client'

import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function DatePiker({ data, setData, title, name }) {

    const handleChange = (selectedDate) => {
        if (selectedDate) {
            setData((perv) => ({ ...perv, user_Bday: selectedDate.day }))
            setData((perv) => ({ ...perv, user_Bmonth: selectedDate.month.number }))
            setData((perv) => ({ ...perv, user_Byear: selectedDate.year }))
        }
    }

    return (
        <div>
            <DatePicker
                inputClass="
    w-full text-right text-lg placeholder:text-lg 
    border border-blue-900 bg-blue-50 rounded-md 
    px-2 py-2 outline-none focus:ring-2 focus:ring-blue-400
  "
                placeholder={title}

                onChange={handleChange}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-center"
                style={{
                    width: "100%",
                    fontSize: "13px"
                }}
                containerClassName="custom-container"
                mobileButtons={true}
            />

        </div>
    );
}