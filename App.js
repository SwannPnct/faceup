import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import Home from './screens/Home'
import Snap from './screens/Snap'
import Gallery from './screens/Gallery'

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
    <Tabs.Navigator initialRouteName="Gallery">
      <Tabs.Screen name="Gallery" component={Gallery}/>
      <Tabs.Screen name="Snap" component={Snap}/>
    </Tabs.Navigator>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
