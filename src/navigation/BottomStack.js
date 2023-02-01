import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Text} from 'react-native';
import Home from '../screens/Home';
import Account from '../screens/Account';

import Goal from '../screens/Goal';
import Editor from '../screens/Editor';

import {Colors} from '../components/color/index';
const Tab = createBottomTabNavigator();

function MyTabs({navigation}) {
  console.log('navigation', navigation.state)
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route, index}) => ({
        headerShown: false,
        tabBarShowLabel: false,
         tabBarStyle: {backgroundColor: route.name === 'Home' ? 'white' : Colors.title},
         tabBarActiveTintColor: route.name === 'Home' ?  'black' : route.name !== 'Home' ? 'white' : Colors.btnBG,
        // tabBarInactiveTintColor: route.name !== 'Home' ? 'white' : Colors.title,
        tabBarIcon: ({focused, color}) => {
          // console.log('index', index)
          let iconName = require('../assets/icons/fontText.png');
          if (route.name === 'Goal') {
            iconName = require('../assets/icons/tick.png');
            // return (
            //   <Text style={{fontSize: 20, fontWeight: 'bold', color: color}}>
            //     M
            //   </Text>
            // );
          }
          if (route.name === 'Editor') {
            iconName = require('../assets/icons/fontText.png');
            // return (
            //   <Text style={{fontSize: 20, fontWeight: 'bold', color: color}}>
            //     W
            //   </Text>
            // );
          }
          if (route.name === 'Account') {
            iconName = require('../assets/icons/usertab.png');
            // return (
            //   <Text style={{fontSize: 20, fontWeight: 'bold', color: color}}>
            //        P
            //   </Text>
            // );
          }
          if (route.name === 'Home') {
            iconName = require('../assets/icons/home.png');
            // return (
            //   <Image
            //     source={iconName}
            //     style={{width: 20, resizeMode: 'contain', tintColor: color}}
            //   />
            // );
          }

          return (
            <Image
              source={iconName}
              style={{width: 20, resizeMode: 'contain',tintColor: color}}
            />
          );
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      
      <Tab.Screen name="Editor" component={Editor} />
      <Tab.Screen name="Goal" component={Goal} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}
export default MyTabs;
