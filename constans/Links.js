
import { BsBookmarkFill } from "react-icons/bs";
import { FaBookmark, FaBuilding, FaUserEdit } from "react-icons/fa";
import { FaSignature } from "react-icons/fa6";
import { ImOffice } from "react-icons/im";
import { IoBookmark } from "react-icons/io5";
import { MdAddPhotoAlternate, MdBusinessCenter, MdOutlinePayment } from "react-icons/md";
import { RiAddBoxFill } from "react-icons/ri";

export const getDashboardLinks = (t) => [
    { title: t.buy_subscription, icon: MdOutlinePayment, isbranding: 1, href: '/Dashboard/myAccont/Plan' },
    { title: t.company_information, icon: FaBuilding, isbranding: 1, href: '/Dashboard/myAccont/brand' },
    { title: t.edit_company_info, icon: MdBusinessCenter, isbranding: 1, href: '/Dashboard/myAccont/brand/Edit' },
    { title: t.register_company, icon: ImOffice, isbranding: 0, href: '/Dashboard/complete' },
    { title: t.company_members, icon: FaUserEdit, isbranding: 1, href: '/Dashboard/myAccont/users' },
    { title: t.company_images, icon: MdAddPhotoAlternate, isbranding: 1, href: '/Dashboard/myAccont/Images' },
    { title: t.signature, icon: FaSignature, isbranding: 1, href: '/Dashboard/myAccont/Signature' }
];

export const getProductLinks = (t) => [
    { title: t.my_products, icon: RiAddBoxFill, isbranding: 1, href: '/Dashboard/products/myProducts' },
    { title: t.products_archive, icon: IoBookmark, isbranding: 1, href: '/Dashboard/products/Archive' },
];

// برای سازگاری با کد قدیمی
export const DashboardLinks = [
    { title: 'خرید اشتراک', icon: MdOutlinePayment, isbranding: 1, href: '/Dashboard/myAccont/Plan' },
    { title: 'اطلاعات شرکت', icon: FaBuilding, isbranding: 1, href: '/Dashboard/myAccont/brand' },
    { title: 'ویرایش اطلاعات شرکت', icon: MdBusinessCenter, isbranding: 1, href: '/Dashboard/myAccont/brand/Edit' },
    { title: "ثبت شرکت", icon: ImOffice, isbranding: 0, href: '/Dashboard/complete' },
    { title: "اعضای شرکت", icon: FaUserEdit, isbranding: 1, href: '/Dashboard/myAccont/users' },
    { title: "تصاویر شرکت", icon: MdAddPhotoAlternate, isbranding: 1, href: '/Dashboard/myAccont/Images' },
    { title: "امضا", icon: FaSignature, isbranding: 1, href: '/Dashboard/myAccont/Signature' }
];

export const productLinks = [
    { title: "محصولات من", icon: RiAddBoxFill, isbranding: 1, href: '/Dashboard/products/myProducts' },
    { title: "آرشیو محصولات", icon: IoBookmark, isbranding: 1, href: '/Dashboard/products/Archive' },
];
