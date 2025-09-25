import { useContext } from "react";
import { AuthContext } from "@contexts/auth.context";

export const useAuthContext = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return ctx;
};
