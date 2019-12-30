import React, { Component } from 'react'
import { View , StyleSheet } from 'react-native';
import { Button,Text } from 'native-base';
import { AppHeader } from '../../components/AppHeader'
import { COLORS } from '../../../assets/constants'

export default class Register extends Component {
    render() {
      return (
        <View style={{ flex: 1}}>
         <CustomHeader title={"Register"} navigation={this.props.navigation}/>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.title}>Register Screen</Text>
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    padding: 10,
    color: COLORS.WHITE_GRAY_ICON,
    fontFamily: 'Raleway-Regular'
  },
});