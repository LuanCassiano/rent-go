import React, { useEffect, useState } from 'react'
import { AsyncStorage, TouchableOpacity, Text } from 'react-native'
import { DrawerItems } from 'react-navigation'

import api from '../../services/api'

import { 
    Container,
    SideHeader,
    SideHeaderContent,
    SideHeaderImage,
    SideHeaderUsername,
    SideHeaderInfo,
    SideHeaderUserRating,
    SideBody
} from './styles'

export default function SideBar(props) {

    const [username, setUsername] = useState('')
    const [usernameImage, setImage] = useState('')
    const [rating, setRating] = useState('')

    toggleDrawer = () => {
        props.navigation.toggleDrawer()
    }

    async function signOut() {
        await AsyncStorage.clear()

        props.navigation.navigate('Signin')
    }

    useEffect(() => {
        async function getDriverAuth() {
            const data = await AsyncStorage.getItem('RentGoDriver')
            const info = JSON.parse(data)
            
            const response = await api.get(`/api/driver/${info.id}`)

            setRating(response.data.media)
            setUsername(info.username)
            setImage(info.profile_image)
            setDriverId(info.id)


        }

        getDriverAuth()
    }, [])

    return (
        <Container>
            <SideHeader>
                <SideHeaderContent>
                    <SideHeaderImage source={{ uri: usernameImage }}/>
                    <SideHeaderInfo>
                        <SideHeaderUsername>{username}</SideHeaderUsername>
                        <SideHeaderUserRating>Nota: {rating}</SideHeaderUserRating>
                    </SideHeaderInfo>
                </SideHeaderContent>
            </SideHeader>
            <SideBody>
                <DrawerItems 
                    { ...props }
                    activeBackgroundColor="#FFFFFF"
                    activeTintColor="#384662"
                    labelStyle={{
                        fontFamily: 'Quicksand-Regular',
                        fontSize: 16
                    }}
                />

                <TouchableOpacity style={{backgroundColor: '#D32F2F', borderRadius: 5, padding: 10, margin: 15}} onPress={signOut}>
                    <Text style={{color: '#FFFFFF', textAlign: "center", fontSize: 16}}>Sair</Text>
                </TouchableOpacity>
            </SideBody>
        </Container>
    )
}