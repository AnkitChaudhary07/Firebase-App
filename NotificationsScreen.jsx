import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    const fetchCourseType = async () => {
      const course = await AsyncStorage.getItem("courseType");
      console.log;
      const courseMap = {
        gme: "GME",
        eto: "ETO",
        dns: "IMUCET",
        "gp-rating": "GP-Rating",
      };
      setTitle(courseMap[course]);
    };

    fetchCourseType();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      const course = await AsyncStorage.getItem("courseType");
      try {
        const snapshot = await firestore()
          .collection("courses")
          .doc(course)
          .collection("notifications")
          .orderBy("date", "desc")
          .get();

        const fetchedNotifications = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setNotifications(fetchedNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        // Optionally set an error state to display an error message in your UI
      } finally {
        setLoading(false); // Stop loading after fetch (success or fail)
      }
    };

    fetchNotifications();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title} Notifications</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.notificationCard}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text>{item.body}</Text>
              <Text>
                {new Date(item.date.seconds * 1000).toLocaleDateString()}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  notificationCard: {
    marginBottom: 15,
    backgroundColor: "#ddd",
    padding: 15,
    borderRadius: 8,
  },
  notificationTitle: { fontSize: 18, fontWeight: "bold" },
  time: { fontSize: 12, color: "gray", marginTop: 5 },
});

export default NotificationsScreen;
