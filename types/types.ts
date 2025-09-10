import { Models } from "react-native-appwrite";

export type ResponseStatus = {
    success: boolean;
    message: string;
};

export type Frequency = "Daily" | "Weekly" | "Monthly";

export type ToastType = {
    type: "success" | "error";
    message: string;
};

export interface Habit extends Models.Document{
    user_id: string;
    title: string;
    description: string;
    frequency: Frequency;
    streak_count: number;
    last_completed: string; 
}