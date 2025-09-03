import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

const signInStateValidation = (email: string, password: string): { valid: boolean; message?: string } => {
    // Basic validation logic
    if (!email || !password) {
        return { valid: false, message: 'Email and password are required.' };
    }
    // Add more validation as needed
    return { valid: true };
};

const Register = () => {
    const router = useRouter();
    const theme = useTheme();
    const { signUp } = useAuth();
    const [signUpState, setSignUpState] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState<string | undefined>(undefined);


    const handleSignUp = async () => {
        const isValid = signInStateValidation(signUpState.email, signUpState.password);
        if (!isValid.valid) {
            setError(isValid.message);
            return;
        }

        const result = await signUp(signUpState.email, signUpState.password);
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
                Sign Up
            </Text>

            <TextInput
                label="Email"
                autoCapitalize='none'
                keyboardType='email-address'
                mode='outlined'
                onChangeText={(text) => setSignUpState({ ...signUpState, email: text })}
            />
            <TextInput
                label="Password"
                autoCapitalize='none'
                secureTextEntry
                mode='outlined'
                onChangeText={(text) => setSignUpState({ ...signUpState, password: text })}
            />
            <Button
                mode="contained"
                onPress={handleSignUp}
            >
                Sign Up
            </Button>

            {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}

            <Button
                mode="text"
                onPress={() => router.push('/login')}
            >

                Already have an account? Sign In
            </Button>

        </View>
    )
}

export default Register

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