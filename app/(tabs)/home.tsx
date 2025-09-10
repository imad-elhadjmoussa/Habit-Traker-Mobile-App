import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useRef } from 'react'
import { useTheme } from 'react-native-paper'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteHabitById, getHabitsByUserId } from '@/services/habits'
import { useAuth } from '@/contexts/AuthContext'
import { Habit } from '@/types/types'
import HabitCard from '@/components/HabitCard'
import HabitCardSkeleton from '@/components/LoadingSkelton/HabitCardSkelton'
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { addCompletions } from '@/services/completions'
import { useApp } from '@/contexts/AppContext'

const HomeScreen = () => {
    const theme = useTheme()
    const queryClient = useQueryClient()
    const { user } = useAuth()
    const { showToast } = useApp()

    const swipeAbleRefs = useRef<{ [key: string]: Swipeable | null }>({});

    const { data: habits, isLoading, error } = useQuery<Habit[]>({
        queryKey: ['habits'],
        queryFn: () => getHabitsByUserId(user?.$id ?? "")
    })

    const { mutate: deleteHabit } = useMutation({
        mutationFn: deleteHabitById,
        onSuccess: () => {
            showToast({ type: "success", message: "Habit deleted successfully!" })
            queryClient.invalidateQueries({ queryKey: ['habits'] })
        },
        onError: (error: Error) => {
            showToast({ type: "error", message: error.message })
        }
    })

    const { mutate: completeHabit } = useMutation({
        mutationFn: ({ user_id, habit }: { user_id: string; habit: Habit }) => addCompletions(user_id, habit),
        onSuccess: () => {
            showToast({ type: "success", message: "Habit marked as complete!" })
            queryClient.invalidateQueries({ queryKey: ['habits'] })
        }, onError: (error: Error) => {
            showToast({ type: "error", message: error.message })
        }
    })


    const renderLeftAction = () => {
        return (
            <View style={styles.leftAction}>
                <AntDesign name="checkcircle" size={32} color="white" />
            </View>
        )
    }

    const renderRightAction = () => {
        return (
            <View style={styles.rightAction}>
                <MaterialIcons name="delete" size={32} color="white" />
            </View>
        )
    }

    const handelDelete = (habitId: string) => {
        deleteHabit(habitId);
        if (swipeAbleRefs.current[habitId]) {
            swipeAbleRefs.current[habitId]?.close();
        }
    }

    const handelComplete = (habitId: string) => {
        const habit = habits?.find(h => h.$id === habitId);
        console.log(habit);
        if (!habit || !user) return;
        completeHabit({ user_id: user.$id, habit });
        if (swipeAbleRefs.current[habitId]) {
            swipeAbleRefs.current[habitId]?.close();
        }

    }

    return (
        <ScrollView
            style={[styles.container]}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 130 }}
        >
            <Text style={[styles.title]}>
                Today&apos;s Habits
            </Text>
            {error && <Text>Error: {(error as Error).message}</Text>}

            {
                isLoading ? (
                    <View style={{ gap: 20 }}>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <HabitCardSkeleton key={index} />
                        ))}
                    </View>
                ) : habits && habits.length > 0 ? (
                    <View style={{ gap: 20 }}>
                        {habits.map((habit) => (
                            <Swipeable
                                ref={ref => { swipeAbleRefs.current[habit.$id] = ref; }}
                                overshootLeft={false}
                                overshootRight={false}
                                renderLeftActions={renderLeftAction}
                                renderRightActions={renderRightAction}
                                key={habit.$id}
                                containerStyle={{ borderRadius: 16, shadowColor: "#000", elevation: 4, }}
                                onSwipeableOpen={(direction) => {
                                    if (direction === 'right') {
                                        handelDelete(habit.$id);
                                    } else if (direction === 'left') {
                                        handelComplete(habit.$id);
                                    }

                                }}
                            >
                                <HabitCard habit={habit} />
                            </Swipeable>
                        ))}
                    </View>
                ) : (
                    <View style={{ alignItems: "center", marginTop: 20 }}>
                        <Text>No habits yet. Start by creating one 🚀  </Text>
                    </View>
                )
            }

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },

    leftAction: {
        flex: 1,
        backgroundColor: '#5DB996',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        borderRadius: 16,
    },
    rightAction: {
        flex: 1,
        backgroundColor: '#E4004B',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        borderRadius: 16,
    },
})


export default HomeScreen