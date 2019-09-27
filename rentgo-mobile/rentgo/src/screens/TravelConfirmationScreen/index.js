import React, { useEffect, useState } from 'react'
import { View, Text, AsyncStorage, TextInput, TouchableOpacity, Image } from 'react-native'

import MapboxGL from '@mapbox/react-native-mapbox-gl'
MapboxGL.setAccessToken('pk.eyJ1IjoibHV1YW5jYXNzaWFubyIsImEiOiJjanBzeWF4aHcwMGNyM3dwYTYzeTlsY2VmIn0.ReacoepEj0J0hJpbyHogYQ')

import { 
    Container 
} from './styles'

import api from '../../services/api'

export default function TravelConfirmation() {

    const [origin, setOrigin] = useState('')
    const [driverId, setDriverId] = useState(null)
    const [driverName, setDriverName] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [destination, setDestination] = useState('')
    const [travelDate, setTravelDate] = useState('')
    const [numberPassengers, setNumberPassengers] = useState('')


    useEffect(() => {
        async function loadDataFromStorage() {
            const travelOrigin = await AsyncStorage.getItem('origem')
            setOrigin(travelOrigin)

            const travelDestination = await AsyncStorage.getItem('destino')
            setDestination(travelDestination)

            const data = await AsyncStorage.getItem('RentGoDriver')
            const info = JSON.parse(data)
            
            setDriverName(info.fullname)
            setProfileImage(info.profile_image)
            setDriverId(info.id)
        }

        loadDataFromStorage()
    }, [])

    async function travelSolicitation() {
        const passengers = parseInt(numberPassengers)

        try {
            const response = await api.post('/api/trip', {
                origin: origin,
                destination : destination,
                travel_date : travelDate,
                number_passengers : passengers,
                travel_distance : 206,
                passenger_id : 1,
                driver_id : driverId,
                travel_price : 1200.00
            })

            console.log('travel response', response)
        } catch (error) {
            
        }
    }

    return (
        <Container>
            <MapboxGL.MapView
                centerCoordinate={[-49.340435,-25.471456]}
                styleURL={MapboxGL.StyleURL.Light}
                style={{ width: '100%', height: 300 }}
                zoomLevel={6}
            >
                {/* <MapboxGL.ShapeSource id="line" shape={route}>
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
                </MapboxGL.ShapeSource> */}
            </MapboxGL.MapView>

            <View style={{padding: 20}}>

                <View style={{flexDirection: "row"}}>
                    <Image source={{uri: profileImage}} style={{width: 60, height: 60, borderRadius: 30}}/>
                    <Text style={{margin: 15}}>{driverName}</Text>
                </View>


                <Text style={{marginTop: 20, marginBottom: 10}}>Origem</Text>
                <View style={{flexDirection: 'row', alignSelf: "stretch", borderRadius: 5, backgroundColor: '#E5E5E5'}}>
                    <TextInput 
                        placeholder="Origem"
                        placeholderTextColor="#1C2331"
                        value={origin}
                        editable={false}  
                        style={{fontSize: 16, color: '#1C2331', alignSelf: "stretch", flex: 1, marginLeft: 20}}
                    />
                </View>

                <Text style={{marginTop: 20, marginBottom: 10}}>Destino</Text>
                <View style={{flexDirection: 'row', alignSelf: "stretch", borderRadius: 5, backgroundColor: '#E5E5E5'}}>
                    <TextInput 
                        placeholder="Origem"
                        placeholderTextColor="#1C2331"
                        value={destination}
                        editable={false}  
                        style={{fontSize: 16, color: '#1C2331', alignSelf: "stretch", flex: 1, marginLeft: 20}}
                    />
                </View>

                <Text style={{marginTop: 20, marginBottom: 10}}>Data de ida</Text>
                <View style={{flexDirection: 'row', alignSelf: "stretch", borderRadius: 5, backgroundColor: '#E5E5E5'}}>
                    <TextInput 
                        placeholder="Data ida"
                        placeholderTextColor="#1C2331"
                        style={{fontSize: 16, color: '#1C2331', alignSelf: "stretch", flex: 1, marginLeft: 20}}
                        value={travelDate}
                        onChangeText={setTravelDate}
                    />
                </View>

                <Text style={{marginTop: 20, marginBottom: 10}}>Data de volta</Text>
                <View style={{flexDirection: 'row', alignSelf: "stretch", borderRadius: 5, backgroundColor: '#E5E5E5'}}>
                    <TextInput 
                        placeholder="Data volta"
                        placeholderTextColor="#1C2331"
                        style={{fontSize: 16, color: '#1C2331', alignSelf: "stretch", flex: 1, marginLeft: 20}}
                    />
                </View>

                <Text style={{marginTop: 20, marginBottom: 10}}>Quantidade de passageiros</Text>
                <View style={{flexDirection: 'row', alignSelf: "stretch", borderRadius: 5, backgroundColor: '#E5E5E5'}}>
                    <TextInput 
                        placeholder="Passageiros"
                        placeholderTextColor="#1C2331"
                        style={{fontSize: 16, color: '#1C2331', alignSelf: "stretch", flex: 1, marginLeft: 20}}
                        value={numberPassengers}
                        onChangeText={setNumberPassengers}
                    />
                </View>

                <View style={{marginTop: 20}}>
                    <TouchableOpacity onPress={travelSolicitation} style={{backgroundColor: '#1C2331', flex: 1, justifyContent: "center", alignItems: "center", borderRadius: 30, padding: 15}}>
                        <Text style={{color: '#FFFFFF'}}>Solicitar viagem</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Container>
    )
}