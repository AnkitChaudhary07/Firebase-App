import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, Text, View } from "react-native";
import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";
import HomeScreen from "./HomeScreen";
import CourseSelector from "./CourseSelector";
import NotificationsScreen from "./NotificationsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    const setupNotifications = async () => {
      const { status } = await Notifications.requestPermissionsAsync();

      if (status === "granted") {
        try {
          const token = await messaging().getToken();
          console.log("FCM TOKEN: ", token);
        } catch (tokenError) {
          console.error("Token retrieval failed:", tokenError);
        }
      } else {
        console.log("Permission Denied");
        Alert.alert("Permission Denied", "Notifications disabled");
      }
    };

    setupNotifications();

    // Foreground notification listener
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert(
        remoteMessage.notification?.title || "New Message",
        remoteMessage.notification?.body
      );
    });

    // Tapped Notification handler when app killed
    const checkInitialNotification = async () => {
      const remoteMessage = await messaging().getInitialNotification();
      if (remoteMessage) {
        console.log("Opened from quit state:", remoteMessage);
      }
    };
    checkInitialNotification();

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Firebase Notifications" }}
        />
        <Stack.Screen
          name="CourseSelector"
          component={CourseSelector}
          options={{ title: "Select Your Course" }}
        />
        <Stack.Screen
          name="NotificationsScreen"
          component={NotificationsScreen}
          options={{ title: "Notifications" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});
