import React, { useEffect, useState } from 'react'
import { View, Text, Image, StatusBar, AsyncStorage, ImageBackground } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { Container } from './styles'

import Header from '../../components/Header'

export default function ProfileScreen(props) {

    const [username, setUsername] = useState('')
    const [usernameImage, setImage] = useState('')
    const [fullname, setFullname] = useState('')

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
        }

        loadDataFromStorage()
    }, [username])

    return (
        <Container>
            <ImageBackground source={require('../../assets/img/logo.png')} style={{ width: '100%', height: 300}}>
                <LinearGradient 
                    style={{position: "absolute", top: 0, left: 0, width: '100%', height: 300, opacity: 0.6}}
                    colors={['rgba(255, 255, 255, .7)', 'rgba(255, 255, 255, .7)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                />

                <View style={{justifyContent: "center", alignItems: "center", flex: 1, zIndex: 9999}}>
                    <Image source={{ uri: usernameImage }} style={{width: 80, height: 80, borderRadius: 40}}/>
                    <Text style={{color: '#1C2331', marginTop: 10, fontSize: 16, fontFamily: 'Quicksand-Bold'}}>{username}</Text>
                    <Text style={{color: '#1C2331', marginTop: 10, fontSize: 20, fontFamily: 'Quicksand-Bold'}}>{fullname}</Text>
                </View>
            </ImageBackground>

            <View style={{padding: 20}}>
                <Text>Ola mundo</Text>
            </View>
        </Container>
    )
}