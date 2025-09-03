import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'

const StatisticsScreen = () => {
    const theme = useTheme()
    return (
        <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
            <Text>Statistics</Text>
        </View>
    )
}

export default StatisticsScreen

const styles = StyleSheet.create({})