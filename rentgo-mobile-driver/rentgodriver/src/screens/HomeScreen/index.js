import React from 'react'
import { FlatList, View, Text, Image } from 'react-native'

import Header from '../../components/Header'
import Slider from '../../components/Slider'

import data from '../../data.json'

import { 
    Container,
    Label,
    ViewGeneric
} from './styles';

export default function HomeScreen(props) {

    toggleDrawer = () => {
        props.navigation.toggleDrawer()
    }

    return (
        <Container>
            <Header 
                title="RentGo"
                onDrawer={toggleDrawer}
            />

            <View style={{backgroundColor: '#FFFFFF', padding: 20, marginBottom: 20}}>
                <Label>Informações Gerais</Label>

                <View style={{flexDirection: "row"}}>
                    <View style={{width: '45%', height: 200, backgroundColor: '#384662', marginRight: 30, padding: 20, borderRadius: 5}}>
                        <View style={{alignItems: "center"}}>
                            <Image source={require('../../assets/icons/van.png')} style={{width: 50, height: 50}}/>
                        </View>
                        <View style={{marginTop: 20}}>
                            <Text style={{textAlign: "center", color: '#FFFFFF', fontFamily: 'Quicksand-Bold', fontSize: 14}}>0</Text>
                            <Text style={{textAlign: "center", color: '#FFFFFF', fontFamily: 'Quicksand-Bold', fontSize: 16}}>Viagens realizadas</Text>
                        </View>
                    </View>
                    <View style={{width: '45%', height: 200, backgroundColor: '#384662', padding: 20, borderRadius: 5}}>
                        <View style={{alignItems: "center"}}>
                            <Image source={require('../../assets/icons/road.png')} style={{width: 50, height: 50}}/>
                        </View>
                        <View style={{marginTop: 20}}>
                            <Text style={{textAlign: "center", color: '#FFFFFF', fontFamily: 'Quicksand-Bold', fontSize: 14}}>0 km</Text>
                            <Text style={{textAlign: "center", color: '#FFFFFF', fontFamily: 'Quicksand-Bold', fontSize: 16}}>Distância percorrida</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{backgroundColor: '#FFFFFF', padding: 20, marginBottom: 20}}>
                <Label>Suas Vans</Label>

                <FlatList 
                    keyExtractor={item => String(item.id)}
                    data={data.vans}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <Slider vans={item}/>}
                />
            </View>

            <View style={{backgroundColor: '#FFFFFF', padding: 20, marginBottom: 20}}>
                <Label>Últimas viagens</Label>

                <FlatList 
                    keyExtractor={item => String(item.id)}
                    data={data.trips}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <Slider trips={item}/>}
                />
            </View>
        </Container>
    )
}