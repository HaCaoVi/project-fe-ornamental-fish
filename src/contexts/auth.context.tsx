"use client";

import { logoutAPI } from "@lib/api/auth";
import type { IBackendRes, ILogin, IUserLogin } from "../types/backend";
import { createContext, useState, ReactNode, useEffect } from "react";
import { getAccountAPI, loginAction } from "@lib/action/auth.action";

interface AuthContextType {
    user: IUserLogin | null;
    setUser: (v: IUserLogin | null) => void;
    isLoading: boolean,
    setIsLoading: (v: boolean) => void;
    isRefreshTokenStatus: boolean;
    setIsRefreshTokenStatus: (v: boolean) => void;
    message: string;
    setMessage: (v: string) => void;
    login: (username: string, password: string) => Promise<IBackendRes<ILogin>>;
    logout: () => Promise<IBackendRes<any>>;
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

    const login = async (username: string, password: string) => {
        const res = await loginAction(username, password);
        if (res.statusCode === 201 && res.data) {
            setUser(res.data.user);
        }
        return res;
    };

    const fetchUser = async () => {
        try {
            const res = await getAccountAPI();
            if (res && res.statusCode === 200 && res.data) {
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

    const logout = async () => {
        const res = await logoutAPI();
        if (res.statusCode === 201) {
            setUser(null);
        }
        return res;
    };

    return (
        <AuthContext.Provider
            value={{
                user, setUser,
                isLoading, setIsLoading,
                isRefreshTokenStatus, setIsRefreshTokenStatus,
                message, setMessage,
                login,
                logout,
                setRefreshTokenAction,
                fetchUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
