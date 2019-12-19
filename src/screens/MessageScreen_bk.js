import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

export default class MessageScreen extends Component {
    static navigationOptions = {
        title: 'Message',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity style={{ alignItems: "flex-start", margin: 16 }} onPress={this.props.navigation.openDrawer}>
                        <Icon name="bars" size={25} color="#1c5dc9" />
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>Message</Text>
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}
