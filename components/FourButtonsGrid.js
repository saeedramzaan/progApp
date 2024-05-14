import React from 'react';
import { View, Button } from 'react-native';

const FourButtonsGrid = () => {
  const buttons = [];
  
  for (let i = 0; i < 4; i++) {
    buttons.push(
      <Button
        key={i}
        title={`Button ${i + 1}`}
        onPress={() => console.log(`Button ${i + 1} pressed`)}
      />
    );
  }

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {buttons.map(button => (
        <View key={button.key} style={{ flexBasis: '50%', padding: 5 }}>
          {button}
        </View>
      ))}
    </View>
  );
};

export default FourButtonsGrid;