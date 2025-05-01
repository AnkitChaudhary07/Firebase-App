import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CourseSelector = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const options = ["GME", "ETO", "GP-RATING", "IMUCET"];

  const subscribeToTopic = async (topic) => {
    try {
      await messaging().subscribeToTopic(topic.toLowerCase()); // Topics are usually lowercase
      console.log(`Subscribed to topic: ${topic.toLowerCase()}`);
      Alert.alert(
        "Subscribed",
        `You are now subscribed to notifications for ${topic}`
      );
    } catch (error) {
      console.error(
        `Error subscribing to topic ${topic.toLowerCase()}:`,
        error
      );
      Alert.alert(
        "Subscription Error",
        `Could not subscribe to ${topic}. Please try again later.`
      );
    }
  };

  const unsubscribeFromTopic = async (topic) => {
    try {
      await messaging().unsubscribeFromTopic(topic.toLowerCase());
      console.log(`Unsubscribed from topic: ${topic.toLowerCase()}`);
      Alert.alert(
        "Unsubscribed",
        `You are no longer subscribed to notifications for ${topic}`
      );
    } catch (error) {
      console.error(
        `Error unsubscribing from topic ${topic.toLowerCase()}:`,
        error
      );
      Alert.alert(
        "Unsubscription Error",
        `Could not unsubscribe from ${topic}. Please try again later.`
      );
    }
  };

  const handleSelect = async (option) => {
    setSelectedOption(option);
    const courseMap = {
      GME: "gme",
      ETO: "eto",
      IMUCET: "dns",
      "GP-RATING": "gp-rating",
    };
    const courseType = courseMap[option];
    await AsyncStorage.setItem("courseType", courseType);

    // Debugging
    AsyncStorage.getItem("courseType").then((val) =>
      console.log("Course in AsyncStorage:", val)
    );

    console.log("Selected Course: ", option);
    subscribeToTopic(option); // Subscribe to the topic when the course is selected
  };

  const resetSelection = () => {
    if (selectedOption) {
      unsubscribeFromTopic(selectedOption); // Unsubscribe from the previous topic
    }
    setSelectedOption(null);
  };

  return (
    <View style={styles.container}>
      {!selectedOption ? (
        <>
          <Text style={styles.title}>Select Your Option</Text>
          <View style={styles.buttonContainer}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.button}
                onPress={() => handleSelect(option)}
              >
                <Text style={styles.buttonText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      ) : (
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedText}>
            Selected Course: {selectedOption}
          </Text>
          <TouchableOpacity style={styles.resetButton} onPress={resetSelection}>
            <Text style={styles.resetButtonText}>Select Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    margin: 10,
    minWidth: 120,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  selectedContainer: {
    alignItems: "center",
  },
  selectedText: {
    fontSize: 20,
    marginBottom: 20,
    color: "#28a745",
    fontWeight: "bold",
  },
  resetButton: {
    backgroundColor: "#6c757d",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 6,
  },
  resetButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default CourseSelector;
