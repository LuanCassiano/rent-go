import React from 'react'
import { Image } from 'react-native'
import { createAppContainer, createDrawerNavigator, createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation'

import HomeScreen from './screens/HomeScreen'
import SigninScreen from './screens/SigninScreen'
import TravelsScreen from './screens/TravelsScreen'
import TravelDetailsScreen from './screens/TravelDetailsScreen'
import SettingsScreen from './screens/SettingsScreen'
import ProfileScreen from './screens/ProfileScreen'
import VanScreen from './screens/VanScreen'
import TravelScheduledScreen from './screens/TravelScheduled'

import Sidebar from './components/Sidebar'
import TabBar from './components/TabBar'

const HomeNavigator = createStackNavigator({
    Home: HomeScreen,
    TravelRequests: TravelScheduledScreen,
}, {
    headerMode: 'none',
    defaultNavigationOptions: {
        gesturesEnabled: false
    }
})

const TravelsNavigator = createStackNavigator({
    Travels: TravelsScreen,
    TravelDetails: TravelDetailsScreen
}, {
    headerMode: 'none',
    defaultNavigationOptions: {
        gesturesEnabled: false
    }
})

const TravelScheduledNavigator = createStackNavigator({
    TravelRequests: TravelScheduledScreen,
    TravelDetails: TravelDetailsScreen
}, {
    headerMode: 'none',
    defaultNavigationOptions: {
        gesturesEnabled: false
    }
})

const SettingsNavigator = createStackNavigator({
    Settings: SettingsScreen
}, {
    headerMode: 'none',
    defaultNavigationOptions: {
        gesturesEnabled: false
    }
})

const ProfileNavigator = createStackNavigator({
    Profile: ProfileScreen
}, {
    headerMode: 'none',
    defaultNavigationOptions: {
        gesturesEnabled: false
    }
})

const VanNavigator = createStackNavigator({
    Van: VanScreen
}, {
    headerMode: 'none',
    defaultNavigationOptions: {
        gesturesEnabled: false
    }
})

const TabTravles = createBottomTabNavigator({
    Travels: {
        screen: TravelsNavigator,
    },
    TravelsScheduled: {
        screen: TravelScheduledNavigator
    }
}, {
    tabBarComponent: TabBar
})

const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            drawerLabel: 'Home',
            drawerIcon: <Image source={require('./assets/icons/home.png')} style={{width: 25, height: 25}}/>
        }
    },

    Vans: {
        screen: VanNavigator,
        navigationOptions: {
            drawerLabel: 'Minhas Vans',
            drawerIcon: <Image source={require('./assets/icons/van.png')} style={{width: 25, height: 25}}/>
        }
    },

    Travels: {
        screen: TabTravles,
        navigationOptions: {
            drawerLabel: 'Minhas viagens',
            drawerIcon: <Image source={require('./assets/icons/places.png')} style={{width: 25, height: 25}}/>
        }
    },

    Profile: {
        screen: ProfileNavigator,
        navigationOptions: {
            drawerLabel: 'Minha Conta',
            drawerIcon: <Image source={require('./assets/icons/profile.png')} style={{width: 25, height: 25}}/>
        }
    },

    Settings: {
        screen: SettingsNavigator,
        navigationOptions: {
            drawerLabel: 'Configurações',
            drawerIcon: <Image source={require('./assets/icons/settings.png')} style={{width: 25, height: 25}}/>
        }
    }
}, {
    drawerPosition: 'left',
    contentComponent: Sidebar
})

export default function Routes(isLoggedIn = false) {
    return createAppContainer(createSwitchNavigator({
        Signin: SigninScreen,
        Drawer: DrawerNavigator
    }, {
        initialRouteName: isLoggedIn ? 'Drawer' : 'Signin'
    }))
}