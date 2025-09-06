import { Account, Client, Databases } from "react-native-appwrite"

export const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID as string)
    .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM as string)


export const account = new Account(client)
export const database = new Databases(client)

export const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID as string
export const HABITS_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_HABITS_COLLECTION_ID as string