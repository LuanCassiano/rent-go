import React, { useState } from 'react'
import { AsyncStorage, Modal, ActivityIndicator } from 'react-native'
import api from '../../services/api'

import LogoImage from '../../assets/img/logo1.png'

import { 
    Container,
    ButtonSubmit,
    Form,
    FormIcon,
    FormInput,
    Href,
    TextButton,
    TextHref,
    Title,
    Logo,
    ModalContainer,
    ModalContent,
    ModalTitle,
    ErrorMessage
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
                    await AsyncStorage.setItem('RentGoToken', response.data.token)
                    
                    const res = await api.get('/api/passenger')
                    await AsyncStorage.setItem('RentGoUser', JSON.stringify(res.data.result[0]))

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
            <Logo source={LogoImage}/>
            <Title>Bem-vindo ao Rent&#38;Go!</Title>
            <Form>
                <FormIcon source={require('../../assets/img/email.png')}/>
                <FormInput 
                    placeholder="Seu e-mail" 
                    placeholderTextColor="#384662"
                    autoCapitalize="none" 
                    autoCorrect={false} 
                    underlineColorAndroid="transparent" 
                    textContentType="emailAddress"
                    value={email}
                    onChangeText={setEmail}
                />
            </Form>

            <Form>
                <FormIcon source={require('../../assets/img/lock.png')}/>
                <FormInput 
                    placeholder="Sua senha" 
                    placeholderTextColor="#384662"
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