
import React, { Component } from 'react';
import {Dimensions ,  Animated} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Image, ScrollView ,SafeAreaView ,StyleSheet} from 'react-native';
import { ListItem, List,Text } from 'native-base';

import { COLORS ,WINDOW_WIDTH } from '../../assets/constants';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome'
import * as Animatable from 'react-native-animatable';


let username;
function getUsername() {
  AsyncStorage.getItem('@username').then(data => {
    // console.log(data);
    if (data) {
      username = data;
    }
  });
  return username;
}

export default class DrawerMenu extends Component {
    render() {
      return (
        // <View>
        <SafeAreaView style={{flex:1}}>
          <View style={styles.profile}>
            <Image source={{uri: 'https://ptetutorials.com/images/user-profile.png'}} style={styles.profileImage} />
            <View>
              {
                getUsername() ? (
                  <Text style={styles.name}>{username}</Text>
                ):(
                  <Text style={styles.name}>NoUse</Text>
                )
              }
            </View>
          </View>
          <ScrollView>
             <List style={styles.drawer}>
              <ListItem onPress = {() => this.props.navigation.navigate('Scan')}>
               <MatIcon name="barcode-scan" size={18} color={COLORS.HORIZON} />
               <Text style={styles.item}>ID Scan</Text>
              </ListItem>

              <ListItem onPress = {() => this.props.navigation.navigate('ViewDealers')}>
               <Icon name="users" size={20} color={COLORS.HORIZON} />
               <Text style={styles.item}>Customer List</Text>
              </ListItem>

              <ListItem onPress = {() => this.props.navigation.navigate('DigitalApplication')}>
               <MatIcon name="youtube-tv" size={18} color={COLORS.HORIZON} />
               <Text style={styles.item}>Digital Application</Text>
              </ListItem>

              <ListItem onPress = {() => this.props.navigation.navigate('CreditInquiry')}>
               <Icon name="credit-card" size={18} color={COLORS.HORIZON} />
               <Text style={styles.item}>Credit Inquiry</Text>
              </ListItem>

              <ListItem onPress = {() => this.props.navigation.navigate('PreQualification')}>
               <Icon name="sticky-note" size={18} color={COLORS.HORIZON} />
               <Text style={styles.item}>Pre Qualification</Text>
              </ListItem>

              <ListItem onPress = {() => this.props.navigation.navigate('ComplianceSolutions')}>
               <MatIcon name="safe" size={18} color={COLORS.HORIZON} />
               <Text style={styles.item}>Compliance Solutions</Text>
              </ListItem>

              <ListItem onPress = {() => this.props.navigation.navigate('SyntheticFraud')}>
               <Icon name="snapchat-square" size={18} color={COLORS.HORIZON} />
               <Text style={styles.item}>Synthetic Fraud</Text>
              </ListItem>

              <ListItem onPress = {() => this.props.navigation.navigate('Transactions')}>
               <Icon name="cc-mastercard" size={18} color={COLORS.HORIZON} />
               <Text style={styles.item}>Transactions</Text>
              </ListItem>

              <ListItem onPress = {() => this.props.navigation.navigate('ManageAlerts')}>
               <Icon name="bell" size={18} color={COLORS.HORIZON} />
               <Text style={styles.item}>Manage Alerts</Text>
              </ListItem>

              <ListItem onPress = {() => this.props.navigation.navigate('AccountSettings')}>
               <MatIcon name="settings-outline" size={18} color={COLORS.HORIZON} />
               <Text style={styles.item}>Account Settings</Text>
              </ListItem>

              <ListItem onPress = {() => this.props.navigation.navigate('PushDataDTTR1')}>
               <MatIcon name="file-send" size={18} color={COLORS.HORIZON} />
               <Text style={styles.item}>Push Data DT/TR1</Text>
              </ListItem>

              <ListItem onPress = {() => this.props.navigation.navigate('DMSSync')}>
               <MatIcon name="sync" size={18} color={COLORS.HORIZON} />
               <Text style={styles.item}>DMS Sync</Text>
              </ListItem>

             </List>
            </ScrollView>
        </SafeAreaView>
        // </View>
      );
    }
}


const styles = StyleSheet.create({
  profile: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BLUE_HEAD,
    paddingBottom:2
  },
  profileImage: {
    marginTop:50,
    width: 120,
    height: 120,
    borderRadius: 60,
    marginVertical:10,
    borderColor:COLORS.WHITE_MID,
    borderWidth:3
  },
  drawer: {
    flex:1,
    padding: 0,
    marginLeft: 0,
    marginRight: 10,
  },
  item: {
    paddingLeft: 10,
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.HORIZON,
    fontFamily: 'Montserrat-Regular'
  },
  name: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 5,
    marginBottom: 20
  }
});
