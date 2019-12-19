import React, {Component} from 'react';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  TouchableHighlight,
  Alert,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TextInput, ScrollView} from 'react-native-gesture-handler';

var renderIf = function(condition, content) {
  if (condition) {
    return content;
  }
  return null;
};

export default class ShowDetailsScreen extends Component {
  render() {
    const {navigation} = this.props;

    let data = navigation.getParam('passedData');
    console.log(data);

    return (
      <View style={{flex: 1}}>
       <StatusBar backgroundColor={colors.BG_STATUS_BAR} barStyle="light-content" />

        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled>
          <SafeAreaView style={{flex: 1}}>
            <View style={styles.searchHead}>
              <TouchableOpacity style={{alignItems: 'flex-start', margin: 20}}>
                <Icon
                  name="bars"
                  size={25}
                  color="#f9f9f9"
                  onPress={this.props.navigation.openDrawer}
                />
                <TextInput
                  placeholder="Search Here"
                  style={styles.search}
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#d5e6ee"
                />
                <Icon
                  style={styles.searchIcon}
                  name="search"
                  size={22}
                  color="#f9f9f9"
                />
              </TouchableOpacity>
            </View>

            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <View style={styles.homeContent}>
                <View>
                  <Text style={styles.greet}>
                    {' '}
                    Good Morning {data.firstName}
                  </Text>
                </View>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.imageResult}
                    resizeMode="contain"
                    source={{
                      uri: 'data:image/png;base64,' + data.fullDocumentImage,
                    }}
                  />
                </View>

                <View>
                  <TouchableOpacity
                    style={[styles.docAuth]}>
                    <View style={styles.socialButtonContent}>
                      <Icon
                        name="check"
                        size={28}
                        color="green"
                        style={styles.icon}
                      />
                      <Text style={styles.loginText}>Document Authenticated</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  idImage: {
    width: Dimensions.get('screen').width - 50,
    height: 180,
    marginTop: 50,
    borderRadius: 0,
    borderWidth: 0,
    shadowColor: '#000',
    // shadowOffset:{
    // width: 0,
    // height: 9,
    // },
    // shadowOpacity: 0.50,
    // shadowRadius: 12.35,
    // elevation: 19,
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -100,
    marginTop: 300,
    width: '100%',
    borderRadius: 5,
  },
  scanButton: {
    backgroundColor: '#3da3f5',
    height: 60,
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 50,
    paddingRight: 50,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {
      width: 1,
      height: 13,
    },
  },
  scanText: {
    color: '#f4f4f4',
    fontSize: 18,
  },
  homeContent: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: Dimensions.get('screen').height - 100 * 8,
  },
  greet: {
    fontSize: 24,
    color: '#aec2cd',
    textAlign: 'center',
    marginTop: -110,
    paddingBottom: 10,
  },

  docAuth: {
    fontSize: 24,
    color: '#aec2cd',
    textAlign: 'center',
    marginTop: 40,
    paddingBottom: 10,
  },
  scanIdSection: {
    width: Dimensions.get('screen').width - 50,
  },
  searchHead: {
    paddingTop: 5,
    backgroundColor: '#2f96f3',
    height: Dimensions.get('screen').height - 800,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 10,
  },
  search: {
    width: Dimensions.get('screen').width - 65,
    marginTop: -30,
    marginLeft: 35,
    borderWidth: 5,
    borderColor: '#2f96f3',
    borderRadius: 0,
    height: 40,
    paddingLeft: 30,
    paddingRight: 80,
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
  searchIcon: {
    marginTop: -33,
    marginLeft: 90,
    alignSelf: 'flex-end',
  },
  name: {
    width: Dimensions.get('screen').width - 50,
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
    marginVertical: 8,
  },
  followers: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
  },
  imageResult: {
    flex: 1,
    flexShrink: 1,
    height: 200,
    // alignItems: 'center',
    // justifyContent: 'center',
    // margin: 10,
    borderRadius: 12,
  },
  imageContainer: {
    flexDirection: 'row',
    width: 360,
    // borderWidth:1

    // justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    width: Dimensions.get('screen').width - 75,
  },
  loginText: {
    marginLeft: 20,
    fontSize:20,
    color: '#aec2cd',
  },
  socialButtonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginLeft:Dimensions.get('screen').width-400
  },

  googleButton: {
    // backgroundColor: '#b8d3ff',
    borderBottomColor: '#7894c2',
    borderBottomWidth: 2,
  },
});
