// Aboutscreen.js
import React, { useState, useEffect, Component } from "react";
import { Button, View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import axios from 'axios';

export default function AboutScreen() {

  const [quesData, setQuesData] = useState([]);

  let [mergeArray, setMergeArray] = useState([]);

  let [singleArray, setSingelArray] = useState([]);

  const [quesCount, setQuesCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const [correctAnswer, setCorrectAnswer] = useState([]);

  const [imageList, setimageList] = useState([]);

  let [selectedAnswer, setSelectedAnswer] = useState([]);

  let stringWithoutBraces = null;

  let arrayValues = null;

  let combinedArr = [];

  let correctAnswerArr = [];

  const [answerList, setAnswerList] = useState([]);

  let imageListArr = [];

  let check = "";

  useEffect(() => {


  }, [])

  const handleAnswer = async (id) => {
    // Logic to handle the user's answer and move to the next page
    setCurrentPage(currentPage + 1);

    console.log(selectedAnswer);
    console.log(id);

    try {

      const resAnswer = await axios.post('http://localhost:8000/api/ans', { id });

      const selectedText = resAnswer.data.replace(/["'\s]/g, '');

      const textClick = selectedAnswer.replace(/["'\s]/g, '');

      let status = false;

      console.log(selectedText);
      console.log(textClick);

      if (selectedText == textClick) {
        status = true;
        answerList.push(status);
      } else {
        status = false;
        answerList.push(status);
      }

      console.log(answerList);

    } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error);
    }


  };

  const validateAnswer = async (id, text) => {

    setSelectedAnswer(text);

  }

  useEffect(() => {

    const fetchData = async () => {

      try {
        const response = await axios.get('http://localhost:8000/create');
        // Handle the response and update state or perform any other actions
        console.log(response.data.data[4].answer);

        setQuesData(response.data.data)
        setQuesCount(response.data.count)

        for (let i = 0; i <= response.data.count - 1; i++) {

          combinedArr.push(response.data.data[i].answer);

          correctAnswerArr.push(response.data.data[i].q_id)

          imageListArr.push(response.data.data[i].image_path);

        }

        setMergeArray(combinedArr);
        setCorrectAnswer(correctAnswerArr);
        setimageList(imageListArr);

      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the async function inside useEffect


  }, [quesCount], [mergeArray],[imageList]); // 


  for (let i = 0; i <= quesCount; i++) {



    if (i == currentPage) {

      i--;

      stringWithoutBraces = mergeArray[i].slice(1, -1); // Remove curly braces
      arrayValues = stringWithoutBraces.split(','); // Split by commas

      return (
        <View key={i} style={{ ...styles.container, paddingTop: 20 }} paddingTop={40}>

  
          <View key={i} style={styles.box}>

          <View>
              <Text></Text>
              <Image source={imageList[i]} style={{ width: 200, height: 150 }} />
            </View>

            {arrayValues.map((_, x) => (

              <TouchableOpacity key={x} style={styles.button} onPress={() => validateAnswer(correctAnswer[i], arrayValues[x])}  >
                <Text>
                  {
                  
                  arrayValues[x].replace(/["']/g, '')

                  }
                </Text>
              </TouchableOpacity>

            ))}

          </View>

          <View style={styles.answerPanel}>
            <TouchableOpacity style={styles.button} onPress={() => handleAnswer(correctAnswer[i])} >
              <Text style={styles.buttonText}> Lock{i} </Text>
            </TouchableOpacity>
          </View>
        </View>
      )

    }
  }

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
    height: 100,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
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
});