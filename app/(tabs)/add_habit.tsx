import { useApp } from "@/contexts/AppContext";
import { useAuth } from "@/contexts/AuthContext";
import { addHabit, AddHabitParams } from "@/services/habits";
import { Frequency } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
    TextInput,
    Button,
    Menu,
    Divider,
    Text,
    ActivityIndicator,
} from "react-native-paper";

export default function AddHabitScreen() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [frequency, setFrequency] = useState<Frequency>("Daily");
    const [menuVisible, setMenuVisible] = useState(false);

    const { user } = useAuth();
    const { showToast } = useApp();
    const queryClient = useQueryClient();

    const { mutate: addHabitMutation, isPending } = useMutation({
        mutationFn: (data: AddHabitParams) => addHabit(data),
        onSuccess: () => {
            setTitle("");
            setDescription("");
            setFrequency("Daily");
            showToast({ type: "success", message: "Habit added successfully!" });
            queryClient.invalidateQueries({ queryKey: ['habits'] });
        },
        onError: (error: Error) => {
            showToast({ type: "error", message: error.message });
        }
    });

    const handleSubmit = () => {
        if (!user) return
        const params: AddHabitParams = {
            user_id: user?.$id,
            title,
            description,
            frequency
        };
        addHabitMutation(params);
    };

    return (
        <View style={[styles.container]}>

            <Text style={[styles.header]}>Add a New Habit</Text>

            {/* Habit Title */}
            <TextInput
                label="Habit Title"
                value={title}
                onChangeText={setTitle}
                mode="outlined"
                style={styles.input}
            />

            {/* Habit Description */}
            <TextInput
                label="Habit Description"
                value={description}
                onChangeText={setDescription}
                mode="outlined"
                style={styles.input}
                multiline
                numberOfLines={3}
            />

            {/* Habit Frequency */}
            <Menu
                visible={menuVisible}
                onDismiss={() => setMenuVisible(false)}
                anchor={
                    <Button
                        mode="outlined"
                        onPress={() => setMenuVisible(true)}
                        style={styles.input}
                    >
                        {frequency}
                    </Button>
                }
            >
                <Menu.Item onPress={() => { setFrequency("Daily"); setMenuVisible(false); }} title="Daily" />
                <Divider />
                <Menu.Item onPress={() => { setFrequency("Weekly"); setMenuVisible(false); }} title="Weekly" />
                <Divider />
                <Menu.Item onPress={() => { setFrequency("Monthly"); setMenuVisible(false); }} title="Monthly" />
            </Menu>


            {/* Submit Button */}
            <Button mode="contained" onPress={handleSubmit} style={styles.submitBtn}>
                {isPending ? (
                    <ActivityIndicator animating={true} color="white" size="small" />
                ) : (
                    "Add Habit"
                )}
            </Button>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "flex-start",
        backgroundColor: "white",
    },
    header: {
        fontSize: 22,
        marginBottom: 20,
        fontWeight: "bold",
    },
    input: {
        marginBottom: 16,
    },
    submitBtn: {
        marginTop: 20,
    },
});
