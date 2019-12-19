import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FetIcon from 'react-native-vector-icons/Feather';
import HomeScreen from '../HomeScreen';
import AlertScreen from './AlertScreen';
import Settings from './Settings';
import MessageScreen from './MessageScreen';
import colors from '../../styles/colors'

const bottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <AntIcon name="home" size={27} color={colors.HIGHT_BLUE} />
        )
      }
    },
    Alert: {
      screen: AlertScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FetIcon name="bell" size={27} color={colors.HIGHT_BLUE} />
        )
      }
    },
    Message: {
      screen: MessageScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <MatIcon name="message-outline" size={27} color={colors.HIGHT_BLUE} />
        )
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FetIcon name="settings" size={27} color={colors.HIGHT_BLUE} />
        )
      }
    },
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      showLabel: false,
      activeTintColor: 'red'
    },
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName
      };
    }
  },

);

export default createAppContainer(bottomTabNavigator);