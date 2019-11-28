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
import TravelScheduled from './screens/TravelScheduled'
import TravelCanceled from './screens/TravelCanceled'
import TravelInProgress from './screens/TravelInProgress'
import TravelMap from './screens/TravelInProgressMapView'
import RatingScreen from './screens/RatingScreen'
import FavoritesScreen from './screens/Favorites'

import SideBar from './components/SideBar'
import TabBar from './components/TabBar'

const HomeNavigator = createStackNavigator({
    Home: HomeScreen,
    Driver: DriverScreen,
    TravelConfirmation: TravelConfirmationScreen,
    Payment: PaymentScreen,
    TravelInProgress: TravelInProgress,
    Rating: RatingScreen
}, {
    headerMode: 'none',
    defaultNavigationOptions: {
        gesturesEnabled: false
    }
})

const FavoritesNavigator = createStackNavigator({
    Favorites: FavoritesScreen
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

const TravelRequestsNavigator = createStackNavigator({
    TravelRequests: TravelRequests,
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

const TravelScheduledNavigator = createStackNavigator({
    TravelScheduled: TravelScheduled,
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

const TravelCanceledNavigator = createStackNavigator({
    TravelCanceled: TravelCanceled,
    TravelDetails: TravelDetailsScreen
}, {
    headerMode: 'none',
    defaultNavigationOptions: {
        gesturesEnabled: false
    }
})

TravelCanceledNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true

    if(navigation.state.index > 0) {
        tabBarVisible = false
    }

    return {
        tabBarVisible
    }
}

const TravelInProgressNavigator = createStackNavigator({
    TravelInProgress: TravelInProgress,
    
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
    TravelRequests: {
        screen: TravelRequestsNavigator
    },
    
    TravelsScheduled: {
        screen: TravelScheduledNavigator
    },

    TravleInProgress: {
        screen: TravelInProgressNavigator
    },

    Travels: {
        screen: TravelsNavigator,
    },

    TravelsCanceled: {
        screen: TravelCanceledNavigator
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

    Favorites: {
        screen: FavoritesNavigator,
        navigationOptions: {
            drawerLabel: 'Favoritos',
            drawerIcon: <Image source={require('./assets/icons/favorites.png')} style={{width: 25, height: 25}}/>
        }
    },

    Profile: {
        screen: ProfileNavigator,
        navigationOptions: {
            drawerLabel: 'Minha Conta',
            drawerIcon: <Image source={require('./assets/icons/profile.png')} style={{width: 25, height: 25}}/>
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