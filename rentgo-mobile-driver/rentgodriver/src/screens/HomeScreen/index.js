import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import api from '../../services/api'

import Header from '../../components/Header'
import Slider from '../../components/Slider'

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
    const [driver, setDriver] = useState([])
    const [tripAmount, setTripAmount] = useState(0)
    const [trips, setTrips] = useState([])
    const [positiveNotes, setNotes] = useState(0)

    toggleDrawer = () => {
        props.navigation.toggleDrawer()
    }

    useEffect(() => {
        async function loadDriverInfo() {
            const data = await AsyncStorage.getItem('RentGoDriver')
            const info = JSON.parse(data)

            const response = await api.get(`/api/driver/${info.id}`)
            console.log(response.data.driver[0])
            setDriver(response.data.driver[0])

            setTripAmount(response.data.driver[0].trip.length)
            setVans(response.data.driver[0].vans)
            setTrips(response.data.driver[0].trip)
            setNotes(response.data.driver[0].positive_notes)
        }

        loadDriverInfo()
    }, [])

    useEffect(() => {
        async function createPlayerNotify() {
            const notificationId = await AsyncStorage.getItem('OneSignalId')

            await api.post('/api/notification', {
                player_id: notificationId
            })
            
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
                            <Paragraph>{tripAmount}</Paragraph>
                            <Paragraph isMargin={true}>Viagens realizadas</Paragraph>
                        </CardInfoContent>
                    </CardInfo>
                    <CardInfo>
                        <ViewCenter>
                            <CardInfoMedia source={require('../../assets/icons/road.png')}/>
                        </ViewCenter>
                        <CardInfoContent>
                            <Paragraph>{positiveNotes}</Paragraph>
                            <Paragraph isMargin={true}>Avaliações Positivas</Paragraph>
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
                    data={trips}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <Slider trips={item}/>}
                />
            </Section>
        </Container>
    )
}