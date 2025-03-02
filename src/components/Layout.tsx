import {Button} from "@/components/ui/button.tsx";
import {useAuth} from "@/context/AuthContext.tsx";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { logout } = useAuth()
    return (
        <div>
            <header className="flex justify-between items-center bg-amber-50 p-3 mb-[32px]">
                <div className="font-semibold">
                    Note App
                </div>
                <div>
                    <Button onClick={logout}>
                        Logout
                    </Button>
                </div>
            </header>
            <main className="max-w-3xl mx-auto text-left">
                {children}
            </main>
        </div>

    )
}

export default Layout;