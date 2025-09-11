import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'
import { getHabitsByUserId } from '@/services/habits'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'
import { Completion, Habit } from '@/types/types'
import { getCompletions } from '@/services/completions'
import StreakHabit from '@/components/StreakHabit'
import { ScrollView } from 'react-native-gesture-handler'

type StreakData = {
    streak: number;
    bestStreak: number;
    total: number;
}

const StatisticsScreen = () => {
    const theme = useTheme()
    const { user } = useAuth()

    const { data: habits, isLoading: isLoadingHabits, error: errorHabits } = useQuery<Habit[]>({
        queryKey: ['habits'],
        queryFn: () => getHabitsByUserId(user?.$id ?? "")
    })

    const { data: completions, isLoading: isLoadingCompletions, error: errorCompletions } = useQuery<Completion[]>({
        queryKey: ['completedHabits'],
        queryFn: () => getCompletions(user?.$id ?? "")
    })

    const getStreakData = (habitId: string): StreakData => {
        const habitCompletions = completions
            ?.filter((c) => c.habit_id === habitId)
            .sort(
                (a, b) =>
                    new Date(a.completed_at).getTime() -
                    new Date(b.completed_at).getTime()
            );

        if (habitCompletions?.length === 0) {
            return { streak: 0, bestStreak: 0, total: 0 };
        }

        // build streak data
        let streak = 0;
        let bestStreak = 0;
        let total = habitCompletions?.length || 0;

        let lastDate: Date | null = null;
        let currentStreak = 0;

        habitCompletions?.forEach((c) => {
            const date = new Date(c.completed_at);
            if (lastDate) {
                const diff =
                    (date.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);

                if (diff <= 1.5) {
                    currentStreak += 1;
                } else {
                    currentStreak = 1;
                }
            } else {
                currentStreak = 1;
            }

            if (currentStreak > bestStreak) bestStreak = currentStreak;
            streak = currentStreak;
            lastDate = date;
        });

        return { streak, bestStreak, total };
    };

    const habitStreaks = habits?.map((habit) => {
        const { streak, bestStreak, total } = getStreakData(habit.$id);
        return { habit, bestStreak, streak, total };
    });

    const rankedHabits = habitStreaks?.sort((a, b) => b.bestStreak - a.bestStreak);

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 130 }}
        >
            <Text style={[styles.title]}>
                Streaks
            </Text>

            {
                habits?.length === 0 ? (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>No habits found. Start by creating a habit!</Text>
                ) : isLoadingHabits || isLoadingCompletions ? (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>Loading...</Text>
                ) : errorHabits || errorCompletions ? (
                    <Text style={{ textAlign: 'center', marginTop: 20, color: 'red' }}>Error loading data.</Text>
                ) : rankedHabits?.length === 0 ? (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>No completion data available.</Text>
                ) : (
                    <View style={{ gap: 20 }}>
                        {rankedHabits?.map(({ habit, streak, bestStreak, total }, index) => (
                            <StreakHabit
                                key={habit.$id}
                                habit={habit}
                                streak={streak}
                                bestStreak={bestStreak}
                                total={total}
                            />
                        ))}
                    </View>
                )
            }
        </ScrollView>
    )
}

export default StatisticsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
})