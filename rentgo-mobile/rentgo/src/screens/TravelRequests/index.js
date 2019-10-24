import React, { useEffect, useState } from 'react'
import { FlatList, ActivityIndicator, View } from 'react-native'

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

export default function TravelRequests(props) {

    const [trips, setTrips] = useState([])
    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)

    const goToTravelDetails = (tripId) => {
        props.navigation.navigate('TravelDetails', {
            tripId: tripId
        })
    }

    const toggleDrawer = () => {
        props.navigation.toggleDrawer()
    }

    const refreshControl = async () => {
        setRefresh(true)
        setLoading(true)
        const response = await api.get(`/api/passenger-trips?page=1&status=waiting_driver`)
        setTrips(response.data.result.data)
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
                        {item.travel_status === 'waiting_driver' && <TextInfo>Solicitada</TextInfo>}
                    </CardTravelFooter>
                </CardTravelBody>
            </CardTravel>
        )
    }

    useEffect(() => {
        async function loadUserTrips() {
            setLoading(true)
            const response = await api.get(`/api/passenger-trips?page=1&status=waiting_driver`)
            setTrips(response.data.result.data)
            setLoading(false)
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
                        <ActivityIndicator size="large" color="#E5E9F0" />
                    </View>
                ) : (
                    <>
                        <Title>Viagens solicitadas</Title>

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
