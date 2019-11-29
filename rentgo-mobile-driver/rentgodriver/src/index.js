import React from 'react'
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'

// import './config/ReactotronConfig'

import store from './store'

import App from './App'

export default function Root() {
    return (
        <Provider store={store}>
            <StatusBar backgroundColor="#2F3A52" barStyle="light-content"/>
            <App />
        </Provider>
    )
}