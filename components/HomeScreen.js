// Homescreen.js
import React from "react";
import { Button, View, Text } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Holy Quran</Text>
      <Button
        title="Quran Chapter"
        onPress={() => navigation.navigate("QuranSurahList")}
      />

      <Button
        title="Arabic Verbs"
        onPress={() => navigation.navigate("VerbNoList")}
      />

      <Button
        title="QuranVerseList"
        onPress={() => navigation.navigate("QuranVerseList")}
      />
    </View>
  );
}
