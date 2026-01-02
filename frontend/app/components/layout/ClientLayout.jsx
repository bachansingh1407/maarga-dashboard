"use client"
import Sidebar from "./Sidebar";
import Header from "./Header";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
    const pathname = usePathname();

    // 👉 Auth pages (NO sidebar, NO header)
    const isAuthPage = pathname === "/login";

    return (
        <div>
            {isAuthPage ? (
                <div className="min-h-screen font-montserrat" > {children}</div>
            ) : (
                <div className="min-h-screen font-montserrat flex">
                    <aside className="hidden md:block">
                        <Sidebar />
                    </aside>
                    <div className="flex-1 flex flex-col ">
                        <header className="">
                            <Header />
                        </header>

                        <main className="flex-1 overflow-y-auto">
                            {children}
                        </main>
                    </div>
                </div>
            )}
        </div>
    )
}