"use client"

import { AppContext } from "@contexts/app.context";
import { AuthContext } from "@contexts/auth.context";
import { useContext } from "react";

export const useAppContext = () => {
    const ctx = useContext(AppContext);
    if (!ctx) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return ctx;
};

export const useAuthContext = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return ctx;
};