import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, AsyncStorage, ScrollView } from 'react-native'
import axios from 'axios'
import api from '../../services/api'

import MapboxGL from '@mapbox/react-native-mapbox-gl'
MapboxGL.setAccessToken('pk.eyJ1IjoibHV1YW5jYXNzaWFubyIsImEiOiJjanBzeWF4aHcwMGNyM3dwYTYzeTlsY2VmIn0.ReacoepEj0J0hJpbyHogYQ')

import {
    Content,
    Form,
    FormInput,
    ImageDriver,
    Label,
    Row,
    TextDriverName,
    ButtonSubmit,
    ButtonText
} from './styles'

import Container from '../../components/Container'
import Header from '../../components/Header'

export default function TravelConfirmation(props) {

    const [origin, setOrigin] = useState('')
    const [driverId, setDriverId] = useState(null)
    const [driverName, setDriverName] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [destination, setDestination] = useState('')
    const [travelDate, setTravelDate] = useState('')
    const [numberPassengers, setNumberPassengers] = useState('')
    const [loading, setLoading] = useState(false)
    const [centerCoords, setCenterCoords] = useState([])
    const [tripDetails, setTripDetails] = useState([])

    const [route, setRoute] = useState({})

    goBack = () => {
        props.navigation.goBack()
    }

    useEffect(() => {
        async function loadDataFromStorage() {
            setLoading(true)

            const travelOrigin = await AsyncStorage.getItem('origem')
            setOrigin(travelOrigin)

            const travelDestination = await AsyncStorage.getItem('destino')
            setDestination(travelDestination)

            const data = await AsyncStorage.getItem('RentGoDriver')
            const info = JSON.parse(data)

            setDriverName(info.fullname)
            setProfileImage(info.profile_image)
            setDriverId(info.id)

            const tripOriginCoords = await axios({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${travelOrigin}.json?types=address&access_token=pk.eyJ1IjoibHV1YW5jYXNzaWFubyIsImEiOiJjanBzeWF4aHcwMGNyM3dwYTYzeTlsY2VmIn0.ReacoepEj0J0hJpbyHogYQ`,
                method: 'GET'
            })

            const tripOriginCoordsRes = tripOriginCoords.data.features[0]
            const coordinates = tripOriginCoordsRes.geometry.coordinates

            setCenterCoords(coordinates)

            const tripDestinationCoords = await axios({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${travelDestination}.json?types=address&access_token=pk.eyJ1IjoibHV1YW5jYXNzaWFubyIsImEiOiJjanBzeWF4aHcwMGNyM3dwYTYzeTlsY2VmIn0.ReacoepEj0J0hJpbyHogYQ`,
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
        }

        loadDataFromStorage()
    }, [])

    async function travelSolicitation() {
        const passengers = parseInt(numberPassengers)

        try {
            await api.post('/api/trip', {
                origin: origin,
                destination: destination,
                travel_date: travelDate,
                number_passengers: passengers,
                travel_distance: 206,
                passenger_id: 1,
                driver_id: driverId,
                travel_price: 1200.00
            })
        } catch (error) {

        }
    }

    return (
        <Container noPadding={false}>
            <Header
                title="Confirmar viagem"
                goBack={goBack}
            />

            {loading === true ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#E5E9F0" />
                </View>
            ) : (
                    <ScrollView>
                        <MapboxGL.MapView
                            centerCoordinate={[-49.340435, -25.471456]}
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

                        <Content>

                            <Row>
                                <ImageDriver source={{ uri: profileImage }} />
                                <TextDriverName>{driverName}</TextDriverName>
                            </Row>


                            <Label>Origem</Label>
                            <Form>
                                <FormInput
                                    placeholder="Origem"
                                    placeholderTextColor="#E5E9F0"
                                    value={origin}
                                    editable={false}
                                />
                            </Form>

                            <Label>Destino</Label>
                            <Form>
                                <FormInput
                                    placeholder="Origem"
                                    placeholderTextColor="#E5E9F0"
                                    value={destination}
                                    editable={false}
                                />
                            </Form>

                            <Label>Data de ida</Label>
                            <Form>
                                <FormInput
                                    placeholder="Data ida"
                                    placeholderTextColor="#E5E9F0"
                                    value={travelDate}
                                    onChangeText={setTravelDate}
                                />
                            </Form>

                            <Label>Data de volta</Label>
                            <Form>
                                <FormInput
                                    placeholder="Data volta"
                                    placeholderTextColor="#E5E9F0"
                                />
                            </Form>

                            <Label>Quantidade de passageiros</Label>
                            <Form>
                                <FormInput
                                    placeholder="Passageiros"
                                    placeholderTextColor="#E5E9F0"
                                    value={numberPassengers}
                                    onChangeText={setNumberPassengers}
                                />
                            </Form>

                            <ButtonSubmit onPress={travelSolicitation}>
                                <ButtonText>Solicitar viagem</ButtonText>
                            </ButtonSubmit>
                        </Content>
                    </ScrollView>
                )}
        </Container>
    )
}