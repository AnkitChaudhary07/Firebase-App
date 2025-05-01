import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { savePushToken } from "./pushNotificationHelper";

export const expoNotifications = async () => {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "f0a413e4-29a2-4154-a90a-7eb8a4abf8b5", // Replace with your Expo project ID
      })
    ).data;

    console.log("Push token:", token);

    // Generate a simple unique ID since we don't have user authentication
    const deviceId =
      Device.deviceName + "-" + Device.modelName + "-" + Date.now();

    // Save token to Firebase
    await savePushToken(deviceId, token);

    return token;
  } else {
    alert("Must use physical device for Push Notifications");
  }
};
