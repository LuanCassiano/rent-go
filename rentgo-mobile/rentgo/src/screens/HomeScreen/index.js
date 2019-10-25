import React, { useState, useEffect } from 'react'
import { Modal, ActivityIndicator, View, AsyncStorage } from 'react-native'

import api from '../../services/api'
import { getGeoInfo } from '../../services/geo-api'
import { getDistance } from '../../helpers/distance'

import { 
    Container,
    ButtonCloseModal,
    ButtonCloseModalIcon,
    ButtonSubmit,
    Content,
    Input,
    TextButton,
    Fab,
    FabIcon
} from './styles'

import Header from '../../components/Header'
import CardDriver from '../../components/CardDrivers'

import closeIcon from '../../assets/icons/closemenu.png'

import OneSignal from 'react-native-onesignal'

export default function HomeScreen(props) {

    const [modalVisible, setModalVisible] = useState(true)
    const [drivers, setDriver] = useState([])
    const [addressOrigem, setAddressOrigem] = useState('')
    const [addressDestiny, setAddressDestiny] = useState('')
    const [distance, setDistance] = useState('')
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)

    travelDistance = async () => {
        setModalVisible(!modalVisible)
        setLoading(true)

        try {

            const responseOrigem = await getGeoInfo({
                street: addressOrigem
            })

            const responseDestination = await getGeoInfo({
                street: addressDestiny
            })

            const response = await getDistance(responseOrigem[1], responseOrigem[0], responseDestination[1], responseDestination[0])

            setDistance(response)

            await AsyncStorage.setItem('origem', addressOrigem)
            await AsyncStorage.setItem('destino', addressDestiny)
            
            setLoading(false)
            
        } catch (error) {
            console.log(error)
        }
    }

    openModal = () => {
        setModalVisible(!modalVisible)
    }

    closeModal = () => {
        setModalVisible(!modalVisible)
    }

    toggleDrawer = () => {
        props.navigation.toggleDrawer()
    }

    useEffect(() => {
        async function loadDrivers() {
            try {
                const response = await api.get(`/api/driver?dist_max=${distance}&page=1&status=available`)
                setDriver(response.data.drivers.data)
            } catch (error) {
                console.log(error)
            }
        }

        loadDrivers()
    }, [distance])

    useEffect(() => {
        async function loadDataFromStorage() {
            const travelOrigin = await AsyncStorage.getItem('origem')
            setAddressOrigem(travelOrigin)

            const travelDestination = await AsyncStorage.getItem('destino')
            setAddressDestiny(travelDestination)
        }

        loadDataFromStorage()
    }, [modalVisible])

    useEffect(() => {
        async function createPlayerNotify() {
            const notificationId = await AsyncStorage.getItem('OneSignalId')

            const res = await api.post('/api/notification', {
                player_id: notificationId
            })
        }

        createPlayerNotify()
    }, [])

    useEffect(() => {
        OneSignal.addEventListener('opened', openedPush)
    }, [])

    async function openedPush(push) {

        console.tron.log('chama na notification', push)

        if(push.notification.payload.actionButtons[0].text === "Realizar pagamento") {
            props.navigation.navigate('Payment', {
                data: push.notification.payload.additionalData
            })
        }
    }

    return (
        <>
            <Header 
                title="RentGo"
                onDrawer={toggleDrawer}
            />

            { loading ? 
            (
                <View style={{flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: '#1C2331'}}>
                    <ActivityIndicator size="large" color="#E5E9F0"/>
                </View>
            ) 
                : 
            (
                <CardDriver driver={drivers} navigation={props.navigation}/>
            )}

            <Fab onPress={openModal}>
                <FabIcon source={require('../../assets/icons/destination.png')}/>
            </Fab>

            <Modal animationType="fade" transparent visible={modalVisible} onRequestClose={() => {}}>
                <Container>
                    <Content>
                        <ButtonCloseModal onPress={closeModal}>
                            <ButtonCloseModalIcon source={closeIcon}/>
                        </ButtonCloseModal>

                        <Input 
                            placeholder="Origem da viagem"
                            placeholderTextColor="#1C2331"
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={setAddressOrigem}
                            value={addressOrigem}
                        />

                        <Input 
                            placeholder="Destino da viagem"
                            placeholderTextColor="#1C2331"
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={setAddressDestiny}
                            value={addressDestiny}
                        />

                        <ButtonSubmit onPress={travelDistance}>
                            <TextButton>Solicitar motorista</TextButton>
                        </ButtonSubmit>
                    </Content>
                </Container>
            </Modal>
        </>
    )
}