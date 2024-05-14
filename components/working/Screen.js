// import React from 'react';
// import { View, Text, StyleSheet, Dimensions } from 'react-native';

// Aboutscreen.js
import React, { useState, useEffect} from "react";
import {  View, Text, StyleSheet,TouchableHighlight,Dimensions  } from "react-native";
import axios from 'axios';

const { width, height } = Dimensions.get('window');



export default function Screen() {

    //const route = useRoute();

  // let chapter = route.params.chapter;

  // let verse = route.params.verse;

  let chapter = "1";

  let verse = "1";

  let [nextVerse, setNextVerse] = useState(verse);

  let search_id = chapter + ":" + verse;

  const [quesData, setQuesData] = useState([]);

  let [mergeArray, setMergeArray] = useState([]);

  let [quesCount, setQuesCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const [correctAnswer, setCorrectAnswer] = useState([]);

  const [qid, setQid] = useState([]);

  const [imageList, setimageList] = useState([]);

  let [selectedAnswer, setSelectedAnswer] = useState([]);

  const [reformedContent, setReformedContent] = useState(null);

  const [displayState, setDisplayState] = useState(null);

  const [backgroundColor, setBackgroundColor] = useState(null);

  const [nextClick, setNextClick] = useState(false);


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

  let k = 0;

  const [answerList, setAnswerList] = useState([]);

  let [repeatQues, setRepeatQues] = useState([]);

  let [storeRepetition, setStoreRepetition] = useState([]);

  const [lastSelected, setLastSelected] = useState(null);

  let [outline, setOutline] = useState(null);

  let imageListArr = [];

  let status = null;

  let trueCount1 = 0;
  let falseCount1 = 0;

  let [trueCount, setTrueCount] = useState(0);
  let [falseCount, setFalseCount] = useState(0); 

  let elements = [];

  let [repetition_mode, setRepetition_mode] = useState(false);

  let i = 0;

  useEffect(() => {


  }, [])


  useEffect(() => {

    const fetchData = async () => {

      try {

        console.log(search_id);

        const response = await axios.post('https://lara-project-mocha.vercel.app/mapi/getQuizInfo', { id: search_id });
        // Handle the response and update state or perform any other actions

        setQuesData(response.data.data)
        setQuesCount(response.data.count)

        for (let i = 0; i <= response.data.count - 1; i++) {

          if (i == currentPage) {

            stringWithoutBraces = response.data.data[i-1].answer.slice(1, -1); // Remove curly braces
            arrayValues = stringWithoutBraces.split(','); // Split by commas
  
            setMergeArray(arrayValues);
        }

      

      } 

      console.log(arrayValues);
      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }

    };

    if(nextClick==false){
    fetchData(); // Call the async function inside useEffect
    }
  }, [quesCount], [mergeArray], [imageList]); // 

  return (
         <View key={i} style={styles.container}>

    <View>
     
      {/* <Image source={imageList[i]} style={{ width: 200, height: 150 }} /> */}
      <Text style={[styles.arabicText]}>{imageList[i]}</Text>
    </View>

    <View key={i} style={styles.box}>
    {mergeArray.map((_, x) => (

      <TouchableHighlight key={x} style={[styles.button, lastSelected == x && { backgroundColor }, lastSelected === x && { borderColor: 'blue', borderWidth: 2, borderRadius: 5 }]}   >
        <Text>
          {mergeArray[x].replace(/["']/g, '')}
        </Text>
      </TouchableHighlight>
    ))}
</View>

  </View>  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: width * 0.05, // Responsive font size based on screen width
    fontWeight: 'bold',
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

