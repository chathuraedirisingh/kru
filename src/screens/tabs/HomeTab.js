import React, {Component} from 'react';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Button,
  TextInput,
  Image,
  StatusBar,
  TouchableHighlight,
  KeyboardAvoidingView,
} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import * as Icon from "react-native-vector-icons"
import {COLORS} from '../../../assets/constants'
import {AppHeader} from '../../components/AppHeader';

import AsyncStorage from '@react-native-community/async-storage';
import * as BlinkIDReactNative from 'blinkid-react-native';

import firebase from '../../../configs/firebase';

const licenseKey = Platform.select({
  ios:
    'sRwAAAEIY29tLmNvcmWlB9YEexqAQ4yo7SEaIEvpwO8X99s/6zsUOyeYGPKr1qEW2xW7FfowIsvkQCzkxvC3B9uZtWxur8RkeH24LZCr28eLMqQ5Wsd6EFp40CJyA2QwrJI5BzJw4af3np5v9TXsLvNYOfqaFeVVY2SFgZCDaoWar+bPWDGFd/Yn9lUF7PGeFHaC0/TuI2isjjTLUs479yBqCjujJo6jZXPAfBk778xCnh0QmBsefvMAtMk8Ad/1U8sPosrRtOMiYRtyEFBNjj07izbEKQ==',
  android:
    'sRwAAAAIY29tLmNvcmWSfF3q4eDAnywqpYl9/PfX5x8XjMvbJakkdGhRhGFKID3QoVvb34wZy3vXC92swTvLA0kv0s0qhAcrSVkL1kwZAKzZcaN+d5aqmJUpPlEgzdJB/ceM6Uz+wjC5E0Boe9nBR5FGWbmMEWKFbroN3ovXp3DUhLQEhVPrJpsqvOn2I4b/fSGQB0T7CeaZ7XbZ1i54D6NNU8dy1RlioWeesL741zc2nkEgxEwe+7Jz5aKEqknzWNvnKd20dg9bzL8qn15cnS3NkIOA4Q==',
});

var renderIf = function(condition, content) {
  if (condition) {
    return content;
  }
  return null;
};

const isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width; //? 'Portrait' : 'Landscape';
};

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

class HomeTabScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Scan ID',
      headerTintColor: 'royalblue',
      headerStyle: {
        backgroundColor: '#fff',
      },
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isPortraint : isPortrait(),
      showImageDocument: false,
      resultImageDocument: '',
      showImageFace: false,
      resultImageFace: '',
      showSuccessFrame: false,
      successFrame: '',
      results: null,
      licenseKeyErrorMessage: '',
      authenticated: false,
    };
  }

  async scan() {
    try {
      var usdlRecognizer = new BlinkIDReactNative.UsdlCombinedRecognizer();
      usdlRecognizer.returnFaceImage = true;
      usdlRecognizer.returnFullDocumentImage = true;
      const scanningResults = await BlinkIDReactNative.BlinkID.scanWithCamera(
        new BlinkIDReactNative.DocumentVerificationOverlaySettings(),
        new BlinkIDReactNative.RecognizerCollection([usdlRecognizer]),
        licenseKey,
      );

      if (scanningResults) {
        let newState = {
          showImageDocument: false,
          resultImageDocument: '',
          showImageFace: false,
          resultImageFace: '',
          results: '',
          showSuccessFrame: false,
          successFrame: '',
          authenticated: false,
        };

        for (let i = 0; i < scanningResults.length; ++i) {
          let localState = this.handleResult(scanningResults[i]);
          newState.showImageDocument =
            newState.showImageDocument || localState.showImageDocument;
          if (localState.resultImageDocument) {
            newState.resultImageDocument = localState.resultImageDocument;
          }
          newState.showImageFace =
            newState.showImageFace || localState.showImageFace;
          if (localState.resultImageFace) {
            newState.resultImageFace = localState.resultImageFace;
          }
          newState.results += localState.results;
          newState.showSuccessFrame =
            newState.showSuccessFrame || localState.showSuccessFrame;
          if (localState.successFrame) {
            newState.successFrame = localState.successFrame;
          }
        }
        newState.results;
        this.setState(newState);
        this.writeUserData();
      }
    } catch (error) {
      console.log(error);
      this.setState({
        showImageDocument: false,
        resultImageDocument: '',
        showImageFace: false,
        resultImageFace: '',
        results: 'Scanning has been cancelled',
        showSuccessFrame: false,
        successFrame: '',
        authenticated: false,
      });
    }
  }

  handleResult(result) {
    var localState = {
      showImageDocument: false,
      resultImageDocument: '',
      showImageFace: false,
      resultImageFace: '',
      results: '',
      showSuccessFrame: false,
      successFrame: '',
      authenticated: false,
    };

    if (result instanceof BlinkIDReactNative.UsdlCombinedRecognizerResult) {
      let blinkIdResult = result;
      // console.log(blinkIdResult);

      let firedata = {};
      firedata['first_name'] = blinkIdResult.firstName;
      let fullname = blinkIdResult.fullName;
      if (fullname) {
        var result;
        result = fullname.split(',');
        firedata['middle_name'] = result[2];
      }
      firedata['last_name'] = blinkIdResult.lastName;
      firedata['address'] = blinkIdResult.address;
      firedata['document_number'] = blinkIdResult.documentNumber;
      if (blinkIdResult.sex == 1) {
        firedata['sex'] = 'M';
      } else {
        firedata['sex'] = 'F';
      }

      if (blinkIdResult.dateOfBirth) {
        var db = '';
        db +=
          blinkIdResult.dateOfBirth.day +
          '/' +
          blinkIdResult.dateOfBirth.month +
          '/' +
          blinkIdResult.dateOfBirth.year;
        firedata['date_of_birth'] = db;
      }
      if (blinkIdResult.dateOfIssue) {
        var id = '';
        id +=
          blinkIdResult.dateOfIssue.day +
          '/' +
          blinkIdResult.dateOfIssue.month +
          '/' +
          blinkIdResult.dateOfIssue.year;
        firedata['date_of_issue'] = id;
      }
      if (blinkIdResult.dateOfExpiry) {
        var ed = '';
        ed +=
          blinkIdResult.dateOfExpiry.day +
          '/' +
          blinkIdResult.dateOfExpiry.month +
          '/' +
          blinkIdResult.dateOfExpiry.year;
        firedata['date_of_expiry'] = ed;
      }
      // there are other fields to extract
      localState.results = JSON.stringify(firedata);

      // Document image is returned as Base64 encoded JPEG
      if (blinkIdResult.fullDocumentImage) {
        localState.showImageDocument = true;
        localState.resultImageDocument =
          'data:image/jpg;base64,' + blinkIdResult.fullDocumentImage;
      }
      // Face image is returned as Base64 encoded JPEG
      if (blinkIdResult.faceImage) {
        localState.showImageFace = true;
        localState.resultImageFace =
          'data:image/jpg;base64,' + blinkIdResult.faceImage;
      }

      localState.showSuccessFrame = true;
    }
    return localState;
  }

  async writeUserData() {
    if (this.state.showSuccessFrame == true) {
      this.state.showSuccessFrame = false;
      console.log(this.state);
      let user_data = JSON.parse(this.state.results);

      var first_name = user_data.first_name;
      var middle_name = user_data.middle_name;
      var last_name = user_data.last_name;
      var document_number = user_data.document_number;
      var address = user_data.address;
      var sex = user_data.sex;
      var date_of_birth = user_data.date_of_birth;
      var date_of_issue = user_data.date_of_issue;
      var date_of_expiry = user_data.date_of_expiry;
      var face_image = this.state.resultImageFace;
      var document_image = this.state.resultImageDocument;
      var verified = false;

      firebase
        .database()
        .ref('dealer_web/')
        .orderByChild('document_number')
        .equalTo(document_number)
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            console.log('data exist');
            this.state.showSuccessFrame = false;
            // alert('User available');
            this.state.authenticated = false;
          } else {
            this.state.showSuccessFrame = false;
            console.log('Adding user to fire');
            firebase
              .database()
              .ref('dealer_web/')
              .push({
                first_name,
                middle_name,
                last_name,
                document_number,
                address,
                sex,
                date_of_birth,
                date_of_issue,
                date_of_expiry,
                face_image,
                document_image,
                verified,
              })
              .then(data => {
                console.log(data);
                let newState = {
                  authenticated: true,
                };
                this.setState(newState);
                // alert('dealer added successfully');
              })
              .catch(error => {
                console.log(error);
                //error callback
                // alert('dealer adding failed');
                let newState = {
                  authenticated: false,
                };
                this.setState(newState);
              });
          }
        });
    }
  }
  // handleButtonPress = () => {
  //     Alert.alert("Scaning ", "We are processing your request");
  //     this.props.navigation.navigate('Scan');
  // }

  // componentDidMount(){
  //   AsyncStorage.getItem("@username").then((data)=>{
  //     this.state.username=data;
  //     // console.log(this.state)
  //   })
  // }

  componentDidMount() {
    Dimensions.addEventListener('change', ({window: {width,height}}) => {
      if (height > width) {
        this.setState({isPortraint: true});
      } else {
        this.setState({isPortraint: false});
      }
    })

    AsyncStorage.getItem('@username').then(data => {
      if (data) {
        this.setState({username: data});
        // console.log(this.state);
      }
    });
  }
  // componentWillMount() {
  //   Dimensions.addEventListener('change', ({window: {width,height}}) => {
  //     if (height > width) {
  //       this.setState({isPortraint: true});
  //     } else {
  //       this.setState({isPortraint: false});
  //     }
  //   })
  // }


  handleSearchChange = text => {
    setTimeout(() => {
      console.log(text);
    }, 2000);
  };

  _orientationStyle() {
    const portrait = {direction :'column',imgWidth:200,imgHeight:'50%'}
    const landscape = {direction :'row',imgWidth:'60%',imgHeight:'50%' }
    if (this.state.isPortraint) {
        return portrait
    } else {
      return landscape
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    let displayImageDocument = this.state.resultImageDocument;
    return (
        <View style={{flex: 1}}>
         <AppHeader title={"Home"} isMenu={true} navigation={this.props.navigation}/>

        <View 
          style={{ 
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            flexDirection:this._orientationStyle().direction// animate
          }}> 
           <View 
            style={{
              justifyContent:'center',
              alignItems:'center',
              
            }}>
              <View  
                style={{ 
                  backgroundColor:'#FFF',
                   height:100 , 
                   width:300 ,
                   borderRadius:0,
                   justifyContent:'flex-start',
                   alignItems:'center',
                   }}>
                <Text style={{ fontWeight:'normal', fontSize:18,color:'#8ca2c3',marginTop:-10}}>Welcome </Text>
                <Text style={{ fontWeight:'700', fontSize:24 ,color:'#404A59'}}>
                  {
                    this.state.username ? this.state.username: '<USERNAME>'
                  }
                </Text>
              </View>

              {renderIf(
                this.state.showImageDocument,
                <View style={styles.imageContainer}>
                  <Image
                    resizeMode="contain"
                    source={{uri: displayImageDocument, scale: 3}}
                    style={styles.imageResult}
                  />
                </View>,
              )}
             {renderIf(
              !this.state.showImageDocument,
              <Image
                style={{
                  width:this._orientationStyle().imgWidth,
                  height:this._orientationStyle().imgHeight,
                  borderWidth:0.8,
                  borderColor:'#3F9BDC'}}
                resizeMode = 'center'
                source={require('../../../assets/images/scan_logo.png')}/>
             )}
             
          </View>
          {/* top title end */}

        {/* bottom half */}
          <View 
            style={{
                flex:1,
                justifyContent:'flex-start',
                alignItems:'center',
                marginVertical:10
            }}>

              {renderIf(
              !this.state.showImageDocument,
                <View style={{ alignItems:'center',justifyContent:'center'}}>
                  <Text style={{ fontWeight:'normal', fontSize:16}}>Place Your ID Card</Text>
                  <Text style={{ fontWeight:'normal', fontSize:14 , textAlign:'center' ,color:'#8ca2c3',paddingTop:10}}>
                    (instruction) Lift and rest the edge of your {'\n'}finger on the Home button repeatedly
                  </Text>
                </View>,
              )}

              <View 
              style={{
                flex:1 ,
                justifyContent:'flex-end',
                alignItems:'center',
                paddingBottom:'5%'
                }}>
               {/* authenticate button */}
                {renderIf(
                this.state.authenticated,
                  <TouchableHighlight underlayColor="#3286C9"
                    onPress={() => navigate('ViewDealers')}
                    style={[styles.buttonAuthenticated]}
                    onPress={() => navigate('ViewDealers')}>
                    <Text style={styles.buttonText}>Authenticated</Text>
                  </TouchableHighlight>,
                )}

              {renderIf(
                !this.state.authenticated,
                <TouchableHighlight underlayColor="#3286C9"
                  onPress={this.scan.bind(this)}
                  style={[styles.buttonContainer]}>
                  <Text style={styles.buttonText}>Scan Your ID</Text>
                </TouchableHighlight>,
              )}
            </View>


          </View>
          
        </View>
        {/* END main View */}
      </View>
    );
  }
}
// https://cmkt-image-prd.freetls.fastly.net/0.1.0/ps/6852706/910/607/m1/fpnw/wm0/face-recognition-color-blue-22-.jpg?1566330696&s=8f6783ad3bdecbf5ac4045492eb50939
// // https://cmkt-image-prd.freetls.fastly.net/0.1.0/ps/6852706/910/607/m1/fpnw/wm0/face-recognition-color-blue-22-.jpg?1566330696&s=8f6783ad3bdecbf5ac4045492eb50939
// https://i.pinimg.com/originals/89/ed/bb/89edbbb05e94f8e216acd86ecd806f75.png
const styles = StyleSheet.create({
  // container: {
  //   flex: 2,
  // },
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 20,
  },
  welcomeText: {
    fontSize: 26,
    color: '#959595',
    fontWeight: 'normal',
    alignSelf: 'flex-start',
  },
  usernameText: {
    fontSize: 26,
    color: colors.HIGHT_BLUE,
    fontWeight: '600',
    alignSelf: 'flex-start',
  },
  headContainer: {
    backgroundColor: colors.BG_MAIN_COVER,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 60,
  },
  input: {
    height: 40,
    width: '100%',
    textAlign: 'center',
    color: colors.WHITE,
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginTop: 10,
    marginBottom: 10,
    margin: 10,
  },
  // scanDividion: {
  //   flex: 5,
  //   borderColor: '#ccc',
  //   borderWidth: 1,
  //   borderStyle: 'dashed',
  //   width: '100%',
  //   //backgroundColor: colors.MD_GRAY,
  //   backgroundColor:'#f4f4f4',
  //   borderStyle: 'dotted',
  //   borderRadius: 8,
  //   marginBottom: 10,
  //   marginTop: 5,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },

  // outerCircle: {
  //   backgroundColor: colors.MD_GRAY,
  //   width: '90%',
  //   height: '90%',
  //   borderRadius: 100 / 2,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // innerCircle: {
  //   backgroundColor: '#fff',
  //   width: '50%',
  //   height: '50%',
  //   borderRadius: 80 / 2,
  // },

  buttonContainer: {
    backgroundColor: colors.BG_LIGHT_BUTTON,
    width: SCREEN_WIDTH / 2,
    height: 50,
    // marginTop: -50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },

  buttonAuthenticated: {
    flex: 0,
    backgroundColor: colors.AUTH_GREEN,
    paddingVertical: 20,
    width: '100%',
    height: 60,
    borderRadius: 3,
    marginTop: 20,
    // marginTop: 10,
    // borderRadius: 3,
  },
  buttonText: {
    color:COLORS.WHITE,
    fontSize:18,
    fontWeight:'bold',
  },
  searchIcon: {
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  drawerIcon: {
    marginLeft: 10,
    alignSelf: 'center',
  },
  name: {
    width: SCREEN_WIDTH - 50,
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
    marginVertical: 8,
  },
  imageContainer: {
    flexDirection: 'row',
    flex: 5,
    // justifyContent: 'center',
  },
  results: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  imageResult: {
    flex: 1,
    flexShrink: 1,
    height: 200,
    // alignItems: 'center',
    // justifyContent: 'center',
    margin: 10,
  },
});

export default HomeTabScreen;