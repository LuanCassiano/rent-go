import React, { useEffect, useState } from 'react'
import { View, Text, AsyncStorage, TextInput } from 'react-native'

import MapboxGL from '@mapbox/react-native-mapbox-gl'
MapboxGL.setAccessToken('pk.eyJ1IjoibHV1YW5jYXNzaWFubyIsImEiOiJjanBzeWF4aHcwMGNyM3dwYTYzeTlsY2VmIn0.ReacoepEj0J0hJpbyHogYQ')

import { 
    Container 
} from './styles';

export default function TravelConfirmation() {

    const [origin, setOrigin] = useState('')
    const [destination, setDestination] = useState('')


    useEffect(() => {
        async function loadDataFromStorage() {
            const travelOrigin = await AsyncStorage.getItem('origem')
            setOrigin(travelOrigin)

            const travelDestination = await AsyncStorage.getItem('destino')
            setDestination(travelDestination)
        }

        loadDataFromStorage()
    }, [])

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
            </View>

        </Container>
    )
}