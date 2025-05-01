// pushNotificationHelper.js
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import * as Device from "expo-device";

export async function savePushToken(deviceId, token) {
  if (!deviceId || !token) {
    console.error("Missing deviceId or token");
    return false;
  }

  try {
    // Reference to the device document
    const deviceRef = doc(db, "devices", deviceId);

    // Save device info with token
    await setDoc(
      deviceRef,
      {
        expoPushToken: token,
        deviceInfo: {
          osName: Device.osName,
          osVersion: Device.osVersion,
          deviceName: Device.deviceName,
          modelName: Device.modelName,
          brand: Device.brand,
        },
        lastActive: new Date(),
      },
      { merge: true }
    );

    console.log("Push token saved successfully for device:", deviceId);
    return true;
  } catch (error) {
    console.error("Error saving push token:", error);
    return false;
  }
}
