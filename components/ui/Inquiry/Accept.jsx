'use client'

export default function Accept({ data, setData, action, setShow }) {

    return (
        <div className="fixed top-0 right-0 w-full h-full backdrop-brightness-50 flex justify-center items-center z-40">
            <div className="bg-white w-5/6 p-2 h-fit rounded-lg">
                <input value={data.amount} onChange={(e) => setData((perv) => ({ ...perv, amount: e.target.value }))} type="text" className=" placeholder:text-xs placeholder:text-neutral-400 border-[1px] border-neutral-400 p-1 rounded-md w-full " placeholder="مبلغ را وارد کنید" />

                <label className={`text-xs  border-[1px] border-neutral-400 p-1 py-2 mt-2 block rounded-md w-full mb-0 relative ${data.prefactor ? "text-black" : 'text-neutral-400'}`} htmlFor="attach">
                    {data.prefactor ? data.prefactor.name : "پیش فاکتور"}
                    <span className="text-[8px] text-red-500 mt-0 absolute -bottom-3.5 text-nowrap right-1 ">فرمت فایل باید بصورت pdf باشد و حداکثر 500 کیلوبایت باشد.</span>
                </label>
                <input id="attach" type="file" className="hidden" onChange={(e) => setData((perv) => ({ ...perv, prefactor: e.target.files[0] }))} />
                <div className="grid grid-cols-2 px-1 gap-x-1.5 mt-7">
                    <button onClick={() => setShow(0)} className="w-full border-[1px] border-red-500 rounded-md py-1.5  text-center text-xs text-red-500">
                        لغو
                    </button>
                    <button onClick={action} className="w-full bg-blue-900 rounded-md py-1.5  text-center text-xs text-white">
                        ارسال پاسخ
                    </button>

                </div>
            </div>

        </div>
    );
}