import React, { JSX } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useLinkBuilder } from "@react-navigation/native";
import { PlatformPressable } from "@react-navigation/elements"; // Expo Router provides this
import { useTheme } from "react-native-paper";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    const theme = useTheme();
    const { buildHref } = useLinkBuilder();

    const icons: Record<"home" | "add_habit" | "statistics" | "profile", (props: any) => JSX.Element> = {
        home: (props: any) => <FontAwesome name="home" size={24}  {...props} />,
        add_habit: (props: any) => <FontAwesome name="plus" size={24}  {...props} />,
        statistics: (props: any) => <FontAwesome name="bar-chart" size={24}  {...props} />,
        profile: (props: any) => <FontAwesome name="user" size={24}  {...props} />,
    }

    return (
        <View style={[styles.tabBar, { backgroundColor: theme.colors.primaryContainer }]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        // href={buildHref(route.name, route.params)}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabButton}
                    >
                        {
                            icons[route.name as keyof typeof icons]({ color: isFocused ? theme.colors.primary : theme.colors.secondary })
                        }
                        <Text style={{ color: isFocused ? theme.colors.primary : theme.colors.secondary, fontSize: 11 }}>
                            {typeof label === "string" ? label : ""}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        bottom: 26,
        left: 14,
        right: 14,
        borderRadius: 25,
        borderCurve: "continuous",
        paddingVertical: 14,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 20
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        backgroundColor: "#ffffff"
    },
    tabButton: {
        flex: 1,
        gap: 4,
        alignItems: "center",
    }
});

export default TabBar;
