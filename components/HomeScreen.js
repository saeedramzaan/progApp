// Homescreen.js
import React from "react";
import { Button, View, Text } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Holy Quran</Text>
      <Button
        title="Go to Task"
        onPress={() => navigation.navigate("Chapter")}
      />
    </View>
  );
}
