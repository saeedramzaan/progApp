// Homescreen.js
import React, { useState } from "react";
import { Button, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";

export default function ChapterScreen({ navigation }) {

  const AlFatiha = '1';
  const AlQadr = '97';
  const AlFil= '105';

  return (

    <View style={{ ...styles.container, paddingTop: 20 }} paddingTop={40}>

      <View style={styles.answerPanel}>

        <View style={styles.buttonContainer}>
          <Button
            title="Al Fatiha"
            onPress={() => navigation.navigate('Verse', { value: AlFatiha })}
          />
        </View>

        
        <View style={styles.buttonContainer}>
          <Button
            title="Al Qadr-97"
            onPress={() => navigation.navigate('Verse', { value: AlQadr })}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Al Fil-105"
            onPress={() => navigation.navigate('Verse', { value: AlFil })}
          />
        </View>

        
        <View style={styles.buttonContainer}>
          <Button
            title="Quraish-106"
            onPress={() => navigation.navigate('Verse', { value: 106  })}
          />
        </View>

           <View style={styles.buttonContainer}>
          <Button
            title="Al-Kauder-108"
            onPress={() => navigation.navigate('Verse', { value: 108  })}
          />
        </View>

          <View style={styles.buttonContainer}>
          <Button
            title="Al-Masad-101"
            onPress={() => navigation.navigate('Verse', { value: 111  })}
          />
        </View>

              <View style={styles.buttonContainer}>
          <Button
            title="Al-Fajr-89"
            onPress={() => navigation.navigate('Verse', { value: 89  })}
          />
        </View>


        <View style={styles.buttonContainer}>
          <Button
            title="Al-Muttaffin-89"
            onPress={() => navigation.navigate('Verse', { value: 83  })}
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