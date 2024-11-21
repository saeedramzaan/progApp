import React, { useEffect, useState } from 'react';
import { ScrollView,View, Text, Button } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const VerbTaskList = ({ navigation }) => {

  const route = useRoute();

 // const { value } = route.params;

    let primaryQuiz = route.params.firstDigit;

  let verse = route.params.verse;

   // let search_id = chapter + ":" + verse;

    let search_id = 1;


  const sub_title = ["Present","Past", "Noun","Opposite"];


  console.log(search_id);
  
  const [verse_no, setVerseNo] = useState([]);

  useEffect(() => {
    // Fetch data once when the component mounts
    const fetchData = async () => {


      try {

     //   console.log(value);

          const resAnswer = await axios.post('https://lara-project-mocha.vercel.app/mapi/loadVerb', { id: primaryQuiz });
    //    const resAnswer = await axios.post('http://localhost:8000/mapi/loadVerb', { id: value });


        console.log(resAnswer.data);

        setVerseNo(resAnswer.data);


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
      {verse_no.map((item, index) => (

        <View key={index}>
          <Button
            title={item+" "+sub_title[index]}
            onPress={() => {
               const mergedObject = { chapter: primaryQuiz, verse: item }; // Example other number, replace with your actual number
               navigation.navigate('QuizHub', mergedObject);
             // navigation.navigate("About");
            }}
          />
        </View>
      ))}
</ScrollView>
    </>
  );
};

export default VerbTaskList;