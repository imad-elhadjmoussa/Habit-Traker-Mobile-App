import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput, useTheme } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

const signInStateValidation = (email: string, password: string): { valid: boolean; message?: string } => {
    // Basic validation logic
    if (!email || !password) {
        return { valid: false, message: 'Email and password are required.' };
    }
    // Add more validation as needed
    return { valid: true };
};

const Login = () => {
    const { signIn } = useAuth();
    const router = useRouter();
    const theme = useTheme();

    const [signInState, setSignInState] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState<string | undefined>(undefined);


    const handleSignIn = async () => {
        const isValid = signInStateValidation(signInState.email, signInState.password);
        if (!isValid.valid) {
            setError(isValid.message);
            return;
        }

        const result = await signIn(signInState.email, signInState.password);
        if (result) {
            if (result.success) {
                router.replace('/home');
            } else {
                setError(result.message);
            }
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Sign In
            </Text>

            <TextInput
                label="Email"
                autoCapitalize='none'
                keyboardType='email-address'
                mode='outlined'
                onChangeText={(text) => setSignInState({ ...signInState, email: text })}
            />
            <TextInput
                label="Password"
                autoCapitalize='none'
                secureTextEntry
                mode='outlined'
                onChangeText={(text) => setSignInState({ ...signInState, password: text })}
            />

            {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}

            <Button
                mode="contained"
                onPress={handleSignIn}
            >

                Sign In
            </Button>


            <Button
                mode="text"
                onPress={() => router.push('/register')}
            >

                Already have an account? Sign Up
            </Button>

        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        gap: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 16,
        alignSelf: 'center',
    },
})