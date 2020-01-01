import React, { Component } from 'react'
import { Header, Container,Content,Left, Body, Right, Button, Icon, Title ,Item, Input} from 'native-base';
import { Keyboard,SafeAreaView , View, Text,TouchableOpacity ,StyleSheet, TextInput ,Dimensions,TouchableWithoutFeedback} from 'react-native';
import * as Animatable from 'react-native-animatable'
import { COLORS  } from '../../../assets/constants'

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
);

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class SearchPanel extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            searchBarFocused:false
        }
    }

    componentDidMount() {
        this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow)
        this.keyboardDidHide = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
        this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow)
        this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide)
    }

    // @TODO check te OS then call func
    _keyboardDidShow = () => {
        this.setState({
            searchBarFocused: true
        })
    }

    _keyboardDidHide = () => {
        this.setState({
            searchBarFocused: false
        })
    }

    _keyboardWillShow = () => {
        this.setState({
            searchBarFocused: true
        })
    }

    _keyboardWillHide = () => {
        this.setState({
            searchBarFocused: false
        })
    }

    _backTo = () => {
        this.props.navigation.goBack()
    }

    searchBoxAction = () => {
        if(this.state.searchBarFocused){
            Keyboard.dismiss()
            this.textInput.clear()
        } else {
          alert('no result found.!')
        }
    }

    _handleTextChange = (text) => {
       console.log(text)
    }

    render() {
        let {title , isMenu ,visible=true} = this.props;
        return(
            <View style={{flex:1}}>
                <SafeAreaView 
                style={{
                flex:1,
                justifyContent:'flex-start',
                // borderBottomColor:'#ccc',
                // borderBottomWidth:0.2,
                zIndex:100,
                height:SCREEN_HEIGHT
                }}>
                <View 
                    style={{
                        height: 80,// SCREEN_HEIGHT * (10/100),
                        backgroundColor:COLORS.BLUE_HEAD,
                        paddingTop:15,
                        alignItems:'center',
                        justifyContent:'flex-start',
                        flexDirection:'row',
                        marginVertical:2,
                        paddingLeft:15
                        }}>
                    <TouchableOpacity onPress = {this._backTo}>
                        <Icon name="md-arrow-back" style={{color:COLORS.WHITE}}/>
                    </TouchableOpacity>
                    <Text style={{color:COLORS.WHITE, paddingLeft:10 , fontSize:17}}>Back </Text>
                </View>
                <Animatable.View
                    animation="slideInRight"
                    duration={500}
                    iterationCount={1}
                    style={{
                    marginHorizontal:5,
                    marginVertical:5,
                    //paddingHorizontal:5,
                    height:55,
                    backgroundColor:'#f4f4f4',
                    flexDirection:'row',
                    padding:5,
                    alignItems:'center',
                    borderRadius:1,
                   // marginTop:50
                    }}>
                    <Animatable.View
                        animation ={this.state.searchBarFocused ? "fadeInLeft" : "fadeInRight"} duration={400}>
                        <Icon name={this.state.searchBarFocused ? "md-close" : "ios-search" } 
                        style={{ fontSize:22 , paddingLeft:10,color:"#778ca3"}} onPress ={this.searchBoxAction}/>
                    </Animatable.View>
        
                    <TextInput 
                    placeholder="Search"
                    onChangeText={this._handleTextChange}
                    ref={input => { this.textInput = input }}
                    style={{ fontSize:18 , marginLeft:15 ,flex:1,color:"#4b6584"}}/>
                </Animatable.View>
                </SafeAreaView>
             {/* top half end */}
                <DismissKeyboard>
                <View style={{flex:1 , justifyContent:'flex-start',alignItems:'center'}}>
                    <Icon name="ios-search" style={{fontSize:60 ,color:'#778ca3'}}/>
                    <Text style={{fontSize:18 ,color:'#778ca3'}}>No Result</Text>
                    <Text style={{fontSize:16 ,color:'#778ca3'}}>No relevant result found.</Text>
                </View>
                </DismissKeyboard>
              
          </View>
        );
    }
}

