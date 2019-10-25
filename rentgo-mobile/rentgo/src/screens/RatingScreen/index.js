import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import api from '../../services/api'

import {
    Content
} from './styles'

import Container from '../../components/Container'
import Header from '../../components/Header'

export default function RatingScreen(props) {

    const info = props.navigation.getParam('data')

    const [rating1, setRating1] = useState(false)
    const [rating2, setRating2] = useState(false)
    const [rating3, setRating3] = useState(false)
    const [rating4, setRating4] = useState(false)
    const [rating5, setRating5] = useState(false)
    const [note, setNote] = useState(0)

    const toggleDrawer = () => {
        props.navigation.toggleDrawer()
    }

    const noteSelected = (note) => {
        switch (note) {
            case 1:
                setRating1(true)
                setRating2(false)
                setRating3(false)
                setRating4(false)
                setRating5(false)
                setNote(1)
                break

            case 2:
                setRating1(true)
                setRating2(true)
                setRating3(false)
                setRating4(false)
                setRating5(false)
                setNote(2)
                break

            case 3:
                setRating1(true)
                setRating2(true)
                setRating3(true)
                setRating4(false)
                setRating5(false)
                setNote(3)
                break

            case 4:
                setRating1(true)
                setRating2(true)
                setRating3(true)
                setRating4(true)
                setRating5(false)
                setNote(4)
                break

            case 5:
                setRating1(true)
                setRating2(true)
                setRating3(true)
                setRating4(true)
                setRating5(true)
                setNote(5)
                break

            default:
                break;
        }
    }

    const avaliate = async () => {

        try {
            await api.post('/api/driver-rating', {
                passenger_id: info.passenger.id,
                driver_id: info.driver_id,
                travel_done: info.id,
                note: note
            })

            props.navigation.navigate('Home')

        } catch (error) {
            console.tron.log('ih deu erro', error)
        }
    }

    return (
        <Container noPadding={false}>
            <Header
                title="Avaliação do motorista"
                onDrawer={toggleDrawer}
            />

            <Content>
                <View style={{ padding: 20, backgroundColor: '#e5e9f0', borderRadius: 10 }}>
                    <View style={{ alignItems: "center" }}>
                        <Image source={require('../../assets/icons/medal.png')} style={{ width: 80, height: 80 }} />
                    </View>

                    <View style={{ marginBottom: 20, marginTop: 20 }}>
                        <Text style={{ fontSize: 20, fontFamily: 'Quicksand-Bold', textAlign: 'center', color: '#1C2331' }}>Avalie a sua viagem</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity onPress={() => noteSelected(1)}>
                            <Image source={rating1 === false ? require('../../assets/icons/starRating.png') : require('../../assets/icons/starRatingSelected.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => noteSelected(2)}>
                            <Image source={rating2 === false ? require('../../assets/icons/starRating.png') : require('../../assets/icons/starRatingSelected.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => noteSelected(3)}>
                            <Image source={rating3 === false ? require('../../assets/icons/starRating.png') : require('../../assets/icons/starRatingSelected.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => noteSelected(4)}>
                            <Image source={rating4 === false ? require('../../assets/icons/starRating.png') : require('../../assets/icons/starRatingSelected.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => noteSelected(5)}>
                            <Image source={rating5 === false ? require('../../assets/icons/starRating.png') : require('../../assets/icons/starRatingSelected.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                    </View>

                    {note !== 0 &&
                        <TouchableOpacity onPress={avaliate} style={{ backgroundColor: '#1c2331', padding: 20, borderRadius: 30, marginTop: 20 }}>
                            <Text style={{ color: '#e5e9f0', textAlign: 'center', fontSize: 16, fontFamily: 'Quicksand-Bold' }}>Avaliar</Text>
                        </TouchableOpacity>
                    }
                </View>
            </Content>
        </Container>
    )
}