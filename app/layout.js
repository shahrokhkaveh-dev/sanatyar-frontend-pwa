
import "./globals.css";
import Header from "@/components/layout/Header";
import { SidebarProvider } from "@/context/SidebarContext";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import RouteTracker from "@/components/RouteTracker";
import { cookies } from "next/headers";
import { loadTranslation } from "@/util/translations";
import InstallPWA from "@/components/modals/InstallPwa";

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body
        className={` antialiased bg-neutral-200 w-auto  mx-auto min-h-screen`}
      >
        <SidebarProvider>
          <RouteTracker />
          <Sidebar t={t} locale={lang} />
          <InstallPWA />
          <main className=" relative min-h-screen  max-w-[576px] mx-auto">
            <Header t={t} locale={lang} />
            <div className="min-h-screen">
              {children}
            </div>
            <Footer t={t} locale={lang} />
          </main>

        </SidebarProvider>
      </body>
    </html>
  );
}
