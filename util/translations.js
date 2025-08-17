// lib/loadTranslation.js

import fs from 'fs';      // ماژول Node.js برای خواندن فایل‌ها
import path from 'path';  // ماژول Node.js برای ساخت مسیرهای ایمن

/**
 * تابعی که یک فایل ترجمه JSON را از پوشه locales بارگذاری می‌کند
 * @param {string} locale - زبان، مثلاً 'fa', 'en'
 * @param {string} filename - نام فایل بدون پسوند، مثلاً 'common', 'brands'
 * @returns {Object} آبجکت ترجمه، مثلاً { hello: "سلام" }
 */
export function loadTranslation(locale, filename) {
    // 1. ساخت مسیر کامل فایل JSON
    const filePath = path.join(
        process.cwd(),     // مسیر ریشه پروژه
        'locales',         // پوشه اصلی ترجمه‌ها
        locale,            // زبان (مثلاً fa)
        `${filename}.json` // نام فایل با پسوند
    );

    // 2. چک کردن اینکه فایل وجود دارد یا نه
    if (!fs.existsSync(filePath)) {
        console.warn(`فایل ترجمه یافت نشد: ${filePath}`);
        return {}; // اگر فایل نبود، یک آبجکت خالی برگردان
    }

    // 3. خواندن محتوای فایل به صورت متن (string)
    let content;
    try {
        content = fs.readFileSync(filePath, 'utf-8');
    } catch (err) {
        console.log(`خطا در خواندن فایل: ${filePath}`, err);
        return {}; // اگر خواندن فایل مشکل داشت، آبجکت خالی برگردان
    }

    // 4. تبدیل متن JSON به آبجکت جاوااسکریپت
    try {
        return JSON.parse(content);
    } catch (err) {
        console.log(`خطا در پارس کردن JSON: ${filePath}`, err);
        return {}; // اگر JSON اشتباه بود، آبجکت خالی برگردان
    }
}