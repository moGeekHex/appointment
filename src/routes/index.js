import React from 'react';
import { 
    createAppContainer ,
    createSwitchNavigator , 
    createStackNavigator , 
    createBottomTabNavigator 
} from 'react-navigation';

import Colors from '../constants/Colors';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import SplashScreen from '../screens/SplashScreen';
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import OrganizeMeetingScreen from '../screens/OrganizeMeetingScreen';
import SettingScreen from '../screens/SettingScreen';
import ConfirmPhoneScreen from '../screens/ConfirmPhoneScreen';
import SetLocationScreen from '../screens/SetLocationScreen';
import MeetingDetails from '../screens/MeetingDetails';
import LanguageScreen from '../screens/LanguageScreen';

const TabStack = createBottomTabNavigator({
    Home : {
        screen : HomeScreen,
        navigationOptions : ({ navigation }) => ({
            tabBarIcon : ({ tintColor }) => {
                return(
                    <MIcon
                        name='home'
                        size={25}
                        color={tintColor}
                    />
                );
            }
        })
    },
    Add : {
        screen : OrganizeMeetingScreen,
        navigationOptions : ({ navigation }) => ({
            tabBarIcon : ({ tintColor }) => {
                return(
                    <MIcon
                        name='add-circle-outline'
                        size={25}
                        color={tintColor}
                    />
                );
            }
        })
    },
    Setting : {
        screen : SettingScreen,
        navigationOptions : ({ navigation }) => ({
            tabBarIcon : ({ tintColor }) => {
                return(
                    <MIcon
                        name='reorder'
                        size={25}
                        color={tintColor}
                    />
                );
            }
        })
    }
},{
    tabBarPosition : 'top',
    tabBarOptions : {
        activeTintColor : Colors.redSahade1,
        inactiveTintColor : Colors.grey,
    }
});

const AppStack = createStackNavigator({
    Main : TabStack,
    Confirm : ConfirmPhoneScreen,
    Location : SetLocationScreen,
    Detail : MeetingDetails,
    Language : LanguageScreen
},{
    defaultNavigationOptions : ({ navigation , screenProps }) => {
        let currentRoute;
        let title;
        const { I18n } = screenProps
        try{
            currentRoute = navigation.state.routes[navigation.state.index].routeName;
            title = currentRoute

            if(currentRoute === 'Home')
            {
                title = I18n.t('home.screen_title');
            }
            if(currentRoute === 'Add')
            {
                title = 'Organize Meeting';
            } 
            if(currentRoute === 'Setting')
            {
                title = 'Setting';
            }
        } catch (e) {
            title = 'Appointment';
        }
        return { title : title };
    }
});

const AuthStack = createStackNavigator({
    Auth : {
        screen : AuthScreen,
        navigationOptions : {
            header : null
        }
    }
});

const AppNavigator  = createSwitchNavigator({
    Splash : SplashScreen,
    App : AppStack,
    Auth : AuthStack 
},{
    initialRouteName : 'Splash'
});

export default createAppContainer(AppNavigator);