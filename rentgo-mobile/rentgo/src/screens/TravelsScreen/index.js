import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'

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

export default function TravelsScreen(props) {

    const [trips, setTrips] = useState([])

    goToTravelDetails = (tripId) => {
        props.navigation.navigate('TravelDetails', {
            tripId: tripId
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
                        { item.travel_status === 'finished' && <TextInfo>Finalizada</TextInfo> }
                    </CardTravelFooter>
                </CardTravelBody>
            </CardTravel>
        )
    }

    useEffect(() => {
        async function loadUserTrips() {
            const response = await api.get(`/api/passenger-trips`)
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
                <Title>Histórico de viagens</Title>

                <FlatList 
                    keyExtractor={item => String(item.id)}
                    data={trips}
                    renderItem={({ item }) => _renderItem(item)}
                />
            </Container>
        </>
    )
}
