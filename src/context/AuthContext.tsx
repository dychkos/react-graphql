"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    loading: boolean // Add loading to the context type
    login: (token: string, user: User) => void
    logout: () => void
}

interface User {
    id: string
    email: string
    name?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true) // Add loading state

    useEffect(() => {
        // Check if user is already logged in
        const token = localStorage.getItem("token")
        const storedUser = localStorage.getItem("user")

        if (token && storedUser) {
            setUser(JSON.parse(storedUser))
            setIsAuthenticated(true)
        }

        // Mark authentication check as complete
        setLoading(false)
    }, [])

    const login = (token: string, userData: User) => {
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData)
        setIsAuthenticated(true)
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser(null)
        setIsAuthenticated(false)
    }

    // Update the context value to include loading state
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

