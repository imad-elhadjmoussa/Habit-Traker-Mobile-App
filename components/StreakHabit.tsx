import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Habit } from '@/types/types'
import { Card, useTheme } from 'react-native-paper'
import CardContent from 'react-native-paper/lib/typescript/components/Card/CardContent'
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'

type Props = {
    habit: Habit,
    streak: number,
    bestStreak: number,
    total: number
}

const StreakHabit = ({ habit, streak, bestStreak, total }: Props) => {
    const theme = useTheme()
    return (
        <View key={habit.$id} style={styles.container}>
            <Text style={styles.title}>{habit.title}</Text>
            <Text style={styles.description}>{habit.description}</Text>

            <View style={{ flex: 1, flexDirection: "row",gap:24, alignItems: "center" }}>
                <View style={{flex:1, flexDirection: "column", justifyContent: "center", alignItems: 'center', backgroundColor: "#e4004b80", gap: 3, padding: 8, borderRadius: 8 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                        <Text style={{ color: "white", fontSize: 16, fontWeight: 900 }}>{streak}</Text>
                        <FontAwesome5 name="fire" size={20} color="#E4004B" />
                    </View>
                    <Text style={{color:"black"}}>Current </Text>
                </View>

                <View style={{flex:1, flexDirection: "column", justifyContent: "center", alignItems: 'center', backgroundColor: "#ff990080", gap: 3, padding: 8, borderRadius: 8 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                        <Text style={{ color: "white", fontSize: 16, fontWeight: 900 }}>{streak}</Text>
                        <AntDesign name="star" size={20} color="#FF9A00" />
                    </View>
                    <Text style={{color:"black"}}> Best </Text>
                </View>

                <View style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: 'center', backgroundColor: "#0ba6df80", gap: 3, padding: 8, borderRadius: 8 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                        <Text style={{ color: "white", fontSize: 16, fontWeight: 900 }}>{streak}</Text>
                        <MaterialCommunityIcons name="check-all" size={20} color="#0BA6DF" />
                    </View>
                    <Text style={{color:"black"}}> Total </Text>
                </View>
            </View>
        </View>
    )
}

export default StreakHabit

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffffff',
        elevation: 4,
        padding: 20,
        borderRadius: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333333ff',
    },
    description: {
        fontSize: 14,
        color: '#666666ff',
        marginBottom: 12,
    },
    currentStreak: {
        fontSize: 14,
        backgroundColor: '#2ecc71ff',
        marginBottom: 4,
        paddingInline: 10,
        paddingVertical: 4,
        color: 'white',
        borderRadius: 16,
        display: "flex",
        justifyContent: "space-between",
    },
    bestStreak: {
        fontSize: 16,
        color: '#3498dbff',
        marginBottom: 4,
    },
    totalCompletions: {
        fontSize: 16,
        color: '#9b59b6ff',
    },
})