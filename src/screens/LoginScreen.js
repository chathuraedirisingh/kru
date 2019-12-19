import React, { Component } from 'react';
import {
    View,
    Text,
    Alert,
    StyleSheet,
    Image,
    Dimensions,
    StatusBar,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import colors from '../styles/colors'

const LoadingIndicator = (user) => {

  const status = user.authicated ? 'Authenticating Please Wait...' : 'Loading...';
  return (
    <View style={{flex:1,flexDirection:'row' ,justifyContent:'center',alignItems:'center',backgroundColor:colors.MD_GRAY}}>
      <View><ActivityIndicator size='large' color={colors.SKY_BLUE}/></View>
      <Text style={{fontSize:16, fontWeight:"700",padding:10 ,color:colors.SKY_BLUE}}>{status}</Text>
    </View>
  );
};


export default class LoginScreen extends Component {
  inputs = {}
  constructor(props) {
      super(props);
      this.state = {
          username: '',
          password: '',
          formValid: false,
          validUsername: false,
          validPassword: false,
          loadingVisible: false,
          fakeLoading: true,
          isAuthenticated : false
      };
  }
  componentDidMount() {
    this.clearData();
    setTimeout(() => {
      this.setState((prevState) => {
        return {fakeLoading: !prevState.fakeLoading}
      });
    }, 3000);
  };

  clearData() {
      try {
          AsyncStorage.clear()
      } catch (e) {
          // clear error
      }
  }

  fakeAuthenticating = (username, password) => {
    if (username.length > 2 && password.length > 2) {
      this.setState((prevState) => {
        return {fakeLoading: !prevState.fakeLoading,isAuthenticated: !prevState.isAuthenticated}
      });
      setTimeout(() => {
        this.props.navigation.navigate('Home')
      }, 3000)

    } else {
      Alert.alert(`${username.length < 2 ? username : password }  input is short < 3 , please check again.!`);
    }
  }

  handleButtonPress = () => {
    this.setState({ loadingVisible: true });
    setTimeout(() => {
      const { username, password } = this.state;
      if (username, password) {
        this.setState({ formValid: true, loadingVisible: false });
        AsyncStorage.setItem("@username", this.state.username)
        // this.props.navigation.navigate('Home')
        this.fakeAuthenticating(this.state.username, this.state.password)
      } else {
          Alert.alert("Sign In", "Please enter your username & password.!");
      }
    },200)
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

  focusNextField = (id) => {
    this.inputs[id].focus();
  }

  render() {
    return (
      <>
       <StatusBar backgroundColor={colors.BG_STATUS_BAR} barStyle="light-content" />
       {
         this.state.fakeLoading ? <LoadingIndicator authicated={this.state.isAuthenticated}/>:
      
          <KeyboardAvoidingView style={styles.container}  behavior={Platform.OS === "ios" ? "padding" : null}>
                <View style={styles.logoContainer}>
                    <Image
                    style={styles.logo} 
                    resizeMode = 'center'
                    source={require('../../assets/image-trans.png')}/>
                </View>
                <View style={styles.formContainer}>
                  <TextInput
                  onChangeText={this.handleUsernameChange}
                    placeholder='Username'
                    placeholderTextColor='rgba(255,255,255,0.5)'
                    returnKeyType='next'
                    autoFocus={true}
                    style={styles.input}
                    autoCapitalize='none'
                    autoCorrect={false}
                    ref={input => {this.inputs['username'] = input;}}
                    onSubmitEditing={() => {this.focusNextField('password');}}
                    />
                <TextInput
                    onChangeText={this.handlePasswordChange}
                    placeholder='Password'
                    placeholderTextColor='rgba(255,255,255,0.5)'
                    secureTextEntry
                    returnKeyType='go'
                    style={styles.input}
                    ref={input => {this.inputs['password'] = input;}}/>

                    <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => this.handleButtonPress()}>
                        <Text style={styles.buttonText}>SIGN IN</Text>
                    </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
         }
      </>
    );
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BG_SECONDARY_COVER,
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        padding:20,
    },
    logo: {
        width: '100%',
        height: 100,
    },
    formContainer: {
        padding: 20
        // marginTop: -20,
        // width: Dimensions.get('window').width -50
    },
    input: {
        height: 55,
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginBottom: 10,
        borderRadius: 3,
        paddingHorizontal: 20,
        color: '#FFF'
    },
    buttonContainer: {
        backgroundColor: colors.BG_DARK_BUTTON,
        paddingVertical: 20,
        marginTop:10,
        borderRadius:3,
        height: 60,
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '700'
    }
});