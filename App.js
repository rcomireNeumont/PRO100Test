import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RandomGuess from './src/components/random';

function HomeScreen({navigation}) {
  return(
    <View style={styles.container}>
      <Button title='go to game' onPress={() => navigation.navigate('Game')} />
    </View>
  );
}

function GameScreen({navigation}) {
  return(
    <RandomGuess/>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  let highscore = AsyncStorage.getItem('highscore');
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Game' component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
