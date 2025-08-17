'use client'

import { useEffect, useState } from "react";
import { api } from "@/config/api";
import { ShowMessage } from "@/util/ShowMessage";
import Image from "next/image";
import Link from "next/link";

export default function Archive({ locale, t }) {
    const [archivedItems, setArchivedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchArchivedItems();
    }, []);

    const fetchArchivedItems = async () => {
        try {
            setLoading(true);
            const response = await api.get('application/panel/archive');
            if (response.data && response.data.flag) {
                setArchivedItems(response.data.data);
            } else {
                ShowMessage(response.data.message || t?.error_message || "خطا در دریافت آیتم‌های بایگانی شده", setMessage);
            }
        } catch (error) {
            ShowMessage(t?.error_message || "خطا در دریافت آیتم‌های بایگانی شده", setMessage);
        } finally {
            setLoading(false);
        }
    };

    const restoreItem = async (itemId, itemType) => {
        try {
            const response = await api.post(`application/panel/archive/restore`, {
                id: itemId,
                type: itemType
            });
            
            if (response.data && response.data.flag) {
                ShowMessage(t?.item_restored_successfully || "آیتم با موفقیت بازگردانی شد", setMessage);
                fetchArchivedItems(); // بروزرسانی لیست
            } else {
                ShowMessage(response.data.message || t?.error_message || "خطا در بازگردانی آیتم", setMessage);
            }
        } catch (error) {
            ShowMessage(t?.error_message || "خطا در بازگردانی آیتم", setMessage);
        }
    };

    const deletePermanently = async (itemId, itemType) => {
        if (!confirm(t?.delete_permanently_confirmation || "آیا از حذف دائمی این آیتم مطمئن هستید؟")) {
            return;
        }

        try {
            const response = await api.delete(`application/panel/archive/${itemId}`, {
                data: { type: itemType }
            });
            
            if (response.data && response.data.flag) {
                ShowMessage(t?.item_deleted_permanently || "آیتم به طور دائمی حذف شد", setMessage);
                fetchArchivedItems(); // بروزرسانی لیست
            } else {
                ShowMessage(response.data.message || t?.error_message || "خطا در حذف دائمی آیتم", setMessage);
            }
        } catch (error) {
            ShowMessage(t?.error_message || "خطا در حذف دائمی آیتم", setMessage);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">{t?.archive || "بایگانی"}</h1>
                <Link
                    href={`/${locale}/Dashboard`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    {t?.back_to_dashboard || "بازگشت به داشبورد"}
                </Link>
            </div>

            {message && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                    {message}
                </div>
            )}

            {archivedItems.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">{t?.no_archived_items || "هیچ آیتم بایگانی شده‌ای وجود ندارد"}</p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {archivedItems.map((item) => (
                        <div key={`${item.type}-${item.id}`} className="bg-white rounded-lg shadow-md p-4">
                            <div className="flex items-center space-x-3 mb-3">
                                <Image
                                    src={item.image_path ? `${process.env.NEXT_PUBLIC_BASE_IMAGE}${item.image_path}` : '/no_image.png'}
                                    alt={item.name || item.title}
                                    width={50}
                                    height={50}
                                    className="rounded-md object-cover"
                                />
                                <div>
                                    <h3 className="font-medium text-gray-900">
                                        {item.name || item.title || t?.untitled || "بدون عنوان"}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {item.type === 'product' ? t?.product || "محصول" : 
                                         item.type === 'brand' ? t?.brand || "برند" : 
                                         item.type === 'news' ? t?.news || "خبر" : 
                                         t?.item || "آیتم"}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="text-sm text-gray-600 mb-3">
                                <p>{t?.archived_date || "تاریخ بایگانی"}: {new Date(item.archived_at).toLocaleDateString()}</p>
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => restoreItem(item.id, item.type)}
                                    className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md text-sm hover:bg-green-700 transition-colors"
                                >
                                    {t?.restore || "بازگردانی"}
                                </button>
                                <button
                                    onClick={() => deletePermanently(item.id, item.type)}
                                    className="flex-1 bg-red-600 text-white px-3 py-2 rounded-md text-sm hover:bg-red-700 transition-colors"
                                >
                                    {t?.delete_permanently || "حذف دائمی"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}