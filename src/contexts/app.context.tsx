"use client";

import { createContext, useState, ReactNode, useEffect } from "react";
import { ICategories } from "../types/model";
import { listCategoryAPI } from "@lib/api/category";

interface AppContextType {
    categories: ICategories[] | [];
    setCategories: (v: ICategories[]) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [categories, setCategories] = useState<ICategories[] | []>([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await listCategoryAPI();
                console.log(res);
                if (res.statusCode === 200 && res.data) {
                    setCategories(res.data)
                }
            } catch (error) {
                setCategories([])
            }
        })()
    }, []);

    return (
        <AppContext.Provider
            value={{
                categories, setCategories
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
