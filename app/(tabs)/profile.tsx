import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, useTheme } from 'react-native-paper'
import { useAuth } from '@/contexts/AuthContext';

const ProfileScreen = () => {
    const theme = useTheme();
    const { signOut } = useAuth();
    return (
        <View style={{ flex: 1 }}>
            <Text>Profile</Text>
            <Button
                mode="contained"
                onPress={() => { signOut(); }}
                style={{ backgroundColor: theme.colors.error, margin: 20 }}
            >
                Sign Out
            </Button>
        </View>

    )
}

export default ProfileScreen

const styles = StyleSheet.create({})