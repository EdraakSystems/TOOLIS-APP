import React, {useState} from 'react';

import {
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {icons} from '../components/icon/index';
import {Colors} from '../components/color/index';
import {ScrollView} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';


const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  console.log('====>>>>===email====>>>', email)
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);




  

  const forgotPassword = () => {
    LoginApiftn()
     auth().sendPasswordResetEmail(email)
      .then((res)=> {
        Alert.alert(
          "Forgot Password",
          "Email is sent Please check...",
          [
            
            { text: "OK", onPress: () => {
              navigation.navigate("SignIn")
            } }
          ]
        );         
      }).catch(function (e) {
          console.log(e)
      }) 
      
  }
 
  const LoginApiftn=()=> {
    if (email === '') {
      Alert.alert('Please enter email adress!');
    } else if (email !== '' && email.includes('@') == false) {
      Alert.alert('Email format is incorrect!');
    }
  }


  const guest = () => {
    navigation.navigate('Guest', { screen: 'Home' });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ImageBackground style={styles.background} source={icons.backgroundbg}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{height: 450}}>
          <ImageBackground
            style={styles.background}
            source={icons.backgroundbg}>
            <Image source={icons.homeImg} style={styles.headerImg} />
            <Text style={styles.Textstyle}>Forgot Password</Text>
            {/* <Image
              source={icons.user}
              style={[styles.iconBtn, {position: 'absolute', bottom: '-5%'}]}
            /> */}
          </ImageBackground>
        </View>

  

        <TextInput
          placeholderTextColor="#FFFFFF"
          placeholder="Enter email adress"
          onChangeText={text => setEmail(text)}
          style={styles.input}
          value={email}
        />
     
     {/* <TouchableOpacity
            style={styles.ButtonSignin}
            onPress={() => LoginApiftn()}>
            {isLoading && (
              <ActivityIndicator size="small" color={Colors.title} />
            )}
            {!isLoading && (
              <Text style={styles.ButtonSigninText}>{'Sign-in'}</Text>
            )}
          </TouchableOpacity> */}

        <TouchableOpacity
            style={styles.ButtonSignin}
            onPress={() => forgotPassword()}>
              <Text style={styles.ButtonSigninText}>{'Send email'}</Text>
          </TouchableOpacity>
        
        

      </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
    position: 'relative',
    backgroundColor: 'pink',
  },
  headerImg: {
    height: '80%',
    width: '100%',
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
    marginVertical: 20,
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

export default ForgotPassword;
