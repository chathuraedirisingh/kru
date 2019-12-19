import React, { Component } from 'react';
import { Text, View ,StyleSheet ,Dimensions } from 'react-native';
import { Avatar, Badge } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

class AutoLoan extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
        <View style={styles.container}>
           <View style={styles.description}>
               <View style={styles.top}>
                   <Text style={styles.title}>Open Auto Tradeline</Text>
                   <View style={styles.row1}>
                        <View style={{flexDirection:'column',flex:1}}>
                            <Text style={styles.titleLabel}>Remaining Balance</Text>
                            <View style={{flexDirection:'row',padding:5}}>
                                <Icon name="money" size={25} style={styles.desIcon}/>
                                <Text style={styles.labelText}>$13,222</Text>
                            </View>
                        </View>
                        <View style={{borderColor:'#EFF0F1',borderWidth:1,marginRight:20,marginLeft:10}}><Text></Text></View>
                        <View style={{flexDirection:'column',flex:1}}>
                            <Text style={styles.titleLabel}>Beginning Balance</Text>
                            <View style={{flexDirection:'row',padding:5}}>
                                <Icon name="tags" size={25} style={styles.desIcon}/>
                                <Text style={styles.labelText}>$13,222</Text>
                            </View>
                        </View>
                   </View>
                   <View style={styles.row2}>
                        <View style={{flexDirection:'row',flex:1}}>
                            <View style={{alignContent:'flex-start'}}>
                                <Icon name="paypal" size={25} style={styles.desIcon}/>
                            </View>
                            <View style={{flexDirection:'column'}}>
                                <View style={{alignItems:'center',marginLeft:Dimensions.get('screen').width - 350}}>
                                    <Text style={styles.titleLabel}>Beginning Balance</Text>
                                    <Text style={styles.labelText}>$13,222</Text>
                                </View>
                            </View>
                        </View>
                   </View>
                    {/* section 2 */}
                   <View style={styles.row1}>
                        <View style={{flexDirection:'column',flex:1}}>
                            <Text style={styles.titleLabel}>Last Deliq</Text>
                            <View style={{flexDirection:'row',padding:5}}>
                                <Icon name="warning" size={25} style={styles.desIcon}/>
                                <Text style={styles.labelText}>12/1/2004</Text>
                            </View>
                        </View>
                        <View style={{borderColor:'#EFF0F1',borderWidth:1,marginRight:20,marginLeft:10}}><Text></Text></View>
                        <View style={{flexDirection:'column',flex:1}}>
                            <Text style={styles.titleLabel}>Past Repossessions</Text>
                            <View style={{flexDirection:'row',padding:5}}>
                                <Icon name="minus-circle" size={25} style={styles.desIcon}/>
                                <Text style={styles.labelText}>0</Text>
                            </View>
                        </View>
                   </View>
                   <View style={styles.row2}>
                        <View style={{flexDirection:'column',flex:1}}>
                            <View style={{alignSelf:'center',paddingBottom:10}}>
                                <Text style={styles.titleLabel}>Past Due Counts</Text>
                            </View>
                            <View style={{justifyContent:'flex-start'}}>
                                <View style={{flexDirection:'row',flex:1}}>
                                    <View style={{flexDirection:'row',paddingRight:30}}>
                                        <Text style={[styles.titleLabel,styles.due]}>30</Text>
                                        <Text style={[styles.titleLabel,styles.due,styles.dueHighlight]}>3</Text>
                                    </View>
                                    <View style={{flexDirection:'row',paddingRight:30}}>
                                        <Text style={[styles.titleLabel,styles.due]}>60</Text>
                                        <Text style={[styles.titleLabel,styles.due,styles.dueHighlight]}>0</Text>
                                    </View>
                                    <View style={{flexDirection:'row',paddingRight:30}}>
                                        <Text style={[styles.titleLabel,styles.due]}>90+</Text>
                                        <Text style={[styles.titleLabel,styles.due,styles.dueHighlight]}>0</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                   </View>
                   {/* section 3 */}
                   <View style={styles.row1}>
                        <View style={{flexDirection:'column',flex:1}}>
                            <Text style={styles.titleLabel}>Term</Text>
                            <View style={{flexDirection:'row',padding:5}}>
                                <Icon name="clock-o" size={25} style={styles.desIcon}/>
                                <Text style={styles.labelText}>48</Text>
                            </View>
                        </View>
                        <View style={{borderColor:'#EFF0F1',borderWidth:1,marginRight:20,marginLeft:10}}><Text></Text></View>
                        <View style={{flexDirection:'column',flex:1}}>
                            <Text style={styles.titleLabel}>Remaining Term (Mnths.)</Text>
                            <View style={{flexDirection:'row',padding:5}}>
                                <Icon name="hourglass" size={25} style={styles.desIcon}/>
                                <Text style={styles.labelText}>12</Text>
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
        // flex: 1,
        // flexDirection: 'column',
        // margin: 10,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "stretch",
        padding: 1
    },
    due : {
        padding:10,
        fontSize:20,
    },
    dueHighlight : {
        color:'#0E9DDD',
        borderLeftWidth:1,
        borderLeftColor:'#EFF0F1'
    },
    titleLabel : {
        fontSize:12,
        color:'#696F71'
    },
    labelText : {
        fontSize:18,
        marginTop:5,
        color:'#0E9DDD',
    },
    desIcon : {
        marginTop:5,
        color:"#C6C9C9",
        paddingRight:10
    },
    description: {
        flex:1,
        // fontSize:12,
        // color:'gray',
        padding:10,
        borderColor:'#EFF0F1',
        borderTopWidth:1,
        borderTopEndRadius:5
    },
    title : {
        fontSize:14,
        color:'#7B8182',
    },
    top: {
        flex:1,
        flexDirection:'column',
        alignItems:'center'
    },
    row1 : {
        justifyContent:'space-between',
        width: Dimensions.get('screen').width - 100,
        padding:5,
        marginTop:10,
        marginBottom:5,
        borderColor: '#EFF0F1',
        borderTopWidth:1,
        flexDirection:'row'
    },
    row2 : {
        justifyContent:'center',
        width: Dimensions.get('screen').width - 100,

        padding:5,
        marginTop:-5,
        marginBottom:5,
        borderColor: '#EFF0F1',
        borderTopWidth:1,
        flexDirection:'row'
    }
});

export { AutoLoan };