import React, { useEffect, useState } from 'react'
import { Modal, Text, ScrollView, TouchableOpacity, FlatList, Image, View } from 'react-native'
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
    Input,
    CardVanContainer,
    CardVanContent,
    CardVanInfo,
    CardVanMedia,
    H2
} from './styles'

export default function VanScreen(props) {

    const [modalVisible, setModalVisible] = useState(false)
    const [model, setModel] = useState('')
    const [color, setColor] = useState('')
    const [plate, setPlate] = useState('')
    const [passengers, setPassengers] = useState('')
    const [details, setDetails] = useState('')
    const [driverId, setDriverId] = useState(null)
    const [vans, setVans] = useState([])

    openModal = () => {
        setModalVisible(!modalVisible)
    }

    closeModal = () => {
        setModalVisible(!modalVisible)
    }

    toggleDrawer = () => {
        props.navigation.toggleDrawer()
    }

    _renderVans = (item) => {
        return (
            <View style={{padding: 20}}>
                <CardVanContainer>
                    <CardVanContent>
                        <CardVanMedia source={{ uri: item.photo_van }}/>
                        <CardVanInfo>
                            <H2>{item.model}</H2>
                            <H2>{item.color}</H2>
                        </CardVanInfo>
                    </CardVanContent>
                </CardVanContainer>
            </View>
        )
    }

    async function handleSubmitVan() {
        const numPassenger = parseInt(passengers)

        try {
            await api.post(`/api/van?driver=${driverId}`, {
                model: model,
                color: color,
                plate: plate,
                amount_passenger: numPassenger,
                details: details
            })

            setModalVisible(!modalVisible)
        } catch (error) {
            console.log(error.messages)
        }
    }

    useEffect(() => {
        async function loadDataFromStorage() {
            const data = await AsyncStorage.getItem('RentGoDriverUser')
            const info = JSON.parse(data)

            setDriverId(info.id)
        }

        loadDataFromStorage()
    }, [])

    useEffect(() => {
        async function loadVans() {
            const response = await api.get(`/api/van?driver=${driverId}&page=1`)
            setVans(response.data.result.data)
        }

        loadVans()
    }, [])

    return (
        <Container>
            <Header 
                title="Suas Vans"
                onDrawer={toggleDrawer}
            />

            <FlatList 
                keyExtractor={item => String(item.id)}
                data={vans}
                renderItem={({ item }) => _renderVans(item)}
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