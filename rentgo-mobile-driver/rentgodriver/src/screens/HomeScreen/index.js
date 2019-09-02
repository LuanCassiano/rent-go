import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import api from '../../services/api'

import Header from '../../components/Header'
import Slider from '../../components/Slider'

import data from '../../data.json'

import { 
    Container,
    Label,
    CardInfo,
    CardInfoContent,
    CardInfoMedia,
    Paragraph,
    Row,
    Section,
    ViewCenter
} from './styles';

export default function HomeScreen(props) {

    const [vans, setVans] = useState([])

    toggleDrawer = () => {
        props.navigation.toggleDrawer()
    }

    useEffect(() => {
        async function loadVans() {
            const data = await AsyncStorage.getItem('RentGoDriver')
            const info = JSON.parse(data)

            const response = await api.get(`/api/van?driver=${info.id}`)
            setVans(response.data.result)
        }

        loadVans()
    }, [vans])

    useEffect(() => {
        async function createPlayerNotify() {
            const notificationId = await AsyncStorage.getItem('OneSignalId')

            const res = await api.post('/api/notification', {
                player_id: notificationId
            })

            console.log('response', res)
        }

        createPlayerNotify()
    }, [])

    return (
        <Container>
            <Header 
                title="RentGo Driver"
                onDrawer={toggleDrawer}
            />

            <Section>
                <Label>Informações Gerais</Label>

                <Row>
                    <CardInfo>
                        <ViewCenter>
                            <CardInfoMedia source={require('../../assets/icons/myvan.png')}/>
                        </ViewCenter>
                        <CardInfoContent>
                            <Paragraph>0</Paragraph>
                            <Paragraph isMargin={true}>Viagens realizadas</Paragraph>
                        </CardInfoContent>
                    </CardInfo>
                    <CardInfo>
                        <ViewCenter>
                            <CardInfoMedia source={require('../../assets/icons/road.png')}/>
                        </ViewCenter>
                        <CardInfoContent>
                            <Paragraph>0 km</Paragraph>
                            <Paragraph isMargin={true}>Distância percorrida</Paragraph>
                        </CardInfoContent>
                    </CardInfo>
                </Row>
            </Section>

            <Section>
                <Label>Suas Vans</Label>

                <FlatList 
                    keyExtractor={item => String(item.id)}
                    data={vans}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <Slider vans={item}/>}
                />
            </Section>

            <Section>
                <Label>Últimas viagens</Label>

                <FlatList 
                    keyExtractor={item => String(item.id)}
                    data={data.trips}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <Slider trips={item}/>}
                />
            </Section>
        </Container>
    )
}