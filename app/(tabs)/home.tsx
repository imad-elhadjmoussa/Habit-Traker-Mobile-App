import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'

const HomeScreen = () => {
    const theme = useTheme()
    return (
        <View style={{ backgroundColor: theme.colors.background,flex:1 }}>
            <Text>home</Text>
        </View>
    )
}

export default HomeScreen