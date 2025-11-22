import HeaderItems from "@/components/layout/HeaderItems";
import { loadTranslation } from "@/util/translations";
import Image from "next/image";
import { BiSolidPhone } from "react-icons/bi";

export default async function page({ params }) {
    const { locale } = await params

    const t = loadTranslation(locale, 'Exhibition')
    return (
        <div>
            <HeaderItems title={t.booth_builders} />
            <Image className="bg-transparent w-full h-64 mb-4 object-contain" quality={100} alt="car" src={'/building.png'} width={1000} height={1000} />
            <div className="flex flex-row bg-neutral-50 items-center px-1 gap-x-2">
                <Image className="w-20 h-28 object-contain" src={'/logo_ex.png'} width={200} height={200} alt="logo-ex" />
                <div className="text-xs felx flex-col ">
                    <p className="text-orange-400 text-sm mb-3">
                        شرکت چیلیا
                    </p>
                    <p>
                        آدرس: تهران،خیابان ولیعصر، روبروی پارک ملت، برج سایه، طبقه سوم
                    </p>
                    <p className="flex flex-row items-center justify-end gap-x-1 text-blue-800">
                        شماره تماس: 09120692026
                        <div className="text-white bg-green-600 w-fit text-base rounded-full p-0.5">

                            <BiSolidPhone />
                        </div>
                    </p>
                </div>
            </div>
        </div>
    );
}