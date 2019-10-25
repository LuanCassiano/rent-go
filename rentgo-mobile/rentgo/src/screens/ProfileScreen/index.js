import React, { useEffect, useState } from 'react'
import { AsyncStorage, ScrollView, View, Text, Image } from 'react-native'

import {
    ImageProfile,
    TextProfileName,
    Divider,
} from './styles'

import Header from '../../components/Header'
import Container from '../../components/Container'

export default function ProfileScreen(props) {

    const [username, setUsername] = useState('')
    const [usernameImage, setImage] = useState('')
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    toggleDrawer = () => {
        props.navigation.toggleDrawer()
    }

    useEffect(() => {
        async function loadDataFromStorage() {
            const data = await AsyncStorage.getItem('RentGoUser')
            const info = JSON.parse(data)


            setFullname(info.fullname)
            setUsername(info.username)
            setImage(info.profile_image)
            setEmail(info.email)
            setPhone(info.mobile_phone)
        }

        loadDataFromStorage()
    }, [username])

    return (
        <>
            <Header 
                title="Minha conta"
                onDrawer={toggleDrawer}
            />
            <Container noPadding={false}>
                <ScrollView>
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <View style={{flex: 1, alignItems: "center", justifyContent: "center", width: 120, height: 120, borderRadius: 60, backgroundColor: '#E5E9F0', position: "relative", top: 50, left: 0, right: 0, bottom: 0, zIndex: 9999}}>
                            <ImageProfile source={{ uri: usernameImage }}/>
                        </View>
                    </View>

                    <View style={{padding: 20}}>
                        <View style={{flex: 1, backgroundColor: '#E5E9F0', padding: 20, borderRadius: 10, top: -20, left: 0, right: 0, bottom: 0, position: "relative"}}>
                            <View style={{marginTop: 40}}>
                                <View style={{flex: 1, alignItems: "center"}}>
                                    <TextProfileName>{fullname}</TextProfileName>
                                </View>

                                <View style={{flex: 1, alignItems:  "center", backgroundColor: '#1C2331', padding: 20, marginLeft: -20, marginRight: -20, marginBottom: 10, marginTop: 10}}>
                                    <View style={{flexDirection: "row"}}>
                                        <View style={{flexDirection: "column"}}>
                                            <Text style={{color: '#FFFFFF', textAlign: "center"}}>0</Text>
                                            <Text style={{color: '#FFFFFF', fontSize: 12}}>Viagens</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                    <TextProfileName>Usuário</TextProfileName>
                                    <TextProfileName>{username}</TextProfileName>
                                </View>
                                <Divider />
                                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                    <TextProfileName>E-mail</TextProfileName>
                                    <TextProfileName>{email}</TextProfileName>
                                </View>
                                <Divider />
                                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                    <TextProfileName>Telefone</TextProfileName>
                                    <TextProfileName>{phone}</TextProfileName>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Container>
        </>
    )
}