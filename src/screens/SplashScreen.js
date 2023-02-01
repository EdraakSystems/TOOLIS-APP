import React, {useState,useEffect} from 'react';

import {
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  View,
} from 'react-native';
import {icons} from '../components/icon/index';
import {Colors} from '../components/color/index';
import auth from '@react-native-firebase/auth';


const SplashScreen = ({navigation}) => {

    useEffect(() => {
    
        getUserData();
    });

    const getUserData = ()=>{
        auth().onAuthStateChanged((user)=>{
            navigateToScreen(user)
        })
    }
    const navigateToScreen =(user)=>{
        setTimeout(()=>{
            user ? navigation.navigate("Tabs") : navigation.navigate("SignIn");
        },3000)
    }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ImageBackground style={styles.background} source={icons.backgroundbg}>
            <Image source={icons.homeImg} style={styles.headerImg} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex:1,
    backgroundColor: 'pink',
    justifyContent:"center",
    alignItems:"center"
  },
  headerImg: {
    height: '100%',
    width: '100%',
    resizeMode:"contain"
  },
  input: {
    borderColor: Colors.white,
    color: Colors.white,
    borderRadius: 15,
    borderWidth: 1,
    width: '80%',
    padding: 15,
    marginTop: 30,
    alignSelf: 'center',
  },
  RowButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: '5%',
    // borderWidth:1,
    // borderColor:'white'
    // alignSelf: 'center',
  },
 
  
  ButtonSignin: {
    backgroundColor: Colors.signupbtn,
    padding: 10,
    alignSelf: 'center',
    width: '30%',
    borderRadius: 20,
    marginVertical: 10,
    borderColor: 'white',
    borderWidth: 1,
  },
  ButtonSigninText: {
    fontSize: 14,
    fontFamily: 'TimeBurner',
    color: Colors.white,
    textAlign: 'center',
  },
  iconBtn: {
    height: 40,
    width: 40,
    margin: 5,
    alignSelf: 'center',
  },
  Textstyle: {
    fontSize: 40,
    color: Colors.white,
    textAlign: 'center',
    fontFamily: 'TimeBurner',
  },
  
  Textforget: {
    fontSize: 14,
    padding: 20,
    color: Colors.white,
    fontFamily: 'TimeBurner',
    width: '100%',
  },  forGotPaasword: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: 'TimeBurner',
    textAlign:"right",
    paddingRight:"10%"
  },
  forGotPaaswordView:{
    width:"100%",
    paddingTop:'2.5%'
  },
  DontHaveAccountStyle: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: 'TimeBurner',
  },
  donthaveanAccountStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: '2%', 

   },
  SignUpStyle: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: 'TimeBurner',
    textAlign:"center",
    paddingLeft:'1%',
    fontWeight:'700',
    fontWeight:"bold"
  },
});

export default SplashScreen;
