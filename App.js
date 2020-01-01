import React, { Component } from 'react';
import {Dimensions} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { createAppContainer ,createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import DrawerMenu from './src/components/DrawerMenu';

import ScanIDScreen from './src/screens/ScanIDScreen';
import BlankScreen from './src/screens/BlankScreen';
import ShowDetailsScreen from './src/screens/ShowDetailsScreen';
import DealerListScreen from './src/screens/dealers/DealerListScreen';
import { ViewDealerScreen , AddConsumerScreen ,HardPullScreen } from './src/screens/dealers/dealer';

import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import { HomeStack,AlertStack,MessageStack,SettingStack } from './src/screens/tabs'

import { COLORS } from './assets/constants';
import { DealerStack } from './src/screens/dealers';
import SearchPanel from './src/components/header/SearchPanel';
const WINDOW_WIDTH = Dimensions.get('window').width;


const navOptionHandler = (navigation) => ({
  header: null,
});

const MainTabs= createBottomTabNavigator({
  Home: {
    screen:HomeStack,
    navigationOptions: {
      tabBarLabel:'Home',
      tabBarIcon: ({ tintColor }) => (
        <Entypo name="home" size={26} color={tintColor} />
      )
    }
  },
  Alert: {
    screen: AlertStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Entypo name="bell" size={26} color={tintColor} />
      )
    }
  },
  Message: {
    screen: MessageStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Entypo name="message" size={26} color={tintColor}/>
      )
    }
  },
  Setting: {
    screen: SettingStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Entypo name="cog" size={26} color={tintColor} />
      )
    }
  }
},
{
  initialRouteName: 'Home',
  tabBarOptions: {
    showLabel: true,
    activeTintColor: COLORS.ICON_BLUE,
    inactiveTintColor :COLORS.ICON_GRAY,
    tintColor:'red',
    labelStyle:{
      fontFamily:'Verdana',
      fontSize: 11,
    }
  },
  navigationOptions: ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index];
    return {
      headerTitle: routeName
    };
  }
});

const MainStack = createStackNavigator({
  Home: {
    screen: MainTabs, // MainTabs
    navigationOptions: navOptionHandler
  },
  Scan: {
    screen: ScanIDScreen,
    navigationOptions: navOptionHandler
  },
  DigitalApplication: {
    screen: BlankScreen,
    navigationOptions: navOptionHandler
  },
  CreditInquiry: {
    screen: BlankScreen,
    navigationOptions: navOptionHandler
  },
  PreQualificationage: {
    screen: BlankScreen,
    navigationOptions: navOptionHandler
  },
  ComplianceSolutions: {
    screen: BlankScreen,
    navigationOptions: navOptionHandler
  },
  SyntheticFraud: {
    screen: BlankScreen,
    navigationOptions: navOptionHandler
  },
  Transactions: {
    screen: BlankScreen,
    navigationOptions: navOptionHandler
  },
  ManageAlerts: {
    screen: BlankScreen,
    navigationOptions: navOptionHandler
  },
  AccountSettings: {
    screen: BlankScreen,
    navigationOptions: navOptionHandler
  },
  PushDataDTTR1: {
    screen: BlankScreen,
    navigationOptions: navOptionHandler
  },
  DMSSync: {
    screen: BlankScreen,
    navigationOptions: navOptionHandler
  },

  // @TODO move to defferent nav section
  Show: {
    screen: ShowDetailsScreen,
    navigationOptions: navOptionHandler
   
  },
  ViewDealers: {
    screen: DealerListScreen,
    //screen: DealerTabs,
    navigationOptions: navOptionHandler
  },
  ViewDealer: {
    screen: ViewDealerScreen,
    navigationOptions: navOptionHandler
  },
  HardPull: {
    screen: HardPullScreen,
    navigationOptions: navOptionHandler
  },
  AddConsumer: {
    screen: AddConsumerScreen,
    navigationOptions: navOptionHandler
    // navigationOptions: {
    //   drawerLabel: () => null,
    // }
  },

  SearchPanel: {
    screen: SearchPanel,
    navigationOptions: navOptionHandler
  }
  },{
  initialRouteName: 'Home' // Home
});

const AuthStack = createStackNavigator({
  Login:{
    screen: LoginScreen,
    navigationOptions:navOptionHandler
  },
  Register:{
    screen:RegisterScreen,
    navigationOptions:navOptionHandler
  }
});

const AppDrawer = createDrawerNavigator(
  {
    drawer: MainStack
  },
  {
    contentComponent: DrawerMenu,
    // drawerWidth: WINDOW_WIDTH -100,
    statusBarAnimation:'fade'
  },
  {
    contentOptions: {
      labelStyle: { textDecorationLine: 'line-through' }
    }
  }
);


const MainApp = createSwitchNavigator(
  {
    app:AppDrawer,
    auth:AuthStack,
  },
  {
    initialRouteName:'app'
  }
);

const AppNavigator =  createAppContainer(MainApp);

export default class App extends Component {
  render() {
    console.disableYellowBox = true;
    return(<AppNavigator/>)
  }
}

console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

