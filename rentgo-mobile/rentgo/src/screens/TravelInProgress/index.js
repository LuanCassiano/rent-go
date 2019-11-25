import React, { useEffect, useState } from 'react'
import { FlatList, ActivityIndicator, View, Image, AsyncStorage } from 'react-native'
import axios from 'axios'
import MapboxGL from '@mapbox/react-native-mapbox-gl'

MapboxGL.setAccessToken('pk.eyJ1IjoibHV1YW5jYXNzaWFubyIsImEiOiJjanBzeWF4aHcwMGNyM3dwYTYzeTlsY2VmIn0.ReacoepEj0J0hJpbyHogYQ')

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

export default function TravelInProgress(props) {

    // const [trips, setTrips] = useState([])
    // const [loading, setLoading] = useState(false)
    // const [refresh, setRefresh] = useState(false)

    // goToTravelDetails = (tripId) => {
    //     props.navigation.navigate('TravelDetails', {
    //         tripId: tripId
    //     })
    // }

    // toggleDrawer = () => {
    //     props.navigation.toggleDrawer()
    // }

    // const refreshControl = async () => {
    //     setRefresh(true)
    //     setLoading(true)
    //     const response = await api.get(`/api/passenger-trips?page=1&status=in_progress`)
    //     setTrips(response.data.result.data)
    //     setRefresh(false)
    //     setLoading(false)
    // }

    // _renderItem = (item) => {
    //     return (
    //         <CardTravel onPress={() => goToTravelDetails(item.id)}>
    //             <CardTravelBody>
    //                 <CardTravelDetailsOrigem>
    //                     <Label>Origem</Label>
    //                     <TextInfo>{item.origin}</TextInfo>
    //                 </CardTravelDetailsOrigem>
    //                 <CardTravelDetailsDestiny>
    //                     <Label>Destino</Label>
    //                     <TextInfo>{item.destination}</TextInfo>
    //                 </CardTravelDetailsDestiny>

    //                 <Divider />

    //                 <CardTravelFooter>
    //                     <Label>Status: </Label>
    //                     {item.travel_status === 'in_progress' && <TextInfo>Em andamento</TextInfo>}
    //                 </CardTravelFooter>
    //             </CardTravelBody>
    //         </CardTravel>
    //     )
    // }

    // useEffect(() => {
    //     async function loadUserTrips() {
    //         setLoading(true)
    //         const response = await api.get(`/api/passenger-trips?page=1&status=in_progress`)
    //         setTrips(response.data.result.data)
    //         setLoading(false)
    //     }

    //     loadUserTrips()
    // }, [])

    useEffect(() => {
        async function getDriverCoordinates() {

            const data = await AsyncStorage.getItem('RentGoUser')
            const info = JSON.parse(data)

            const response = await api.get(`/api/passenger-trips?passenger=${info.id}&status=in_progress`)
            console.tron.log('res', response)

            // const tripResponse = await api.get(`/api/trip/${tripId}`)
            // setTripDetails(tripResponse.data.result)

            // const response = await axios({
            //     url: 'https://rentgo-geolocation.herokuapp.com/api/driver-location',
            //     method: 'GET'
            // })
        }

        getDriverCoordinates()
    }, [])

    const renderAnnotations = () => {
		return (
			<MapboxGL.PointAnnotation
				id='rocketseat'
				coordinate={[-49.6446024, -27.2108001]}
			>
				<View>
					<Image source={require('../../assets/icons/trackingUnselected.png')} />
				</View>

				<MapboxGL.Callout title='Rocketseat House' />
			</MapboxGL.PointAnnotation>
		)
	}

    return (
        <>
            <Header
                title="Minhas viagens"
                onDrawer={toggleDrawer}
            />
            <Container>
                <MapboxGL.MapView
                    centerCoordinate={[-49.6446024, -27.2108001]}
                    style={{ flex: 1 }}
                    showUserLocation
                    styleURL={MapboxGL.StyleURL.Light}
                    zoomLevel={4}
                >
                    {renderAnnotations()}
                </MapboxGL.MapView>
            </Container>
        </>
    )
}