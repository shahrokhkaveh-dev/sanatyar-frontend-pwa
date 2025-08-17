"use client"
import dynamic from 'next/dynamic';

const DynamicySelect = dynamic(() => import('react-select'), { ssr: false });

export default function SelectOtion({ error, name, title, data, setData, items }) {
    const formattedOptions = items?.map(opt => ({
        value: opt.id,
        label: opt.name
    }));

    const ChangeHandler = (selectedOption) => {
        setData(prev => {
            const newData = {
                ...prev,
                [name]: selectedOption.value
            };

            if (name === 'province_id') {
                newData.city_id = "";
                newData.ipark_id = "";
            }

            return newData;
        });
    }

    const customStyles = {
        control: (styles, { isFocused }) => ({
            ...styles,
            width: '100%',
            backgroundColor: '#eff6ff', // آبی خیلی کم‌رنگ
            height: 'fit-content',
            border: `1px solid ${error && error[name] ? 'red' : isFocused ? '#1c398e' : '#1c398e'}`,
            borderRadius: '6px',
            boxShadow: 'none',
            fontSize: '14px',
            minHeight: '38px',
            display: 'flex',
            alignItems: 'center',
            padding: '2px 8px',
        }),
        valueContainer: (styles) => ({
            ...styles,
            padding: '0px',
            margin: '0px',
            display: 'flex',
            alignItems: 'center',
            height: '38px',
        }),
        singleValue: (styles) => ({
            ...styles,
            color: error && error[name] ? 'red' : '#000',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
        }),
        placeholder: (styles) => ({
            ...styles,
            color: error && error[name] ? 'red' : 'black',
            fontSize: '0.875rem', // text-sm = 14px
            display: 'flex',
            alignItems: 'center',
            height: '38px',
            position: 'absolute',
            left: "50%",
            transform: 'translateX(-50%)',


        }),
        menu: (styles) => ({
            ...styles,
            zIndex: 9999,
            backgroundColor: "#f5f5f5"
        }),
        menuList: (styles) => ({
            ...styles,
            padding: '0',
        }),
    };

    return (
        <div className="w-full">
            <p className='text-sm mb-1'>{title}</p>
            <DynamicySelect
                className="h-fit w-full"
                onChange={ChangeHandler}
                isDisabled={formattedOptions.length === 0}
                styles={customStyles}
                placeholder={title}
                options={formattedOptions}
                value={formattedOptions.find(opt => opt.value === data?.[name]) || ''}
                components={{
                    DropdownIndicator: () => null, // حذف فلش
                    IndicatorSeparator: () => null // حذف جداکننده
                }}
            />
        </div>
    );
}
