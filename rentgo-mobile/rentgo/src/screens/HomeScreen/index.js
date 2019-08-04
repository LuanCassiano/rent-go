import React, { useState, useEffect } from 'react';
import { Modal } from 'react-native';

import { 
    Container,
    ButtonCloseModal,
    ButtonCloseModalIcon,
    ButtonSubmit,
    Content,
    Input,
    TextButton,
    ViewGeneric
} from './styles';

import Header from '../../components/Header'
import CardDriver from '../../components/CardDrivers'

import closeIcon from '../../assets/icons/closemenu.png'

import data from '../../data.json'

export default function HomeScreen(props) {

    console.log('props home', props)

    const [modalVisible, setModalVisible] = useState(false)
    const [drivers, setDriver] = useState([])

    closeModal = () => {
        setModalVisible(!modalVisible)
    }

    toggleDrawer = () => {
        props.navigation.toggleDrawer()
    }

    useEffect(() => {
        setDriver(data)
    }, [])

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
                        />

                        <Input 
                            placeholder="Qual seu destino ?"
                            placeholderTextColor="#1C2331"
                        />

                        <ButtonSubmit>
                            <TextButton>Solicitar motorista</TextButton>
                        </ButtonSubmit>
                    </Content>
                </Container>
            </Modal>
        </>
    );
}