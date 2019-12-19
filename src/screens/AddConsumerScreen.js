import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
  Picker,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { Input } from 'react-native-elements';
import colors from '../styles/colors'

import firebase from '../../configs/firebase';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

var renderIf = function (condition, content) {
  if (condition) {
    return content;
  }
  return null;
};

export default class AddConsumerScreen extends Component {

  state = {
    submitted: false,
    user: [],
    entity: ''
  }

  componentDidMount() {
    const { navigation } = this.props;
    const data = navigation.getParam('user');

    //   this.setState({
    //     user: data
    // });
    console.log("You " + data.entity)
    this.setState({ entity: data.entity });

    firebase
      .database()
      .ref('dealer_web/' + data.entity)
      .once('value')
      .then(data => {
        console.log(data.val());
        let newState = {
          user: data.val()
        };
        this.setState(newState);
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

  static navigationOptions = {
    header: null,
  };

  defaultScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      flex: 1,
      justifyContent: 'center',
    },
  };

  onNextStep = () => {
    console.log(this.state.user);
  };

  onPaymentStepComplete = () => {
    // alert('Payment step completed!');
    console.log(this.state.user);
  };

  onPrevStep = () => {
    console.log('called previous step');
  };

  toggleSubmition = (status) => {
    this.setState((prevState) => {
      return { submitted: status }
    });
  }

  handleChange = input => e => {
    console.log(input, e)
    this.state.user[input] = e;
    this.forceUpdate()
  };

  onSubmitSteps = () => {
    console.log('called on submit step.');
    this.submit_data();
    this.toggleSubmition(true)
    setTimeout(() => {
      this.toggleSubmition(false)
      this.props.navigation.navigate('ViewDealer')
    }, 3000)
  };

  submit_data(){
    firebase
      .database()
      .ref('dealer_web/' + this.state.entity)
      .update(this.state.user)
      .then(data => {
        console.log(data);
        // console.log(this.state.user)
        // let newState = {
        //   user: data.val()
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

  render() {
    // const {navigation} = this.props;
    // const user = navigation.getParam('user', {});
    // console.log(user)

    // console.log("State " + JSON.stringify(this.state))


    const progressStepsStyle = {
      activeStepIconBorderColor: '#B0E0E6',
      activeLabelColor: 'green',
      activeStepNumColor: 'white',
      activeStepIconColor: '#B0E0E6',
      completedStepIconColor: '#4682B4',
      completedProgressBarColor: '#4682B4',
      completedCheckColor: 'green',
    };

    const buttonTextStyle = {
      color: '#686868',
      fontWeight: 'bold',
    };

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.BG_STATUS_BAR} barStyle="light-content" />
        <View style={{ flex: 1 }}>
          <SafeAreaView>
            <View
              style={{
                alignItems: 'flex-start',
                margin: 10,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
              <Icon
                name="bars"
                size={25}
                color={colors.HIGHT_BLUE}
                onPress={this.props.navigation.openDrawer}
              />
              <TouchableHighlight>
                <View style={{
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  justifyContent: 'flex-start'
                }}>
                  <MatIcon
                    name="keyboard-return"
                    size={24}
                    color={colors.HIGHT_BLUE}
                    onPress={() => this.props.navigation.navigate('ViewDealer')} />
                  {/* <Text style={{color:'#ddd',fontSize:12}}>Return</Text> */}
                </View>
              </TouchableHighlight>

            </View>
          </SafeAreaView>

          <DismissKeyboard>
            <KeyboardAvoidingView
              style={{
                // flex: 1,
                // flexDirection: 'column',
                justifyContent: 'center',
              }}
              behavior='height'
            // keyboardVerticalOffset={150}
            >
              <ScrollView>
                <View style={{ flex: 12, marginTop: -30 }}>
                  <ProgressSteps {...progressStepsStyle}>
                    <ProgressStep
                      label=""
                      onNext={this.onPaymentStepComplete}
                      onPrevious={this.onPrevStep}
                      scrollViewProps={this.defaultScrollViewProps}>
                      <View style={{ flex: 1, flexDirection: 'column', margin: 10 }}>
                        <Text
                          style={{
                            color: 'steelblue',
                            justifyContent: 'center',
                            marginTop: -10,
                            marginBottom: 15,
                            fontWeight: 'bold',
                          }}>
                          Please review the application for accuracy
                  </Text>
                        <View style={{ flexDirection: 'column' }}>
                          <Text
                            style={{
                              alignContent: 'center',
                              textAlign: 'center',
                              justifyContent: 'center',
                              marginTop: 5,
                              color: 'gray',
                              fontWeight: 'bold',
                            }}>
                            Personal Information
                    </Text>
                        </View>
                        <Input
                          containerStyle={{ marginTop: 10 }}
                          inputStyle={{ marginTop: -10 }}
                          label="First Name"
                          placeholder="Enter first name"
                          rightIcon={<Icon name="check" size={24} color="green" />}
                          rightIconContainerStyle={{
                            marginTop: -10,
                          }}
                          defaultValue={this.state.user.first_name}
                          onChangeText={this.handleChange('first_name')}
                        />
                        <Input
                          containerStyle={{ marginTop: 10 }}
                          inputStyle={{ marginTop: -10 }}
                          label="Middle Name"
                          placeholder="Enter middle name"
                          rightIcon={<Icon name="check" size={24} color="green" />}
                          rightIconContainerStyle={{
                            marginTop: -10,
                          }}
                          defaultValue={this.state.user.middle_name}
                          onChangeText={this.handleChange('middle_name')}
                        />
                        <Input
                          containerStyle={{ marginTop: 10 }}
                          inputStyle={{ marginTop: -10 }}
                          label="Last Name"
                          placeholder="Enter last name"
                          rightIcon={<Icon name="check" size={24} color="green" />}
                          rightIconContainerStyle={{
                            marginTop: -10,
                          }}
                          defaultValue={this.state.user.last_name}
                          onChangeText={this.handleChange('last_name')}
                        />
                        <Input
                          containerStyle={{ marginTop: 10 }}
                          inputStyle={{ marginTop: -10 }}
                          label="Birth Day"
                          placeholder="Birthday"
                          rightIcon={<Icon name="check" size={24} color="green" />}
                          leftIcon={<Icon name="calendar" size={24} color="green" />}
                          leftIconContainerStyle={{
                            marginLeft: 5,
                            paddingRight: 5,
                            marginTop: -10,
                          }}
                          rightIconContainerStyle={{
                            marginTop: -10,
                          }}
                          defaultValue={this.state.user.date_of_birth}
                          onChangeText={this.handleChange('date_of_birth')}

                        />
                        <Input
                          containerStyle={{ marginTop: 10 }}
                          inputStyle={{ marginTop: -10 }}
                          label="Social Security Number"
                          placeholder="XXX-XX-XXXX"
                          rightIcon={<Icon name="check" size={24} color="green" />}
                          rightIconContainerStyle={{
                            marginTop: -10,
                          }}
                          defaultValue={this.state.user.ssn}
                          onChangeText={this.handleChange('ssn')}
                        />
                      </View>
                    </ProgressStep>
                    <ProgressStep
                      label=""
                      onNext={this.onNextStep}
                      onPrevious={this.onPrevStep}
                      scrollViewProps={this.defaultScrollViewProps}>
                      <View style={{ flex: 1, flexDirection: 'column', margin: 10 }}>
                        <Text
                          style={{
                            color: 'steelblue',
                            justifyContent: 'center',
                            marginTop: -10,
                            marginBottom: 15,
                            fontWeight: 'bold',
                          }}>
                          Please review the application for accuracy
                  </Text>
                        <View style={{ flexDirection: 'column' }}>
                          <Text
                            style={{
                              alignContent: 'center',
                              textAlign: 'center',
                              justifyContent: 'center',
                              marginTop: 5,
                              color: 'gray',
                              fontWeight: 'bold',
                            }}>
                            Contact Information
                    </Text>
                        </View>
                        <Input
                          containerStyle={{ marginTop: 10 }}
                          inputStyle={{ marginTop: -10 }}
                          label="Email"
                          placeholder="Enter email"
                          rightIcon={<Icon name="check" size={24} color="green" />}
                          rightIconContainerStyle={{
                            marginTop: -10,
                          }}
                          defaultValue={this.state.user.email}
                          onChangeText={this.handleChange('email')}
                        />
                        <Input
                          containerStyle={{ marginTop: 10 }}
                          inputStyle={{ marginTop: -10 }}
                          label="Phone Number"
                          placeholder="Enter phone number"
                          rightIcon={<Icon name="check" size={24} color="green" />}
                          rightIconContainerStyle={{
                            marginTop: -10,
                          }}
                          defaultValue={this.state.user.phone}
                          onChangeText={this.handleChange('phone')}
                        />
                        <Input
                          containerStyle={{ marginTop: 10 }}
                          inputStyle={{ marginTop: -10 }}
                          label="Address"
                          placeholder="Enter address"
                          rightIcon={<Icon name="check" size={24} color="green" />}
                          rightIconContainerStyle={{
                            marginTop: -10,
                          }}
                          defaultValue={this.state.user.address}
                          onChangeText={this.handleChange('address')}
                        />
                        <Input
                          containerStyle={{ marginTop: 10 }}
                          inputStyle={{ marginTop: -10 }}
                          label="City"
                          placeholder="Select city"
                          rightIcon={<Icon name="check" size={24} color="green" />}
                          rightIconContainerStyle={{
                            marginTop: -10,
                          }}
                          defaultValue={this.state.user.city}
                          onChangeText={this.handleChange('city')}
                        />

                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignContent: 'center',
                          }}>
                          <Input
                            containerStyle={{ marginTop: 10, width: '50%' }}
                            inputStyle={{ marginTop: -10 }}
                            label="State"
                            placeholder="State"
                            rightIcon={<Icon name="check" size={24} color="green" />}
                            rightIconContainerStyle={{
                              marginTop: -10,
                            }}
                            defaultValue={this.state.user.state}
                            onChangeText={this.handleChange('state')}
                          />
                          <Input
                            containerStyle={{ marginTop: 10, width: '50%' }}
                            inputStyle={{ marginTop: -10 }}
                            label="Zip"
                            placeholder="Zip"
                            rightIcon={<Icon name="check" size={24} color="green" />}
                            rightIconContainerStyle={{
                              marginTop: -10,
                            }}
                            defaultValue={this.state.user.zip}
                            onChangeText={this.handleChange('zip')}
                          />
                        </View>
                      </View>
                    </ProgressStep>
                    <ProgressStep
                      label=""
                      onNext={this.onNextStep}
                      onPrevious={this.onPrevStep}
                      onSubmit={this.onSubmitSteps}
                      scrollViewProps={this.defaultScrollViewProps}>
                      <View style={{ flex: 1, flexDirection: 'column', margin: 10 }}>
                        <Text
                          style={{
                            color: 'steelblue',
                            justifyContent: 'center',
                            marginTop: -10,
                            marginBottom: 15,
                            fontWeight: 'bold',
                          }}>
                          Please review the application for accuracy
                  </Text>
                        <View style={{ flexDirection: 'column' }}>
                          <Text
                            style={{
                              alignContent: 'center',
                              textAlign: 'center',
                              justifyContent: 'center',
                              marginTop: 5,
                              color: 'gray',
                              fontWeight: 'bold',
                            }}>
                            Employement Information
                    </Text>
                        </View>
                        <ScrollView>
                          <View>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignContent: 'center',
                              }}>
                              {/* <Input
                          containerStyle={{marginTop: 10, width: '50%'}}
                          inputStyle={{marginTop: -10}}
                          label="Employement Status"
                          placeholder="INPUT WITH ICON"
                          value="Employed"
                          rightIcon={
                            <Icon name="check" size={24} color="green" />
                          }
                          rightIconContainerStyle={{
                            marginTop: -10,
                          }}
                        /> */}
                              <View style={{ flex: 1, flexDirection: 'column' }}>
                                <Text style={{ marginTop: 10, marginLeft: 8, color: '#8d8d8d', fontWeight: 'bold', fontSize: 16 }}>Employement Status</Text>
                                <Picker
                                  style={{ width: '100%', marginTop: -5 }}
                                  defaultValue={this.state.user.employed}
                                  handleChange={this.handleChange('employed')}>
                                  <Picker.Item label="Employed" value="employed" />
                                  <Picker.Item
                                    label="Self employed / 1099"
                                    value="selfemployed"
                                  />
                                  <Picker.Item label="Retired" value="retired" />
                                  <Picker.Item label="Other" value="other" />
                                </Picker>
                              </View>

                              <Input
                                containerStyle={{ marginTop: 10, width: '50%' }}
                                inputStyle={{ marginTop: -10 }}
                                label="Employer Name"
                                placeholder="Employer Name"
                                rightIcon={
                                  <Icon name="check" size={24} color="green" />
                                }
                                rightIconContainerStyle={{
                                  marginTop: -10,
                                }}
                                defaultValue={this.state.user.employer_name}
                                onChangeText={this.handleChange('employer_name')}
                              />
                            </View>
                            <Input
                              containerStyle={{ marginTop: 10 }}
                              inputStyle={{ marginTop: -10 }}
                              label="Job Title"
                              placeholder="Job Title"
                              rightIcon={
                                <Icon name="check" size={24} color="green" />
                              }
                              rightIconContainerStyle={{
                                marginTop: -10,
                              }}
                              defaultValue={this.state.user.job_title}
                              onChangeText={this.handleChange('job_title')}
                            />
                            <Input
                              containerStyle={{ marginTop: 10 }}
                              inputStyle={{ marginTop: -10 }}
                              label="Phone Number"
                              placeholder="Employer phone number"
                              rightIcon={
                                <Icon name="check" size={24} color="green" />
                              }
                              rightIconContainerStyle={{
                                marginTop: -10,
                              }}
                              defaultValue={this.state.user.emp_phone}
                              onChangeText={this.handleChange('emp_phone')}
                            />
                            <Input
                              containerStyle={{ marginTop: 10 }}
                              inputStyle={{ marginTop: -10 }}
                              label="Annual Income (before Taxes"
                              placeholder="$100000"
                              rightIcon={
                                <Icon name="check" size={24} color="green" />
                              }
                              rightIconContainerStyle={{
                                marginTop: -10,
                              }}
                              defaultValue={this.state.user.income}
                              onChangeText={this.handleChange('income')}
                            />
                            <Text style={{ color: 'gray', marginLeft: 10 }}>
                              approx $2,019.23/week or $8,700.00/month
                      </Text>

                            <Input
                              containerStyle={{ marginTop: 10 }}
                              inputStyle={{ marginTop: -10 }}
                              label="Start Date"
                              placeholder="Start date"
                              rightIcon={
                                <Icon name="check" size={24} color="green" />
                              }
                              rightIconContainerStyle={{
                                marginTop: -10,
                              }}
                              leftIcon={
                                <Icon name="calendar" size={24} color="green" />
                              }
                              leftIconContainerStyle={{
                                marginTop: -10,
                              }}
                              defaultValue={this.state.user.start_date}
                            />
                            <TouchableOpacity>
                              <Text
                                style={{
                                  color: 'steelblue',
                                  fontWeight: 'bold',
                                  fontSize: 16,
                                  marginTop: 5,
                                  marginLeft: 10
                                }}>
                                + Add another source of income
                      </Text>
                            </TouchableOpacity>
                            <Text style={{ color: 'gray', marginLeft: 10 }}>
                              Alimony, child support, or seperate maintainance income need not be disclosed unless relied upon for credit
                      </Text>
                          </View>
                        </ScrollView>

                      </View>
                      {
                        this.state.submitted ? <View><ActivityIndicator size='large' color={colors.SKY_BLUE} /></View> : null
                      }

                    </ProgressStep>
                  </ProgressSteps>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </DismissKeyboard>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
