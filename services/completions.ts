import { COMPLETIONS_COLLECTION_ID, database, DATABASE_ID, HABITS_COLLECTION_ID } from "@/lib/appWrite"
import { Completion, Habit } from "@/types/types"
import { ID, Query } from "react-native-appwrite"


export const addCompletions = async (user_id: string, habit: Habit): Promise<void> => {
    await database.createDocument(
        DATABASE_ID,
        COMPLETIONS_COLLECTION_ID,
        ID.unique(),
        {
            user_id,
            habit_id: habit.$id,
            completed_at: new Date().toISOString()
        }
    )

    // update habit completed_at and streak_count
    await database.updateDocument(
        DATABASE_ID,
        HABITS_COLLECTION_ID,
        habit.$id,
        {
            last_completed: new Date().toISOString(),
            streak_count: habit.streak_count + 1
        }
    )

}

export const getTodayCompletions = async (user_id: string): Promise<string[]> => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const completions = await database.listDocuments(
        DATABASE_ID,
        COMPLETIONS_COLLECTION_ID,
        [
            Query.equal("user_id", user_id),
            Query.greaterThanEqual("completed_at", today.toISOString())
        ]
    )

    return completions.documents.map((doc) => doc.habit_id)
}

export const getCompletions = async (user_id: string): Promise<Completion[]> => {
    const completions = await database.listDocuments(
        DATABASE_ID,
        COMPLETIONS_COLLECTION_ID,
        [
            Query.equal("user_id", user_id)
        ]
    )
    return completions.documents.map(doc => ({
        $id: doc.$id,
        $createdAt: doc.$createdAt,
        $updatedAt: doc.$updatedAt,
        user_id: doc.user_id,
        habit_id: doc.habit_id,
        completed_at: doc.completed_at
    })) as Completion[]
}
