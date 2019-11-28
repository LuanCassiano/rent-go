import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'

import api from '../../services/api'

import {
    Content
} from './styles'

import Container from '../../components/Container'
import Header from '../../components/Header'

export default function RatingScreen(props) {

    const data = props.navigation.getParam('data')

    const [rating1, setRating1] = useState(false)
    const [rating2, setRating2] = useState(false)
    const [rating3, setRating3] = useState(false)
    const [rating4, setRating4] = useState(false)
    const [rating5, setRating5] = useState(false)
    const [loading, setLoading] = useState(false)
    const [driverName, setDriverName] = useState("")
    const [note, setNote] = useState(0)

    useEffect(() => {
        async function getDriverData() {
            setLoading(true)
            const response = await api.get(`api/driver/${data.driver_id}`)
            setDriverName(response.data.driver[0].fullname)
            setLoading(false)
        }

        getDriverData()
    }, [])

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

    const handleAddRating = async () => {
        await api.post('/api/driver-rating', {
            "passenger_id": data.passenger_id,
            "driver_id": data.driver_id,
            "travel_done": data.id,
            "note": note
        })
    }

    const handleAddToFavorite = async (status) => {
        if(status) {
            await api.post('api/favoriteDriver', {
                "passenger_id": data.passenger_id,
                "driver_id": data.driver_id,
            })

            props.navigation.navigate('Home')
            return
        }

        props.navigation.navigate('Home')

    }

    return (
        <Container noPadding={false}>
            <Header
                title="Avaliação do motorista"
                onDrawer={() => { }}
            />

            <Content>
                {loading ? (
                    <ActivityIndicator size="large" color="#E5E9F0" />
                ) : (
                        <>
                            <View style={{ padding: 20, backgroundColor: '#e5e9f0', borderRadius: 10 }}>
                                <View style={{ alignItems: "center" }}>
                                    <Image source={require('../../assets/icons/medal.png')} style={{ width: 80, height: 80 }} />
                                </View>

                                <View style={{ marginBottom: 20, marginTop: 20 }}>
                                    <Text style={{ fontSize: 20, fontFamily: 'Quicksand-Bold', textAlign: 'center', color: '#1C2331' }}>Avalie a sua viagem com o motorista Teste</Text>
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
                            </View>
                            { note > 0 && 
                                <TouchableOpacity style={{backgroundColor: '#E5E0F9', padding: 15, margin: 10, borderRadius: 30, alignSelf: 'stretch'}} onPress={handleAddRating}>
                                    <Text style={{color: '#1C2331'}}>Avaliar</Text>
                                </TouchableOpacity>
                            }

                            {note > 3 &&
                                <View style={{ marginBottom: 20, marginTop: 20 }}>
                                    <Text style={{ fontSize: 20, fontFamily: 'Quicksand-Bold', textAlign: 'center', color: '#E5E0F9' }}>Deseja adicionar o motorista {driverName} à sua lista de favoritos ?</Text>
                                
                                    <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
                                        <TouchableOpacity style={{backgroundColor: '#E5E0F9', padding: 15, margin: 10, borderRadius: 5}} onPress={() => handleAddToFavorite(true)}>
                                            <Text style={{color: '#1C2331'}}>Sim</Text>
                                        </TouchableOpacity>
                                        
                                        <TouchableOpacity style={{backgroundColor: '#E5E0F9', padding: 15, margin: 10, borderRadius: 5}} onPress={() => handleAddToFavorite(false)}>
                                            <Text style={{color: '#1C2331'}}>Não</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                        </>
                    )}
            </Content>
        </Container>
    )
}