// Aboutscreen.js
import React, { useState, useEffect, Component } from "react";
import { Button, View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { TouchableHighlight } from "react-native-web";
import { useRoute } from '@react-navigation/native';

export default function AboutScreen({ navigation }) {

  const route = useRoute();

  let chapter = route.params.chapter;

  let verse = route.params.verse;

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

  const handleAnswer1 = async (surah,ayah) => {
 
    setRepetition_mode(false);

    setTrueCount(0);
    setFalseCount(0);

    setNextClick(true);

    setMergeArray([]);
         
    ayah++; 

    setNextVerse(ayah);

    search_id = surah+":"+ayah; 

   try {

     const response = await axios.post('http://localhost:8000/api/create', { id: search_id });
     // Handle the response and update state or perform any other actions

     setQuesData(response.data.data)
     setQuesCount(response.data.count)

     for (let i = 0; i <= response.data.count - 1; i++) {

       combinedArr.push(response.data.data[i].answer);
       correctAnswerArr.push(i + 1)
       imageListArr.push(response.data.data[i].question);

     }

     setMergeArray(combinedArr);
     setCorrectAnswer(correctAnswerArr);
     setimageList(imageListArr);
 
     setCurrentPage(1);

   } catch (error) {
     // Handle errors
     console.error('Error fetching data:', error);
   }


  };

  const handleAnswer = async (quesId, id, selectedAnswer, repetition_mode,search_id) => {

    // Logic to handle the user's answer and move to the next page

    setOutline(1);
    setBackgroundColor('#DAF7A6');

    let displayResult = [];

    const value = await AsyncStorage.getItem('yourKey');

    let verse_no = chapter+":"+nextVerse+":"+quesId;

    try {

      const resAnswer = await axios.post('http://localhost:8000/api/ans', { id: verse_no });

      // console.log(resAnswer+"Ansssssssssser"); Never add string with axious response, it would print as object

      console.log(resAnswer.data);

      const selectedText = resAnswer.data.replace(/["'\s]/g, '');

      const textClick = selectedAnswer.replace(/["'\s]/g, '');

      if (selectedText == textClick) {
        // setBackgroundColor('red'); 
        status = true;
        setTrueCount(prevState => prevState + 1);

        const fields = { id, status };

        setResult(prevState => ({
          ...prevState,
          score: [...prevState.score, fields]
        }));

        if (repetition_mode == true) {

          // Remove the correct answer from repeatQues array   
          repeatQues = repeatQues.filter(item => item !== id);


          setRepeatQues(repeatQues);

          storeRepetition = storeRepetition.filter(item => item != quesId)

          setStoreRepetition(storeRepetition);

          if (storeRepetition.length == 0) {

            setCurrentPage(quesCount + 1);

            elements.push(

              <View key={1} style={{ ...styles.container, paddingTop: 20 }} paddingTop={40}>
                <Text> You have completed </Text>
              </View>

            );

            setReformedContent(elements);
          }

        }

      } else {


        status = false;
        setFalseCount(prevState => prevState + 1);

        const fields = { id, status };

        setResult(prevState => ({
          ...prevState,
          score: [...prevState.score, fields]
        }));

        setRepeatQues(prevState => [...prevState, id]);

        setStoreRepetition(prevState => [...prevState, quesId]);

      }

      if (repetition_mode == true) {

        displayResult.push(
          <View key={1} style={{ ...styles.container, flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 20, backgroundColor: '#F5B7B1', paddingTop: 25, width: 200 }}>
            <Text style={{ textAlign: 'center' }}> Wrong Answer. Try Again </Text>
          </View>
        );
        if (status == false) {
          setDisplayState(displayResult);
        }

        for (let j = 0; j < quesCount; j++) { // Example: Generate 5 elements

          for (let r = 0; r <= storeRepetition.length; r++) {

            if (storeRepetition[r] === correctAnswer[j]) {
              if (status === true) {
                setCurrentPage(storeRepetition[r]); // Re-call Reform Questions
                setDisplayState(null); // omit 'wrong answer' message
              }
            }
          }
        }

      } else {

        setCurrentPage(currentPage + 1);

        if (quesCount == currentPage) {
     
          setCurrentPage(quesCount + 1);
           
          elements.push(
            <View key={1} style={{ ...styles.container, paddingTop: 20 }} paddingTop={40}>

              <Text>{search_id} Quran verse has been trained </Text>

            </View>
          );

          setReformedContent(elements);
        }

      }

      setLastSelected(null);

    } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error);
    }

  };

  result.score.forEach(item => {

    if (item.status == true) {

      trueCount1++;

    } else {

      falseCount1++;

    }
    

  });


  const validateAnswer = async (btnId, id, text) => {

    await AsyncStorage.setItem('yourKey', 'yourValue');

    setSelectedAnswer(text);

    setLastSelected(btnId);

    setBackgroundColor('#DAF7A6');

  }

  useEffect(() => {

    const fetchData = async () => {

      try {

        const response = await axios.post('http://localhost:8000/api/create', { id: search_id });
        // Handle the response and update state or perform any other actions

        setQuesData(response.data.data)
        setQuesCount(response.data.count)

        for (let i = 0; i <= response.data.count - 1; i++) {

          combinedArr.push(response.data.data[i].answer);
          correctAnswerArr.push(i + 1)
          imageListArr.push(response.data.data[i].question);

        }

        setMergeArray(combinedArr);
        setCorrectAnswer(correctAnswerArr);
        setimageList(imageListArr);


      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }

    };

    if(nextClick==false){
    fetchData(); // Call the async function inside useEffect
    }
  }, [quesCount], [mergeArray], [imageList]); // 


  const reformQues = async (storeRepetition) => {

    for (let k = 0; k <= quesCount; k++) {

      if (storeRepetition[0] == k) {
        setCurrentPage(k);
      }
      setRepetition_mode(true);

    }
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
              {/* <Image source={imageList[i]} style={{ width: 200, height: 150 }} /> */}
              <Text style={[styles.arabicText]}>{imageList[i]}</Text>
            </View>

            {arrayValues.map((_, x) => (

              <TouchableHighlight key={x} style={[styles.button, lastSelected == x && { backgroundColor }, lastSelected === x && { borderColor: 'blue', borderWidth: 2, borderRadius: 5 }]} onPress={() => validateAnswer(x, correctAnswer[i], arrayValues[x], repetition_mode)}  >
                <Text>
                  {arrayValues[x].replace(/["']/g, '')}
                </Text>
              </TouchableHighlight>


            ))}

          </View>

          <View style={styles.answerPanel}>
            <TouchableOpacity color={backgroundColor} style={styles.button} onPress={() => handleAnswer(i + 1, correctAnswer[i], selectedAnswer, repetition_mode,search_id)} >
              <Text style={styles.buttonText} color={backgroundColor}> Lock </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.answerPanel}>
            <Text>
              {displayState}
            </Text>
          </View>
        </View>

      )
    }

  }

  return (
    <View style={{ flex: '1', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5' }}>
      <View style={{ padding: 25, backgroundColor: '##F8F8FF' }}>
        <View style={{ padding: 25, backgroundColor: '#FFFAFA' }}>
          {repetition_mode == false ? (
            <>
              <Text style={{ marginBottom: 10 }}>Wrong: {falseCount}</Text>
              <Text style={{ marginBottom: 10 }}>Correct: {trueCount}  </Text>
            </>
          ) : null}

{!storeRepetition.length==0 ? (
  <>
    <TouchableOpacity
      style={{ width: 800, ...styles.ReformButton, backgroundColor: backgroundColor }}
      onPress={() => reformQues(storeRepetition)}>
      <Text style={[styles.buttonText]}> Reform My Mistakes </Text>
    </TouchableOpacity>
  </>
) : (
  // Else condition
  // You can add any elements or logic here that you want to execute when the condition is false
  <View>
        <Button title="Next Verse" onPress={() => handleAnswer1(chapter,nextVerse)} />
      </View>
)}

        </View>

        {reformedContent}

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
  ReformButton: {
    width: '100%', // Adjust the width percentage based on your preference
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
});