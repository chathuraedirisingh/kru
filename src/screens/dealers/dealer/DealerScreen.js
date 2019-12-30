import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  TextInput,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Animated,
  Platform
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { Avatar, Input } from 'react-native-elements';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import {colors, COLORS} from '../../../../assets/constants';
import firebase from '../../../../configs/firebase';
import AsyncStorage from '@react-native-community/async-storage';
import {AppHeader} from '../../../components/AppHeader';

var username;
function getUsername() {
  AsyncStorage.getItem('@username').then(data => {
    console.log('username ' + data);
    if (data) {
      username = data;
    }
  });
  return username;
}

const isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width; //? 'Portrait' : 'Landscape';
};

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default class ViewDealerScreen extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      hideHead : false,
      phone: '',
      entity: '',
      isPortraint : isPortrait(),
      bottomHeight : isPortrait() ? new Animated.Value(300) : new Animated.Value(180),
      data: [],
      submitting: false,
      error: false,
      sending: false,
      username: getUsername(),
      first_name: ''
    };
  }

  componentWillMount() {
    Dimensions.addEventListener('change', ({window: {width,height}}) => {
      if (height > width) {
        this.setState({isPortraint: true});
        this.setState({bottomHeight: new Animated.Value(300)});
      } else {
        this.setState({isPortraint: false});
        this.setState({bottomHeight: new Animated.Value(180)});
      }
    })
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
      title: 'Profile',
    };
  };

  _handleVerify() {
    console.log('hi');
    let phone = this.state.phone;
    let is_valid = /^\d+$/.test(phone);
    console.log(phone.length);
    // var us = '16179528736';

    // this.formatPhoneNumber(phone.toString());

    if (is_valid) {
      console.log('valid');
      this._sendSMS(phone);
      this.setState({ sending: true });
    } else {
      // alert('Hint: 9477xxxxxxx');
      // UxhaWUN/5tBGegMiFB6IRm8uPBXaHgtX52FmLDo2
    }
  }

  // validate(val) {
  //   var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  //   if (+val.value.match(regex)) {
  //       console.log('valid');
  //   } else {
  //     console.log('invalid');
  //   }
  // }

  formatPhoneNumber(phoneNumberString) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phoneNumberString.value.match(phoneno)) {
      console.log('valid');
      return true;
    } else {
      console.log('invalid');
      return false;
    }
  }

  _sendSMS(phone) {
    // console.log(this.state.sending);
    var username = getUsername()
    // console.log("USER"+ username)
    var _post = {
      to: phone,
      uid: this.state.entity,
      name: this.state.first_name
    };
    let data = {
      method: 'POST',
      body: JSON.stringify(_post),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    fetch('https://8k9iyytyi6.execute-api.us-east-2.amazonaws.com/prod/api/send', data)
      .then(response => response.json())
      .then(responseJson => {
        console.log('response object:', responseJson);
        if (responseJson === null) {
          this.setState({ sending: false });
          // alert(
          //   'Verification link sent successfully, firebase state verify updated',
          // );
          this.update_dealer_verified();
        } else {
          this.setState({ sending: false });
          // alert('Verification link sent failed');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  update_dealer_verified() {
    firebase
      .database()
      .ref('dealer_web/' + this.state.entity)
      .update({ verified: 'true' })
      .then(data => {
        // console.log(data);
        // let newState = {
        //   authenticated: true,
        // };
        // this.setState(newState);
        // alert('dealer verify successfully');
      })
      .catch(error => {
        console.log(error);
        //error callback
        // alert('dealer adding failed');
        // let newState = {
        //   authenticated: false,
        // };
        // this.setState(newState);
      });
  }

  _increaseHeightOfScreen = () => {
    this.setState({hideHead:true})
    Animated.timing(
      this.state.bottomHeight, {
        toValue: SCREEN_HEIGHT,
        duration: 500,
      }
    ).start(() => {
      this.refs.textInputMobile.focus()
    })
  }

  _decreaseHeightOfScreen = () => {
    Keyboard.dismiss()
    Animated.timing(
      this.state.bottomHeight, {
        toValue: this.state.isPortraint ? 300 : 180,
        duration: 500,
      }
    ).start(() =>  this.setState({hideHead: false}));
  }
  // return css properties with window layout :
  _orientationStyle() {
    const portrait = {direction :'column',alignItems:'center',textAlign:'center',paddingLeft:0,flexWrap:'wrap'}
    const landscape = {direction :'row',alignItems:'flex-start',textAlign:'justify',paddingLeft:20,flexWrap:'nowrap' }
    if (this.state.isPortraint) {
        return portrait
    } else {
      return landscape
    }
  }

  render() {
    const marginTop = this.state.bottomHeight.interpolate({
      inputRange: [180,300, SCREEN_HEIGHT],
      outputRange: [20,20, 150]
    })
    const headerBackArrowOpacity = this.state.bottomHeight.interpolate({
      inputRange: [180,300,SCREEN_HEIGHT],
      outputRange: [0,0, 1]
    })
    const showOptionItems = this.state.bottomHeight.interpolate({
      inputRange: [180,300, SCREEN_HEIGHT],
      outputRange: [1,1, 0]
    })

    const { navigation } = this.props;
    const user = navigation.getParam('user', {});
    this.state.entity = user.entity;
    this.state.first_name = user.first_name;
    // console.log(this.state);
     if (this.state.sending) {
       return (
         <ActivityIndicator
           animating={true}
           style={styles.indicator}
           size="large"
         />
       );
     }
    return (
      <View style={{ flex:1 }}>
        {
          this.state.hideHead ? null :
           <AppHeader title={null} 
            isMenu={true} 
            visible={false} 
            navigation={this.props.navigation}
           />
        }
        <Animated.View
          style={{
            position: 'absolute',
            height:60,
            width:60,
            top:80,
            left: 20,
            zIndex: 100,
            opacity:headerBackArrowOpacity
          }}>
          <TouchableOpacity onPress={ () => this._decreaseHeightOfScreen()} 
            style={{
              flex:1 ,
              flexDirection:'row',
              borderColor:COLORS.WHITE_GRAY,
              borderWidth:2,
              borderRadius:60,
              alignItems:'center',
              justifyContent:'center',
              textAlign:'center',
              backgroundColor:'#f4f4f4'
              }}>
              <IconFA5 name='arrow-left' style={{color:COLORS.HORIZON,fontSize:20}}/>
              {/* <Text style={{color:COLORS.HORIZON,fontSize:16 , marginLeft:5}}>Back</Text> */}
          </TouchableOpacity>
          </Animated.View>
        {/* top half */}

        <View style={{ flex:1 }}>
          <View 
            style={{
              flex:1,
              justifyContent:'center',
              alignItems:'center',
              flexDirection:this._orientationStyle().direction, // animate
            }}>
           <Animatable.View
              animation="pulse" iterationCount={1}
              style={{
                justifyContent:'center',
                alignItems:'center',
                marginVertical:10,
              }}>
            <Avatar
              // rounded
              size="xlarge"
              onPress={() => console.log('Works!')}
              source={{ uri: user.face_image }}
            />
            </Animatable.View> 
            {/* end avatar */}
             <View 
              style={{
                opacity: 0.6,
                alignItems: this._orientationStyle().alignItems,
                justifyContent:'center',
                paddingLeft:this._orientationStyle().paddingLeft
              }}>
              <Text 
              style={{
                fontWeight:'bold',
                fontSize:20
              }}>
              {user.first_name} {user.last_name}
              </Text>
              <Text 
                style={{
                  paddingVertical:5,
                  fontSize:16,
                }}>{user.date_of_birth}</Text>
              <Text 
                style={{
                   maxWidth:250,
                   textAlign:this._orientationStyle().textAlign,
                   fontSize:14,
                   paddingVertical:10
                }}>{user.address}</Text>
             </View>
          </View>

        </View>

 {/* .................Bottom Half ........................................*/}
        {/* <View style={{flex:0}}> */}
          <Animatable.View animation="pulse" iterationCount={1}>
          <Animated.View 
            style={{
              height:this.state.bottomHeight, // height:180, animated
              backgroundColor:'#FFF',
              alignItems:'center',
              justifyContent:'center',
              paddingHorizontal:20,
              marginTop:20

            }}>

            <TouchableOpacity 
              onPress={() => this._increaseHeightOfScreen()}>
           <Animated.View 
              style={{
                marginTop:marginTop,
                paddingHorizontal:10,
                flexDirection:'row', // not changed
              }}>
            
              <Animated.View
                pointerEvents="none"
                style={{
                  // flexDirection:'row',
                  // flex:1,
                  borderBottomWidth : 0.8,
                  marginBottom:20 // animate
                }}>
                  <TextInput
                    keyboardType="numeric"
                    ref="textInputMobile"
                    style={{flex:0,fontSize:20,padding:0}}  //width:SCREEN_WIDTH -100
                    placeholder="Enter mobile number (required)"
                    placeholderTextColor="#a5b1c2" 
                    underlineColorAndroid="transparent"
                    />
              </Animated.View>
              <Image
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyDZHdRyXBRUKH-taw12UjTGbdSEHd543gj8NLOXKYIjngPdxX&s' }}
                style={{
                    height:26,
                    width:26,
                    resizeMode:'contain',
                    marginLeft:10,
                    marginTop:3
                  }}
              />
            </Animated.View>
            </TouchableOpacity>
            
            {/* GRID ITEM START */}

            <Animated.View
              style={{
                flex: 1,
                // flexDirection: 'row',
                justifyContent: 'space-between',
                alignSelf:'center', // horizonal eff
                opacity:showOptionItems,
                marginBottom:'10%',
              }}>
              <View
                style={{
                  marginTop: 15,
                  flexDirection: this._orientationStyle().direction,
                  justifyContent: 'space-between',
                  flexWrap:this._orientationStyle().flexWrap,
                }}>
              <TouchableOpacity
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  alignContent: 'center',
                  alignItems: 'center',
                  paddingTop: 6,
                  margin: 5,
                  borderColor: COLORS.SKY_BLUE,
                  borderWidth: 2,
                }}
                onPress={() => {
                  this.props.navigation.navigate('AddConsumer', { user: user });
                }}>
                <Text style={{ fontWeight: 'bold', color: COLORS.SKY_BLUE }}>
                  Profile
                    </Text>
                <Icon
                  name="folder-open"
                  size={40}
                  color={COLORS.SKY_BLUE}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  alignContent: 'center',
                  alignItems: 'center',
                  paddingTop: 6,
                  margin: 5,
                  borderColor:COLORS.SKY_BLUE,
                  borderWidth: 2,
                }}>
                <Text style={{ fontWeight: 'bold', color: COLORS.SKY_BLUE}}>
                  Action 3
                    </Text>
                <Icon name="briefcase" size={40} color={COLORS.SKY_BLUE} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  alignContent: 'center',
                  alignItems: 'center',
                  paddingTop: 6,
                  margin: 5,
                  borderColor: COLORS.SKY_BLUE,
                  borderWidth: 2,
                }}
                onPress={() => {
                  this.props.navigation.navigate('HardPull', {
                    data: user,
                  });
                }}>
                <Text style={{ fontWeight: 'bold', color: COLORS.SKY_BLUE }}>
                Hard Pull
                    </Text>
                <Icon name="users" size={40} color={colors.SKY_BLUE} />
              </TouchableOpacity>

              

              <TouchableOpacity
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  alignContent: 'center',
                  alignItems: 'center',
                  paddingTop: 6,
                  margin: 5,
                  borderColor:COLORS.SKY_BLUE,
                  borderWidth: 2,
                }}>
                <Text style={{ fontWeight: 'bold', color: COLORS.SKY_BLUE}}>
                  Action 4
                    </Text>
                <Icon name="line-chart" size={40} color={COLORS.SKY_BLUE} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  alignContent: 'center',
                  alignItems: 'center',
                  paddingTop: 6,
                  margin: 5,
                  borderColor: COLORS.SKY_BLUE,
                  borderWidth: 2,
                }}
                onPress={() => alert('Action 02')}>
                <Text style={{ fontWeight: 'bold', color: COLORS.SKY_BLUE }}>
                Action 2
                    </Text>
              <Icon name="signal" size={40} color={colors.SKY_BLUE} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  alignContent: 'center',
                  alignItems: 'center',
                  paddingTop: 6,
                  margin: 5,
                  borderColor:COLORS.SKY_BLUE,
                  borderWidth: 2,
                }}>
                <Text style={{ fontWeight: 'bold', color: COLORS.SKY_BLUE}}>
                  Action 5
                    </Text>
                <Icon name="search" size={40} color={COLORS.SKY_BLUE} />
              </TouchableOpacity>
            </View>
            {/* Gride Tabs End */}

            </Animated.View>


          </Animated.View>
{/*             
            <View 
              style={{
              height:20 ,
              backgroundColor:'#FFF',
              alignItems:'center',
              justifyContent:'center',
              borderTopColor:'#e8e8ec',
              borderTopWidth:1,
              paddingVertical:10,
              marginTop:10
              }}> 
              <Text style={{color:'#c0c0c0',fontWeight:'normal'}}>{user.first_name}</Text>
            </View> */}

          </Animatable.View>
        {/* </View> */}
        {/* main View end */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
  // headContainer: {
  //   backgroundColor: colors.BG_MAIN_COVER,
  //   flexDirection: 'row',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   height: 60,
  // },
  // searchIcon: {
  //   marginRight: 10,
  //   alignSelf: 'flex-end',
  // },
  // drawerIcon: {
  //   marginLeft: 10,
  //   alignSelf: 'center',
  // },
});
