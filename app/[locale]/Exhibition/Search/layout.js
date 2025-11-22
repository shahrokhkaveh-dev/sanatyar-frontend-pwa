import HeaderItems from "@/components/layout/HeaderItems";
import Navbar from "@/components/ui/Exhibition/Navbar";
import { loadTranslation } from "@/util/translations";


export default async function Layout({ children, params }) {

    const { locale } = await params

    const t = loadTranslation(locale, 'Exhibition')


    return (
        <div>
            <HeaderItems title={""} />
            <Navbar t={t} locale={locale} />
            {children}
        </div>
    );
}