import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'

const AddHabitScreen = () => {
    const theme = useTheme()
    return (
        <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
            <Text>Add Habit</Text>
        </View>
    )
}

export default AddHabitScreen

const styles = StyleSheet.create({})