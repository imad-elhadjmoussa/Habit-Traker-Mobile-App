import { ToastType } from "@/types/types";
import { createContext, useContext } from "react";
import Toast from "react-native-toast-message";

type AppContextType = {
    showToast: (toast: ToastType) => void;
}

const appContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const showToast = (toast: ToastType) => {
        Toast.show({
            type: toast.type,
            text1: toast.message,
        });
    }
    return (
        <appContext.Provider value={{ showToast }}>
            {children}
        </appContext.Provider>
    )
}

export const useApp = () => {
    const context = useContext(appContext);
    if (!context) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
}