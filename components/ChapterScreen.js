// Homescreen.js
import React, { useState } from "react";
import { Button, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";

export default function ChapterScreen({ navigation }) {

  const btn1 = '1';
  const btn2 = '2';

  return (

    <View style={{ ...styles.container, paddingTop: 20 }} paddingTop={40}>

      <View style={styles.answerPanel}>
        <View style={styles.buttonContainer}>
          <Button
            title="Al Fatiha"
            onPress={() => navigation.navigate('Verse', { value: btn1 })}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Al Fatiha"
            onPress={() => navigation.navigate('Verse', { value: btn1 })}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Al Fatiha"
            onPress={() => navigation.navigate('Verse', { value: btn1 })}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',

  },
  box: {
    width: 320, // Set the desired width and height for the square box
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'grey'
  },
  answerPanel: {
    width: 320, // Set the desired width and height for the square box
    height: 500,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'grey'
  },
  button: {
    width: '45%', // Adjust the width percentage based on your preference
    height: '15%',
    margin: 3,
    padding: 25,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: 'green', // Change to the desired active color
  },
  arabicText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Amiri Quran',
    fontSize: 50,
    width: 200,
    height: 150
  },
  buttonContainer: {
    marginVertical: 5, // Adjust the vertical spacing between buttons as needed
  },
});