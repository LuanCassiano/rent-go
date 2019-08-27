import React, { useState } from 'react'
import { Modal, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import api from '../../services/api'

import { 
    Container,
    ButtonSubmit,
    CardForm,
    ErrorMessage,
    Form,
    FormIcon,
    FormInput,
    Href,
    Logo,
    ModalContainer,
    ModalContent,
    ModalTitle,
    Row,
    TextButton,
    TextHref,
    Title
} from './styles'

export default function SigninScreen(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [loading, setLoading] = useState(false)


    const goToHome = () => {
        props.navigation.navigate('Drawer')
    }

    async function handleSignIn() {
        setLoading(true)
        if(!email || !password) {
            setLoading(false)
            setError('Informe seu e-mail e sua senha para continuar!')
            setModalVisible(true)
            setTimeout(() => {
                setError('')
                setModalVisible(false)
            }, 5000)
        } else {
            try {
                const response = await api.post('/api/authentication', {
                    email: email,
                    password: password
                })

                if(response.data.token) {
                    await AsyncStorage.setItem('RentGoDriverToken', response.data.token)
                    
                    const res = await api.get('/api/driver')
                    await AsyncStorage.setItem('RentGoDriver', JSON.stringify(res.data.result[0]))

                    setLoading(false)
    
                    goToHome()

                    return
                }

                setLoading(false)
                setError('Erro ao fazer login, verifique suas credenciais!')
                setModalVisible(true)

                setTimeout(() => {
                    setError('')
                    setModalVisible(false)
                }, 5000)
            } catch (error) {
                setLoading(false)
                setError('Erro ao fazer login, verifique suas credenciais!')
                setModalVisible(true)
                setTimeout(() => {
                    setError('')
                    setModalVisible(false)
                }, 5000)
            }
        }
    }

    return (
        <Container>
            <Logo source={require('../../assets/img/logo1.png')}/>
            <Title>Bem-vindo ao RentGo Drivers</Title>

            <Form>
                <FormIcon source={require('../../assets/icons/email.png')}/>
                <FormInput 
                    placeholder="Seu e-mail" 
                    placeholderTextColor="#FFFFFF"
                    autoCapitalize="none" 
                    autoCorrect={false} 
                    underlineColorAndroid="transparent" 
                    textContentType="emailAddress"
                    value={email}
                    onChangeText={setEmail}
                />
            </Form>

            <Form>
                <FormIcon source={require('../../assets/icons/lock.png')}/>
                <FormInput 
                    placeholder="Sua senha" 
                    placeholderTextColor="#FFFFFF"
                    autoCapitalize="none" 
                    autoCorrect={false} 
                    underlineColorAndroid="transparent" 
                    secureTextEntry  
                    value={password}
                    onChangeText={setPassword}
                />
            </Form>

            <ButtonSubmit onPress={handleSignIn}>
                { loading ? (
                    <ActivityIndicator size="small" color="#FFFFFF"/>
                ) : (
                    <TextButton>Entrar</TextButton>
                )}
            </ButtonSubmit>

            <Href>
                <TextHref>Esqueci minha senha</TextHref>
            </Href>

            <Modal animationType="fade" transparent visible={modalVisible} onRequestClose={() => {}}>
                <ModalContainer>
                    <ModalContent>
                        <ModalTitle>ERRO &#128533;</ModalTitle>
                        <ErrorMessage>{error}</ErrorMessage>
                    </ModalContent>
                </ModalContainer>
            </Modal>
        </Container>
    )
}