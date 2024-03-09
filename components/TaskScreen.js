// Homescreen.js
import React from "react";
import { Button, View, Text } from "react-native";

export default function TaskScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Task One</Text>
      <Button
        title="Task 1"
        onPress={() => navigation.navigate("About")}
      />
    </View>
  );
}
