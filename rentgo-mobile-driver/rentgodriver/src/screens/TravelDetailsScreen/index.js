import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, ScrollView, FlatList, TouchableOpacity, Text } from 'react-native'
import axios from 'axios'

import api from '../../services/api'

import {
    Divider,
    Label,
    Span,
    ViewGeneric,
    ViewTripInfoContent,
    ViewTripContent2
} from './styles'

import Header from '../../components/Header'
import Container from '../../components/Container'
import TravelDetailsActions from './TravelDetailsActions'

export default function TravelDetails(props) {

    // const travelStatus = props.navigation.getParam('travel')

    const [loading, setLoading] = useState(false)
    const [tripDetails, setTripDetails] = useState([])

    goBack = () => {
        props.navigation.goBack()
    }

    acceptTravel = async (item) => {
        await axios({
            method: 'POST',
            url: 'https://onesignal.com/api/v1/notifications',
            headers: {
                'Authorization': 'Basic OGZmMjllNWUtNzliNC00ZjEzLWI1ODUtMGNjOGNiYWM2NGYy'
            },
            data: {
                "app_id": 'cfa8c730-c144-4d30-92b2-ed85393ff03f',
                "data": item,
                "contents": {
                    "en": "Sua viagem foi aceita, realize o pagamento"
                },
                "headings": {
                    "en": "RentGo"
                },
                "include_player_ids": [`${item.passenger.user.notification.player_id}`],
                "buttons": [
                    {
                        "id": "1",
                        "text": "Realizar pagamento"
                    }
                ]

            }
        })

        await api.put(`/api/trip/${item.id}`, {
            travel_status: 'scheduled'
        })
    }

    rejectTravel = async (id) => {
        await api.put(`/api/trip/${id}`, {
            travel_status: 'canceled'
        })
    }

    const startTravel = async (item) => {        

        await axios({
            method: 'POST',
            url: 'https://onesignal.com/api/v1/notifications',
            headers: {
                'Authorization': 'Basic OGZmMjllNWUtNzliNC00ZjEzLWI1ODUtMGNjOGNiYWM2NGYy'
            },
            data: {
                "app_id": 'cfa8c730-c144-4d30-92b2-ed85393ff03f',
                "data": item,
                "contents": {
                    "en": "Sua viagem foi iniciada"
                },
                "headings": {
                    "en": "RentGo"
                },
                "include_player_ids": [`${item.passenger.user.notification.player_id}`],
                "buttons": [
                    {
                        "id": "1",
                        "text": "Visualizar"
                    }
                ]

            }
        })

        await api.put(`/api/trip/${item.id}`, {
            travel_status: 'in_progress'
        })
    }

    const finishTravel = async (item) => {
        await axios({
            method: 'POST',
            url: 'https://onesignal.com/api/v1/notifications',
            headers: {
                'Authorization': 'Basic OGZmMjllNWUtNzliNC00ZjEzLWI1ODUtMGNjOGNiYWM2NGYy'
            },
            data: {
                "app_id": 'cfa8c730-c144-4d30-92b2-ed85393ff03f',
                "data": item,
                "contents": {
                    "en": "Viagem finalizada. Avalie o motorista"
                },
                "headings": {
                    "en": "RentGo"
                },
                "include_player_ids": [`${item.passenger.user.notification.player_id}`],
                "buttons": [
                    {
                        "id": "1",
                        "text": "Avaliar"
                    }
                ]

            }
        })

        await api.put(`/api/trip/${item.id}`, {
            travel_status: 'finished'
        })
    }

    _renderTripInfo = (item) => {
        return (
            <ViewGeneric>
                <ViewTripInfoContent>
                    <Label>Origem</Label>
                    <Span>{item.origin}</Span>
                </ViewTripInfoContent>

                <Divider />

                <ViewTripInfoContent>
                    <Label>Destino</Label>
                    <Span>{item.destination}</Span>
                </ViewTripInfoContent>

                <Divider />

                <ViewTripContent2>
                    <Label>Passageiro</Label>
                    <Span>{item.passenger.fullname}</Span>
                </ViewTripContent2>

                <Divider />

                <ViewTripContent2>
                    <Label>R$</Label>
                    <Span>{item.travel_price}</Span>
                </ViewTripContent2>

                <Divider />

                <ViewTripContent2>
                    <Label>Qtd. Passageiros</Label>
                    <Span>{item.number_passengers}</Span>
                </ViewTripContent2>

                <Divider />

                <ViewTripContent2>
                    <TravelDetailsActions 
                        item={item}
                        finishTravel={finishTravel}
                        startTravel={startTravel}
                        acceptTravel={acceptTravel}
                        travelStatus={item.travel_status}
                    />
                </ViewTripContent2>
            </ViewGeneric>
        )
    }

    useEffect(() => {
        async function loadTravel() {
            try {
                setLoading(true)
                const tripId = props.navigation.getParam('tripId')

                const tripResponse = await api.get(`/api/trip/${tripId}`)
                setTripDetails(tripResponse.data.result)

                setLoading(false)


            } catch (error) {
                console.log(error.message)
            }

        }

        loadTravel()
    }, [])

    return (
        <Container noPadding={false}>
            <Header
                title="Detalhes da viagem"
                goBack={goBack}
            />

            {loading === true ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#1C2331" />
                </View>
            ) : (
                    <ScrollView>
                        {/* <MapboxGL.MapView
                        centerCoordinate={[-49.340435,-25.471456]}
                        styleURL={MapboxGL.StyleURL.Light}
                        style={{ width: '100%', height: 300 }}
                        zoomLevel={6}
                    >
                        <MapboxGL.ShapeSource id="line" shape={route}>
                            <MapboxGL.LineLayer 
                                id="routeFill"
                                style={{
                                    lineWidth: 3,
                                    lineCap: MapboxGL.LineCap.Round,
                                    lineJoin: MapboxGL.LineJoin.Round,
                                    lineColor: '#1C2331',
                                    lineOpacity: 1
                                }}
                                belowLayerID="originInnerCircle"
                            />
                        </MapboxGL.ShapeSource>
                    </MapboxGL.MapView> */}

                        <FlatList
                            keyExtractor={item => String(item.id)}
                            data={tripDetails}
                            renderItem={({ item }) => _renderTripInfo(item)}
                        />
                    </ScrollView>
                )}
        </Container>
    )
}