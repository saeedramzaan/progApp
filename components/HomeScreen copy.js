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
       <Button
        title="Go to About"
        onPress={() => navigation.navigate("About")}
      />
         <Button
        title="Screen"
        onPress={() => navigation.navigate("Screen")}
      />

        <Button
        title="TestScreen"
        onPress={() => navigation.navigate("TestScreen")}
      />


      <Button
        title="Effect"
        onPress={() => navigation.navigate("Effect")}
      />

      <Button
        title="TestArabic"
        onPress={() => navigation.navigate("TestArabic")}
      />


<Button
        title="FullScreen"
        onPress={() => navigation.navigate("FullScreen")}
      />

<Button
        title="MobSize"
        onPress={() => navigation.navigate("MobSize")}
      />


<Button
        title="NumberList"
        onPress={() => navigation.navigate("NumberList")}
      />
<Button
        title="Task Screen"
        onPress={() => navigation.navigate("TaskScreen")}
      />

<Button
        title="Four Button"
        onPress={() => navigation.navigate("FourButtonsGrid")}
      />
    </View>
  );
}
