import Reactotron from 'reactotron-react-native'

if(__DEV__) {
    const tron = Reactotron.configure({ host: '192.168.100.5' }).useReactNative().connect()

    console.tron = tron

    tron.clear()
}