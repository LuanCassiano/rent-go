import React, { useState, useEffect } from 'react'
import { Modal, AsyncStorage, Text } from 'react-native'

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
    TextButton
} from './styles'

import Header from '../../components/Header'
import CardDriver from '../../components/CardDrivers'

import closeIcon from '../../assets/icons/closemenu.png'

export default function HomeScreen(props) {

    const [modalVisible, setModalVisible] = useState(true)
    const [drivers, setDriver] = useState([])
    const [addressOrigem, setAddressOrigem] = useState('')
    const [addressDestiny, setAddressDestiny] = useState('')
    const [coordinatesOrigem, setCoordOrigem] = useState({
        lattOrigem: null,
        longOrigem: null
    })
    const [coordinatesDestiny, setCoordDestiny] = useState({
        lattDest: null,
        longDest: null
    })
    const [distance, setDistance] = useState('')


    const searchGooglePlaceOrigem = async (address) => {
        const response = await getGeoInfo({
            street: address,
        })

        setCoordOrigem({
            lattOrigem: response[1],
            longOrigem: response[0]
        })
    }

    const searchGooglePlaceDestiny = async (address) => {
        const response = await getGeoInfo({
            street: address,
        })

        setCoordDestiny({
            lattDest: response[1],
            longDest: response[0]
        })
    }

    travelDistance = async () => {
        const response = await getDistance(coordinatesOrigem.lattOrigem, coordinatesOrigem.longOrigem, coordinatesDestiny.lattDest, coordinatesDestiny.longDest)

        setDistance(response)
        setModalVisible(!modalVisible)
    }

    closeModal = () => {
        setModalVisible(!modalVisible)
    }

    toggleDrawer = () => {
        props.navigation.toggleDrawer()
    }

    useEffect(() => {
        async function loadUserAuthenticated() {
            try {
                const response = await api.get('/api/passenger')
                
                await AsyncStorage.setItem('RentGoUser', JSON.stringify(response.data.result[0]))
                
            } catch (error) {
                console.log(error)
            }
        }
        loadUserAuthenticated()
    }, [])

    useEffect(() => {
        async function loadDrivers() {
            try {
                const response = await api.get(`/api/drivers?dist_max=${distance}`)
                setDriver(response.data.result)
            } catch (error) {
                console.log(error)
            }
        }

        loadDrivers()
    }, [distance])

    return (
        <>
            <Header 
                title="Rent&#38;Go"
                onDrawer={toggleDrawer}
            />

            <CardDriver driver={drivers} navigation={props.navigation}/>

            <Modal animationType="fade" transparent visible={modalVisible} onRequestClose={() => {}}>
                <Container>
                    <Content>
                        <ButtonCloseModal onPress={closeModal}>
                            <ButtonCloseModalIcon source={closeIcon}/>
                        </ButtonCloseModal>

                        <Input 
                            placeholder="Aonde você está ?"
                            placeholderTextColor="#1C2331"
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={setAddressOrigem}
                            onEndEditing={(e) => searchGooglePlaceOrigem(e.nativeEvent.text)}
                            value={addressOrigem}
                        />

                        <Input 
                            placeholder="Qual seu destino ?"
                            placeholderTextColor="#1C2331"
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={setAddressDestiny}
                            onEndEditing={(e) => searchGooglePlaceDestiny(e.nativeEvent.text)}
                            value={addressDestiny}
                        />

                        <ButtonSubmit onPress={travelDistance}>
                            <TextButton>Solicitar motorista</TextButton>
                        </ButtonSubmit>
                    </Content>
                </Container>
            </Modal>
        </>
    );
}