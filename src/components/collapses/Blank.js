import React, { Component } from 'react';
import { Text, View ,StyleSheet } from 'react-native';
import { Avatar, Badge } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

class Blank extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
        <View style={{ flex:1, justifyContent: "center", alignItems: "stretch" }}>
            <Text style={styles.description}>
                <Icon name="times-rectangle" size={25} color="#F73325"/>
                <Text style={{justifyContent:'center',padding:10}}> in-progress ...</Text>
            </Text>
        </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        margin: 10,
    },
    description: {
        // flex:1,
        fontSize:12,
        color:'gray',
        padding:10,
        borderColor:'#EFF0F1',
        borderTopWidth:1,
        borderTopEndRadius:5
    },
});

export { Blank };