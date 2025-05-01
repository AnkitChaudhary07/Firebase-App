import AsyncStorage from "@react-native-async-storage/async-storage";

async function saveNotification(remoteMessage) {
  try {
    const existing = await AsyncStorage.getItem("notifications");
    let notifications = existing ? JSON.parse(existing) : [];

    const newNotification = {
      id: Date.now(), // Unique ID
      title: remoteMessage.notification?.title || "",
      body: remoteMessage.notification?.body || "",
      receivedAt: new Date().toISOString(),
    };

    notifications.unshift(newNotification); // add newest notification on top

    await AsyncStorage.setItem("notifications", JSON.stringify(notifications));
  } catch (e) {
    console.log("Error saving notification:", e);
  }
}
