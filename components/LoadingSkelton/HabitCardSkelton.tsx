import React from "react";
import { View } from "react-native";
import { Card } from "react-native-paper";

const HabitCardSkeleton = () => {
    return (
        <Card style={{ borderRadius: 12 }}>
            <Card.Content>
                {/* Title placeholder */}
                <View
                    style={{
                        height: 20,
                        width: "60%",
                        backgroundColor: "#e0e0e0",
                        borderRadius: 6,
                        marginBottom: 8,
                    }}
                />

                {/* Description placeholder */}
                <View
                    style={{
                        height: 14,
                        width: "90%",
                        backgroundColor: "#e0e0e0",
                        borderRadius: 6,
                        marginBottom: 16,
                    }}
                />

                {/* Frequency */}
                <View
                    style={{
                        height: 14,
                        width: "50%",
                        backgroundColor: "#e0e0e0",
                        borderRadius: 6,
                        marginBottom: 8,
                    }}
                />

                {/* Streak */}
                <View
                    style={{
                        height: 14,
                        width: "40%",
                        backgroundColor: "#e0e0e0",
                        borderRadius: 6,
                        marginBottom: 8,
                    }}
                />

                {/* Last completed */}
                <View
                    style={{
                        height: 14,
                        width: "70%",
                        backgroundColor: "#e0e0e0",
                        borderRadius: 6,
                    }}
                />
            </Card.Content>
        </Card>
    );
};

export default HabitCardSkeleton;
