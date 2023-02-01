import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';
import {icons} from '../components/icon/index';
import {Colors} from '../components/color/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import {sendEmail} from '../components/SendEmail';
import {openComposer} from 'react-native-email-link';

const Account = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [novelsData, setNovelsData] = useState([]);
  const [novelsModal, setNovelsmodal] = useState(null);
  const [userID, setUserID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const Button = (value, ftn) => {
    return (
      <TouchableOpacity style={styles.ButtonSignin} onPress={ftn}>
        <Text style={styles.ButtonSigninText}>{value}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    getRememberedUser();
  }, []);

  const getRememberedUser = async () => {
    let id = auth().currentUser?.uid;
    if (id) {
      Novelsftn(id);
    }
  };

  const Novelsftn = async id => {
    let userUID = auth().currentUser?.uid;
    setIsLoading(true);
    const list = [];
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

  const Share = async (titleValue, bodyValue) => {
    openComposer({
      to: 'user-send-email@gmail.com',
      subject: titleValue,
      body: bodyValue,
    }).then(() => {
      Alert.alert('Email Shared!');
    });
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
            <Text style={styles.headingModal}>{novelsModal.title}</Text>
            <ScrollView>
              <Text style={styles.headingDesc}>{novelsModal.desc}</Text>
            </ScrollView>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              {Button('Cancel', () => setModalVisible(!modalVisible))}
              {Button('Share', () =>
                Share(novelsModal.title, novelsModal.desc),
              )}
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    );
  };

  const BoxView = (index, item) => {
    return (
      <TouchableOpacity
        key={index}
        style={index % 2 == 0 ? styles.Box : styles.Box2}
        onPress={() => {
          setModalVisible(!modalVisible);
          setNovelsmodal(item);
        }}>
        <Text style={styles.heading}>{item.title}</Text>
        <Text style={styles.title}>
          {' '}
          {item.desc.length} words have been written
        </Text>
      </TouchableOpacity>
    );
  };

  const Logoutftn = () => {
    let userUID = auth().currentUser?.uid;
    if (userUID) {
      auth()
        .signOut()
        .then(() => {
          Alert.alert('User signed out!');
        });
    } else {
      navigation.navigate('SignIn');
    }
  };

  return (
    <View style={{flex: 1, paddingVertical: '10%'}}>
      <View style={styles.header}>
        <Text style={styles.HeaderText}>Your work</Text>
        <TouchableOpacity onPress={() => Logoutftn()}>
          <Image source={icons.user} style={styles.iconBtn} />
        </TouchableOpacity>
      </View>
      {isLoading && <ActivityIndicator size="small" color={Colors.title} />}

      {!isLoading && novelsData.length == 0 && (
        <Text
          style={{
            textAlign: 'center',
            fontSize: 30,
            padding: 20,
            color: Colors.title,
          }}>
          Novel is not publish yet{' '}
        </Text>
      )}

      <ScrollView>
        <View style={styles.Container}>
          {novelsData.map((item, index) => {
            return BoxView(index, item);
          })}
            
        </View>
      </ScrollView>
      {modalVisible && ModalView()}
    </View>
  );
};
const styles = StyleSheet.create({
  background: {
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: '10%',
    paddingVertical: '5%',
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

export default Account;
