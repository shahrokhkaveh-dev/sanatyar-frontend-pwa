'use client'

import { createContext, useContext, useState } from "react"

const sidebarContext = createContext()

export function SidebarProvider({ children }) {

    const [sidebar, setSidebar] = useState(false)

    const toggleSidebar = () => setSidebar((perv) => !perv)

    return (
        <sidebarContext.Provider value={{ sidebar, toggleSidebar }}>
            {children}
        </sidebarContext.Provider>
    )

}

export const useSidebar = () => {
    const context = useContext(sidebarContext)
    return context
}