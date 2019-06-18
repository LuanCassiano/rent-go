import { createAppContainer, createBottomTabNavigator, createStackNavigator, createSwitchNavigator} from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import ProfileScreen from './screens/ProfileScreen';
import TravelsScreen from './screens/TravelsScreen';

import TabBar from './components/TabBar';

const HomeNavigator = createStackNavigator({
    Home: HomeScreen,
}, {
    headerMode: 'none',
});

HomeNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
  
    return {
        tabBarVisible,
    }
}

const ProfileNavigator = createStackNavigator({
    Profile: ProfileScreen
}, {
    headerMode: 'none'
});

ProfileNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
  
    return {
        tabBarVisible,
    }
}

const TravelsNavigator = createStackNavigator({
    Travels: TravelsScreen
}, {
    headerMode: 'none'
});

TravelsNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
  
    return {
        tabBarVisible,
    }
}

const TabNavigator = createBottomTabNavigator({
    Home: HomeNavigator,
    Profile: ProfileNavigator,
    Travels: TravelsNavigator
}, {
    tabBarComponent: TabBar
});

export default function Routes(isLoggedIn = false) {
    return createAppContainer(createSwitchNavigator({
        Signin: SigninScreen,
        Tab: TabNavigator
    }, {
        initialRouteName: 'Signin'
    }))
}