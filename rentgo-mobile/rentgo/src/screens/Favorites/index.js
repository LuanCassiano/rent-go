import React, { useState, useEffect } from 'react'
import { View, FlatList, ActivityIndicator, AsyncStorage, Text, Image, TouchableOpacity } from 'react-native'
import api from '../../services/api'
import NumberFormat from 'react-number-format'

// import { Container } from './styles';

import Header from '../../components/Header'
import Container from '../../components/Container'

export default function Favorites(props) {

    const [listFavorites, setListFavorites] = useState([])
    const [loading, setLoading] = useState(true)

    const toggleDrawer = () => {
        props.navigation.toggleDrawer()
    }

    const _renderList = (item) => {

        return (
            <TouchableOpacity style={{backgroundColor: '#e5e9f0', padding: 20, marginTop: 20}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={{color: '#1c2331', fontFamily: 'Quicksand-Bold', fontSize: 16}}>{item.fullname}</Text>
                        <Text>Nota: <NumberFormat
                                    value={item.avg}
                                    displayType="text"
                                    decimalSeparator="."
                                    decimalScale={2}
                                    fixedDecimalScale
                                    renderText={value => <Text>{value}</Text>} />
                        </Text>
                        
                    </View>    
                    <Image source={{ uri: item.profile_image }} style={{width: 60, height: 60, borderRadius: 30}}/>
                </View>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        async function getListFavorites() {
            setLoading(true)
            const data = await AsyncStorage.getItem('RentGoUser')
            const info = JSON.parse(data)

            const response = await api.get(`/api/favoriteDriver?passenger_id=${info.id}`)
            setListFavorites(response.data)
            setLoading(false)
        }

        getListFavorites()
    }, [])

    return (
        <>
            <Header
                title="Meus favoritos"
                onDrawer={toggleDrawer}
            />

            <Container noPadding={false}>
                {loading ? (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size="large" color="#E5E9F0" />
                    </View>
                ) : (
                    <FlatList 
                        keyExtractor={(item) => String(item.id)}
                        data={listFavorites}
                        renderItem={({ item }) => _renderList(item)}
                    />
                )}
            </Container>
        </>
    )
}
