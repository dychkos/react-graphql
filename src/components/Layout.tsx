
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="max-w-3xl mx-auto text-left">
            {children}
        </main>
    )
}

export default Layout;