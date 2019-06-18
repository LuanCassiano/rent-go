import React from 'react';
import { StatusBar } from 'react-native';
import App from './App';

export default function Root() {
    return (
        <>
            <StatusBar backgroundColor="#1c2331" barStyle="light-content"/>
            <App />
        </>
    )
}