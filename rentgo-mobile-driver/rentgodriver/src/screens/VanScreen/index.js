import React, { useEffect, useState } from 'react'
import { Modal, Text, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../../services/api'

import Header from '../../components/Header'

import { 
    Container,
    Fab,
    FabIcon,
    ModalContainer,
    ModalContent,
    ButtonCloseModal,
    Input
} from './styles'

export default function VanScreen(props) {

    const [modalVisible, setModalVisible] = useState(false)
    const [model, setModel] = useState('')
    const [color, setColor] = useState('')
    const [plate, setPlate] = useState('')
    const [passengers, setPassengers] = useState('')
    const [details, setDetails] = useState('')
    const [driverId, setDriverId] = useState(null)

    openModal = () => {
        setModalVisible(!modalVisible)
    }

    closeModal = () => {
        setModalVisible(!modalVisible)
    }

    async function handleSubmitVan() {
        const numPassenger = parseInt(passengers)
        console.log(numPassenger)

        try {
            const response = await api.post(`/api/van?driver=${driverId}`, {
                model: model,
                color: color,
                plate: plate,
                amount_passenger: numPassenger,
                details: details
            })

            console.log('response', response)
        } catch (error) {
            console.log(error.messages)
        }
    }

    useEffect(() => {
        async function loadDataFromStorage() {
            const data = await AsyncStorage.getItem('RentGoDriver')
            const info = JSON.parse(data)

            setDriverId(info.id)
        }

        loadDataFromStorage()
    }, [])

    return (
        <Container>
            <Header 
                title="Suas Vans"
                onDrawer={() => {}}
            />

            <Fab onPress={openModal}>
                <FabIcon source={require('../../assets/icons/plus.png')}/>
            </Fab>

            <Modal animationType="fade" transparent visible={modalVisible} onRequestClose={() => {}}>
                <ModalContainer>
                    <ModalContent>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <ButtonCloseModal onPress={closeModal}>
                                <Image source={require('../../assets/icons/exit.png')} style={{width: 15, height: 15}}/>
                            </ButtonCloseModal>


                            <Input 
                                placeholder="Modelo"
                                autoCapitalize="none" 
                                autoCorrect={false} 
                                underlineColorAndroid="transparent" 
                                value={model}
                                onChangeText={setModel}
                            />

                            <Input 
                                placeholder="Cor"
                                autoCapitalize="none" 
                                autoCorrect={false} 
                                underlineColorAndroid="transparent" 
                                value={color}
                                onChangeText={setColor}
                            />

                            <Input 
                                placeholder="Placa"
                                autoCapitalize="none" 
                                autoCorrect={false} 
                                underlineColorAndroid="transparent" 
                                value={plate}
                                onChangeText={setPlate}
                            />

                            <Input 
                                placeholder="Número de passageiros"
                                autoCapitalize="none" 
                                autoCorrect={false} 
                                underlineColorAndroid="transparent" 
                                value={passengers}
                                onChangeText={setPassengers}
                            />

                            <Input 
                                placeholder="Detalhes e observações"
                                autoCapitalize="none" 
                                autoCorrect={false} 
                                underlineColorAndroid="transparent"
                                multiline={true}
                                numberOfLines={4}
                                value={details}
                                onChangeText={setDetails}
                            />

                            <TouchableOpacity style={{backgroundColor: '#384662', borderRadius: 30, padding: 15}} onPress={handleSubmitVan}>
                                <Text style={{color: '#FFFFFF', textAlign: "center"}}>Salvar</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </ModalContent>
                </ModalContainer>
            </Modal>
        </Container>
    )
}