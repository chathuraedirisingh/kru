import { createStackNavigator } from 'react-navigation-stack';

import AlertTabScreen from '../tabs/AlertTab'
import DealerListScreen from './DealerListScreen'
import BlankScreen from '../BlankScreen';

import { ViewDealerScreen, AddConsumerScreen ,HardPullScreen } from './dealer';
import HomeTabScreen from '../tabs/HomeTab';


const navOptionHandler = (navigation) => ({
    header: null,
});

const DealerStack = createStackNavigator({

    // Dealers: {
    //     screen: DealerListScreen,
    //     navigationOptions: navOptionHandler
    // },

    // DealerDetails: {
    //     screen: ViewDealerScreen,
    //     navigationOptions: navOptionHandler
    // },
    // DealerProfile: {
    //     screen: AddConsumerScreen,
    //     navigationOptions: navOptionHandler
    // },
    // HardPull: {
    //     screen: HardPullScreen,
    //     navigationOptions: navOptionHandler
    // }
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
    }
});
const AlertStack = createStackNavigator({
    Alerts: {
        screen: AlertTabScreen,
        navigationOptions: navOptionHandler
    }
});
const MessageStack = createStackNavigator({
    Message: {
        screen: BlankScreen,
        navigationOptions: navOptionHandler
    }
});
const SettingStack = createStackNavigator({
    Setting: {
        screen: BlankScreen,
        navigationOptions: navOptionHandler
    }
});

export  {
    DealerStack,
    AlertStack,
    MessageStack,
    SettingStack
};