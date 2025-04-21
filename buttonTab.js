import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './home';
import ProgressScreen from './progress';
import NoticeScreen from './notice';
import SettingScreen from './setting';
import Ionicons from 'react-native-vector-icons/Ionicons';
import timerScreen from './timer';

const Tab = createBottomTabNavigator();

const ButtonTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Timer') {
            iconName = focused ? 'timer' : 'timer-outline';
          } else if (route.name === 'Progress') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'Notice') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'white', // สีขาวโปร่งใส
          borderRadius: 20, // ทำให้ขอบแท็บมน
          margin: 10, // เพิ่มระยะห่างจากขอบหน้าจอ
          height: 60, // ปรับความสูงแท็บบาร์ตามต้องการ
          position: 'absolute', // ทำให้แท็บบาร์ลอยอยู่เหนือพื้นหลัง
          shadowColor: '#000', // เพิ่มเงา
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5, // สำหรับ Android
        },
        tabBarLabelStyle: {
          paddingBottom: 5, // ปรับตำแหน่งของ label
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Timer" component={timerScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Progress" component={ProgressScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Notice" component={NoticeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={SettingScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default ButtonTab;