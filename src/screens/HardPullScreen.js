import React, {Component} from 'react';
import Moment from 'moment';
import {
  Dimensions,
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  TouchableHighlight,
  Alert,
  KeyboardAvoidingView,
  FlatList,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar, Badge } from 'react-native-elements'
import { CollapsItem } from '../components/CollapsItem'
import colors from '../styles/colors'

export default class HardPullScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    render(){
        const {navigation} = this.props;
        this.state.data = this.props.navigation.state.params.data;
        return (
            <View style={styles.container}>
            <StatusBar backgroundColor={colors.BG_STATUS_BAR} barStyle="light-content" />
                <View style={{flex: 1}}>
                <SafeAreaView>
                    <View style={{alignItems: 'flex-start', margin: 5 , flexDirection:'row'}}>
                        <Icon
                            style={{marginLeft:5}}
                            name="bars"
                            size={25}
                            color={colors.HIGHT_BLUE}
                            onPress={this.props.navigation.openDrawer}
                        />
                        <View style={{flex: 1}}>
                            <View style={styles.addressContent}>
                           
                                <Text style={styles.addressTitle}>{`${this.state.data.first_name} ${this.state.data.last_name}`}</Text>
                                <Text style={styles.addressData}> {this.state.data.date_of_birth} </Text>
                                <Text style={styles.addressData}>{`${this.state.data.address}`}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.statusContainer}>
                        <View style={styles.statusBlock}>
                            <Image source = {require('../../assets/image_equifax.png')} style={{ width: 120, height: 30,marginTop:-5}}   resizeMode = 'contain'/>
                        </View>
                        <View style={styles.statusBlock}>
                            <View style={{alignItems:'flex-start',flexDirection:'row'}}>
                                <View style={{backgroundColor:'#fff',padding:5,alignItems:'flex-start',flexDirection:'row'}}>
                                    <Text style={{fontSize:28,color:'#31393C'}}>775</Text>
                                    <Icon name="caret-up" size={24} style={{padding:2 , marginTop:-5 ,color:'#249F58'}}/>
                                    <Text style={{fontSize:14 , padding:0,color:'#249F58'}}>21</Text>
                                </View>
                                <View style={{backgroundColor:'#fff', padding:5}}>
                                    <Text style={{fontSize:14 , margin:8,color:'#565D5F'}}>FICO SCORE8</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.statusBlockBadges}>
                            <View style={{flexDirection:'row'}}>
                                <View style={[styles.statusBadge,styles.badgeLevel1]}></View>
                                <View style={[styles.statusBadge,styles.badgeLevel2]}></View>
                                <View style={[styles.statusBadge,styles.badgeLevel3]}></View>
                                <View style={[styles.statusBadge,styles.badgeLevel4,styles.badgeLevelActive]}>
                                    <Icon name="caret-down" size={22} style={{padding:2 , marginTop:-20,marginLeft:12, color:'#000'}}/>
                                    <Text style={styles.badgeTextLevel4}>Very Good</Text>
                                </View>
                                <View style={[styles.statusBadge,styles.badgeLevel5]}></View>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={{flex:1 }}>
                                    <Text style={{color:'#565D5F'}}>300</Text>
                                </View>
                                <View style={{flex:0}}>
                                    <Text style={{ color:'#565D5F'}}>850</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
                </View>
                {/* accordian panels */}
                {/* #EFF0F1 */}
                <View style={{ flex:2,backgroundColor:'#DADBDC'}}>
                <View style={styles.cardAccordionPanel}></View>
                    <CollapsItem />
               </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    badgeLevel1: {
        backgroundColor: 'red'
    },
    badgeLevel2: {
        backgroundColor: 'orange'
    },
    badgeLevel3: {
        backgroundColor: '#FDD874'
    },
    badgeLevel4: {
        backgroundColor: '#a1d748',
    },
    badgeLevel5: {
        backgroundColor: 'green'
    },
    badgeLevelActive: {
        width: 40,
        height: 12,
        borderRadius: 10,
    },
    badgeTextLevel4: {
        color: '#a1d748',
        fontSize: 11,
        marginTop: 5,
        textAlign: 'center',
        fontWeight:'bold'
    },
    statusBadge: {
        width: 40,
        height: 7,
        margin: 10,
        borderRadius: 2
    },
    addressTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0E9DDD',
        paddingBottom: 5,
    },
    addressData: {
        fontSize: 12,
        fontWeight: 'normal',
        color: '#0E9DDD',
        textAlign: 'center'
    },
    addressContent: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: -30
    },
    statusContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: 5,
        alignItems: 'center',
    },
    statusBlock: {
        alignItems: 'center',
        padding: 0,
        borderColor: '#ccc',
        width: Dimensions.get('screen').width - 30,
        height: 20
    },
    statusBlockBadges: {
        padding: 5,
        marginTop: 25,
        borderColor: '#ccc',
       justifyContent:'center',
       alignItems:'center',
        // borderWidth: 1,
        width: Dimensions.get('screen').width - 80,
        height: 60
    },
    cardAccordionPanel: {
        // flex: 1,
        // flexDirection: 'column',
        // alignItems: 'flex-start',
    },
    accordionArea: {
        width: Dimensions.get('screen').width - 20,
        margin: 20
    }
})