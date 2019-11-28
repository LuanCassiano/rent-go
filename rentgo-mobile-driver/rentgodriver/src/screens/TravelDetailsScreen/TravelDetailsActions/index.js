import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

export default function TravelDetailsActions({ travelStatus, item, acceptTravel, startTravel, finishTravel }) {

    const _renderActionButton = () => {
        switch (travelStatus) {
            case 'waiting_driver':
                return (
                    <TouchableOpacity style={{ padding: 20, borderRadius: 5, backgroundColor: '#00C851' }} onPress={() => acceptTravel(item)}>
                        <Text>Aceitar</Text>
                    </TouchableOpacity>
                )

            case 'scheduled':
                return (
                    <TouchableOpacity style={{ padding: 20, borderRadius: 5, backgroundColor: '#00C851' }} onPress={() => startTravel(item)}>
                        <Text>Iniciar viagem</Text>
                    </TouchableOpacity>
                )

            case 'in_progress':
                return (
                    <TouchableOpacity style={{ padding: 20, borderRadius: 5, backgroundColor: '#00C851' }} onPress={() => finishTravel(item)}>
                        <Text>Finalizar</Text>
                    </TouchableOpacity>
                )
            default:
                break;
        }
    }

    return (
        <>
            { _renderActionButton()}
        </>
    )
}
