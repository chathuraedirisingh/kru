import React, { Component } from 'react';
import { View,TouchableOpacity ,Image ,StyleSheet} from 'react-native';
import { Button, Text } from 'native-base';

global.currentScreenIndex = 0;

class BlankScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1, flexDirection:'column',justifyContent: 'center', alignItems: 'center' }}>
                <Image source = {require('../../assets/images/under-construct.jpg')} style={styles.image} resizeMode = 'center'/>   
                <Text style={styles.text}> WE ARE {'\n'} LAUNCHING SOON</Text>    
                <Button bordered warning onPress={this.props.navigation.openDrawer}>
                    <Text>Open Drawer</Text>
                </Button>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    image: {
        marginTop: 2,
        width: '30%',
        height: '30%',
    },
    text: {
        borderBottomColor:'#d1d8e0',
        borderBottomWidth:0.4,
        textAlign: 'center',
        fontSize: 24,
        color: '#fa8231',
        paddingBottom:5,
        paddingTop:10,
        marginBottom: 20,
    },
});

export default BlankScreen;