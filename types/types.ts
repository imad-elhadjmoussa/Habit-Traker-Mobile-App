import { Models } from "react-native-appwrite";

export type ResponseStatus = {
    success: boolean;
    message: string;
};

export type Frequency = "Daily" | "Weekly" | "Monthly";

export type ToastType = {
    type: "success" | "error" | "info";
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

export interface Completion extends Models.Document{
    user_id: string;
    habit_id: string;
    completed_at: string;
}