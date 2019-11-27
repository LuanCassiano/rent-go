import React, { useEffect, useState } from 'react'
import { FlatList, ActivityIndicator, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import api from '../../services/api'

import {
    Title,
    Content,
    CardTravel,
    CardTravelBody,
    CardTravelDetailsOrigem,
    CardTravelDetailsDestiny,
    Label,
    TextInfo,
    Divider,
    CardTravelFooter
} from './styles'

import Header from '../../components/Header'
import Container from '../../components/Container'

export default function TravelsCAnceled(props) {

    const [trips, setTrips] = useState([])
    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)

    goToTravelDetails = (tripId) => {
        props.navigation.navigate('TravelDetails', {
            tripId: tripId
        })
    }

    toggleDrawer = () => {
        props.navigation.toggleDrawer()
    }

    const refreshControl = async () => {
        setRefresh(true)
        setLoading(true)
        const data = await AsyncStorage.getItem('RentGoDriverUser')
        const info = JSON.parse(data)
        const response = await api.get(`/api/driver-trips?status=canceled&driver=${info.id}`)
        setTrips(response.data.result)
        setRefresh(false)
        setLoading(false)
    }

    _renderItem = (item) => {
        return (
            <CardTravel onPress={() => goToTravelDetails(item.id)}>
                <CardTravelBody>
                    <CardTravelDetailsOrigem>
                        <Label>Origem</Label>
                        <TextInfo>{item.origin}</TextInfo>
                    </CardTravelDetailsOrigem>
                    <CardTravelDetailsDestiny>
                        <Label>Destino</Label>
                        <TextInfo>{item.destination}</TextInfo>
                    </CardTravelDetailsDestiny>

                    <Divider />

                    <CardTravelFooter>
                        <Label>Status: </Label>
                        {item.travel_status === 'canceled' && <TextInfo>Cancelada</TextInfo>}
                    </CardTravelFooter>
                </CardTravelBody>
            </CardTravel>
        )
    }

    useEffect(() => {
        async function loadUserTrips() {
            const data = await AsyncStorage.getItem('RentGoDriverUser')
            const info = JSON.parse(data)
            const response = await api.get(`/api/driver-trips?status=canceled&driver=${info.id}`)
            setTrips(response.data.result)
        }

        loadUserTrips()
    }, [])

    return (
        <>
            <Header
                title="Minhas viagens"
                onDrawer={toggleDrawer}
            />
            <Container>
                {loading === true ? (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size="large" color="#384662" />
                    </View>
                ) : (
                        <>
                            <Title>Viagens canceladas</Title>

                            <FlatList
                                keyExtractor={item => String(item.id)}
                                data={trips}
                                renderItem={({ item }) => _renderItem(item)}
                                onRefresh={refreshControl}
                                refreshing={refresh}
                            />
                        </>
                    )}
            </Container>
        </>
    )
}
