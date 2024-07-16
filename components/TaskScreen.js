// import React from 'react';
// import { View, Text, StyleSheet, Dimensions } from 'react-native';

// Aboutscreen.js
import React, { useState, useEffect} from "react";
import { Image, View, Text, StyleSheet,TouchableHighlight,TouchableOpacity,Dimensions,Button  } from "react-native";
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');



export default function TaskScreen() {

    const route = useRoute();

  let chapter = route.params.chapter;

  let verse = route.params.verse;

  // let chapter = "1";

  // let verse = "1";



  let [nextVerse, setNextVerse] = useState(verse);

  let search_id = chapter + ":" + verse;

  console.log(search_id);

  let [searchVerse, setSearchVerse] = useState(search_id);

  const [quesData, setQuesData] = useState([]);

  let [mergeArray, setMergeArray] = useState([]);

  let [ansInfo, setansInfo] = useState([]);

  let [quesCount, setQuesCount] = useState(1);

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

  // useEffect(() => {


  // }, [])

  const fetchHandle = async () => {

    try {

      console.log(search_id);

      const response = await axios.post('https://lara-project-mocha.vercel.app/mapi/create', { id: searchVerse });
      // Handle the response and update state or perform any other actions

      setQuesData(response.data.data)
      setQuesCount(response.data.count)

      console.log(currentPage);
     

      for (let i = 0; i <= response.data.count - 1; i++) {

       // combinedArr.push(response.data.data[i].answer);
        correctAnswerArr.push(i + 1)
        imageListArr.push(response.data.data[i].question);

        console.log(repetition_mode);


        stringWithoutBraces = response.data.data[i].answer.slice(1, -1); // Remove curly braces
      
        arrayValues = stringWithoutBraces.split(','); // Spli

        combinedArr.push(arrayValues);

       // imageListArr.push(response.data.data[i].question);
      

        setansInfo(combinedArr);

      if (i == currentPage && repetition_mode==false) {

        stringWithoutBraces = response.data.data[i].answer.slice(1, -1); // Remove curly braces
        arrayValues = stringWithoutBraces.split(','); // Split by commas
        setMergeArray(arrayValues);
        console.log(currentPage);
      }

      }

      console.log(arrayValues);
    
      setCorrectAnswer(correctAnswerArr);
      setimageList(imageListArr);

       console.log(mergeArray);

    } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error);
    }

  }


  const handleAnswer1 = async (surah,ayah) => {
 
    setCurrentPage(1);
    setRepetition_mode(false);

    setTrueCount(0);
    setFalseCount(0);

    setNextClick(true);

   // setMergeArray([]);
         
    ayah++; 

    setNextVerse(ayah);

    search_id = surah+":"+ayah; 

    setSearchVerse(search_id);

   // fetchHandle();

  try {

    console.log(search_id);

    setSearchVerse(search_id);

 

    const response = await axios.post('https://lara-project-mocha.vercel.app/mapi/create', { id: search_id });
    // Handle the response and update state or perform any other actions

    setQuesData(response.data.data)
    setQuesCount(response.data.count)

    console.log(currentPage);
    console.log(quesCount);
   

    for (let i = 0; i <= response.data.count - 1; i++) {

     // combinedArr.push(response.data.data[i].answer);
      correctAnswerArr.push(i + 1)
      imageListArr.push(response.data.data[i].question);

      console.log(repetition_mode);

   // if (nextVerse == 1 && repetition_mode == false) {

      stringWithoutBraces = response.data.data[0].answer.slice(1, -1); // Remove curly braces
      arrayValues = stringWithoutBraces.split(','); // Split by commas
      setMergeArray(arrayValues);
      console.log(arrayValues);
   // }

    }

    console.log(arrayValues);
  
    setCorrectAnswer(correctAnswerArr);
    setimageList(imageListArr);

  
    console.log(mergeArray);

  } catch (error) {
    // Handle errors
    console.error('Error fetching data:', error);
  }


  };

 

  const handleAnswer = async (quesId, id, selectedAnswer, repetition_mode,search_id) => {

    // Logic to handle the user's answer and move to the next page
    console.log(quesId);

    setOutline(1);
    setBackgroundColor('#089000');

   // console.log

   // setCurrentPage(prevPage => prevPage + 1);

    console.log(currentPage);


    fetchHandle();
      // try {

      //   console.log(search_id);

      //   const response = await axios.post('https://lara-project-mocha.vercel.app/mapi/create', { id: searchVerse });
      //   // Handle the response and update state or perform any other actions

      //   setQuesData(response.data.data)
      //   setQuesCount(response.data.count)

      //   console.log(currentPage);
       

      //   for (let i = 0; i <= response.data.count - 1; i++) {

      //    // combinedArr.push(response.data.data[i].answer);
      //     correctAnswerArr.push(i + 1)
      //     imageListArr.push(response.data.data[i].question);

      //     console.log(repetition_mode);


      //     stringWithoutBraces = response.data.data[i].answer.slice(1, -1); // Remove curly braces
        
      //     arrayValues = stringWithoutBraces.split(','); // Spli

      //     combinedArr.push(arrayValues);

      //    // imageListArr.push(response.data.data[i].question);
        

      //     setansInfo(combinedArr);

      //   if (i == currentPage && repetition_mode==false) {

      //     stringWithoutBraces = response.data.data[i].answer.slice(1, -1); // Remove curly braces
      //     arrayValues = stringWithoutBraces.split(','); // Split by commas
      //     setMergeArray(arrayValues);
      //     console.log(currentPage);
      //   }

      //   }

      //   console.log(arrayValues);
      
      //   setCorrectAnswer(correctAnswerArr);
      //   setimageList(imageListArr);

      //    console.log(mergeArray);

      // } catch (error) {
      //   // Handle errors
      //   console.error('Error fetching data:', error);
      // }


    let displayResult = [];

   // const value = await AsyncStorage.getItem('yourKey');

    let word_no = quesId+1;

    console.log(word_no);

    let verse_no = chapter+":"+nextVerse+":"+quesId;

    console.log(verse_no);

    try {

      console.log(verse_no);
      console.log(selectedAnswer);

      const resAnswer = await axios.post('https://lara-project-mocha.vercel.app/mapi/ans', { id: verse_no });

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
         console.log(storeRepetition);
         console.log(repetition_mode);
        if (repetition_mode == true) {

          // Remove the correct answer from repeatQues array   
          repeatQues = repeatQues.filter(item => item !== id);


          setRepeatQues(repeatQues);

          storeRepetition = storeRepetition.filter(item => item != quesId)

          setStoreRepetition(storeRepetition);
          console.log(storeRepetition);
          if (storeRepetition.length == 0) {
              
            setCurrentPage(quesCount+1);
            console.log('logout');
         //   setCurrentPage(quesCount + 1);

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
             console.log(correctAnswer);
          //   console.log(storeRepetition);
            if (storeRepetition[r] === correctAnswer[j]) {
             if (status === true) {
              console.log(storeRepetition[r]);
              console.log(currentPage);
              console.log(quesCount);


   //  let repeat_id = storeRepetition[j]-1; // Array starts with 0

     setMergeArray(ansInfo[storeRepetition[r]-1]);
     setCurrentPage(storeRepetition[r]); // Current ID must start with 1 

               // setCurrentPage(2); // Re-call Reform Questions
                setDisplayState(null); // omit 'wrong answer' message
            //  }

            // if (storeRepetition.length == 0) {

            //   setCurrentPage(quesCount);
            }
            }
          }
        }

      } else {

        setCurrentPage(currentPage + 1);
        console.log(currentPage+"Current Page");
     //   setCurrentPage(1);

  
        if (quesCount == currentPage) {
     
        //  setCurrentPage(quesCount + 1);
           
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

  //  await AsyncStorage.setItem('yourKey', 'yourValue');

    setSelectedAnswer(text);

    setLastSelected(btnId);

    setBackgroundColor('#089000');

  }

  useEffect(() => {

    const fetchData = async () => {

      try {

        console.log(search_id);

        const response = await axios.post('https://lara-project-mocha.vercel.app/mapi/create', { id: search_id });
        // Handle the response and update state or perform any other actions

        setQuesData(response.data.data)
        setQuesCount(response.data.count)

        for (let i = 0; i <= response.data.count - 1; i++) {

          stringWithoutBraces = response.data.data[i].answer.slice(1, -1); // Remove curly braces
        
          arrayValues = stringWithoutBraces.split(','); // Spli

           combinedArr.push(arrayValues);

           imageListArr.push(response.data.data[i].question);
         

           setansInfo(combinedArr);

           
           console.log(currentPage);
          if (i == currentPage) {
             console.log(currentPage);
            stringWithoutBraces = response.data.data[i-1].answer.slice(1, -1); // Remove curly braces
            arrayValues = stringWithoutBraces.split(','); // Split by commas


            setMergeArray(arrayValues);
          
       
         
            
        }
   
      console.log(combinedArr);
      setimageList(imageListArr);
      console.log(imageList);
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

  const reformQues = async (storeRepetition) => {

    console.log(storeRepetition);
  
     let repeat_id = storeRepetition[0]-1; // Array starts with 0

      setMergeArray(ansInfo[repeat_id]);
      setCurrentPage(repeat_id+1); // Current ID must start with 1 
      
      setRepetition_mode(true);

      repetition_mode = true; 
      console.log(repeat_id);
  };


      // stringWithoutBraces = mergeArray[i].slice(1, -1); // Remove curly braces
      // arrayValues = stringWithoutBraces.split(','); // Split by commas
      
      return (
        <View key={1} style={styles.container}>


         

            {currentPage<=quesCount ? (
  <>
  <View key={3} style={styles.textBox}>
  <Text style={[styles.arabicText]}>{imageList[currentPage-1]}</Text>
  </View>
  <View key={2} style={styles.box}>
  {mergeArray.map((_, x) => (


<TouchableHighlight key={x} style={[styles.button,lastSelected == x && { backgroundColor }, lastSelected === x && { color:'black', borderColor: 'white', borderWidth: 2, borderRadius: 5 }]} onPress={() => validateAnswer(x, correctAnswer[i], mergeArray[x], repetition_mode)}  >
<Text style={[styles.buttonText, lastSelected == x && { color:'black',   fontWeight: 'bold' }]}>
    {mergeArray[x].replace(/["']/g, '')}
</Text>
</TouchableHighlight>

))}
</View>

            <TouchableHighlight color={backgroundColor} style={styles.button} onPress={() => handleAnswer(currentPage, correctAnswer[i], selectedAnswer, repetition_mode,search_id)} >
              <Text style={[styles.buttonText]}> Lock </Text>
            </TouchableHighlight>


            <View style={styles.answerPanel}>
            <Text>
              {displayState}
            </Text>
          </View>

         

  </>
) : (
  <View key={3} style={styles.container}>
  {!storeRepetition.length==0 ? (
    <>
    
              <Text style={{ marginBottom: 10 }}>Wrong: {falseCount}</Text>
              <Text style={{ marginBottom: 10 }}>Correct: {trueCount}  </Text>
         
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
)}

     

        </View>

      )

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  box: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#808080',
    padding: 10,
  },
  textBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    backgroundColor: '#808080',
  },
  answerPanel: {
    width: 320, // Set the desired width and height for the square box
    height: 100,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#DCDCDC'
  },
  button: {
    width: '45%', // Adjust as needed based on your layout
    marginVertical: 10,
    padding: 10,
    backgroundColor: 'black',
    alignItems: 'center',
    borderRadius: 5,
    color: 'white'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
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
  //  backgroundColor: 'green', // Change to the desired active color
  },
  arabicText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Amiri Quran',
    fontSize: 50,
    color: 'black'
  },
});

