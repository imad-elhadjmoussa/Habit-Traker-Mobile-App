import ProtectedRoute from "@/components/ProtectedRoute";
import { Slot, Stack, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import TabBar from "@/components/TabBar";


export default function RootLayout() {
  return (
    <ProtectedRoute>
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home ",
          }}

        />
        <Tabs.Screen
          name="add_habit"
          options={{
            title: "Add Habit ",
          }}
        />
        <Tabs.Screen
          name="statistics"
          options={{
            title: "Statistics ",
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile ",
          }}
        />
      </Tabs>
    </ProtectedRoute>
  );
}



