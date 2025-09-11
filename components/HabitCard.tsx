import { Habit } from "@/types/types";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, Title, Paragraph, Badge } from "react-native-paper";

type HabitCardProps = {
    habit: Habit;
    isCompletedToday?: boolean;
};

const HabitCard = ({ habit, isCompletedToday }: HabitCardProps) => {
    return (
        <Card style={[styles.card && { backgroundColor: isCompletedToday ? "#e6fdebff" : "white" }]}>
            <Card.Content>
                <Title>{habit.title}</Title>
                <Paragraph>{habit.description}</Paragraph>

                <View style={{ marginTop: 8, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={styles.streakContainer}>
                        <FontAwesome5 name="fire" size={16} color="#fe9d02ff" />
                        <Text style={styles.streakText}>{habit.streak_count} days streak</Text>
                    </View>
                    <Text
                        style={styles.frequency}
                    >
                        {habit.frequency}
                    </Text>
                </View>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        backgroundColor: "white",
    },
    
    streakContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: "#ffeaa0ff",
        paddingInline: 16,
        paddingVertical: 2,
        borderRadius: 12,
    },
    streakText: {
        fontSize: 14,
        fontWeight: "500",
    },
    frequency: {
        paddingInline: 14,
        paddingVertical: 2,
        backgroundColor: "#8cc3feff",
        fontWeight: "bold",
        color: "white",
        borderRadius: 12,
        overflow: "hidden",
    },

});

export default HabitCard;
