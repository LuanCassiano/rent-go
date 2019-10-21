import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, ScrollView, FlatList } from 'react-native'
import MapboxGL from '@mapbox/react-native-mapbox-gl'
import axios from 'axios'

import api from '../../services/api'

MapboxGL.setAccessToken('pk.eyJ1IjoibHV1YW5jYXNzaWFubyIsImEiOiJjanBzeWF4aHcwMGNyM3dwYTYzeTlsY2VmIn0.ReacoepEj0J0hJpbyHogYQ')

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

export default function TravelDetails(props) {

    const [loading, setLoading] = useState(false)
    const [centerCoords, setCenterCoords] = useState([])
    const [tripDetails, setTripDetails] = useState([])

    const [route, setRoute] = useState({})

    goBack = () => {
        props.navigation.goBack()
    }

    _renderTripInfo = (item) => {
        return (
                <ViewGeneric>
                    <ViewTripInfoContent>
                        <Label>Origem</Label>
                        <Span>{item.origin}</Span>
                    </ViewTripInfoContent>

                    <Divider/>

                    <ViewTripInfoContent>
                        <Label>Destino</Label>
                        <Span>{item.destination}</Span>
                    </ViewTripInfoContent>

                    <Divider/>

                    <ViewTripContent2>
                        <Label>Motorista</Label>
                        <Span>{item.driver}</Span>
                    </ViewTripContent2>

                    <Divider/>

                    <ViewTripContent2>
                        <Label>R$</Label>
                        <Span>{item.travel_price}</Span>
                    </ViewTripContent2>

                    <Divider/>

                    <ViewTripContent2>
                        <Label>Qtd. Passageiros</Label>
                        <Span>{item.number_passengers}</Span>
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

                const tripOrigin = tripResponse.data.result[0].origin
                const tripOriginCoords = await axios({
                    baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${tripOrigin}.json?types=address&access_token=pk.eyJ1IjoibHV1YW5jYXNzaWFubyIsImEiOiJjanBzeWF4aHcwMGNyM3dwYTYzeTlsY2VmIn0.ReacoepEj0J0hJpbyHogYQ`,
                    method: 'GET'
                })

                const tripOriginCoordsRes = tripOriginCoords.data.features[0]
                const coordinates = tripOriginCoordsRes.geometry.coordinates
                
                setCenterCoords(coordinates)

                const tripDestination = tripResponse.data.result[0].destination
                const tripDestinationCoords = await axios({
                    baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${tripDestination}.json?types=address&access_token=pk.eyJ1IjoibHV1YW5jYXNzaWFubyIsImEiOiJjanBzeWF4aHcwMGNyM3dwYTYzeTlsY2VmIn0.ReacoepEj0J0hJpbyHogYQ`,
                    method: 'GET'
                })

                const tripDestinationCoordsRes = tripDestinationCoords.data.features[0]
                const coordinates2 = tripDestinationCoordsRes.geometry.coordinates

                const pathResponse = await axios({
                    baseURL: `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates[0]},${coordinates[1]};${coordinates2[0]},${coordinates2[1]}.json?access_token=pk.eyJ1IjoibHV1YW5jYXNzaWFubyIsImEiOiJjanBzeWF4aHcwMGNyM3dwYTYzeTlsY2VmIn0.ReacoepEj0J0hJpbyHogYQ&geometries=geojson`,
                    method: 'GET'
                })

                const tripPath = pathResponse.data.routes[0].geometry.coordinates

                setRoute({
                    "type": "FeatureCollection",
                    "features": [
                        {
                            "type": "Feature",
                            "properties": {},
                            "geometry": {
                                "type": "LineString",
                                "coordinates": tripPath
                            }
                        }
                    ]
                })

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

            { loading === true ? (
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <ActivityIndicator size="large" color="#1C2331"/>
                </View>
            ) : (
                <ScrollView>
                    <MapboxGL.MapView
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
                    </MapboxGL.MapView>

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