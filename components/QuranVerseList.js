// Homescreen.js
import React, { useState,useEffect } from "react";
import { Button,ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import { useRoute } from '@react-navigation/native';

export default function VerbNoList({ navigation }) {

  const AlFatiha = '1';
  const AlQadr = '97';
  const AlFil= '105';
  const AlMuttaffin= '83';



  
  const route = useRoute();

  //const { value } = 97;
  
  const [verse_no, setVerseNo] = useState([]);
  const [quiz_tense, setQuiz_tense] = useState([]);



  useEffect(() => {
    // Fetch data once when the component mounts
    const fetchData = async () => {


      try {

      //  console.log(value);

     //     const resAnswer = await axios.post('http://localhost:8000/mapi/verseList');
        const resAnswer = await axios.post('https://lara-project-mocha.vercel.app/mapi/verseList', { id: value });


        console.log(resAnswer.data.title);

        setVerseNo(resAnswer.data.chapter);

        setQuiz_tense(resAnswer.data.title);


      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the async function inside useEffect
  }, []); // Empty dependency array to run once when component mounts

  return (
    <>
 
      <ScrollView>
                <View>
                <Text></Text>
                </View>
      {verse_no.map((item, index) => (



        <View key={index}>
          <Button
            title={item+" "+quiz_tense[index]}
            onPress={() => {
              console.log(item);
               const mergedObject = { chapter: item, verse: 1 }; // Example other number, replace with your actual number
               navigation.navigate('Verse', mergedObject);
             // navigation.navigate("About");
            }}
          />
        </View>
      ))}
</ScrollView>
    </>
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