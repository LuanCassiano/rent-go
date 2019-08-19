import React, { useEffect, useState } from 'react'
import { AsyncStorage, ScrollView } from 'react-native'

import { 
    Container,
    ImageProfile,
    LogoBackground,
    LogoBackgroundContent,
    LogoBackgroundGradient,
    TextProfileName,
    IconTravelInfo,
    TextTravelInfo,
    ViewProfileTravelContainer,
    ViewProfileTravelContent,
    Divider,
    TextInfo,
    ViewContentInfo,
    ViewUserInfoContainer
} from './styles'

import Header from '../../components/Header'

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
        <Container>
            <Header 
                title="Minha conta"
                onDrawer={toggleDrawer}
            />

            <ScrollView>
                <LogoBackground source={require('../../assets/img/logo.png')}>
                    <LogoBackgroundGradient />
                    <LogoBackgroundContent>
                        <ImageProfile source={{ uri: usernameImage }}/>
                        <TextProfileName>{fullname}</TextProfileName>
                    </LogoBackgroundContent>
                </LogoBackground>

                <ViewProfileTravelContainer>
                    <ViewProfileTravelContent>
                        <IconTravelInfo source={require('../../assets/icons/tourist.png')}/>
                        <TextTravelInfo count={true}>0</TextTravelInfo>
                        <TextTravelInfo count={false}>Viagens</TextTravelInfo>
                    </ViewProfileTravelContent>
                </ViewProfileTravelContainer>

                <ViewUserInfoContainer>
                    <ViewContentInfo>
                        <TextInfo>Usuário</TextInfo>
                        <TextInfo>{username}</TextInfo>
                    </ViewContentInfo>

                    <Divider />

                    <ViewContentInfo>
                        <TextInfo>E-mail</TextInfo>
                        <TextInfo>{email}</TextInfo>
                    </ViewContentInfo>

                    <Divider />

                    <ViewContentInfo>
                        <TextInfo>Telefone</TextInfo>
                        <TextInfo>{phone}</TextInfo>
                    </ViewContentInfo>
                </ViewUserInfoContainer>
            </ScrollView>
        </Container>
    )
}