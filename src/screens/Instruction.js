import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {icons} from '../components/icon/index';
import {Colors} from '../components/color/index';

const Instructions = ({setIsinstruction, isinstruction}) => {
  return (
    <View style={{flex: 1, paddingVertical: '10%'}}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setIsinstruction(!isinstruction)}>
            <Image source={icons.arrowback} style={styles.iconBtn} />
          </TouchableOpacity>
        </View>

        <Text style={styles.novelTitle}>
          {'Write Your Next Bestsellers With Toolis'}
        </Text>

        <Text style={styles.noveldesc}>
          {
            "Writing a novel can be amazing yet it requires a lot of commitment. Being an author is no easy feat and what stops people from writing their masterpieces is the time taken to do so. Come Toolis to the rescue! Our app takes you through the journey of novel writing as you hit your daily goals of writing a maximum of 1000 words per day. For any novel to be considered for publication, it needs to consist of a total of 50,000 to 80,000 words, anything below that is a novella of sorts. So, why don't you give Toolis a go? We would ease the journey to your next masterpiece in just days and you’ll have a fully set up novel ready for publication in no time. With Toolis, you can write your novel while waiting for the train, bus, or your next Tinder date to show up. This app is guaranteed to make writing your masterpiece a lot more fun."
          }
        </Text>

        <Text style={styles.novelTitle}>{'WRITE YOUR NOVEL'}</Text>

        <Text style={styles.noveldesc}>
          {
            'Start writing your novel using an awesome text editor and reach various milestones to get amazing results.'
          }
        </Text>

        <Text style={styles.novelTitle}>
          {'AFTER REACHING 500 WORDS-The witch says'}
        </Text>

        <Text style={styles.noveldesc}>
          {
            'Yay! You are doing amazing!\nYou have just halfway to go, keep up with the energy and write more words.'
          }
        </Text>

        <Text style={styles.novelTitle}>{'AFTER REACHING 800 WORDS'}</Text>
        <Text style={styles.noveldesc}>
          {
            'Congratulations! You are a step away from completing the task, keep up with the energy and get more work done.'
          }
        </Text>

        <Text style={styles.novelTitle}>{'AFTER 1000 WORDS'}</Text>
        <Text style={styles.noveldesc}>
          {
            'Congratulations! You did it.\nYou have 1000 words added to your novel already.\nThe journey has started to your masterpiece already and you have today’s task completed.\nKeep up with the energy and in no time you’ll have a full-fledged masterpiece ready to be published.'
          }
        </Text>

        {/* <Text style={styles.novelTitle}>{'Glossary:'}</Text>
        <Text style={styles.noveldesc}>
          {
            'M stands for Masterpiece\nW stands for Work\nP stands for Publishing\nT stands for Text'
          }
        </Text> */}
        <Text style={styles.novelTitle}>{'Note:'}</Text>
        <Text style={styles.noveldesc}>
          {'Guests can only log in and see the full functionality of the app but are unable to save their work until they have signed in as a user.'}
        </Text>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  background: {
    // height: '100%',
  },
  input: {
    borderColor: Colors.border,
    borderRadius: 15,
    borderWidth: 1,
    width: '80%',
    padding: 15,
    marginTop: 30,
    alignSelf: 'center',
    color: Colors.primary,
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
    fontWeight: 'bold',
    textAlign: 'justify',
    padding: '5%',
    color: 'black',
    fontFamily: 'TimeBurner',
  },
  noveldesc: {
    fontSize: 20,
    textAlign: 'justify',
    paddingHorizontal: '5%',
    color: Colors.TextBorder,
    fontFamily: 'TimeBurner',
  },
});

export default Instructions;
