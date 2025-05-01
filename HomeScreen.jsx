import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Firebase App</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CourseSelector")}
      >
        <Text>Go to Course Selection</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("NotificationsScreen")}
      >
        <Text>Go to Notifications</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    margin: 12,
    backgroundColor: "#E3E5C2",
    padding: 16,
    borderRadius: 10,
  },
});

export default HomeScreen;
