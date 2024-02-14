// Aboutscreen.js
import React, { useState, useEffect, Component } from "react";
import { Button, View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { TouchableHighlight } from "react-native-web";
import react from "react";

export default function AboutScreen() {

  const [quesData, setQuesData] = useState([]);

  let [mergeArray, setMergeArray] = useState([]);

  let [quesCount, setQuesCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const [correctAnswer, setCorrectAnswer] = useState([]);

  const [qid, setQid] = useState([]);

  const [imageList, setimageList] = useState([]);

  let [selectedAnswer, setSelectedAnswer] = useState([]);

  const [reformedContent, setReformedContent] = useState(null);

  const [nextQues, setNextQues] = useState(0);

 

  const [state, setState] = useState({
    users: []
  });

  const [result, setResult] = useState({
    score: []
  });



  let stringWithoutBraces = null;

  let arrayValues = null;

  let combinedArr = [];

  let correctAnswerArr = [];

  let repeat = [];

  let k = 0; 

  const [answerList, setAnswerList] = useState([]);

  const [repeatQues, setRepeatQues] = useState([]);

  const [lastSelected, setLastSelected] = useState(null);

  let imageListArr = [];

  let check = "";

  let trueCount1 = 0;
  let falseCount1 = 0;

  //let question_mode = false;
  
  let [question_mode, setQuestion_mode] = useState(false);
  

  let i = 0;

  useEffect(() => {

  }, [])

  const handleAnswer = async (id, selectedAnswer, question_mode) => {
    // Logic to handle the user's answer and move to the next page

    

    console.log(question_mode);

    if(question_mode==true){
      console.log('true');
         setNextQues(nextQues +1);
      
      for (let j = 0; j < repeat.length ; j++) { // Example: Generate 5 elements
        console.log(repeat[j]);
        console.log(question_mode);
        if (j == nextQues) {
          setCurrentPage(repeat[j]);
          console.log(repeat[j]);
        }

        if(j==repeat.length-1){
          console.log('Equal');
        }
    }
    }else{
      console.log('false');
      setCurrentPage(currentPage + 1);
  
    }


    const value = await AsyncStorage.getItem('yourKey');

    console.log(selectedAnswer);
    console.log(value);

    try {

      const resAnswer = await axios.post('http://localhost:8000/api/ans', { id });

      const selectedText = resAnswer.data.replace(/["'\s]/g, '');

      const textClick = selectedAnswer.replace(/["'\s]/g, '');

      let status = false;

      console.log(selectedText);
      console.log(textClick);

      if (selectedText == textClick) {

        status = true;

        const fields = { id, status };

        setResult(prevState => ({
          ...prevState,
          score: [...prevState.score, fields]
        }));


      } else {

        status = false;

        const fields = { id, status };

        setResult(prevState => ({
          ...prevState,
          score: [...prevState.score, fields]
        }));

      }

      setLastSelected(null);


    
      // Iterate through the data array
   

      const trueCount = answerList.filter(item => item === true).length;

      console.log(trueCount);


    } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error);
    }


  };

  console.log(result);

  console.log(result.score);



  result.score.forEach(item => {
    // Check the status of each item and increment the corresponding counter
    if (item.status==true) {

      trueCount1++;

    console.log(repeat+"true");

    } else {

      falseCount1++;
     
      console.log(item.id+"false");

      repeat.push(item.id); 
    }
  });

  console.log(repeat+"Repeat");

  console.log(falseCount1);

  console.log(repeatQues);

 


  const validateAnswer = async (btnId, id, text) => {

    await AsyncStorage.setItem('yourKey', 'yourValue');

    
    
    setSelectedAnswer(text);

    console.log(btnId);

    setLastSelected(btnId);

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


  }, [quesCount], [mergeArray], [imageList]); // 

  const reformQues = async () => {

    let k = 1;
    let elements = [];

   // question_mode = true; 

    setQuestion_mode(true);

    setNextQues(nextQues +1);

    console.log(repeat.length);

    let textToRender;

    console.log(nextQues);

  // if (1 === k) {
    for (let j = 0; j < repeat.length ; j++) { // Example: Generate 5 elements
      console.log(repeat[j]);
      if (j == nextQues) {
        setCurrentPage(repeat[j]);
        console.log(repeat[j]);
        elements.push(
          <View key={j} style={{ ...styles.container, paddingTop: 20 }} paddingTop={40}>
           {repeat[j]}
          </View>
        );
      }
  }

  setReformedContent(elements);
  };

  for (i; i <= quesCount; i++) {

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

              <TouchableHighlight key={x} style={[styles.button, lastSelected === x && { backgroundColor: 'green' }]} onPress={() => validateAnswer(x, correctAnswer[i], arrayValues[x],question_mode)}  >
                <Text>
                  {arrayValues[x].replace(/["']/g, '')}
                </Text>
              </TouchableHighlight>


            ))}

          </View>

          <View style={styles.answerPanel}>
            <TouchableOpacity style={styles.button} onPress={() => handleAnswer(correctAnswer[i], selectedAnswer, question_mode)} >
              <Text style={styles.buttonText}> Lock </Text>
            </TouchableOpacity>
          </View>

      <View style={styles.container}>
      <TouchableOpacity onPress={reformQues}>
        <Text>Press to Reform</Text>
      </TouchableOpacity>
      {reformedContent}
      </View>

        </View>
      )
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={reformQues}>
        <Text>Press to Reform</Text>
      </TouchableOpacity>
      {reformedContent}
    </View>
  );

  // return (
  //   <View key={1} style={{ ...styles.container, paddingTop: 20 }} paddingTop={40}>
  //     {/* <TouchableOpacity style={styles.button} onPress={() => reformQues()} >
  //       <Text style={styles.buttonText}> Lock{repeat} </Text>
  //     </TouchableOpacity> */}
  //      <Text> correct Answers </Text>
  //      <Text> {trueCount1} </Text>

  //      <Text> Wrong Answers </Text>
  //      <Text> {falseCount1} </Text>

  //      <TouchableOpacity style={styles.button} onPress={() => reformQues()} >
  //       <Text style={styles.buttonText}> Lock{repeat} </Text>
  //     </TouchableOpacity> 
  //   </View>
  // )
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
  activeButton: {
    backgroundColor: 'green', // Change to the desired active color
  },
});