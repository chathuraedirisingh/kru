import React, {Component} from 'react';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../assets/constants'
import {AppHeader} from '../components/header';


import AsyncStorage from '@react-native-community/async-storage';
import * as BlinkIDReactNative from 'blinkid-react-native';
import firebase from '../../configs/firebase';

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
export default class ScanIDScreen extends Component {
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
      showImageDocument: false,
      authenticated: false,
      resultImageDocument: '',
      showImageFace: false,
      resultImageFace: '',
      showSuccessFrame: false,
      successFrame: '',
      results: null,
      licenseKeyErrorMessage: '',

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
      console.log(blinkIdResult);

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
    AsyncStorage.getItem('@username').then(data => {
      if (data) {
        this.setState({username: data});
        // console.log(this.state);
      }
    });
  }

  handleSearchChange = text => {
    setTimeout(() => {
      console.log(text);
    }, 2000);
  };

  render() {
    const {navigate} = this.props.navigation;
    let displayImageDocument = this.state.resultImageDocument;
    return (
        <View style={{flex: 1}}>
          <AppHeader title={"Scan"} isMenu={false} navigation={this.props.navigation}/>
          <View
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <View style={styles.main}>
            <View style={styles.username}>
                <Text style={{fontSize:28,color:'#65a5e9',fontWeight:'700',paddingVertical:10,textTransform: 'capitalize'}}>Welcome{'\t'}
                    {
                        this.state.username ? this.state.username.toLowerCase(): '<USERNAME>'
                    }
                </Text>
             </View>
            <View style={styles.scanDividion}>
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
            
                  <View style={styles.outerCircle}>
                    <View style={styles.innerCircle}>
                      <AntIcon
                        name="scan1"
                        size={50}
                        color={COLORS.WHITE_GRAY}
                        style={{flex: 1, marginTop: 15, alignSelf: 'center'}}
                      />
                    </View>
                  </View>
              )}
            </View>
           <View style={styles.sectionBottom}>
            {renderIf(this.state.authenticated,
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
                    style={[styles.buttonScanId]}>
                    <Text style={styles.buttonText}>Scan Your ID</Text>
                  </TouchableHighlight>,
              )}
            </View>

            </View>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  sectionBottom: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  main: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 24,
    color: '#959595',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  username: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%'
  },
  scanDividion: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:'30%'
  },

  outerCircle: {
    backgroundColor: COLORS.WHITE_GRAY,
    width: 90,
    height: 90,
    borderRadius: 100 / 2,

    justifyContent:'center',
    alignItems:'center'
  },
  innerCircle: {
    backgroundColor: '#fff',
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
  },

  buttonScanId: {
    backgroundColor:COLORS.DEFAULT_BUTTON,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginHorizontal: 20,
    marginBottom: 30
  },
  buttonAuthenticated: {
    backgroundColor: COLORS.AUTH_GREEN,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginHorizontal: 20,
    marginBottom: 20
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
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
    width: Dimensions.get('screen').width - 50,
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
    marginVertical: 8,
  },
  imageContainer: {
    flexDirection: 'row',
    flex: 5,
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
    margin: 10,
  },
});
