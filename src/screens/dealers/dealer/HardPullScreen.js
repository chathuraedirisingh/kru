import React, {Component} from 'react';
import {
  Dimensions,
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Animated,
  TouchableOpacity
} from 'react-native';

import {AppHeader} from '../../../components/AppHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import AccordionList from '../../../components/accordion/AccordionList'
import * as Animatable from 'react-native-animatable';
import {COLORS} from '../../../../assets/constants'

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
};

export default class HardPullScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            topHeight:SCREEN_HEIGHT * 10/ 100 // 10/100
        };
    }

    componentWillMount(){
        this.setState({topHeight: new Animated.Value(SCREEN_HEIGHT * 10/ 100)});
    }

    _increaseHeightOfTop = () => {
        this.setState({hideHead:true})
        Animated.timing(
          this.state.topHeight, {
            toValue:SCREEN_HEIGHT * 30/100,
            duration: 500,
          }
        ).start()
      }
    
      _decreaseHeightOfTop = () => {
        Animated.timing(
          this.state.topHeight, {
            toValue: SCREEN_HEIGHT * 10/100,
            duration: 500,
          }
        ).start();
      }

    render(){
        const {navigation} = this.props;
        this.state.data = this.props.navigation.state.params.data;

        const  initHeight = SCREEN_HEIGHT * 10/100;
        const  toggledHeight = SCREEN_HEIGHT * 30/ 100;

        const headerDownArrowOpacity = this.state.topHeight.interpolate({
            inputRange: [initHeight, toggledHeight],
            outputRange: [1, 0]
        })
        const headerUpArrowOpacity = this.state.topHeight.interpolate({
            inputRange: [initHeight, toggledHeight],
            outputRange: [0, 1]
        })
        return (
            <View style={{flex:1}}>
            <AppHeader title={null} isMenu={true} visible={false} navigation={this.props.navigation}/>
            {/* <Animated.View
                style={{
                position: 'absolute',
                height:30,
                width:30,
                top:35,
                right: 10,
                zIndex: 100,
                opacity:headerDownArrowOpacity
                }}>
            <TouchableOpacity onPress={ () => this._increaseHeightOfTop()} 
            style={{
              flex:1 ,
              flexDirection:'row',
              borderColor:COLORS.HORIZON,
              borderWidth:2,
              borderRadius:60,
              alignItems:'center',
              justifyContent:'center',
              textAlign:'center',
              backgroundColor:'#f4f4f4'
              }}>
              <Icon name='arrow-down' style={{color:COLORS.HORIZON,fontSize:20}}/>
          </TouchableOpacity>
            </Animated.View> */}
                <SafeAreaView>
                   <Animated.View 
                    style={{
                        flex:0,
                        height:this.state.topHeight
                    }}>
                        
                   <View style={styles.addressContent}>
                        <Text style={styles.addressTitle}>{`${this.state.data.first_name} ${this.state.data.last_name}`}</Text>
                        <Text style={styles.addressData}> {this.state.data.date_of_birth} </Text>
                        <Text style={styles.addressData}>{`${this.state.data.address}`}</Text>
                    </View>
                    <View style={styles.statusContainer}>
                  
                        <View style={styles.statusBlock}>
                            <Image source = {require('../../../../assets/images/image_equifax.png')} style={{ width: 120, height: 35,marginTop:-10}} resizeMode = 'stretch'/>
                        </View>
                        <View style={styles.statusBlock}>
                            <View style={{alignItems:'flex-start',flexDirection:'row',marginTop:15}}>
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
                        {/* up-down arrow toggle sections*/}
                        <Animated.View
                            style={{
                            position: 'absolute',
                            height:30,
                            width:30,
                            bottom:30,
                            right: 10,
                            zIndex: 100,
                            opacity:headerDownArrowOpacity
                            }}>
                            <TouchableOpacity onPress={ () => this._increaseHeightOfTop()} 
                            style={{
                            flex:1 ,
                            flexDirection:'row',
                            borderColor:COLORS.TRANSPARENT,
                            borderWidth:2,
                            borderRadius:2,
                            alignItems:'center',
                            justifyContent:'center',
                            textAlign:'center',
                            backgroundColor:'#f4f4f4'
                            }}>
                            <Icon name='angle-down' style={{color:COLORS.BG_DARK_BUTTON,fontSize:26}}/>
                            </TouchableOpacity>
                        </Animated.View>
                        <Animated.View
                            style={{
                            position: 'absolute',
                            height:30,
                            width:30,
                            bottom:10,
                            right: 10,
                            zIndex: 100,
                            opacity:headerUpArrowOpacity
                            }}>
                            <TouchableOpacity onPress={ () => this._decreaseHeightOfTop()} 
                                style={{
                                flex:1 ,
                                flexDirection:'row',
                                borderColor:COLORS.TRANSPARENT,
                                borderWidth:2,
                                borderRadius:2,
                                alignItems:'center',
                                justifyContent:'center',
                                textAlign:'center',
                                backgroundColor:'#f4f4f4'
                                }}>
                                <Icon name='angle-up' style={{color:COLORS.BG_DARK_BUTTON,fontSize:26}}/>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </Animated.View>
                </SafeAreaView>
                {/* </View> */}
                {/* accordian panels */}
                {/* #EFF0F1 */}
                
                <View style={{ flex:3,backgroundColor:'#DADBDC'}}>
                <View style={styles.cardAccordionPanel}></View>
                    <AccordionList />
               </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor: '#ffffff',
    // },
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
        width: '15%', // 40
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
        width: '15%', // 40
        height: 7,
        margin: 10,
        borderRadius: 2
    },
    addressTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0E9DDD',
        paddingBottom: 5,
        fontWeight:"bold"
    },
    addressData: {
        fontSize: 13,
        fontWeight: 'normal',
        color: '#0E9DDD',
        textAlign: 'center'
    },
    addressContent: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:-40,
        paddingHorizontal:40
    },
    statusContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: 5,
        alignItems: 'center',
    },
    statusBlock: {
        alignItems: 'center',
        paddingTop: 5,
        borderColor: '#ccc',
        width: Dimensions.get('screen').width - 30,
        height: 20
    },
    statusBlockBadges: {
        padding: 5,
        marginTop: 40,
        borderColor: '#ccc',
       justifyContent:'center',
       alignItems:'center',
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