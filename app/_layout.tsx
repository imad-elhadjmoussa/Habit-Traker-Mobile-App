import ProtectedRoute from "@/components/ProtectedRoute";
import { AppProvider } from "@/contexts/AppContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { theme } from "@/lib/reactNativePaper";
import { queryClient } from "@/lib/reactQuery";
import { QueryClientProvider } from "@tanstack/react-query";
import { Slot, Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { StatusBar } from "react-native";


export default function RootLayout() {
  return (
    <AppProvider>

      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <PaperProvider theme={theme}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <StatusBar
                hidden={false}              
                barStyle="dark-content"     
                backgroundColor="#ffffffff"   
              />
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              </Stack>
              <Toast />
            </GestureHandlerRootView>
          </PaperProvider>
        </AuthProvider>
      </QueryClientProvider>
    </AppProvider>
  );
}


