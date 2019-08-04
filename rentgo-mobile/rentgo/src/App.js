import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import Routes from './routes';


export default function App() {

    const [logged, setLogged] = useState(false);

    useEffect(() => {
        async function loadDataFromStorage() {
            const data = await AsyncStorage.getItem('RentGoToken');
            if(data) {
                setLogged(true);
                return
            }
        }

        loadDataFromStorage();
    }, []);

    const Screens = Routes(logged);

    return (
        <Screens />
    );
}
