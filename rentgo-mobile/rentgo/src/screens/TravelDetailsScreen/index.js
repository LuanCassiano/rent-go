import React, { useEffect, useState } from 'react'
import { AsyncStorage } from 'react-native'
import MapboxGL from '@mapbox/react-native-mapbox-gl'

MapboxGL.setAccessToken('pk.eyJ1IjoibHV1YW5jYXNzaWFubyIsImEiOiJjanBzeWF4aHcwMGNyM3dwYTYzeTlsY2VmIn0.ReacoepEj0J0hJpbyHogYQ')

import { 
    Container
} from './styles';

import Header from '../../components/Header'

export default function TravelDetails(props) {

    const [dataTravel, setData] = useState([])

    const [route, setRoute] = useState({
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "LineString",
                    "coordinates": dataTravel
                }
            }
        ]
        
    })

    goBack = () => {
        props.navigation.goBack()
    }

    useEffect(() => {
        async function loadDataTravelFromStorage() {
            const data = await AsyncStorage.getItem('TravelPath')
            const info = JSON.parse(data)

            info.map(path => {
                dataTravel.push(path)
            })

            setData(info)
        }

        loadDataTravelFromStorage()
    }, [])


    return (
        <Container>
            <Header 
                title="Detalhes da viagem"
                goBack={goBack}
            />

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
        </Container>
    )
}