
import "./globals.css";
import Header from "@/components/layout/Header";
import { SidebarProvider } from "@/context/SidebarContext";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import RouteTracker from "@/components/RouteTracker";
import { cookies } from "next/headers";
import { loadTranslation } from "@/util/translations";

export const viewport = {
  themeColor: "#fff",
}

export const metadata = {
  title: "صنعت یار ایران",
  description: "بستر یکپارچه تحول دیجیتال در زنجیره تامین و بازاریابی صنایع و معادن ایران",
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.png',
  },
  applicationName: 'SanatyarIran',
}
export default async function RootLayout({ children }) {

  const cookieStore = await cookies()

  const lang = cookieStore.get('lang')?.value || 'fa'
  const dir = lang === 'fa' || lang == "ar" ? 'rtl' : 'ltr'

  const t = loadTranslation(lang, 'layout');



  return (
    <html lang={lang} dir={dir}>
      <body
        className={` antialiased bg-neutral-200 w-auto max-w-[576px] mx-auto h-screen`}
      >
        <SidebarProvider>
          <RouteTracker />
          <Sidebar t={t} locale={lang} />

          <main className=" relative min-h-screen pb-16">
            <Header t={t} locale={lang} />
            <div className="pb-5">
              {children}
            </div>
            <Footer t={t} locale={lang} />
          </main>

        </SidebarProvider>
      </body>
    </html>
  );
}
