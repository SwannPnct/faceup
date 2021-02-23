import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import Home from './screens/Home'
import Snap from './screens/Snap'
import Gallery from './screens/Gallery'

import { FontAwesome } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="GallerySnap" component={TabComp}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function TabComp() {
  return (
    <Tabs.Navigator initialRouteName="Gallery" tabBarOptions={
      {activeTintColor:"#009788", inactiveTintColor:"#FFFFFF", style:{backgroundColor: "#111224"}}
    }>
      <Tabs.Screen name="Gallery" component={Gallery} options={{
        tabBarIcon: ({color,size}) => (
          <FontAwesome name="camera" size={size} color={color} />
          )
      }}/>
      <Tabs.Screen name="Snap" component={Snap} options={{
        tabBarIcon: ({color,size}) => (
          <FontAwesome name="photo" size={size} color={color} />
          )
      }}/>
    </Tabs.Navigator>
  )
}


