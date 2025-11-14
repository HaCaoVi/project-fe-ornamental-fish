"use client";

import { createContext, useState, ReactNode, useEffect } from "react";
import { IAllFollowCategory } from "../types/model";
import { listAllFollowCategoryAPI, } from "@lib/api/category";

interface AppContextType {
    categories: IAllFollowCategory[] | [];
    setCategories: (v: IAllFollowCategory[]) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [categories, setCategories] = useState<IAllFollowCategory[] | []>([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await listAllFollowCategoryAPI();
                if (res.statusCode === 200 && res.data) {
                    setCategories(res.data)
                } else {
                    setCategories([])
                }
            } catch (error) {
                if (process.env.NODE_ENV === "development") {
                    console.error(error);
                }
                setCategories([])
            }
        })()
    }, []);

    return (
        <AppContext.Provider
            value={{
                categories, setCategories,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
