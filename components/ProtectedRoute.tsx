import { StyleSheet, Text } from 'react-native'
import React, { use, useEffect } from 'react'
import { Redirect, Slot, useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import LoadingScreen from './LoadingScreen';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (!user) {
        return <Redirect href="/login" />;
    }

    return <>{children}</>;
};
export default ProtectedRoute

const styles = StyleSheet.create({})