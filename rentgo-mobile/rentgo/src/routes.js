import { Dimensions } from 'react-native'
import { createAppContainer, createDrawerNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation'

import HomeScreen from './screens/HomeScreen'
import DriverScreen from './screens/DriverScreen'
import SigninScreen from './screens/SigninScreen'

const HomeNavigator = createStackNavigator({
    Home: HomeScreen,
    Driver: DriverScreen
}, {
    headerMode: 'none',
    defaultNavigationOptions: {
        gesturesEnabled: false
    }
})

const DrawerNavigator = createDrawerNavigator({
    Home: HomeNavigator
}, {
    drawerPosition: 'left',
    drawerLockMode: 'locked-open'
})

export default function Routes(isLoggedIn = false) {
    return createAppContainer(createSwitchNavigator({
        Signin: SigninScreen,
        Drawer: DrawerNavigator
    }, {
        initialRouteName: isLoggedIn ? 'Drawer' : 'Signin'
    }))
}   