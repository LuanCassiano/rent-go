import React from 'react'
import { StatusBar } from 'react-native'

import App from './App'

// import { Container } from './styles';

export default function Root() {
    return (
        <>
            <StatusBar backgroundColor="#2F3A52" barStyle="light-content"/>
            <App />
        </>
    )
}