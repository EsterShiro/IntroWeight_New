import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screen/HomeScreen';
import GenderScreen from './Screen/GenderScreen';
import AgeScreen from './Screen/Age';
import BirthdayScreen from './Screen/BirthdayScreen';
import ButtonTab from './buttonTab';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="GenderScreen" component={GenderScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AgeScreen" component={AgeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BirthdayScreen" component={BirthdayScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ButtonTab" component={ButtonTab} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;