import React from 'react'
// import MapboxGL from '@mapbox/react-native-mapbox-gl'

// MapboxGL.setAccessToken('pk.eyJ1IjoibHV1YW5jYXNzaWFubyIsImEiOiJjanBzeWF4aHcwMGNyM3dwYTYzeTlsY2VmIn0.ReacoepEj0J0hJpbyHogYQ')

import { 
    Container 
} from './styles';

import Header from '../../components/Header'

export default function TravelDetails(props) {

    goBack = () => {
        props.navigation.goBack()
    }

    return (
        <Container>
            <Header 
                title="Detalhes da viagem"
                goBack={goBack}
            />

            {/* <MapboxGL.MapView
                centerCoordinate={[-49.6446024, -27.2108001]}
                styleURL={MapboxGL.StyleURL.Dark}
                style={{ flex: 1}}
            >
                
            </MapboxGL.MapView> */}
        </Container>
    )
}