import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen";
import AboutScreen from "./components/AboutScreen";
import Screen from "./components/Screen";
import TestScreen from "./components/TestScreen";
import TestArabic from "./components/TestArabic";
import ChapterScreen from "./components/ChapterScreen";
import VerseScreen from "./components/VerseScreen";
import FullScreen from "./components/FullScreen";
import Effect from "./components/Effect";
import MobSize from "./components/MobSize";
import NumberList from "./components/NumberList";
import TaskScreen from "./components/TaskScreen";
import FourButtonsGrid from "./components/FourButtonsGrid";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Screen" component={Screen} />
        <Stack.Screen name="TestScreen" component={TestScreen} />
        <Stack.Screen name="TestArabic" component={TestArabic} />
        <Stack.Screen name="FullScreen" component={FullScreen} />
        <Stack.Screen name="Effect" component={Effect} />
        <Stack.Screen name="Chapter" component={ChapterScreen} />
        <Stack.Screen name="Verse" component={VerseScreen} />
        <Stack.Screen name="MobSize" component={MobSize} />
        <Stack.Screen name="NumberList" component={NumberList} />
        <Stack.Screen name="TaskScreen" component={TaskScreen} />
        <Stack.Screen name="FourButtonsGrid" component={FourButtonsGrid} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}