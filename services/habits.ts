import { database, DATABASE_ID, HABITS_COLLECTION_ID } from "@/lib/appWrite"
import { Frequency, Habit, ResponseStatus } from "@/types/types"
import { ID, Query } from "react-native-appwrite"

export type AddHabitParams = {
    user_id: string;
    title: string;
    description: string;
    frequency: Frequency;
}

export const addHabit = async (params: AddHabitParams) => {

    // validation
    if (!params.title || params.title.trim() === "") {
        throw new Error("Title is required");
    }
    // des must be at least 10 characters
    if (!params.description || params.description.trim() === "") {
        throw new Error("Description is required");
    }
    if (params.description.length < 10) {
        throw new Error("Description must be at least 10 characters long");
    }

    if (!params.frequency || !["Daily", "Weekly", "Monthly"].includes(params.frequency)) {
        throw new Error("Frequency must be one of Daily, Weekly, or Monthly");
    }

    await database.createDocument(
        DATABASE_ID,
        HABITS_COLLECTION_ID,
        ID.unique(),
        {
            user_id: params.user_id,
            title: params.title,
            description: params.description,
            frequency: params.frequency,
            streak_count: 0,
            last_completed: new Date(0).toISOString()
        }
    )
}

export const getHabitsByUserId = async (user_id: string): Promise<Habit[]> => {
    const habits = await database.listDocuments(
        DATABASE_ID,
        HABITS_COLLECTION_ID,
        [Query.equal("user_id", user_id)]
    )
    return habits.documents.map(doc => ({
        $id: doc.$id,
        $createdAt: doc.$createdAt,
        $updatedAt: doc.$updatedAt,
        user_id: doc.user_id,
        title: doc.title,
        description: doc.description,
        frequency: doc.frequency,
        streak_count: doc.streak_count,
        last_completed: doc.last_completed
    })) as Habit[]
}

export const deleteHabitById = async (habitId: string): Promise<void> => {
    await database.deleteDocument(
        DATABASE_ID,
        HABITS_COLLECTION_ID,
        habitId
    )
}