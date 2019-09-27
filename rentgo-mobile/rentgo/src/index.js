import React from 'react'
import { StatusBar } from 'react-native'
import App from './App'

import './config/ReactotronConfig'

export default function Root() {
    return (
        <>
            <StatusBar backgroundColor="#0E1118" barStyle="light-content"/>
            <App />
        </>
    )
}