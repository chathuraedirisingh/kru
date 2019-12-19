import React, { Component } from 'react'
import { Dimensions} from 'react-native';
import { createAppContainer ,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import SideBar from './src/components/SideBar';
import Icon from 'react-native-vector-icons/FontAwesome'
import ScanIDScreen from './src/screens/ScanIDScreen';
import TabNavigator from './src/screens/Tabs/TabNavigator';
import BlankScreen from './src/screens/BlankScreen';
import ShowDetailsScreen from './src/screens/ShowDetailsScreen';
import DealerListScreen from './src/screens/DealerListScreen';
import ViewDealerScreen from './src/screens/ViewDealerScreen';
import AddConsumerScreen from './src/screens/AddConsumerScreen';
import HardPullScreen from './src/screens/HardPullScreen';
import LoginScreen from './src/screens/LoginScreen';
import colors from './src/styles/colors';


export default class App extends Component {
  render() {
    console.disableYellowBox = true;
    return(<AppContainer/>)
  }
}

console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: TabNavigator,
      navigationOptions: {
        title: 'Home',
        drawerIcon: ({ tintColor }) => <Icon name="home" size={16} color={tintColor} />
      }
    },
    Scan: {
      screen: ScanIDScreen,
      navigationOptions: {
        title: 'ID Scan',
        drawerIcon: ({ tintColor }) => <Icon name="camera" size={16} color={tintColor} />
      }
    },
  
    ViewDealers:{
      screen: DealerListScreen,
      navigationOptions: {
        title: 'Customer List',
        drawerIcon: ({ tintColor }) => <Icon name="users" size={16} color={tintColor} />
      }
    },
    DigitalApplication: {
      screen: BlankScreen,
      navigationOptions: {
        title: 'Digital Application',
        drawerIcon: ({ tintColor }) => <Icon name="tv" size={16} color={tintColor} />
      }
    },
    CreditInquiry: {
      screen: BlankScreen,
      navigationOptions: {
        title: 'Credit Inquiry',
        drawerIcon: ({ tintColor }) => <Icon name="credit-card" size={16} color={tintColor} />
      }
    },
    PreQualificationage: {
      screen: BlankScreen,
      navigationOptions: {
        title: 'Pre-Qualification',
        drawerIcon: ({ tintColor }) => <Icon name="clipboard" size={16} color={tintColor} />
      }
    },
    complianceSolutions: {
      screen: BlankScreen,
      navigationOptions: {
        title:'Compliance Solutions',
        drawerIcon: ({ tintColor }) => <Icon name="film" size={16} color={tintColor} />
      }
    },

    SyntheticFraud: {
      screen: BlankScreen,
      navigationOptions: {
        title:'Synthetic Fraud',
        drawerIcon: ({ tintColor }) => <Icon name="snapchat-ghost" size={16} color={tintColor} />
      }
    },
    Transactions: {
      screen: BlankScreen,
      navigationOptions: {
        title:'Transactions',
        drawerIcon: ({ tintColor }) => <Icon name="cc-mastercard" size={16} color={tintColor} />
      }
    },
    ManageAlerts: {
      screen: BlankScreen,
      navigationOptions: {
        title:'Manage Alerts',
        drawerIcon: ({ tintColor }) => <Icon name="bell" size={16} color={tintColor} />
      }
    },
    AccountSettings: {
      screen: BlankScreen,
      navigationOptions: {
        title:'Account Settings',
        drawerIcon: ({ tintColor }) => <Icon name="cog" size={16} color={tintColor} />
      }
    },
    PushDataDTTR1: {
      screen: BlankScreen,
      navigationOptions: {
        title:'Push Data to DT/TR1',
        drawerIcon: ({ tintColor }) => <Icon name="tag" size={16} color={tintColor} />
      }
    },
    DMSSync: {
      screen: BlankScreen,
      navigationOptions: {
        title:'DMS Sync',
        drawerIcon: ({ tintColor }) => <Icon name="random" size={16} color={tintColor} />
      }
    },
    Show:{
      screen: ShowDetailsScreen,
      navigationOptions: {
        drawerLabel: ()=>null,
      }
    },
    ViewDealer:{
      screen: ViewDealerScreen,
      navigationOptions: {
        drawerLabel: ()=>null,
      }
    },
    // TODO change the navigation method TBD
    HardPull: {
      screen: HardPullScreen,
      navigationOptions: {
        drawerLabel: ()=>null,
      }
    },
    AddConsumer:{
      screen: AddConsumerScreen,
      navigationOptions: {
        drawerLabel: ()=>null,
      }
    }
  },
  {
    contentComponent: props => <SideBar {...props} />,
    drawerWidth: Dimensions.get('window').width * 0.80,
    drawerBackgroundColor:colors.WHITE,
    drawerType:'front',
    hideStatusBar: true,
    // drawerOpenRoute: 'DrawerOpen',
    // drawerToggleRoute: 'DrawerToggle',
    // drawerCloseRoute: 'DrawerClose',
    style:{
      drawer: {
        width:Dimensions.get("screen").width * 0.60,
        shadowColor: '#000000',
        shadowOpacity: 0.8,
        shadowRadius: 3},
        main: {paddingLeft: 1}
    },
    contentOptions: {
      inactiveTintColor: '#2d98da',
      activeBackgroundColor: colors.BG_MAIN_COVER,
      activeTintColor:colors.WHITE,
      labelStyle: {
        color:'#a5b1c2',
        fontSize:16
      },
      itemsContainerStyle: {
        marginTop: 0,
        marginHorizontal: 0
      },
      itemStyle: {
        borderRadius: 0,
        // borderBottomColor: '#f4f4f4',
        // borderWidth: 0.5
      }
    }
  }
);

// const StackNavigator = createStackNavigator({
//   DealerList: {screen: DealerListScreen},
//   // HardPull: {screen:HardPullScreen}
// });

const AppNavigator  = createSwitchNavigator(
  {
    Login: {screen:LoginScreen},
    Home: {screen:DrawerNavigator},
  }
);

const AppContainer = createAppContainer(AppNavigator)
