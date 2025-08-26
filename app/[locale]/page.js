
import Slider from "@/components/ui/home/Slider";
import Link from "next/link";
import Image from "next/image";
import { BiSolidCategory } from "react-icons/bi";
import { ImOffice } from "react-icons/im";
import { FaEnvelope, FaSitemap } from "react-icons/fa";
import { IoIosBusiness } from "react-icons/io";
import { MdSupportAgent } from "react-icons/md";
import { BsClipboard2Fill } from "react-icons/bs";
import Statistic from "@/components/module/Statistic";
import { api } from "@/config/api";
import { servError } from "@/util/Errorhadnler";
import News from "@/components/module/News";
import { FaEnvelopesBulk } from "react-icons/fa6";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { loadTranslation } from "@/util/translations";

export default async function Home({ params }) {

  const { locale } = await params

  const t = loadTranslation(locale, 'common')

  const res = await api.get('/application').catch((err) => servError(err))



  if (res.error || !res.data.flag) {
    return <p className="errortag">{res.error ? res.error : res.data.message}</p>
  }

  return (
    <div className=" pb-10 min-h-screen">
      <div className="bg-blue-50 flex flex-row justify-between px-1 py-3 items-center mb-2">
        <p className="text-sm font-normal">{t.contact_us}: </p>
        <span className="font-bold text-xl flex flex-row gap-x-1">
          90000790

          <MdSupportAgent className="text-3xl text-orange-400" />
        </span>
      </div>
      <div className="mx-2 overflow-hidden rounded-lg">
        <Slider height={320} data={res?.data.response?.slider} />
      </div>
      <div className="grid grid-cols-4 px-1.5 gap-x-1.5 mt-2.5">
        <Link href={`/${locale}/Exhibition`} className="bg-white relative w-full flex flex-col gap-y-2 items-center justify-center h-20 rounded-md overflow-hidden">
          <IoIosBusiness className="text-orange-400 text-3xl" />
          <p className="text-sm text-blue-800 font-semibold">{t.exhibition}</p>

        </Link>
        <Link href={`/${locale}/AutomationSystem`} className="bg-white relative w-full flex flex-col gap-y-2 items-center justify-center h-20 rounded-md overflow-hidden">
          <FaEnvelope className="text-orange-400 text-2xl" />
          <p className="text-sm text-blue-800 font-semibold">{t.contact}</p>

          {res.data.response.unreadLettersCount > 0 &&
            <div className="absolute w-5 h-5 flex justify-center items-center text-white bg-green-600 top-0 left-0  m-0.5 text-xs  rounded-full">
              <p className="">
                {res.data.response.unreadLettersCount}
              </p>
            </div>
          }
        </Link>
        <Link href={`/${locale}/Inquiry`} className="bg-white relative w-full flex flex-col gap-y-2 items-center justify-center h-20 rounded-md overflow-hidden">
          <BsClipboard2Fill className="text-orange-400 text-2xl" />
          <p className="text-sm text-blue-800 font-semibold">{t.inquiry}</p>

          {res.data.response.unreadInquiriesCount > 0 &&
            <div className="absolute w-5 h-5 flex justify-center items-center text-white bg-green-600 top-0 left-0  m-0.5 text-xs  rounded-full">
              <p className="">
                {res.data.response.unreadInquiriesCount}
              </p>
            </div>
          }
        </Link>
        <Link href={`/${locale}/OfficialCenter`} className="bg-white relative w-full flex flex-col gap-y-2 items-center justify-center h-20 rounded-md overflow-hidden">
          <HiMiniBuildingOffice2 className="text-orange-400 text-3xl" />
          <p className="text-sm font-semibold text-blue-800">{t.official_center}</p>
        </Link>
      </div>
      <div>
        <Link href={`/${locale}/OfficialCenter/Mokatebat`} className="bg-white my-2 text-xs h-20  flex flex-row justify-center gap-x-1.5 items-center text-blue-800 text-nowrap w-[98%] mx-auto rounded-lg">
          <FaEnvelopesBulk className="text-4xl text-orange-400" />
          <p className="font-bold text-base">{t.official_center_contact}</p>
        </Link>
      </div>
      <div className="w-full overflow-auto px-1.5 py-3 mt-4">
        <p className="text-base font-extrabold  mb-2 px-3">{t.new_products}</p>
        <div className="flex flex-row flex-nowrap gap-x-4">
          {res?.data.response.new_products.map((i, index) => (
            <Link key={index} href={`/${locale}/Products/${i.slug}`} className="rounded-lg flex flex-col relative bg-white min-w-[300px] overflow-hidden drop-shadow-lg">

              <div className="flex flex-row py-2.5 gap-x-2 px-2 z-20 relative w-full h-full">

                <Image className="w-28 h-full rounded-md shadow-[-2px_1px_7px_rgba(0,0,0,0.2)] " width={200} height={200} alt="image" src={i.img ? i.img : '/no_image.png'} />

                <p className="text-sm font-bold">{i.name}</p>
              </div>
              <div className="text-xs  text-nowrap flex flex-row gap-x-4 w-full overflow-hidden justify-between px-2.5 py-1 z-20 relative text-blue-800 backdrop-contrast-75">
                <p className="flex flex-row gap-x-1"><BiSolidCategory className="text-base text-orange-400" />{i.category} </p>
                <div className="py-1 flex flex-row gap-x-1 w-full">
                  <ImOffice className="text-base text-orange-400" />
                  <p className=" truncate overflow-hidden">{i.office_name} </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-2  overflow-hidden rounded-lg ">
        <Slider height={170} data={res?.data.response.banners.slice(0, res?.data.response.banners.length / 2)} />
      </div>
      <div className="w-full overflow-auto flex flex-col justify-between px-1.5 py-3 my-4 ">
        <p className="text-sm font-semibold mb-1.5 px-3">{t.new_brands}</p>
        <div className="flex flex-row flex-nowrap gap-x-4">
          {res?.data.response.new_brands.map((i) => (
            <Link key={i.id} href={`/${locale}/Brand/${i.slug}`} className="rounded-lg flex flex-col relative bg-white min-w-[300px]  overflow-hidden drop-shadow-lg">

              <div className="flex flex-row w-full h-full py-2.5 gap-x-2 px-2 z-20 relative ">

                <Image className="w-28 h-full rounded-md shadow-[-2px_1px_7px_rgba(0,0,0,0.2)]" width={200} height={200} alt="image" src={i.logo_path ? i.logo_path : '/no_image.png'} />

                <p className="text-sm font-bold ">{i.name}</p>
              </div>
              <div className="text-[10px] gap-x-4 text-nowrap flex flex-row w-full justify-between px-2.5 py-1 z-20 relative text-blue-800 backdrop-contrast-75">
                <p className="flex flex-row gap-x-1"><BiSolidCategory className="text-base text-orange-400" />{i.category ? i.category.name : t.unclassified_category} </p>
                {i.city && <p className="flex flex-row gap-x-1 truncate"><ImOffice className="text-base text-orange-400" />{i.city.name} </p>}
              </div>
            </Link>

          ))}
        </div>
      </div>
      <div className="w-full flex flex-row justify-between items-center px-1.5 py-1 ">
        <p className="text-base font-extrabold   px-3">{t.news}</p>
        <Link href={`/${locale}/News`} className="text-xs" >{t.show_all}</Link>
      </div>
      <News t={t} />
      <Statistic t={t} />
    </div>
  );
}

