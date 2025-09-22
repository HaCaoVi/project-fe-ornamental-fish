"use client";

import { loginAPI } from "@/lib/api/auth";
import { setCookie } from "@/lib/helpers/cookie.helper";
import { IBackendRes, ILogin, IUserLogin } from "@/types/backend";
import { createContext, useState, ReactNode } from "react";

interface AuthContextType {
    isRefreshTokenStatus: boolean;
    setIsRefreshTokenStatus: (v: boolean) => void;
    message: string;
    setMessage: (v: string) => void;
    user: IUserLogin | null;
    setUser: (v: IUserLogin | null) => void;
    login: (username: string, password: string) => Promise<IBackendRes<ILogin>>;
    logout: () => void;
    setRefreshTokenAction: (status: boolean, message: string) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUserLogin | null>(null);
    const [isRefreshTokenStatus, setIsRefreshTokenStatus] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const setRefreshTokenAction = (status: boolean, message: string) => {
        setIsRefreshTokenStatus(status);
        setMessage(message);
    };

    const login = async (username: string, password: string) => {
        const res = await loginAPI(username, password);
        if (res.statusCode === 201 && res.data) {
            setCookie("access_token", res.data.access_token)
            setUser(res.data.user);
        }
        return res;
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user, setUser,
                isRefreshTokenStatus, setIsRefreshTokenStatus,
                message, setMessage,
                login,
                logout,
                setRefreshTokenAction,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
