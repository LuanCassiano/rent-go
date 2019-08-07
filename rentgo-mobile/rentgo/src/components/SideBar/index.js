import React, { useEffect, useState } from 'react'
import { AsyncStorage } from 'react-native'
import { DrawerItems } from 'react-navigation'

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

    toggleDrawer = () => {
        props.navigation.toggleDrawer()
    }

    useEffect(() => {
        async function loadDataFromStorage() {
            const data = await AsyncStorage.getItem('RentGoUser')
            const info = JSON.parse(data)

            setUsername(info.username)
            setImage(info.profile_image)
        }

        loadDataFromStorage()
    }, [username])

    return (
        <Container>
            <SideHeader>
                <SideHeaderContent>
                    <SideHeaderImage source={{ uri: usernameImage }}/>
                    <SideHeaderInfo>
                        <SideHeaderUsername>{username}</SideHeaderUsername>
                        <SideHeaderUserRating>0.0</SideHeaderUserRating>
                    </SideHeaderInfo>
                </SideHeaderContent>
            </SideHeader>
            <SideBody>
                <DrawerItems 
                    { ...props }
                    activeBackgroundColor="#FFFFFF"
                    activeTintColor="#1C2331"
                    labelStyle={{
                        fontFamily: 'Quicksand-Regular',
                        fontSize: 16
                    }}
                />
            </SideBody>
        </Container>
    )
}