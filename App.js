import React from 'react';
import {SafeAreaView, LogBox} from 'react-native';
import Home from './src/screens/Home';
import Account from './src/screens/Account';
import SignUp from './src/screens/SignUp';
import Goal from './src/screens/Goal';
import Editor from './src/screens/Editor';
import RootStack from './src/navigation/RootStack';

const App = () => {
  LogBox.ignoreAllLogs();
  return <RootStack />;
};

export default App;
