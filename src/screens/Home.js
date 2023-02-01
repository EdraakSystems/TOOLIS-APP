import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {icons} from '../components/icon/index';
import {Colors} from '../components/color/index';
import Instructions from './Instruction';

const Home = ({navigation}) => {
  const [isinstruction, setIsinstruction] = useState(false);

  const Button = (value, icon, ftn) => {
    return (
      <TouchableOpacity style={styles.Button} onPress={ftn}>
        <Image source={icon} style={styles.iconBtn} />
        <Text style={styles.ButtonText}>{value}</Text>
      </TouchableOpacity>
    );
  };

  return !isinstruction ? (
    <SafeAreaView>
      <ImageBackground style={styles.background} source={icons.backgroundbg}>
        <Image source={icons.homeImg} style={styles.headerImg} />
        {Button('Instructions', icons.circle, () =>
          setIsinstruction(!isinstruction),
        )}
        {Button('New Work', icons.add, () => navigation.navigate('Editor'))}
        {Button('Open Recent', icons.clock, () => navigation.navigate('Goal'))}
      </ImageBackground>
    </SafeAreaView>
  ) : (
    <Instructions
      isinstruction={isinstruction}
      setIsinstruction={setIsinstruction}
    />
  );
};

const styles = StyleSheet.create({
  background: {
    height: '100%',
  },
  headerImg: {
    height: '50%',
    width: '100%',
  },
  Button: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    alignSelf: 'center',
    width: '80%',
    borderRadius: 20,
    marginVertical: 10,
  },
  ButtonSignin: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '30%',
    borderRadius: 20,
    marginVertical: 10,
  },
  ButtonSigninText: {
    fontSize: 14,
    fontFamily: 'TimeBurner',
  },
  ButtonText: {
    fontSize: 20,
    fontFamily: 'TimeBurner',
    color: 'black',
    // fontWeight: 'bold'
  },
  iconBtn: {
    height: 40,
    width: 40,
    marginRight: 20,
  },
  Textstyle: {
    color: Colors.white,
    textAlign: 'center',
    fontFamily: 'TimeBurner',
  },
});

export default Home;
