import React, { useEffect, useState } from 'react'
import { FlatList, AsyncStorage } from 'react-native'

import api from '../../services/api'

import { 
    Container,
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
                        <Label>De: </Label>
                        <TextInfo>{item.origin}</TextInfo>
                    </CardTravelDetailsOrigem>
                    <CardTravelDetailsDestiny>
                        <Label>Para: </Label>
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
            const data = await AsyncStorage.getItem('RentGoUser')
            const info = JSON.parse(data) 

            const response = await api.get(`/api/trip?travel_status=finished&passenger=${info.id}`)
            setTrips(response.data.result)
        }

        loadUserTrips()
    }, [trips])

    return (
      	<Container>
            <Header 
                title="Minhas viagens"
                onDrawer={toggleDrawer}
            />

            <Content showsVerticalScrollIndicator={false}>
                <Title>Histórico de viagens</Title>

                <FlatList 
                    keyExtractor={item => String(item.id)}
                    data={trips}
                    renderItem={({ item }) => _renderItem(item)}
                    numColumns={1}
                />
            </Content>
        </Container>
    )
}
