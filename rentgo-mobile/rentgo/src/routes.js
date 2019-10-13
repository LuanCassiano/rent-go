import React from 'react'
import { Image } from 'react-native'
import { createAppContainer, createDrawerNavigator, createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation'

import HomeScreen from './screens/HomeScreen'
import DriverScreen from './screens/DriverScreen'
import SigninScreen from './screens/SigninScreen'
import TravelsScreen from './screens/TravelsScreen'
import TravelDetailsScreen from './screens/TravelDetailsScreen'
import PaymentScreen from './screens/PaymentScreen'
import SettingsScreen from './screens/SettingsScreen'
import ProfileScreen from './screens/ProfileScreen'
import TravelConfirmationScreen from './screens/TravelConfirmationScreen'
import TravelRequests from './screens/TravelRequests'

import SideBar from './components/SideBar'
import TabBar from './components/TabBar'

const HomeNavigator = createStackNavigator({
    Home: HomeScreen,
    Driver: DriverScreen,
    TravelConfirmation: TravelConfirmationScreen
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

const TravelRequestsNavigator = createStackNavigator({
    TravelRequests: TravelRequests,
    TravelDetails: TravelDetailsScreen
}, {
    headerMode: 'none',
    defaultNavigationOptions: {
        gesturesEnabled: false
    }
})

const PaymentNavigator = createStackNavigator({
    Payment: PaymentScreen
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

const TabTravels = createBottomTabNavigator({
    Travels: {
        screen: TravelsNavigator,
    },

    TravelRequests: {
        screen: TravelRequestsNavigator
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

    Travels: {
        screen: TabTravels,
        navigationOptions: {
            drawerLabel: 'Minhas viagens',
            drawerIcon: <Image source={require('./assets/icons/tourist.png')} style={{width: 25, height: 25}}/>
        }
    },

    Payment: {
        screen: PaymentNavigator,
        navigationOptions: {
            drawerLabel: 'Pagamento',
            drawerIcon: <Image source={require('./assets/icons/payment.png')} style={{width: 25, height: 25}}/>
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
    },
}, {
    drawerPosition: 'left',
    contentComponent: SideBar
})

export default function Routes(isLoggedIn = false) {
    return createAppContainer(createSwitchNavigator({
        Signin: SigninScreen,
        Drawer: DrawerNavigator
    }, {
        initialRouteName: isLoggedIn ? 'Drawer' : 'Signin'
    }))
}   