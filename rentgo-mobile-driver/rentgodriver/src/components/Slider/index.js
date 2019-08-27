import React from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'

import { 
    Container,
    CardTripContainer,
    CardTripContent,
    CardTripInfo,
    CardVanContainer,
    CardVanContent,
    CardVanInfo,
    CardVanMedia,
    H2,
    H4,
    Label
} from './styles';

export default function Slider(props) {

    _renderContent = () => {
        if(props.vans) {
            return (
                <CardVanContainer>
                    <CardVanContent>
                        <CardVanMedia source={{ uri: props.vans.photo_van }}/>
                        <CardVanInfo>
                            <H2>{props.vans.model}</H2>
                            <H2>{props.vans.amount_passenger} lugares</H2>
                        </CardVanInfo>
                    </CardVanContent>
                </CardVanContainer>
            )
        }
        
        if(props.trips) {
            return (
                <CardTripContainer>
                    <CardTripContent>
                        <CardTripInfo>
                            <Label>De</Label>
                            <H4>{props.trips.origin}</H4>
                        </CardTripInfo>
                        <CardTripInfo>
                            <Label>Para</Label>
                            <H4>{props.trips.destination}</H4>
                        </CardTripInfo>
                    </CardTripContent>
                </CardTripContainer>
            )
        }
    }

    return (
        <Container>
            { _renderContent()}
        </Container>
    )
}