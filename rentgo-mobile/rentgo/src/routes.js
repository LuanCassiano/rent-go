import { createAppContainer, createBottomTabNavigator, createStackNavigator, createSwitchNavigator} from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';

const HomeNavigator = createStackNavigator({
    Home: HomeScreen,
}, {
    headerMode: 'none',
});

// HomeNavigator.navigationOptions = ({ navigation }) => {
//     let tabBarVisible = true;
//     if (navigation.state.index > 0) {
//         tabBarVisible = false;
//     }
  
//     return {
//         tabBarVisible,
//     }
// }

// const TabNavigator = createBottomTabNavigator({
//     Home: HomeNavigator
// }, {
//     tabBarComponent: TabBar
// });

export default function Routes(isLoggedIn = false) {
    return createAppContainer(createSwitchNavigator({
        Signin: SigninScreen,
    }, {
        initialRouteName: 'Signin'
    }))
}