// Aboutscreen.js
import React, { useState, useEffect, Component } from "react";
import { Button, View, Text,TouchableOpacity,StyleSheet } from "react-native";
import axios from 'axios';

// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';



export default function AboutScreen() {

//  const [currentPage, setCurrentPage] = useState(1);

  const [quesData, setQuesData] = useState([]);

  const [quesCount, setQuesCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const arrayQuiz = ['1','2','3','4'];

  var val = null; 

  useEffect(() => {

   // updateArray();

   }, [])

   const handleAnswer = () => {
    // Logic to handle the user's answer and move to the next page
    setCurrentPage(currentPage + 1);
  };


   const validateAnswer = (data) => {
    console.log('validateanswer - ', data)

    // const array = ['In the name of', 'merciful', 'gracious', 'day']; // your array
    // let foundItem = null;

    // for (let i = 0; i < array.length; i++) {
    //   if (array[i] === data) {
    //     foundItem = array[i];
    //     alert(foundItem);
    //     break; // optional: exit the loop once the item is found
    //   }
    // }
  }

   useEffect(() => {
  
    const fetchData = async () => {
      // try {
        const response = await axios.get('http://localhost:8000/create');
        // Handle the response and update state or perform any other actions
        console.log(response.data);
        setQuesData(response.data.data)
        setQuesCount(val)
      // } catch (error) {
      //   // Handle errors
      //   console.error('Error fetching data:', error);
      // }
    };

    fetchData(); // Call the async function inside useEffect

    // If you need to do something with the 'val' variable in useEffect, you can do it here
    console.log(val);

    console.log('test');

  }, [val]); // 

  for (let i = 0; i <= 3; i++) {

    if(1===i){
     // console.log(i)
  return (

    

    // <View style={styles.container}>
    // {quesData.map((item, index) => (
    //   <View style={styles.buttonContainer}>
    //   <TouchableOpacity key={index}  style={styles.button} onPress={(event) => validateAnswer(val = item)}  >
    //     <Text>
    //       {index}
    //     </Text>
    //   </TouchableOpacity>
    //   </View>
    //   ))}
    //  </View>

    
//     quesData.map((item, index) => (
      
// <View key={index} >
// {item.q_id===1 && (
//     <View style={styles.container}>
//       {quesData.map((item, index) => (
//         <div style={styles.button} key={index}>
//     {/* Your other content goes here */}
    
//     {item.q_id===1 && (
//       // Content to render if the condition is true
//       <TouchableOpacity key={index}  onPress={(event) => validateAnswer(val = item)}>
//         <Text>  {item.question} </Text>
//       </TouchableOpacity>
//     )}

//     {/* More content goes here */}
//   </div>
     
      
//       ))}
//       </View>
//  )}
//       </View>

//        ))
    
  //   <View style={styles.container}>
  //   <View style={styles.box}>
  //     <TouchableOpacity style={styles.button}>
  //       <Text>Button 1</Text>
  //     </TouchableOpacity>
  //     <TouchableOpacity style={styles.button}>
  //       <Text>Button 2</Text>
  //     </TouchableOpacity>
  //     <TouchableOpacity style={styles.button}>
  //       <Text>Button 3</Text>
  //     </TouchableOpacity>
  //     <TouchableOpacity style={styles.button}>
  //       <Text>Button 4</Text>
  //     </TouchableOpacity>
  //   </View>
  // </View>

<View style={styles.container}>


{quesData.map((item, index) => (
  <View key={index} style={styles.box}>
    {/* Your other content goes here */}
    
    
   
      {/* <View key={index} style={styles.box}> */}
      <TouchableOpacity key={index} style={styles.button} onPress={(event) => validateAnswer(val = item)}>
        <Text>  {i} </Text>
      </TouchableOpacity>
      {/* </View> */}
 

    {/* More content goes here */}
  </View>
))}



<View style={styles.answerPanel}>
         <TouchableOpacity style={styles.btnAnswer} onPress={handleAnswer}>
           <Text style={styles.buttonText}>Lock</Text>
         </TouchableOpacity>
         </View>
       </View>
 
    // <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    //   {{quesData}}
    //   <Text>About Screen</Text>
    // </View>
  );
    }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  button: {
    width: '25%', // Adjust the width percentage based on your preference
    height: '15%',
    margin: 3,
    padding: 25,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});