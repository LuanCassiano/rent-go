import React, { useEffect, useState } from 'react'
import { AsyncStorage, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
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
    const [loading, setLoading] = useState(true)

    toggleDrawer = () => {
        props.navigation.toggleDrawer()
    }

    async function signOut() {
        await AsyncStorage.clear()

        props.navigation.navigate('Signin')
    }

    useEffect(() => {
        async function getDriverAuth() {
            const data = await AsyncStorage.getItem('RentGoDriverUser')
            const info = JSON.parse(data)
            
            setLoading(true)
            setUsername(info.username)
            setImage(info.profile_image)
            setLoading(false)
        }

        getDriverAuth()
    }, [])

    useEffect(() => {
        async function getDriverRating() {
            const data = await AsyncStorage.getItem('RentGoDriverUser')
            const info = JSON.parse(data)

            const response = await api.get(`api/driver-rating/${info.id}`)
            setRating(response.data.media)
        }

        getDriverRating()
    }, [rating])

    return (
        <Container>
            <SideHeader>
                <SideHeaderContent>
                    { loading ? (
                        <ActivityIndicator size="small" color="#E5E9F0"/>
                    ) : (
                        <SideHeaderImage source={{ uri: usernameImage }}/>
                    )}
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