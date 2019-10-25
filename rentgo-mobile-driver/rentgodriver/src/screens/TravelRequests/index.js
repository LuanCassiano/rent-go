import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
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

export default function TravelRequests(props) {

    const [trips, setTrips] = useState([])

    goToTravelDetails = (tripId) => {
        props.navigation.navigate('TravelDetails', {
            tripId: tripId,
            travel: 'waiting'
        })
    }

    toggleDrawer = () => {
        props.navigation.toggleDrawer()
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

                    <Divider/>

                    <CardTravelFooter>
                        <Label>Status: </Label>
                        { item.travel_status === 'waiting_driver' && <TextInfo>Solicitada</TextInfo> }
                    </CardTravelFooter>
                </CardTravelBody>
            </CardTravel>
        )
    }

    useEffect(() => {
        async function loadUserTrips() {
            const response = await api.get(`/api/driver-trips?page=1&status=waiting_driver`)
            setTrips(response.data.result.data)
        }

        loadUserTrips()
    }, [trips])

    return (
        <>
            <Header 
                title="Minhas viagens"
                onDrawer={toggleDrawer}
            />
            <Container>
                <Title>Viagens solicitadas</Title>

                <FlatList 
                    keyExtractor={item => String(item.id)}
                    data={trips}
                    renderItem={({ item }) => _renderItem(item)}
                />
            </Container>
        </>
    )
}
