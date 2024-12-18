import React, { useEffect, useState } from 'react';
import { ScrollView,View, Text, Button } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const VerseScreen = ({ navigation }) => {

  const route = useRoute();

 // const { value } = route.params;
  
  const [verse_no, setVerseNo] = useState([]);

  let chapter = route.params.chapter;

  let verse = route.params.verse;

  useEffect(() => {
    // Fetch data once when the component mounts
    const fetchData = async () => {


      try {

     //   console.log(value);

          const resAnswer = await axios.post('https://lara-project-mocha.vercel.app/mapi/loadVerses', { id: chapter });
      //  const resAnswer = await axios.post('http://localhost:8000/mapi/loadVerses', { id: value });


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
            title={item}
            onPress={() => {
               const mergedObject = { chapter: chapter, verse: item }; // Example other number, replace with your actual number
               navigation.navigate('TaskScreen', mergedObject);
             // navigation.navigate("About");
            }}
          />
        </View>
      ))}
</ScrollView>
    </>
  );
};

export default VerseScreen;