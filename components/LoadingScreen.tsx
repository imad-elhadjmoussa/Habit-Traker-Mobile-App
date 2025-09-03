import React from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator animating={true} size="large" />
            <Text style={styles.text}>Loading... </Text>
        </View>
    );
};

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        marginTop: 16,
        fontSize: 16,
    },
});
