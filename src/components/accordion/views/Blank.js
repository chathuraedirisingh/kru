import React, {Component}  from 'react';
import { Text, View ,StyleSheet , Image } from 'react-native';
import { Avatar, Badge } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

export default class Blank extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
        <Animatable.View animation="flipInY" iterationCount={1} style={{padding:0 ,margin:0}}>
        <View style={{ flex:1, justifyContent: "center", alignItems: "stretch" }}>
            <Text style={styles.note}>
                {/* <Icon name="times-rectangle" size={25} color="#F73325"/>
                <Text style={{justifyContent:'center',padding:10}}> in-progress ...</Text> */}
                <Image source = {require('../../../../assets/images/under-construct.jpg')} style={styles.image} resizeMode = 'contain'/>   
                <Text style={styles.text}> WE ARE LAUNCHING SOON</Text>    
            </Text>
        </View>
        </Animatable.View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        margin: 10,
    },
    image: {
        width: 30,
        height: 30,
        marginRight:10
    },
    note: {
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#EFF0F1',
        borderTopWidth:1,
        paddingHorizontal:10,
        paddingVertical:10
    },
    text : {
        fontSize:14,
        fontWeight:'bold',
        color:'gray',
        marginRight:20, 
    }
});
