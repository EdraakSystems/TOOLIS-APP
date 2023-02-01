import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {icons} from '../components/icon/index';
import {Colors} from '../components/color/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';

const Goal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [novelsData, setNovelsData] = useState([]);
  const [novelsModal, setNovelsmodal] = useState(null);
  const [userID, setUserID] = useState(null);
  const [percent, setPercentage] = useState(0);
  const [usertext, setuserText] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const isFocused = useIsFocused();

  console.log('isFocused', )
  useEffect(() => {
    getRememberedUser();
  }, [isFocused]);

  const getRememberedUser = async () => {
    try {
      const data = await AsyncStorage.getItem('YOUR-NOVEL');
      let resObject = JSON.parse(data);
       let user_id = resObject.id;
      let title = resObject.novelTitle;
      let desc = resObject.noveldesc;
      let percentage = (desc.length / 1000) * 100;
      console.log('descdesc',desc, desc.length, percentage)
      // if (user_id == auth().currentUser?.uid) {
      //   setUserID(user_id);
      setuserText(resObject)
      setPercentage(percentage)
      // }
    } catch (error) {
      console.log('error hai', error);
    }
    let id = auth().currentUser?.uid;
    if (id) {
      Novelsftn(id);
    }
  };

  const Button = (value, ftn) => {
    return (
      <TouchableOpacity style={styles.ButtonSignin} onPress={ftn}>
        <Text style={styles.ButtonSigninText}>{value}</Text>
      </TouchableOpacity>
    );
  };

  const Novelsftn = async id => {
    let userUID = auth().currentUser?.uid;
    setIsLoading(true);
    await database()
      .ref(`/users/${userUID}`)
      .on('value', ev => {
        if (ev.exists()) {
          let obj = {};
          let snaps = [];

          for (const key in ev.val()) {
            if (ev.val().hasOwnProperty(key)) {
              obj = Object.assign({}, ev.val()[key], {id: key});
              snaps.push(obj);
            }
          }
          console.log('Total books from users', snaps);
          setNovelsData(snaps);
          setIsLoading(false);
        }
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.error(error);
      });
  };

  const BoxView = (index, item) => {
    return (
      index < 2 && (
        <TouchableOpacity
          key={index}
          style={index % 2 == 0 ? styles.Box : styles.Box2}
          onPress={() => {
            setModalVisible(!modalVisible);
            setNovelsmodal(item);
          }}>
          <Text style={styles.heading}>{item?.novelTitle}</Text>
          <Text style={styles.title}>
            {' '}
            {item ? item?.noveldesc.length : '0'} words have been written
          </Text>
        </TouchableOpacity>
      )
    );
  };

  const BoxView1 = (index, item) => {
    return (
      index < 2 && (
        <TouchableOpacity
          key={index}
          style={index % 2 == 0 ? styles.Box : styles.Box2}>
               <Image source={icons.novel} 
        style={{height:"20%", width:"20%", tintColor:'white'}}
       />
          <Text style={styles.heading}>{'Publish'}</Text>
          <Text style={styles.title}>
            {' '}
            {item?.length} novels has been published
          </Text>
        </TouchableOpacity>
      )
    );
  };

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
          <View style={styles.modalDiv}>
            <Text style={styles.headingModal}>{novelsModal?.novelTitle}</Text>
            <ScrollView>
              <Text style={styles.headingDesc}>{novelsModal?.noveldesc}</Text>
            </ScrollView>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              {Button('Cancel', () => setModalVisible(!modalVisible))}
              {/* {Button('Share', () =>
                Linking.openURL(
                  'mailto:support@example.com?subject=SendMail&body=Description',
                ),
              )} */}
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <View style={{flex: 1, paddingVertical: '10%'}}>
      <Text style={styles.HeaderText}>Goals</Text>
      <ScrollView>
        <View style={styles.Container}>
          {/* {novelsData.map((item, index) => {
            return BoxView(index, item);
          })} */}
          {BoxView1(0, novelsData)}
          {BoxView(1, usertext)}
        </View>
        {/* {!isLoading && novelsData.length == 0 && (
          <Text
            style={{
              textAlign: 'center',
              fontSize: 30,
              padding: 20,
              color: Colors.title,
            }}>
            No recent activity{' '}
          </Text>
        )} */}
        {isLoading && <ActivityIndicator size="small" color={Colors.title} />}
        <Text style={styles.week}>{'Novel\'s Status '}</Text>
        <Text style={styles.subtitle}>  <Text style={[styles.subtitle,{fontWeight: 'bold'}]}>{percent ? (percent.toFixed(1)) : '0'}</Text>% of daily goal</Text>
        {novelsData.map((item, index) => {

          console.log('data of Novale', item);
          return (
            <View key={index}>
              <View style={styles.DateRow}>
                <View
                  style={[
                    styles.Square,
                    {
                      backgroundColor:
                        index != 0 ? Colors.TextBorder : Colors.title,
                      justifyContent:"center"
                    },
                  ]}
                >
                  <Text style={{textAlign:"center"}}>{index+1}</Text>
                </View>
                <Text style={styles.title}>
              
                  {moment(item.createdAt).format('llll')}
                </Text>
                <Text style={styles.subtitle}> words: {item.desc.length}</Text>
              </View>
              {index == 0 && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: '10%',
                  }}>
                  <View
                    style={{
                      height: 200,
                      width: 2,
                      backgroundColor: Colors.TextBorder,
                      marginLeft: '5%',
                    }}
                  />
                  <View style={{paddingLeft: '10%', width: '100%'}}>
                    <Text
                      style={[
                        styles.title,
                        {
                          // paddingLeft: '10%',
                          fontSize: 20,
                          fontWeight: 'bold',
                          // backgroundColor: 'pink'
                        },
                      ]}>
                      {' '}
                      {'TITLE PAGE'}
                    </Text>
                    <Text style={[styles.title]}> {item.title}</Text>
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
      {modalVisible && ModalView()}
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: '7%',
    backgroundColor: 'pink',
  },
  HeaderText: {
    fontSize: 40,
    fontFamily: 'TimeBurner',
    color: 'black',
    paddingHorizontal: '10%',
    paddingVertical: '5%',
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
    width: '45%',
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
    width: '60%',
  },
  iconBtn: {
    height: 40,
    width: 40,
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
  week: {
    color: Colors.title,
    // textAlign: 'center',
    fontSize: 20,
    paddingHorizontal: '10%',
    fontFamily: 'TimeBurner',
  },
  subtitle: {
    color: Colors.forgettitle,
    // textAlign: 'center',
    fontFamily: 'TimeBurner',
    fontSize: 15,
    paddingHorizontal: '10%',
  },
  DateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '10%',
    paddingVertical: 10,
  },
  Square: {
    width: 40,
    height: 40,
    backgroundColor: Colors.title,
    borderRadius: 5,
  },
  modalView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalDiv: {
    width: '90%',
    height: 400,
    backgroundColor: Colors.white,
    alignItems: 'center',
    borderRadius: 25,
    padding: 10,
  },
  headingModal: {color: Colors.modalText, fontSize: 30},
  headingDesc: {
    color: Colors.TextBorder,
    fontSize: 15,
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
});

export default Goal;
