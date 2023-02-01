import React, {useState, useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import ForgotPassword from '../screens/ForgotPassword';
import BottomStack from '../navigation/BottomStack';
import SignUp from '../screens/SignUp';
import SignIn from '../screens/Signin';
import auth from '@react-native-firebase/auth';
// import SplashScreen from '../screens/SplashScreen';
// import Home from '../screens/Home';

const Stack = createStackNavigator();

function RootStack() {
  // const [status, setStatus] = useState(null);
  // useEffect(() => {
  //   const getRememberedUser = async () => {
  //     try {
  //       const data = await AsyncStorage.getItem('YOUR-KEY');
  //       let resObject = JSON.parse(data);
  //       let token = resObject.token;
  //       setStatus(token);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getRememberedUser();
  // }, []);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {setInitializing(false);}
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {return null;}

  return (
    <NavigationContainer>
      <Stack.Navigator
       initialRouteName ={"SignIn"}
        screenOptions={{headerMode: 'none'}}>
        {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Tabs" component={BottomStack} />
        <Stack.Screen name="Guest" component={BottomStack} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        {/* <Stack.Screen name="Home" component={Home}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
