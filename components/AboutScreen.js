// Aboutscreen.js
import React, { useState, useEffect, Component } from "react";
import { Button, View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
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

  const [displayState, setDisplayState] = useState(null);

  const [nextQues, setNextQues] = useState(0);

  const [backgroundColor, setBackgroundColor] = useState(null);

 

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

  let [repeatQues, setRepeatQues] = useState([]);

  const [lastSelected, setLastSelected] = useState(null);

  let [outline,setOutline] = useState(null);

  let imageListArr = [];

  let check = "";


  let status = null;

  //var outline = 0;

  let trueCount1 = 0;
  let falseCount1 = 0;

  //let question_mode = false;
  
  let [question_mode, setQuestion_mode] = useState(false);
  

  let i = 0;

  useEffect(() => {

    

  }, [])

 

  const handleAnswer = async (id, selectedAnswer, question_mode) => {
    
    // Logic to handle the user's answer and move to the next page

  
    setOutline(1);
    setBackgroundColor('#DAF7A6');

    let elements = [];

    let displayResult = [];

    const value = await AsyncStorage.getItem('yourKey');


    try {

      const resAnswer = await axios.post('http://localhost:8000/api/ans', { id });

      const selectedText = resAnswer.data.replace(/["'\s]/g, '');

      const textClick = selectedAnswer.replace(/["'\s]/g, '');


      if (selectedText == textClick) {
       // setBackgroundColor('red'); 
        status = true;

        const fields = { id, status };

        setResult(prevState => ({
          ...prevState,
          score: [...prevState.score, fields]
        }));

        if(question_mode==true){

        // Remove the correct answer from repeatQues array   
        repeatQues = repeatQues.filter(item => item !== id);

        setRepeatQues(repeatQues);

        if(repeatQues.length==0){
    
          setCurrentPage(quesCount + 1);

          elements.push(
            <View key={1} style={{ ...styles.container, paddingTop: 20 }} paddingTop={40}>
             <Text> You have completed</Text>
            </View>
          );

          setReformedContent(elements);
        }

        }

  

        repeat.forEach(item => {
          console.log(item+"repeat no")
        });

      } else {

      
       // setLastSelected(btnId);
         console.log(lastSelected+"Last selected");
        status = false;
    
        console.log(falseCount1);
        
        const fields = { id, status };

        setResult(prevState => ({
          ...prevState,
          score: [...prevState.score, fields]
        }));

        setRepeatQues(prevState => [...prevState, id]);

        console.log('Wrong')
      
       
      }

      if(question_mode==true){
  
       // setNextQues(nextQues +1);

 
        displayResult.push(
          <View key={1} style={{ ...styles.container, flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 20, backgroundColor: '#F5B7B1', paddingTop: 25, width: 200 }}>
          <Text style={{ textAlign: 'center' }}> Wrong Answer. Try Again </Text>
      </View>
        );
          if(status==false){
          setDisplayState(displayResult);
          }
        
        
       
        for (let j = 0; j < quesCount; j++) { // Example: Generate 5 elements
     
         
        for (let r = 0; r < repeatQues.length; r++) { 
          
          if (correctAnswer[j] == repeatQues[r]) {

            if(status==true){
              setCurrentPage(repeatQues[r]);
              setDisplayState(null);
            }
        
          }
        }
      }

     

      }else{
      //  outline = 1; 
        console.log(status+"OutSide Timer");
         
        setCurrentPage(currentPage + 1);
       
     
     
      }

   
      if(quesCount==currentPage){
        console.log('repeatQues is');
      
       setCurrentPage(quesCount + 1);
       console.log(quesCount);
      
      elements.push(
        <View key={1} style={{ ...styles.container, paddingTop: 20 }} paddingTop={40}>
       
         <TouchableOpacity onPress={reformQues}>
         <Text>Press to Reform</Text>
        </TouchableOpacity>
        </View>
      );
      
      setReformedContent(elements);

        }

      setLastSelected(null);

      const trueCount = answerList.filter(item => item === true).length;



    } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error);
    }


  };

  result.score.forEach(item => {
    // Check the status of each item and increment the corresponding counter
    
    if (item.status==true) {

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
    setTimeout(() => {
    //  setDelayed(true);
     // status == true; 
    // Change to your desired background color
      console.log(status+"Inside Timer");
      
     // setCurrentPage(currentPage + 1);
    }, 3000); // 30 seconds in milliseconds
 

  }

  useEffect(() => {

    const fetchData = async () => {

      try {

        const response = await axios.get('http://localhost:8000/create');
        // Handle the response and update state or perform any other actions

        setQuesData(response.data.data)
        setQuesCount(response.data.count)

        for (let i = 0; i <= response.data.count - 1; i++) {

          combinedArr.push(response.data.data[i].answer);

          correctAnswerArr.push(response.data.data[i].q_id)

          imageListArr.push(response.data.data[i].question);

        }

        setMergeArray(combinedArr);
        setCorrectAnswer(correctAnswerArr);
        setimageList(imageListArr);

        console.log(imageList);

      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }
      
    };

    fetchData(); // Call the async function inside useEffect


  }, [quesCount], [mergeArray], [imageList]); // 

  const reformQues = async () => {

    let k = 1;
    // let elements = [];

   // question_mode = true; 

    setQuestion_mode(true);

    setNextQues(nextQues +1);


    for (let j = 0; j < repeatQues.length ; j++) { // Example: Generate 5 elements
   
      if (j == nextQues) {
        setCurrentPage(repeatQues[j]);
      
        // elements.push(
        //   <View key={j} style={{ ...styles.container, paddingTop: 20 }} paddingTop={40}>
        //    {repeatQues[j]}
        //   </View>
        // );
      }
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
              <Text style={[styles.arabicText ]}>{imageList[i]}</Text>
            </View>

            {arrayValues.map((_, x) => (

              <TouchableHighlight key={x} style={[styles.button, lastSelected == x && {backgroundColor}, lastSelected === x && {  borderColor: 'blue', borderWidth: 2, borderRadius: 5}]} onPress={() => validateAnswer(x, correctAnswer[i], arrayValues[x],question_mode)}  >
                <Text>
                  {arrayValues[x].replace(/["']/g, '')}
                </Text>
              </TouchableHighlight>

    
            ))}

          </View>

          <View style={styles.answerPanel}>
            <TouchableOpacity color={backgroundColor} style={styles.button}  onPress={() => handleAnswer(correctAnswer[i], selectedAnswer, question_mode)} >
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
    <View style={{flex:'1',justifyContent:'center', alignItems:'center',backgroundColor :'#F5F5F5'}}>
      <View style={{ padding: 25, backgroundColor:'##F8F8FF'}}>
      <View style={{ padding: 25, backgroundColor:'#FFFAFA'}}>
      { question_mode==false ? (
    <>
      <Text style={{marginBottom:10}}>Wrong: {falseCount1}</Text>
      <Text style={{marginBottom:10}}>Correct: {trueCount1}  </Text>
    </>
  ) : null }
     </View>
    
    {reformedContent}
    </View>
    
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
  arabicText: {
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Amiri Quran',
    fontSize: 50,
    width:200, 
    height: 150
  },
});