import React, { useEffect } from 'react'
import { AsyncStorage, ScrollView, View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import {
    ImageProfile,
    TextProfileName,
    Divider,
} from './styles'

import Header from '../../components/Header'
import Container from '../../components/Container'

import { Creators as DriverActions } from '../../store/ducks/driver'
import { Creators as DriverRatingActions } from '../../store/ducks/driver_rating'

export default function ProfileScreen(props) {

    const driverState = useSelector(state => state.driver)
    const driverRatingState = useSelector(state => state.driver_rating)

    const dispatch = useDispatch()

    toggleDrawer = () => {
        props.navigation.toggleDrawer()
    }

    useEffect(() => {
        async function loadDataFromStorage() {
            const data = await AsyncStorage.getItem('RentGoDriverUser')
            const info = JSON.parse(data)

            dispatch(DriverActions.getDriverRequest(info.id))
            dispatch(DriverRatingActions.getDriverRatingRequest(info.id))
        }

        loadDataFromStorage()
    }, [])

    return (
        <>
            <Header
                title="Minha conta"
                onDrawer={toggleDrawer}
            />
            <Container noPadding={false}>
                <ScrollView>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", width: 120, height: 120, borderRadius: 60, backgroundColor: '#E5E9F0', position: "relative", top: 50, left: 0, right: 0, bottom: 0, zIndex: 9999 }}>
                            <ImageProfile source={{ uri: driverState.data.profile_image }} />
                        </View>
                    </View>

                    <View style={{ padding: 20 }}>
                        <View style={{ flex: 1, backgroundColor: '#E5E9F0', padding: 20, borderRadius: 10, top: -20, left: 0, right: 0, bottom: 0, position: "relative" }}>
                            <View style={{ marginTop: 40 }}>
                                <View style={{ flex: 1, alignItems: "center" }}>
                                    <TextProfileName>{driverState.fullname}</TextProfileName>
                                </View>

                                <View style={{ backgroundColor: '#1C2331', padding: 20, marginLeft: -20, marginRight: -20, marginBottom: 10, marginTop: 10 }}>
                                    <View style={{ flexDirection: "row", justifyContent: 'space-around' }}>
                                        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", flex: 1 }}>
                                            <Text style={{ textAlign: "center", color: "#E5E9F0", fontFamily: 'Quicksand-Medium', fontSize: 12 }}>{driverRatingState.rating}</Text>
                                            <Text style={{ textAlign: "center", color: "#E5E9F0", fontFamily: 'Quicksand-Medium', fontSize: 12 }}>Nota</Text>
                                        </View>
                                        <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center", flex: 1}}>
                                            <Text style={{textAlign: "center", color: "#E5E9F0", fontFamily: 'Quicksand-Medium', fontSize: 12}}>{driverRatingState.positiveNotes}</Text>
                                            <Text style={{textAlign: "center", color: "#E5E9F0", fontFamily: 'Quicksand-Medium', fontSize: 12 }}>Avaliações positivas</Text>
                                        </View>
                                        <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center", flex: 1}}>
                                            <Text style={{textAlign: "center", color: "#E5E9F0", fontFamily: 'Quicksand-Medium', fontSize: 12}}>{driverRatingState.negativeNotes}</Text>
                                            <Text style={{textAlign: "center", color: "#E5E9F0", fontFamily: 'Quicksand-Medium', fontSize: 12 }}>Avaliações negativas</Text>
                                        </View> 
                                        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", flex: 1 }}>
                                            <Text style={{ textAlign: "center", color: "#E5E9F0", fontFamily: 'Quicksand-Medium', fontSize: 12 }}>{driverState.driverTrips.length}</Text>
                                            <Text style={{ textAlign: "center", color: "#E5E9F0", fontFamily: 'Quicksand-Medium', fontSize: 12 }}>Viagens</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <TextProfileName>Usuário</TextProfileName>
                                    <TextProfileName>{driverState.data.user.username}</TextProfileName>
                                </View>
                                <Divider />
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <TextProfileName>E-mail</TextProfileName>
                                    <TextProfileName>{driverState.data.user.email}</TextProfileName>
                                </View>
                                <Divider />
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <TextProfileName>Telefone</TextProfileName>
                                    <TextProfileName>{driverState.data.mobile_phone}</TextProfileName>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Container>
        </>
    )
}