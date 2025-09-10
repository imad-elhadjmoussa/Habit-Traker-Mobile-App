import { COMPLETIONS_COLLECTION_ID, database, DATABASE_ID, HABITS_COLLECTION_ID } from "@/lib/appWrite"
import { Habit } from "@/types/types"
import { ID } from "react-native-appwrite"


export const addCompletions = async (user_id: string, habit: Habit): Promise<void> => {
    await database.createDocument(
        DATABASE_ID,
        COMPLETIONS_COLLECTION_ID,
        ID.unique(),
        {
            user_id,
            habit_id: habit.$id,
            last_completed: new Date().toISOString()
        }
    )

    // update habit last_completed and streak_count
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

