"use client";

import { logoutAPI } from "@lib/api/auth";
import type { IBackendRes, IUserLogin } from "../types/backend";
import { createContext, useState, ReactNode, useEffect } from "react";
import { getAccountAPI } from "@lib/action/auth.action";
import { deleteCookie, setCookie } from "@lib/helpers/cookie.helper";

interface AuthContextType {
    user: IUserLogin | null;
    setUser: (v: IUserLogin | null) => void;
    isLoading: boolean,
    setIsLoading: (v: boolean) => void;
    isRefreshTokenStatus: boolean;
    setIsRefreshTokenStatus: (v: boolean) => void;
    message: string;
    setMessage: (v: string) => void;
    setRefreshTokenAction: (status: boolean, message: string) => void;
    fetchUser: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUserLogin | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [message, setMessage] = useState<string>("");
    const [isRefreshTokenStatus, setIsRefreshTokenStatus] = useState<boolean>(false);

    const setRefreshTokenAction = (status: boolean, message: string) => {
        setIsRefreshTokenStatus(status);
        setMessage(message);
    };

    const fetchUser = async () => {
        try {
            const res = await getAccountAPI();
            if (res && res.statusCode === 200 && res.data) {
                if (res.access_token) {
                    deleteCookie("access_token")
                    setCookie("access_token", res.access_token)
                }
                setUser(res.data);
            } else {
                setUser(null);
            }
        } catch (err) {
            console.error("Failed to fetch user info:", err);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user, setUser,
                isLoading, setIsLoading,
                isRefreshTokenStatus, setIsRefreshTokenStatus,
                message, setMessage,
                setRefreshTokenAction,
                fetchUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
