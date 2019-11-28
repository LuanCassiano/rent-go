import React, { useState, useEffect, useRef } from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import api from '../../services/api'
import axios from 'axios'

import { Content, Form, FormInput, ButtonSubmit, TextButton } from './styles'

import Header from '../../components/Header'
import Container from '../../components/Container'

export default function PaymentScreen(props) {

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [link, setLink] = useState(null)
    const [action, setAction] = useState(false)
    const [driverId, setDriverId] = useState(0)
    const [passengerId, setPassengerId] = useState(0)

    const onDrawer = () => {
        props.navigation.toggleDrawer()
    }

    useEffect(() => {
        const info = props.navigation.getParam('data')

        console.log('info', info)

        if (info) {
            setName(info.passenger.fullname)
            setPrice(info.travel_price)
            setDriverId(info.driver_id)
            setPassengerId(info.passenger.id)
            return
        }
    }, [])

    async function handlePayment() {
        try {
            const response = await axios({
                method: 'POST',
                url: 'https://api-rentgopaypal.herokuapp.com/api/pay',
                data: {
                    "intent": "sale",
                    "payer": {
                        "payment_method": "paypal"
                    },
                    "redirect_urls": {
                        "return_url": "https://api-rentgopaypal.herokuapp.com/success",
                        "cancel_url": "https://api-rentgopaypal.herokuapp.com/cancel"
                    },
                    "transactions": [
                        {
                            "item_list": {
                                "items": [
                                    {
                                        "name": `${name}`,
                                        "sku": "001",
                                        "price": `${price}`,
                                        "currency": "BRL",
                                        "quantity": 1
                                    }
                                ]
                            },
                            "amount": {
                                "currency": "BRL",
                                "total": `${price}`
                            },
                            "description": `${description}`
                        }
                    ]
                }
            })

            const link = response.data.links[1].href
            setLink(link)

        } catch (error) {

        }
    }

    _renderContent = () => {

        console.log('link', link)

        if (link === null) {
            return (
                <Content>
                    <Form>
                        <FormInput
                            placeholder="Nome"
                            placeholderTextColor="#E5E9F0"
                            autoCapitalize="none"
                            autoCorrect={false}
                            underlineColorAndroid="transparent"
                            value={name}
                            onChangeText={setName}
                        />
                    </Form>
                    <Form>
                        <FormInput
                            placeholder="Preço"
                            placeholderTextColor="#E5E9F0"
                            autoCapitalize="none"
                            autoCorrect={false}
                            underlineColorAndroid="transparent"
                            value={price}
                            onChangeText={setPrice}
                        />
                    </Form>
                    <Form>
                        <FormInput
                            placeholder="Descrição do pagamento"
                            numberOfLines={4}
                            placeholderTextColor="#E5E9F0"
                            autoCapitalize="none"
                            autoCorrect={false}
                            underlineColorAndroid="transparent"
                            value={description}
                            onChangeText={setDescription}
                        />
                    </Form>

                    <ButtonSubmit onPress={handlePayment}>
                        <TextButton>Pagar</TextButton>
                    </ButtonSubmit>
                </Content>
            )
        }

        if (link !== null) {
            return (
                <View style={{ flex: 1 }}>
                    <WebView
                        source={{ uri: link }}
                        startInLoadingState={true}
                        style={{ width: '100%' }}
                        onNavigationStateChange={navState => {
                            if (navState.url.startsWith('https://api-rentgopaypal.herokuapp.com/success')) {
                                setAction(true)
                                return
                            }
                        }}
                    />
                </View>
            )
        }
    }

    useEffect(() => {
        async function sendPushNotification() {
            if(action === true) {

                await api.post('/api/payment', {
                    passenger_id: passengerId,
                    driver_id: driverId,
                    payment_status: true
                })

                setTimeout(() => {
                    setLink(null)
                    setName("")
                    setPrice("")
                    props.navigation.navigate('Home')
                }, 3000)
                
                return 
            }
        }

        sendPushNotification()
    }, [action])

    return (
        <Container noPadding={false}>
            <Header
                title="Pagamento"
                onDrawer={onDrawer}
            />

            { _renderContent()}
        </Container>
    )
}