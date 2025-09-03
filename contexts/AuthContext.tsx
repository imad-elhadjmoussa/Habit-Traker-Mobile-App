import { account } from "@/lib/appWrite";
import { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";

type ResponseStatus = {
    success: boolean;
    message: string;
};

type AuthContextType = {
    user: Models.User<Models.Preferences> | null;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<ResponseStatus | undefined>;
    signUp: (email: string, password: string) => Promise<ResponseStatus | undefined>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const getUser = async () => {
        try {
            const session = await account.get();
            setUser(session);
        } catch (err) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };


    const signIn = async (email: string, password: string) => {
        try {
            await account.createEmailPasswordSession(email, password);
            await getUser();
            return { success: true, message: 'Sign in successful' };
        } catch (error) {
            if (error instanceof Error) {
                return { success: false, message: error.message };
            }
            return { success: false, message: 'Sign in failed' };
        }
    };

    const signUp = async (email: string, password: string) => {
        try {
            await account.create(ID.unique(), email, password);
            signIn(email, password);
            return { success: true, message: 'Sign up successful' };
        } catch (error) {
            if (error instanceof Error) {
                return { success: false, message: error.message };
            }
            return { success: false, message: 'Sign up failed' };
        }
    };

    const signOut = async () => {
        try {
            await account.deleteSession('current');
            setUser(null);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
