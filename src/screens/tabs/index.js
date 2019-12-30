import { createStackNavigator } from 'react-navigation-stack';

import AlertTabScreen from './AlertTab'
import SettingTabScreen from './SettingTab'
import HomeTabScreen from './HomeTab'
import MessageTabScreen from './MessageTab';
import BlankScreen from '../BlankScreen';

const navOptionHandler = (navigation) => ({
    header: null,
});

const HomeStack = createStackNavigator({
    Home: {
        screen: HomeTabScreen,
        navigationOptions: navOptionHandler
    },
    // HomeDetails : { screen : FeedDetail, navigationOptions: navOptionHandler}
});
const AlertStack = createStackNavigator({
    Alerts: {
        screen: AlertTabScreen,
        navigationOptions: navOptionHandler
    }
});
const MessageStack = createStackNavigator({
    Message: {
       // screen: MessageTabScreen,
        screen: BlankScreen,
        navigationOptions: navOptionHandler
    }
});
const SettingStack = createStackNavigator({
    Setting: {
        // screen: SettingTabScreen,
        screen: BlankScreen,
        navigationOptions: navOptionHandler
    }
});

export  {
    HomeStack,
    AlertStack,
    MessageStack,
    SettingStack
};