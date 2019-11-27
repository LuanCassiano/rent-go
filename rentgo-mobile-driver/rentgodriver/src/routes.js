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
import TravelnProgressScreen from './screens/TravelInProgress'
import TravelsCanceledScreen from './screens/TravelsCanceled'
import TravelsScheduledScreen from './screens/TravelScheduled'
import TravelRequestsScreen from './screens/TravelRequests'

import Sidebar from './components/Sidebar'
import TabBar from './components/TabBar'

const HomeNavigator = createStackNavigator({
    Home: HomeScreen,
    TravelRequests: TravelScheduledScreen,
    TravelScheduled: TravelScheduledScreen
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

TravelsNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true

    if(navigation.state.index > 0) {
        tabBarVisible = false
    }

    return {
        tabBarVisible
    }
}

const TravelScheduledNavigator = createStackNavigator({
    TravelScheduled: TravelsScheduledScreen,
    TravelDetails: TravelDetailsScreen
}, {
    headerMode: 'none',
    defaultNavigationOptions: {
        gesturesEnabled: false
    }
})

TravelScheduledNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true

    if(navigation.state.index > 0) {
        tabBarVisible = false
    }

    return {
        tabBarVisible
    }
}

const TravelsCanceledNavigator = createStackNavigator({
    TravelsCanceled: TravelsCanceledScreen,
    TravelDetails: TravelDetailsScreen
}, {
    headerMode: 'none',
    defaultNavigationOptions: {
        gesturesEnabled: false
    }
})

TravelsCanceledNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true

    if(navigation.state.index > 0) {
        tabBarVisible = false
    }

    return {
        tabBarVisible
    }
}

const TravelInProgressNavigator = createStackNavigator({
    TravelInProgress: TravelnProgressScreen,
    TravelDetails: TravelDetailsScreen
}, {
    headerMode: 'none',
    defaultNavigationOptions: {
        gesturesEnabled: false
    }
})

TravelInProgressNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true

    if(navigation.state.index > 0) {
        tabBarVisible = false
    }

    return {
        tabBarVisible
    }
}

const TravelRequestsNavigator = createStackNavigator({
    TravelRequests: TravelRequestsScreen,
    TravelDetails: TravelDetailsScreen
}, {
    headerMode: 'none',
    defaultNavigationOptions: {
        gesturesEnabled: false
    }
})

TravelRequestsNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true

    if(navigation.state.index > 0) {
        tabBarVisible = false
    }

    return {
        tabBarVisible
    }
}

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
    TravelRequests: {
        screen: TravelRequestsNavigator
    },
    TravelsScheduled: {
        screen: TravelScheduledNavigator
    },
    TravelInProgress: {
        screen: TravelInProgressNavigator
    },
    Travels: {
        screen: TravelsNavigator,
    },
    TravelsCanceled: {
        screen: TravelsCanceledNavigator
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

    // Settings: {
    //     screen: SettingsNavigator,
    //     navigationOptions: {
    //         drawerLabel: 'Configurações',
    //         drawerIcon: <Image source={require('./assets/icons/settings.png')} style={{width: 25, height: 25}}/>
    //     }
    // }
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