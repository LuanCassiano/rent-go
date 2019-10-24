import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import axios from 'axios'

import { Content, Form, FormInput, ButtonSubmit, TextButton } from './styles'

import Header from '../../components/Header'
import Container from '../../components/Container'

export default function PaymentScreen(props) {

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [link, setLink] = useState(null)

    const onDrawer = () => {
        props.navigation.toggleDrawer()
    }

    useEffect(() => {
        const info = props.navigation.getParam('data')

        if(info) {
            setName(info.passenger.fullname)
            setPrice(info.travel_price)
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

    return (
        <Container noPadding={false}>
            <Header
                title="Pagamento"
                onDrawer={onDrawer}
            />

            {link !== null ? (
                <View style={{ flex: 1 }}>
                    <WebView
                        source={{ uri: link }}
                        startInLoadingState={true}
                        style={{ width: '100%' }}
                    />
                </View>
            ) : (
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
            )}
        </Container>
    )
}