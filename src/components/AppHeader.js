import React, { Component } from 'react'
import { Header, Left, Body, Right, Button, Icon, Title ,Item, Input} from 'native-base';
import { SafeAreaView , View, Text,TouchableOpacity ,StyleSheet, TextInput ,Dimensions} from 'react-native';

import { COLORS ,WINDOW_WIDTH } from '../../assets/constants'

export class AppHeader extends Component {
  state = {
    serach : ""
  }

  searchItem = () => {

  }

  componentDidMount() {
    const deviceHeight = Dimensions.get('window').height;
    //console.log('deviceHeight  ' + deviceHeight)
  }

  render() {
    let {title , isMenu ,visible=true} = this.props;
   
    return (
      <SafeAreaView>
       <Header 
          transparent
          // searchBar
          // rounded
          androidStatusBarColor ={COLORS.BLUE_STATUS} 
          style = {[visible ? {backgroundColor: COLORS.BLUE_HEAD} :{backgroundColor: COLORS.TRANSPARENT}]}>
          <Left>
            {
              isMenu?
               <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                 <Icon name='menu' style = {[visible ? {color: COLORS.WHITE} :{color: COLORS.BLUE_HEAD}]}/>
              </Button>:
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name='arrow-back' style = {[visible ? {color: COLORS.WHITE} :{color: COLORS.BLUE_HEAD}]} />
              </Button>
            }
          </Left>
          <Body>
            <View style={[styles.searchContainer, !visible ? {opacity: 0} :{opacity:1}]} >
                <TextInput
                  style={styles.inputStyle}
                    autoCorrect={false}
                    placeholder="Search here..."
                    onChangeText={this.onSearchEntry}
                  />
            </View>
           {/* <Text>{title}</Text> */}
        
          </Body>
          <Right>
            <View>
              <TouchableOpacity >
                <Icon name='search' style={{color:'#FFF',fontSize:24}} />
              </TouchableOpacity>
            </View>
          </Right>
        </Header>
        {/* <View style={{ paddingBottom:'1%',zIndex:100}}>
        <Item>
            
             <Input
             style={{
               flex:1,
               width:'100%',
               backgroundColor:'#f4f4f4',
               marginHorizontal:1,
               borderRadius:1
             }}
              value = {this.state.serach}
              placeholder="Search Somthing..."
              onChangeText ={(serach) => this.setState({serach})}
             />
              <Icon name="search" onPress={this,this.searchItem}/>
           </Item>
        </View> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    marginVertical:1,
    flexDirection: 'row',
    marginTop:8,
    marginBottom:8,
  },
  inputStyle: {
    flex: 0,
    color:'#FFF',
    fontSize:17,
    borderColor:'#2d98da',
    //borderRadius:40,
    borderWidth:0,
    paddingVertical:10,
    paddingHorizontal:15,
    backgroundColor:'#2d98da',
    marginLeft:-10,
    // @TODO
    // get the screen vertical | horizonal then then change the CSS
    // width:Dimensions.get('window').width - 120,
    width:'180%',
  },
});
  