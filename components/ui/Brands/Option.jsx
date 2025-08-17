"use client"
import dynamic from 'next/dynamic';

const DynamicySelect = dynamic(() => import('react-select'), { ssr: false });

export default function Option({ error, name, title, data, setData, items }) {

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
            backgroundColor: 'white',
            border: `1px solid ${error && error[name] ? 'red' : isFocused ? '#1c398e' : '#1c398e'}`,
            borderRadius: '6px',
            boxShadow: 'none',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            padding: '0px 2px',
        }),
        valueContainer: (styles) => ({
            ...styles,
            padding: '0px',
            margin: '0px',
            display: 'flex',
            alignItems: 'center',

        }),
        singleValue: (styles) => ({
            ...styles,
            color: error && error[name] ? 'red' : '#000',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            with: "100%",
            position: 'absolute',
            left: "50%",
            transform: 'translateX(-50%)',
        }),
        placeholder: (styles) => ({
            ...styles,
            color: error && error[name] ? 'red' : 'black',
            fontSize: '12px', // text-sm = 14px
            display: 'flex',
            alignItems: 'center',

            position: 'absolute',
            left: "50%",
            transform: 'translateX(-50%)',


        }),
        menu: (styles) => ({
            ...styles,
            fontSize: '12px',
            position: 'absolute',
            zIndex: 9999,
            maxWidth: '300px',
            width: 'max-content',
            backgroundColor: '#fff',
            top: '100%',          // دقیقا زیر سلکت باز بشه
            left: '2px',
            maxHeight: '100vh',   // حداکثر ارتفاع به اندازه صفحه
            overflowY: 'auto',

        }),
        menuList: (styles) => ({
            ...styles,
            padding: '0',
            whiteSpace: 'nowrap',
        }),
    };

    return (
        <div className="w-full overflow-visible">
            <DynamicySelect
                menuPlacement="auto"
                className="h-fit w-full"
                onChange={ChangeHandler}
                isDisabled={formattedOptions.length === 0}
                styles={customStyles}
                menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                menuPosition='fixed'
                placeholder={title}
                options={[{ label: `همه  ${title} ها`, value: null }, ...formattedOptions]}
                value={formattedOptions.find(opt => opt.value === data?.[name]) || ''}
                components={{
                    DropdownIndicator: () => null, // حذف فلش
                    IndicatorSeparator: () => null // حذف جداکننده
                }}
            />
        </div>
    );
}