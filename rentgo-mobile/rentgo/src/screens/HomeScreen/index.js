import React, { useState, useEffect } from 'react'
import { Modal, ActivityIndicator, View } from 'react-native'

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
    const [loading, setLoading] = useState(false)


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
        setModalVisible(!modalVisible)
        setLoading(true)
        try {
            const response = await getDistance(coordinatesOrigem.lattOrigem, coordinatesOrigem.longOrigem, coordinatesDestiny.lattDest, coordinatesDestiny.longDest)
            setLoading(false)
            setDistance(response)
            
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
                const response = await api.get(`/api/drivers?dist_max=${distance}`)
                setDriver(response.data.result.data)
            } catch (error) {
                console.log(error)
            }
        }

        loadDrivers()
    }, [distance])

    return (
        <>
            <Header 
                title="RentGo"
                onDrawer={toggleDrawer}
            />

            { loading ? 
            (
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <ActivityIndicator size="large" color="#1C2331"/>
                </View>
            ) 
                : 
            (
                <CardDriver driver={drivers} navigation={props.navigation}/>
            )}

            <Fab onPress={openModal}>
                <FabIcon source={require('../../assets/icons/tourist.png')}/>
            </Fab>

            <Modal animationType="fade" transparent visible={modalVisible} onRequestClose={() => {}}>
                <Container>
                    <Content>
                        <ButtonCloseModal onPress={closeModal}>
                            <ButtonCloseModalIcon source={closeIcon}/>
                        </ButtonCloseModal>

                        <Input 
                            placeholder="Ponto de partida ?"
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
    )
}