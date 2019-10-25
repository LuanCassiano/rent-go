import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, AsyncStorage, ScrollView, Modal, Text, TouchableOpacity } from 'react-native'
import axios from 'axios'
import api from '../../services/api'
import DateTimePicker from "react-native-modal-datetime-picker"
import moment from 'moment'

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
    const [dateVisible, setDateVisible] = useState(false)
    const [timeVisible, setTimeVisible] = useState(false)
    const [dateTravel, setDateTravel] = useState('')
    const [travelTime, setTravelTime] = useState('')
    const [route, setRoute] = useState({})
    const [travelPrice, setPrice] = useState(0)
    const [traveDistance, setDistance] = useState(0)
    const [passengerId, setId] = useState(0)
    const [modalVisible, setModalVisible] = useState(false)

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

            const dataPassenger = await AsyncStorage.getItem('RentGoUser')
            const infoData = JSON.parse(dataPassenger)
            setId(infoData.id)

            setDistance(info.dist_max)

            const price = info.dist_max * info.value_per_kilometer
            setPrice(price)

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

    onInputFocus = () => {
        setDateVisible(true)
    }

    onInputTimeFocus = () => {
        setTimeVisible(true)
    }

    onDateUnselected = () => {
        setDateVisible(false)
    }

    onTimeUnselected = () => {
        setTimeVisible(false)
    }

    onDateSelected = (date) => {

        setDateTravel(date)
        const newDate = moment(date).format('DD/MM/YYYY')

        setTravelDate(newDate)
    }

    onTimeSelected = (time) => {

        const newTime = moment(time).format('HH:mm:ss')
        setTravelTime(newTime)
    }

    async function travelSolicitation() {
        const passengers = parseInt(numberPassengers)

        const formatDate = moment(dateTravel).format("YYYY-MM-DD")

        const dataXunxada = formatDate + " " + travelTime

        try {
            await api.post('/api/trip', {
                origin: origin,
                destination: destination,
                travel_date: dataXunxada,
                number_passengers: passengers,
                travel_distance: traveDistance,
                passenger_id: passengerId,
                driver_id: driverId,
                travel_price: travelPrice
            })

            setModalVisible(true)

        } catch (error) {
            console.tron.log('error', error)
        }
    }

    modalController = () => {
        setModalVisible(false)
        props.navigation.navigate('Home')
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
                                    onFocus={onInputFocus}
                                />

                                <DateTimePicker
                                    isVisible={dateVisible}
                                    onConfirm={onDateSelected}
                                    onCancel={onDateUnselected}
                                />
                            </Form>

                            <Label>Horário de saída</Label>
                            <Form>
                                <FormInput
                                    placeholder="Horário de saída"
                                    placeholderTextColor="#E5E9F0"
                                    value={travelTime}
                                    onFocus={onInputTimeFocus}
                                />

                                <DateTimePicker
                                    isVisible={timeVisible}
                                    onConfirm={onTimeSelected}
                                    onCancel={onTimeUnselected}
                                    mode="time"
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

                            <Label>Valor total da viagem: {travelPrice}</Label>

                            <ButtonSubmit onPress={travelSolicitation}>
                                <ButtonText>Solicitar viagem</ButtonText>
                            </ButtonSubmit>

                            <Modal animationType="fade" transparent visible={modalVisible} onRequestClose={() => {}}>
                                <View style={{flex: 1, justifyContent: "center", backgroundColor: 'rbga(0, 0, 0, 0.5)', padding: 20}}>
                                    <View style={{alignItems: 'stretch', alignSelf: 'stretch', backgroundColor: '#e5e9f0', borderRadius: 10, padding: 20}}>
                                        <Text style={{fontFamily: 'Quicksand-Bold', fontSize: 20, color: '#1C2331', textAlign: 'center', marginBottom: 20}}>RentGo</Text>
                                        <Text style={{fontFamily: 'Quicksand-Medium', fontSize: 16, color: '#1C2331', textAlign: 'center', marginBottom: 20}}>Sua viagem foi solicitada com sucesso.</Text>
                                    
                                        <TouchableOpacity style={{padding: 15, borderRadius: 30, backgroundColor: '#1c2331'}} onPress={modalController}>
                                            <Text style={{fontFamily: 'Quicksand-Medium', fontSize: 16, color: '#e5e9f0', textAlign: 'center'}}>Fechar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                        </Content>
                    </ScrollView>
                )}
        </Container>
    )
}