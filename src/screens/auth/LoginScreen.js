import React, { Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Animated,
    StatusBar,
    Keyboard,
    ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import { COLORS } from '../../../assets/constants';

const LoadingIndicator = (user) => {
  const status = user.authicated ? 'Authenticating Please Wait...' : 'Loading...';
  return (
    <View 
      style={{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#4b6584'}}>
      <View><ActivityIndicator size='large' color={COLORS.WHITE}/></View>
      <Text style={{fontSize:18, fontWeight:"700",padding:10 ,color:COLORS.WHITE}}>{status}</Text>
    </View>
  );
};

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Test extends Component {

  constructor(){
    super();
    this.state = { 
      orientation: '',
      isPortrait:null,
      bottomHeight:new Animated.Value(250),
      pointerEvent:'none',
      username: '',
      password: '',
      formValid: false,
      validUsername: false,
      validPassword: false,
      loadingVisible: false,
      fakeLoading: true, // changed
      isAuthenticated: false, 
    }
  }
 
  // getOrientation = () => {
  //   if (this.refs.rootView) {
  //     if (Dimensions.get('window').width < Dimensions.get('window').height) {
  //       this.setState({
  //         orientation: 'portrait',
  //         isPortrait: true,
  //         bottomHeight:new Animated.Value(300)
  //       });
  //     } else {
  //       this.setState({
  //         orientation: 'landscape',
  //         isPortrait: false,
  //         bottomHeight:new Animated.Value(600),
  //       });
  //     }
  //   }
  // }

  componentDidMount(){
    // this.getOrientation();
    // Dimensions.addEventListener( 'change', () => {
    //   this.getOrientation();
    // });
    setTimeout(() => {
      this.setState((prevState) => {
        return {
          fakeLoading: !prevState.fakeLoading
        }
      });
    }, 2000);
  }

  clearData() {
    try {
      AsyncStorage.clear()
    } catch (e) {
      // clear error
    }
  }
 
  UNSAFE_componentWillMount() {
    this.clearData();
    Dimensions.addEventListener('change', ({window: {width,height}}) => {
      if (height > width) {
        this.setState({
          isPortrait : true,
          bottomHeight:new Animated.Value(250)
        });
      } else {
        this.setState({
          isPortrait : false,
          bottomHeight:new Animated.Value(250)
        });
      }
    })
  }

  _decreaseHeightOfBottom() {
    Keyboard.dismiss()
    this.setState({pointerEvent:'none'})
    Animated.timing(
      this.state.bottomHeight, {
        toValue: 250,
        duration: 500,
      }
    ).start()
  }

  _increaseHeightOfBottom = () => {
    this.setState({pointerEvent:'auto'})
    Animated.timing(
      this.state.bottomHeight, {
        toValue: SCREEN_HEIGHT,
        duration: 500,
      }
    ).start(() => {
      this.refs.textInputUsername.focus()
    })
  }

  fakeAuthenticating = (username, password) => {
    if (username.length > 2 && password.length > 2) {
      this.setState((prevState) => {
        return {fakeLoading: !prevState.fakeLoading,isAuthenticated: !prevState.isAuthenticated}
      });
      setTimeout(() => {
        this.props.navigation.navigate('Home')
      }, 1000)

    } else {
      alert(`${username.length < 2 ? username : password }  input is short < 3 , please check again.!`);
    }
  }

  handleButtonPress = () => {
    this.setState({ loadingVisible: true });
    setTimeout(() => {
      const { username, password } = this.state;
      if (username, password) {
        this.setState({ formValid: true, loadingVisible: false });
        AsyncStorage.setItem("@username", this.state.username)
        this.fakeAuthenticating(this.state.username, this.state.password)
      } else {
          alert("Sign In", "Please enter your username & password.!");
      }
    },500)
  }
  
  handlePasswordChange = (password) => {
    const {validPassword } = this.state;

    this.setState({ password });
    if (!validPassword) {
      if (password.length > 4) {
        this.setState({ validPassword: true });
      }
    }
    else if (password <= 4) {
      this.setState({validPassword: false });
    }
  }
  
  handleUsernameChange = (username) => {
    const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validUsername } = this.state;

    this.setState({ username });
    if (!validUsername) {
      if (emailCheckRegex.test(username)) {
        this.setState({ validUsername: true });
      }
    }
    else if (!emailCheckRegex.test(username)) {
      this.setState({ validUsername: false });
    }
  }
 
  render(){
    const marginTop = this.state.bottomHeight.interpolate({
      inputRange: [250, SCREEN_HEIGHT],
      outputRange: [20,100]
    })

    const headTextOpactity = this.state.bottomHeight.interpolate({
      inputRange: [250, SCREEN_HEIGHT],
      outputRange: [0,1]
    })


    return(
      <>
      <StatusBar backgroundColor="#3E536D" barStyle="light-content" />
      {/* <View> */}
       {this.state.fakeLoading ? <LoadingIndicator authicated={this.state.isAuthenticated}/> :
        <ImageBackground
          source={require('../../../assets/images/login-gradient-background.jpg')}
          style={{ flex:1 }}>

        {/* Top Half */}

        <Animated.View  
            style={{
            position: 'absolute',
            width:'100%',
            top:10,
            left: 10,
            zIndex: 100,
            
            borderBottomWidth: 0,
            paddingBottom: 15,
            borderBottomColor:'#033667',
            justifyContent:'flex-start',
            flexDirection:'row',
            alignItems:'flex-start',
            marginVertical:10, //animates
            opacity:headTextOpactity //animates
          }}>
            <TouchableOpacity
              onPress={() => this._decreaseHeightOfBottom()}
              style={{
              alignItems:'center',
              justifyContent:'center',
              width:30,
              height:30,
              borderRadius:60,
              backgroundColor:'#3F9BDC',
              }}>
              <IonIcons name='ios-arrow-back'
                style={{
                color:COLORS.WHITE,
                fontSize:24,
                }}
              />
            </TouchableOpacity>
              <Text 
                style={{
                paddingLeft:10,
                paddingTop:2,
                fontSize:18,
                color:'#4b6584',
                }}> Please provide your server credentials
              </Text>
        </Animated.View>

        <View 
          style = {
            [styles.containerLogo],
            {
              flex:1,
              // backgroundColor: COLORS.HORIZON
            }
        }>
          {/* <Text>Top Half</Text> */}
          <Animated.View 
            style={{
            justifyContent:'center',
            alignItems:'center',
            opacity:1, // animate
            flexDirection:'column' //animate
            }}>
              <Image
                resizeMode="center"
                source={require('../../../assets/images/logo-kru.png')}
                style={{
                width:'80%',
                height:'80%' ,
              }}/>
              <Text 
                style={{
                fontSize:18,
                color:'#4b6584',
                //marginTop:-20
                }}>
                {/* Please provide your server  credentials -top */}
             </Text>
          </Animated.View>
        </View>

        {/* Bottom Half */}
        <Animated.View 
          style={{
            backgroundColor: COLORS.WHITE,
            height:this.state.bottomHeight,
          }}>
        {/* <Text>Bottom Half</Text> */}
  
        <TouchableOpacity
          onPress={() => this._increaseHeightOfBottom()}
          style={{
            width:'100%',
            }}>
          <Animated.View
              pointerEvents={this.state.pointerEvent}
              style={[styles.containerInput, { marginTop:marginTop }]}>
              <TextInput
                    onChangeText={this.handleUsernameChange}
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#778ca3"
                    autoCorrect={false}
                    returnKeyType='next'
                    underlineColorAndroid="transparent"
                    onChange={() => {}}
                    // ref={input => {this.inputs['username'] = input;}}
                    ref="textInputUsername"
                    onSubmitEditing={() => {this.refs.textInputPassword.focus()}}
                    />
              <TextInput
                    onChangeText={this.handlePasswordChange}
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#778ca3"
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    returnKeyType='go'
                    onChange={() => {}}
                    ref="textInputPassword"
                    />
          </Animated.View>
        </TouchableOpacity>
        {/* singIn button */}
        <View style={styles.containerButton}>
          <TouchableOpacity
            onPress={() => this.handleButtonPress()}
            style={styles.button}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        </Animated.View>

        </ImageBackground>
        }
      {/* </View> */}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0
  },

  containerLogo: {
    backgroundColor: COLORS.TRANSPARENT,
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection:'column',
  },
  bottomContainer: {
    backgroundColor: COLORS.TRANSPARENT,
    //backgroundColor: '#113152',
   // width: '100%',
  },
  containerInput: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
    width: '100%',

  },
  containerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: '1%',
  },
  input: {
    color: COLORS.HORIZON,
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: '90%',
    marginBottom: 15,
    fontSize: 18,
    borderRadius: 2,
    padding: 10,
    borderBottomColor: COLORS.HORIZON,
    borderBottomWidth: 0.8
  },
  button: {
    //  backgroundColor: COLORS.BG_DARK_BUTTON, // #35AAFF',
    backgroundColor: '#3F9BDC',
    width: '90%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,

  },
  buttonText: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontWeight: 'bold'
  }
});

// { backgroundColor: ( this.state.orientation == 'portrait' ) ? '#1B5E20' : '#006064'
// }]}>
