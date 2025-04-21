import React from "react";
import Icon from "react-native-vector-icons/FontAwesome6";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Screen/HomeScreen";
import GenderScreen from "./Screen/GenderScreen";
import AgeScreen from "./Screen/Age";
import BirthdayScreen from "./Screen/BirthdayScreen";
import ButtonTab from "./buttonTab";
import Beginner from "./begginer_wo";
import BeginnerS from "./beginner_page/beginner";
import Favorite from "./components/favorite";
import BenchPress from "./beginner_page/bench_press";
import Home from "./home";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GenderScreen"
          component={GenderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AgeScreen"
          component={AgeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BirthdayScreen"
          component={BirthdayScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ButtonTab"
          component={ButtonTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Beginner"
          component={Beginner}
          options={{ headerShown: false }}
        />

        {/* beginner_screen*/}
        <Stack.Screen
          name="Beginners"
          component={BeginnerS}
          options={{ headerShown: false }}
        />

        {/* bench_press_screen*/}
        <Stack.Screen
          name="BenchPress"
          component={BenchPress}
          options={{ headerShown: false }}
        />

        {/* favorite_screen*/}
        <Stack.Screen
          name="Favorite"
          component={Favorite}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
