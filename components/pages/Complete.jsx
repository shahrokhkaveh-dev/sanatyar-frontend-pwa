'use client'

import { useEffect, useState } from "react";
import { api } from "@/config/api";
import { ShowMessage } from "@/util/ShowMessage";
import { useRouter } from "next/navigation";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";

export default function Complete({ t }) {
    const [status, setStatus] = useState('loading'); // loading, success, error
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        checkCompletionStatus();
    }, []);

    const checkCompletionStatus = async () => {
        try {
            const response = await api.get('application/panel/completion-status');

            if (response.data && response.data.flag) {
                if (response.data.data.is_completed) {
                    setStatus('success');
                    setMessage(t?.profile_completed_successfully || "پروفایل شما با موفقیت تکمیل شد");
                } else {
                    setStatus('error');
                    setMessage(t?.profile_incomplete || "پروفایل شما هنوز تکمیل نشده است");
                }
            } else {
                setStatus('error');
                setMessage(response.data.message || t?.error_message || "خطا در بررسی وضعیت تکمیل");
            }
        } catch (error) {
            setStatus('error');
            setMessage(t?.error_message || "خطا در بررسی وضعیت تکمیل");
        }
    };

    const getStatusIcon = () => {
        switch (status) {
            case 'loading':
                return <FaSpinner className="animate-spin text-4xl text-blue-600" />;
            case 'success':
                return <FaCheckCircle className="text-4xl text-green-600" />;
            case 'error':
                return <FaTimesCircle className="text-4xl text-red-600" />;
            default:
                return null;
        }
    };

    const getStatusText = () => {
        switch (status) {
            case 'loading':
                return t?.checking_completion || "در حال بررسی وضعیت تکمیل...";
            case 'success':
                return t?.profile_completed || "پروفایل تکمیل شده";
            case 'error':
                return t?.profile_incomplete || "پروفایل ناقص";
            default:
                return '';
        }
    };

    const getStatusColor = () => {
        switch (status) {
            case 'loading':
                return 'text-blue-600';
            case 'success':
                return 'text-green-600';
            case 'error':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="mb-6">
                    {getStatusIcon()}
                </div>

                <h1 className={`text-2xl font-bold mb-4 ${getStatusColor()}`}>
                    {getStatusText()}
                </h1>

                {message && (
                    <p className="text-gray-600 mb-6">
                        {message}
                    </p>
                )}

                <div className="space-y-4">
                    {status === 'success' && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h3 className="text-green-800 font-medium mb-2">
                                {t?.whats_next || "مرحله بعدی چیست؟"}
                            </h3>
                            <ul className="text-green-700 text-sm space-y-1 text-right">
                                <li>• {t?.add_products || "محصولات خود را اضافه کنید"}</li>
                                <li>• {t?.customize_profile || "پروفایل خود را سفارشی کنید"}</li>
                                <li>• {t?.start_using_platform || "شروع به استفاده از پلتفرم کنید"}</li>
                            </ul>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <h3 className="text-red-800 font-medium mb-2">
                                {t?.required_actions || "اقدامات مورد نیاز:"}
                            </h3>
                            <ul className="text-red-700 text-sm space-y-1 text-right">
                                <li>• {t?.complete_personal_info || "اطلاعات شخصی را تکمیل کنید"}</li>
                                <li>• {t?.add_company_details || "جزئیات شرکت را اضافه کنید"}</li>
                                <li>• {t?.upload_required_documents || "اسناد مورد نیاز را آپلود کنید"}</li>
                            </ul>
                        </div>
                    )}

                    <div className="flex space-x-4">
                        <button
                            onClick={() => router.back()}
                            className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                        >
                            {t?.go_back || "بازگشت"}
                        </button>

                        {status === 'error' && (
                            <button
                                onClick={() => router.push('/Dashboard/myAccont')}
                                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                {t?.complete_profile || "تکمیل پروفایل"}
                            </button>
                        )}

                        {status === 'success' && (
                            <button
                                onClick={() => router.push('/Dashboard')}
                                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                            >
                                {t?.go_to_dashboard || "رفتن به داشبورد"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}