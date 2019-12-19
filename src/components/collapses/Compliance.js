import React, { Component } from 'react';
import { Text, View ,StyleSheet } from 'react-native';
import { Avatar, Badge } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

class Compliance extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
        <View style={{ flex:1, justifyContent: "flex-start", alignItems: "stretch" }}>
           <View style={styles.container}>
                <View style={styles.description}>
                    <View style={{flexDirection:'column'}}>
                        <View style={{flexDirection:'row',marginBottom:15}}>
                            <View>
                                <Text style={{color:'#696F71',minWidth: '20%'}}> OFAC </Text>
                            </View>
                            <View style={{flexDirection:'row',flex:1}}>
                                <View style={{flexDirection:'row',alignContent:'flex-start',flex:1}}>
                                    <Icon name="exclamation-triangle" size={25} style={{color:'#F79824'}}/>
                                    <Text style={{color:'#F79824'}}> Possible Match Found </Text>
                                </View> 
                                <View style={{alignContent:'flex-end',flex:0}}>
                                    <Text style={{color:'#F79824'}}> 85 </Text>
                                </View> 
                            </View>
                        </View>
                        <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',marginBottom:15 }}>
                            <View style={{width: '33%'}}>
                                <View style={{flexDirection:'column'}}> 
                                    <Text style={styles.title}>Entity Name</Text>
                                    <Text style={styles.topicTitle}>Oto Crdco</Text>
                                </View>
                            </View>
                            <View style={{width: '33%'}}>
                                <View style={{flexDirection:'column'}}> 
                                    <Text style={styles.title}>Best Name</Text>
                                    <Text style={styles.topicTitle}>Otto Crdco</Text>
                                </View>
                            </View>
                            <View style={{width: '33%'}}>
                                <View style={{flexDirection:'column'}}> 
                                    <Text style={styles.title}>Listing</Text>
                                    <Text style={styles.topicTitle}>Ootto Credco</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{flex: 1,flexDirection: 'column',justifyContent: 'flex-start',marginBottom:15 }}>
                             <View style={{padding:5}}>
                                <Text style={styles.title}>AKA</Text>
                                <Text style={styles.listItemText}>1.Audo Credco</Text>
                                <Text style={styles.listItemText}>2.Audo Credco</Text>
                            </View>
                            <View style={{padding:5}}>
                                <Text style={styles.title}>Address</Text>
                                <Text style={styles.listItemText}>C/O Inomobiliaria Hotelera Del Carbie LTDA</Text>
                            </View>
                            <View style={{padding:5}}>
                                <Text style={styles.title}>Remarks</Text>
                                <Text style={styles.listItemText}>
                                    DOB: 02 Aug 1958 | Passport #: Z4966601, K1030420 (Columbia)Cedula #: 7450538 (Columbia)

                                </Text>
                            </View>
                        </View>
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
        justifyContent: "flex-start",
        alignItems: "stretch",
        padding: 1
    },
    title: {
        fontSize: 12,
        padding: 5,
        color:'#0E9DDD',
        marginLeft:-2
    },
    listItemText : {
        fontSize: 13,
        color: '#575858',
    },
    topicTitle: {
        fontSize: 14,
        color: 'gray',
        padding: 10,
        borderColor:'#EFF0F1',
        borderWidth:1,
        borderRadius:2,
        marginRight:5
    },
    description: {
        padding: 10,
        borderColor: '#EFF0F1',
        borderTopWidth: 1,
        borderTopEndRadius: 5
    },
});

export { Compliance };