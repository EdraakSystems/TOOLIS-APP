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
  StatusBar,
} from 'react-native';
import {icons} from '../components/icon/index';
import {Colors} from '../components/color/index';
import auth from '@react-native-firebase/auth';

import {ScrollView} from 'react-native-gesture-handler';
const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const  createUser =()=> {
    if (email === '' || password === '') {
      alert('Fields are Empty!');
    } else if (!email.includes('@')) {
      alert('Email format is incorrect!');
  }  else  if (password.length < 6) {
      alert("Please enter password atleast 6 character");
  }

    else {
      setIsLoading(true);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          if(res){
            setIsLoading(false);
            navigation.navigate('Tabs');
          }
        })
        .catch(error => {
          setIsLoading(false);
          if (error.code === 'auth/email-already-in-use') {
            alert('That email address is already in use!');
          }else if (error.code === 'auth/invalid-email') {
            alert('That email address is invalid!');
          }
          // alert(error);
        });

        setEmail('')
        setPassword('')
    }

  }

  return (
    <View style={{flex: 1,backgroundColor:Colors.signupbtn}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{height: 450}}>
          <ImageBackground style={styles.background} source={icons.backgroundbg}>
            <Image source={icons.homeImg} style={styles.headerImg} />
            <Text style={styles.Textstyle}>Welcome Back</Text>
            {/* <Image source={icons.user} style={[styles.iconBtn, { position: 'absolute',bottom: '-5%'}]} /> */}
          </ImageBackground>
        </View>

        <TextInput
          placeholder="Email"
          placeholderTextColor={Colors.white}
          onChangeText={text => setEmail(text)}
          style={styles.input}
          value={email}
          color={Colors.white}

        />

        <TextInput
          placeholder="Password"
          placeholderTextColor={Colors.white}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry={true}
          value={password}
          color={Colors.white}
        />
        <TouchableOpacity
         onPress={() => createUser()}>
          <Image source={icons.arrowforward} style={styles.iconBtn} />
        </TouchableOpacity>

        <View>
          {/* <Text
            onPress={() => navigation.navigate('SignIn')}
            style={styles.Textforget}>
            Already have Account? Signin
          </Text> */}
          <TouchableOpacity
            onPress={() => createUser()}
            style={styles.ButtonSignin}>
            {isLoading && (
              <ActivityIndicator size="small" color={Colors.title} />
            )}
            {!isLoading && (
              <Text style={styles.ButtonSigninText}>{'Sign-up'}</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.donthaveanAccountStyle}>
          <View>
          <Text
            style={styles.DontHaveAccountStyle}>
            Already have Account?
          </Text>
          </View>
          <TouchableOpacity>
          <Text
            onPress={() => navigation.navigate('SignIn')}
            style={styles.SignUpStyle}>
            {"SignIn"}
          </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
    position: 'relative',
    // backgroundColor: 'pink',
  },
  headerImg: {
    height: '80%',
    width: '100%',
  },
  input: {
    borderColor: Colors.white,
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
    // alignSelf: 'center',
  },
  ButtonSignin: {
    backgroundColor: Colors.signupbtn,
    padding: 10,
    alignSelf: 'center',
    width: '30%',
    borderRadius: 20,
    borderColor:Colors.white,
    borderWidth:1,
    marginVertical: 10,
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
    color: Colors.forgettitle,
    fontFamily: 'TimeBurner',
    width: '63%',
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

export default SignUp;
