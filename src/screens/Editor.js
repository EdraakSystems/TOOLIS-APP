import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import {icons} from '../components/icon/index';
import {Colors} from '../components/color/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Picker} from '@react-native-picker/picker';

const Editor = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalText, setModalText] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [istext, setisText] = useState(true);
  const [bgColor, setBgColor] = useState('white');
  const [textColor, setTextColor] = useState('black');
  const [textSize, setTextSize] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [showFont, setShowFont] = useState(false);
  const [textSizebtn, setTextSizebtn] = useState({size1: true, size2: false, size3: false, size4: false, size5: false});
 

  useEffect(() => {
    if (desc.length == 500) {
      setModalText(
        'You just reached 500 words, You are halfway there'
      );
      setModalVisible(!modalVisible);
    } else if (desc.length == 800) {
      setModalText(
        'You have compeleted 800 words...'
        );
      setModalVisible(!modalVisible);
    } else if (desc.length == 1000) {
      setModalText(
        'Congratulations! You did it.You have 1000 words, so Publish now',
      );
      setModalVisible(!modalVisible);
    } else {
      null;
    }
  }, [desc]);


  useEffect(() => {
    // let userUiD = auth().currentUser?.uid;
    // if (userUiD) {
    getRememberedUser();
    // }
  }, []);

  const getRememberedUser = async () => {
    try {
      const data = await AsyncStorage.getItem('YOUR-NOVEL');
      let resObject = JSON.parse(data);
      // let user_id = resObject.id;
      let title = resObject.novelTitle;
      let desc = resObject.noveldesc;
      // if (user_id == auth().currentUser?.uid) {
      //   setUserID(user_id);
      setDesc(desc);
      setTitle(title);
      // }
    } catch (error) {
      console.log('error hai', error);
    }
  };

  const rememberUserNovel = async () => {
    // let userUiD = auth().currentUser?.uid;
    // if (userUiD) {
    if (title == '' || desc == '') {
      Alert.alert('Please write something to saved!');
    } else {
      try {
        let user = {};
        // user.id = auth().currentUser?.uid;
        user.novelTitle = title;
        user.noveldesc = desc;
        await AsyncStorage.setItem('YOUR-NOVEL', JSON.stringify(user)).then(
          res => {
            let userUiD = auth().currentUser?.uid;
            if (userUiD) {
              Alert.alert('Data saved!');
            } else {
              Alert.alert('Data saved!\nSignin Before publish novel Thanks');
            }
          },
        );
      } catch (error) {
        console.log('something went wrong', error);
      }
    }
    // } else {
    //   Alert.alert('Signin to save data!');
    // }
  };

  const removePublishNovel = async () => {
    try {
      await AsyncStorage.removeItem('YOUR-NOVEL');
    } catch (error) {
      console.log('error', error);
    }
  };

  function PublishApi() {
    let userUID = auth().currentUser?.uid;
    if (userUID) {
      if (title === '' || desc === '') {
        Alert.alert('Fields are Empty!');
      } else {
        setIsLoading(true);
        database()
          .ref(`/users/${userUID}`)
          .push({
            title: title,
            desc: desc,
            user_id: userUID,
            createdAt: new Date()
          })
          .then(() => {
            setIsLoading(false);
            Alert.alert('Novel published!');
            removePublishNovel();
            setDesc('');
            setTitle('');
            navigation.navigate('Account');
          })
          .catch(error => {
            setIsLoading(false);
            Alert.alert(error);
          });
      }
    } else {
      Alert.alert('SignIn before publishing novel!');
      navigation.navigate('SignIn');
    }
  }

  const ModalView = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <SafeAreaView style={styles.modalView}>
          <Image source={icons.girl} style={styles.girlsImage} />
          <View style={styles.modalDiv}>
            <Text style={styles.headingModal}>Good Job!</Text>
            <Text style={styles.headingDesc}>{modalText}</Text>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Image source={icons.arrowforward} style={styles.iconBtn} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    );
  };

  const boxText = (bg, txtColor, text, border) => {
    return (
      <TouchableOpacity
        style={{width: '30%'}}
        onPress={() => {
          text === '' ? setShowFont(!showFont) :
          setBgColor(bg);
          setTextColor(txtColor);
        }}>
        <View
          style={{
            backgroundColor: bg,
            borderRadius: 5,
            margin: 5,
            borderColor: border,
            borderWidth: 1,
          }}>
          <Text
            style={{
              color: txtColor,
              padding: 5,
              fontWeight: 'bold',
              fontSize: 20,
              textAlign: 'center',
            }}>
            {text == '' && !showFont ? 'More' : text == '' && showFont ? 'Less': 'Aa'}
          </Text>
        </View>
        <Text style={{textAlign: 'center', color: 'grey', fontSize: 20}}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  };

  function lineSize(value, ftn) {
    return (
      <TouchableOpacity style={{width: '20%', height: 4, backgroundColor: Colors.primary, }} onPress={ftn} >
        {value && <View style={{backgroundColor: 'white', height: 20, width: 20, alignSelf: 'center', borderRadius: 10, position: 'absolute', bottom:-8, borderColor: 'rgb(255,255,255,0.7)', borderWidth: 1}}  />}
        </TouchableOpacity>
    );
  }
  const ModalView2 = () => {
    console.log('textSize', textSize);
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onBackdropPress={() => setModalVisible2(!modalVisible2)}
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
        }}>
        <TouchableOpacity
          style={styles.modalView2}
          activeOpacity={1}
          onPressOut={() => setModalVisible2(!modalVisible2)}>
          <TouchableWithoutFeedback>
            <View style={styles.modalDiv2}>
              <View
                style={{
                  flexDirection: 'row',
                  // alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: '10%',
                  paddingTop: 20,
                  flexWrap: 'wrap',
                }}>
                {boxText('white', 'black', 'White', Colors.title)}
                {boxText('grey', 'white', 'Grey', 'grey')}
                {boxText('black', 'white', 'Night', 'black')}
                {boxText(Colors.primary, 'white', 'Classic', 'black')}
                {boxText('white', Colors.title, 'Old', Colors.title)}
                {showFont && boxText(Colors.secondary, 'grey', 'Primary', Colors.secondary)}
                {showFont && boxText(Colors.secondary, 'white', 'Basic', Colors.secondary)}
                {showFont && boxText('white', 'grey', 'Light', Colors.title)}
                {boxText('black', 'white', '', 'black')}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: '15%',
                  height: 200,
                }}>
                 <Text style={{fontSize: 20, paddingRight: 10, color: Colors.primary}}>
               A</Text>
                {lineSize(textSizebtn.size1,()=> {setTextSizebtn({size1: true, size2: false, size3: false, size4: false, size5: false}), setTextSize(20)} )}
                {lineSize(textSizebtn.size2,()=> {setTextSizebtn({size1: false, size2: true, size3: false, size4: false, size5: false}), setTextSize(23)} )}
                {lineSize(textSizebtn.size3,()=> {setTextSizebtn({size1: false, size2: false, size3: true, size4: false, size5: false}), setTextSize(26)} )}
                {lineSize(textSizebtn.size4,()=> {setTextSizebtn({size1: false, size2: false, size3: false, size4: true, size5: false}), setTextSize(29)} )}
                {lineSize(textSizebtn.size5,()=> {setTextSizebtn({size1: false, size2: false, size3: false, size4: false, size5: true}), setTextSize(32)} )}    

                {/* <Picker
                  selectedValue={`${textSize}`}
                  style={{borderColor: 'grey', height: 40, width: 40, borderWidth: 1, textAlign: 'center'}}
                  onValueChange={(itemValue, itemIndex) =>
                    setTextSize(itemValue)
                  }>
                  <Picker.Item label="20" value={'20'} />
                  <Picker.Item label="22" value={'22'} />
                  <Picker.Item label="24" value={'24'} />
                  <Picker.Item label="26" value={'26'} />
                  <Picker.Item label="28" value={'28'} />
                  <Picker.Item label="30" value={'30'} />
                  <Picker.Item label="32" value={'32'} />
                  <Picker.Item label="34" value={'34'} />
                </Picker> */}
                {/* <TextInput
                  placeholder="size"
                  onChangeText={text => setTextSize(text)}
                  style={{borderColor: 'grey', height: 40, width: 40, borderWidth: 1, textAlign: 'center'}}
                  value={`${textSize}`}
                  keyboardType="numeric"
                  maxLength={2}
                /> */}
                <Text style={{fontSize: textSize ? parseInt(textSize) : 20, paddingLeft: 10, color: Colors.primary}}>
                  A
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    );
  };
  return (
    <View style={{flex: 1, paddingVertical: '10%', backgroundColor: bgColor}}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={icons.arrowback} style={styles.iconBtn} />
          </TouchableOpacity>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setModalVisible2(!modalVisible2)}>
              <Image source={icons.circle} style={styles.iconBtn} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setisText(!istext)}>
              <Text
                style={{
                  fontSize: 35,
                  fontWeight: 'bold',
                  color: bgColor === 'black'  ? 'white' : 'black',
                  padding: 15,
                }}>
                T
              </Text>
              {/* <Image source={icons.font} style={[styles.iconBtn, {width: 50}]} /> */}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => rememberUserNovel()}>
              <Image
                source={icons.bookmark}
                style={[
                  styles.iconBtn,
                  {
                    width: 20,
                    tintColor: bgColor === 'black'  ? 'white' : 'black',
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>
        {istext ? (
          <>
            <TextInput
              placeholder="Title of novel"
              onChangeText={text => setTitle(text)}
              style={[
                styles.input,
                {
                  color: textColor,
                  fontSize: textSize ? parseInt(textSize) : 20,
                },
              ]}
              value={title}
            />
            <TextInput
              placeholder="Write your novel"
              onChangeText={text => setDesc(text)}
              style={[
                styles.input,
                {
                  height: 300,
                  padding: 15,
                  color: textColor,
                  fontSize: textSize ? parseInt(textSize) : 20,
                },
              ]}
              multiline={true}
              // numberOfLines={20}
              value={desc}
              maxLength={1000}
            />
          </>
        ) : (
          <>
            {title == '' && desc == '' && (
              <Text style={styles.novelTitle}>{'Nothing has written yet'}</Text>
            )}
            <Text
              style={[
                styles.novelTitle,
                {
                  color: textColor,
                  fontSize: textSize ? parseInt(textSize) : 20,
                },
              ]}>
              {title}
            </Text>

            <Text
              style={[
                styles.noveldesc,
                {
                  color: textColor,
                  fontSize: textSize ? parseInt(textSize) : 20,
                },
              ]}>
              {desc}
            </Text>

            <TouchableOpacity
              style={[styles.ButtonSignin, {width: 200}]}
              onPress={() => setisText(!istext)}>
              <Text style={styles.ButtonSigninText}>
                {'Back to novel writing'}
              </Text>
            </TouchableOpacity>
          </>
        )}
        {istext && desc.length >= 1000 && (
          <TouchableOpacity
            style={styles.ButtonSignin}
            onPress={() => PublishApi()}>
            {isLoading && (
              <ActivityIndicator size="small" color={Colors.white} />
            )}
            {!isLoading && (
              <Text style={styles.ButtonSigninText}>{'Publish'}</Text>
            )}
          </TouchableOpacity>
        )}
        {modalVisible && ModalView()}
      </ScrollView>
      {modalVisible2 && ModalView2()}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    // height: '100%',
  },
  input: {
    // borderColor: Colors.border,
    // borderRadius: 15,
    // borderWidth: 1,
    width: '80%',
    padding: 15,
    marginTop: 30,
    alignSelf: 'center',
    // color: textColor,
    fontSize: 20,
    fontFamily: 'TimeBurner',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
    padding: '5%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeaderText: {
    fontSize: 40,
    fontFamily: 'TimeBurner',
  },
  Container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: '5%',
    alignItems: 'center',
    // backgroundColor: 'pink',
    // justifyContent: 'space-between'
  },
  Box: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    margin: 10,
    borderRadius: 20,
    width: '40%',
    height: 150,
  },
  heading: {
    color: Colors.title,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'TimeBurner',
  },
  title: {
    color: Colors.title,
    textAlign: 'center',
    fontFamily: 'TimeBurner',
    fontSize: 15,
  },
  iconBtn: {
    height: 30,
    width: 30,
    marginRight: 20,
  },

  Box2: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    width: '40%',
    height: 150,
  },
  heading2: {
    color: Colors.title,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'TimeBurner',
  },
  title2: {
    color: Colors.title,
    textAlign: 'center',
    fontFamily: 'TimeBurner',
    fontSize: 15,
  },
  modalView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalDiv: {
    width: '80%',
    height: 300,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 150,
    padding: 10,
  },
  headingModal: {color: Colors.title, fontSize: 30},
  headingDesc: {
    color: Colors.TextBorder,
    fontSize: 25,
    padding: 25,
    textAlign: 'center',
  },
  ButtonSignin: {
    backgroundColor: Colors.title,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '30%',
    borderRadius: 20,
    margin: 10,
  },
  ButtonSigninText: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: 'TimeBurner',
    textAlign: 'center',
  },
  girlsImage: {height: 150, width: 150, top: 40, zIndex: 100},
  novelTitle: {
    fontSize: 20,
    fontFamily: 'TimeBurner',
    textAlign: 'center',
    padding: '5%',
    color: Colors.primary,
  },
  noveldesc: {
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: '5%',
    color: Colors.TextBorder,
    fontFamily: 'TimeBurner',
  },
  modalView2: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalDiv2: {
    width: '90%',
    height: 400,
    backgroundColor: Colors.white,
    // alignItems: 'center',
    borderRadius: 25,
    padding: 10,
  },
});

export default Editor;
