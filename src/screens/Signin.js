import React, {useState} from 'react';

import {
  SafeAreaView,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';


const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);



  // const forgotPassword = () => {
  //   let email = "imtiaz99150@gmail.com";
  // auth().sendPasswordResetEmail(email)
  //     .then(function () {
  //         alert('Please check your email...')
  //     }).catch(function (e) {
  //         console.log(e)
  //     })
  // }


  function LoginApiftn() {
    if (email === '' || password === '') {
      Alert.alert('Fields are Empty!');
    } else if (email !== '' && email.includes('@') == false) {
      Alert.alert('Email format is incorrect!');
    } else  if (password.length < 6) {
      alert("Please enter password atleast 6 character");
    }
    else {
      setIsLoading(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          if(res){
          setIsLoading(false);
          navigation.navigate('Tabs');
          console.log('User account created & signed in!');
          }

        })
        .catch(error => {
          setIsLoading(false);
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            Alert.alert('That email address is invalid!');
          }

          if (error.code === 'auth/wrong-password') {
            Alert.alert('That password is invalid!');
          }
          console.log(error);
        });
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
            <Text style={styles.Textstyle}>Welcome Back</Text>
            {/* <Image
              source={icons.user}
              style={[styles.iconBtn, {position: 'absolute', bottom: '-5%'}]}
            /> */}
          </ImageBackground>
        </View>

        <TextInput
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          style={styles.input}
          value={email}
          placeholderTextColor={'white'}
        />

        <TextInput
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry={true}
          value={password}
          placeholderTextColor={'white'}
        />
        <TouchableOpacity style={styles.forGotPaaswordView}
           onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.forGotPaasword}>Forgot Password</Text>
        </TouchableOpacity>
      <Text
          onPress={() => guest()}
          style={[styles.Textforget, {textAlign: 'center', width: '100%'}]}>
          Currently a guest, sign in for more features
        </Text>
        <TouchableOpacity
            style={styles.ButtonSignin}
            onPress={() => LoginApiftn()}>
            {isLoading && (
              <ActivityIndicator size="small" color={Colors.title} />
            )}
            {!isLoading && (
              <Text style={styles.ButtonSigninText}>{'Sign-in'}</Text>
            )}
          </TouchableOpacity>


        <View style={styles.donthaveanAccountStyle}>
          <View>
          <Text
            style={styles.DontHaveAccountStyle}>
            Dont have an Account?
          </Text>
          </View>
          <TouchableOpacity>
          <Text
            onPress={() => navigation.navigate('SignUp')}
            style={styles.SignUpStyle}>
            SignUp
          </Text>
          </TouchableOpacity>
        </View>
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

export default SignIn;
