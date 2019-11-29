import React, { useEffect, useState } from 'react'
import { FlatList, View, ActivityIndicator, RefreshControl } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getUniqueId } from 'react-native-device-info'
import Geolocation from "@react-native-community/geolocation";
import AsyncStorage from '@react-native-community/async-storage'
import NumberFormat from 'react-number-format'

import api from '../../services/api'
import axios from 'axios'

import Header from '../../components/Header'
import Slider from '../../components/Slider'

import OneSignal from 'react-native-onesignal'

import { Creators as DriverActions } from '../../store/ducks/driver'
import { Creators as DriverMoneyActions } from '../../store/ducks/driver_money_raised'
import { Creators as DriverRatingActions } from '../../store/ducks/driver_rating'
import { Creators as DriverVanActions } from '../../store/ducks/driver_van'

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

    const driverState = useSelector(state => state.driver)
    const driverMoneyState = useSelector(state => state.driver_money)
    const driverRatingState = useSelector(state => state.driver_rating)
    const driverVanState = useSelector(state => state.driver_van)

    const dispatch = useDispatch()

    const [latt, setLatt] = useState(0)
    const [long, setLong] = useState(0)
    const [vanCurrentPage, setVanCurrentPage] = useState(1)
    const [refresh, setRefresh] = useState(false)

    toggleDrawer = () => {
        props.navigation.toggleDrawer()
    }

    useEffect(() => {
        async function loadDriverInfo() {
            const data = await AsyncStorage.getItem('RentGoDriverUser')
            const info = JSON.parse(data)

            dispatch(DriverMoneyActions.getDriverMoneyRaisedRequest(info.id))
            dispatch(DriverActions.getDriverRequest(info.id))
            dispatch(DriverRatingActions.getDriverRatingRequest(info.id))
            dispatch(DriverVanActions.getDriverVanRequest(info.id, vanCurrentPage))
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

    useEffect(() => {
        OneSignal.addEventListener('opened', openedPush)
    }, [])

    const currentDriverPosition = async (latt, long, driverId) => {
        const deviceId = getUniqueId()

        await axios({
            url: 'https://rentgo-geolocation.herokuapp.com/api/driver-location',
            method: 'POST',
            data: {
                latitude: latt,
                longitude: long,
                device_id: deviceId,
                driver_id: driverId
            }
        })
    }

    const handleRefresh = async () => {
        setRefresh(true)
        const data = await AsyncStorage.getItem('RentGoDriverUser')
        const info = JSON.parse(data)

        dispatch(DriverMoneyActions.getDriverMoneyRaisedRequest(info.id))
        dispatch(DriverActions.getDriverRequest(info.id))
        dispatch(DriverRatingActions.getDriverRatingRequest(info.id))
        dispatch(DriverVanActions.getDriverVanRequest(info.id, vanCurrentPage))
        setRefresh(false)
    }

    useEffect(() => {
        async function driverLocation() {
            const data = await AsyncStorage.getItem('RentGoDriverUser')
            const info = JSON.parse(data)

            Geolocation.getCurrentPosition(
                pos => {
                    currentDriverPosition(pos.coords.latitude, pos.coords.longitude, info.id)
                },
                e => e.message
            )
        }
        driverLocation()
    }, [])

    async function openedPush(push) {
        if(push.notification.payload.actionButtons[0].text === "Aceitar") {
            props.navigation.navigate('TravelRequests')

            return
        }

        if(push.notification.payload.actionButtons[0].text === "Visualizar") {
            props.navigation.navigate('TravelScheduled')

            return
        }
    }

    return (
        <Container refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={handleRefresh}/>
        }>
            <Header
                title="RentGo Driver"
                onDrawer={toggleDrawer}
            />

            <Section>
                <Label>Informações Gerais</Label>

                <Row>
                    <CardInfo>
                        <ViewCenter>
                            <CardInfoMedia source={require('../../assets/icons/myvan.png')} />
                        </ViewCenter>
                        <CardInfoContent>
                            { driverState.loading ? (
                                <ActivityIndicator size="small" color="#FFFFFF"/>
                            ) : (
                                <Paragraph>{driverState.driverTrips.length}</Paragraph>
                            )}
                            <Paragraph isMargin={true}>Viagens realizadas</Paragraph>
                        </CardInfoContent>
                    </CardInfo>
                    <CardInfo>
                        <ViewCenter>
                            <CardInfoMedia source={require('../../assets/icons/positive.png')} />
                        </ViewCenter>
                        <CardInfoContent>
                            { driverRatingState.loading ? (
                                <ActivityIndicator size="small" color="#FFFFFF"/>
                            ) : (
                                <Paragraph>{driverRatingState.positiveNotes}</Paragraph>
                            )}
                            <Paragraph isMargin={true}>Avaliações Positivas</Paragraph>
                        </CardInfoContent>
                    </CardInfo>
                </Row>

                <View style={{ marginTop: 20, width: '100%', padding: 15, backgroundColor: '#384662', borderRadius: 5 }}>
                    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                        <View style={{ flexDirection: 'column' }}>
                            <CardInfoMedia source={require('../../assets/icons/money.png')} />
                            <Paragraph isMargin={true}>Meu dinheiro</Paragraph>
                        </View>

                        { driverMoneyState.loading ? (
                            <ActivityIndicator size="small" color="#FFFFFF"/>
                        ) : (
                            <NumberFormat
                                value={driverMoneyState.moneyRaised}
                                displayType="text"
                                prefix="R$ "
                                decimalSeparator=","
                                decimalScale={2}
                                fixedDecimalScale
                                renderText={value => <Paragraph>{value}</Paragraph>}
                            />
                        )}

                    </View>
                </View>
            </Section>

            <Section>
                <Label>Suas Vans</Label>

                <FlatList
                    keyExtractor={item => String(item.id)}
                    data={driverVanState.data}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <Slider vans={item} />}
                />
            </Section>

            <Section>
                <Label>Últimas viagens</Label>

                <FlatList
                    keyExtractor={item => String(item.id)}
                    data={driverState.driverTrips}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <Slider trips={item} />}
                />
            </Section>
        </Container>
    )
}