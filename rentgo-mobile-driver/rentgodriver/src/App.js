import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import Routes from './routes'

function App () {

	const [logged, setLogged] = useState(false)

    useEffect(() => {
        async function loadDataFromStorage() {
            const data = await AsyncStorage.getItem('RentGoDriverToken')
            if(data) {
                setLogged(true)
                return
            }
        }

        loadDataFromStorage()
    }, [])

	const Screens = Routes(logged)

	return (
		<Screens />
	)
}

export default App