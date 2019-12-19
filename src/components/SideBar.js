import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

var username;
function getUsername() {
  AsyncStorage.getItem('@username').then(data => {
    console.log(data);
    if (data) {
      username = data;
    }
  });

  return username;
}
export default SideBar = props => (
  <ScrollView>
    <ImageBackground
      source={require('../../assets/glamorous-copy-1.jpg')}
      style={{width: undefined, padding: 16, paddingTop: 40}}>
      <Image
        source={require('../../assets/profile-pic.jpg')}
        style={styles.profile}
      />
      {getUsername() ? (
        <Text style={styles.name}>{username}</Text>
      ) : (
        <Text>NoUse</Text>
      )}
      <View style={{flexDirection: 'row'}}>
        {/* <Text style={styles.followers}>734 Followers </Text> */}
        {/* <Icon name="users" size={16} color="rgba(255,255,255,0.8)" /> */}
      </View>
    </ImageBackground>
    <View style={styles.container}>
      <DrawerNavigatorItems {...props} />
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  name: {
    color: '#31393C',
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 8,
  },
  followers: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
  },
});
