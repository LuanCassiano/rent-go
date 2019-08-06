import React from 'react'
import { FlatList } from 'react-native'

import { 
    Container,
    Title,
    Content,
    CardTravel,
    CardTravelBody,
    CardTravelDetailsOrigem,
    CardTravelDetailsDestiny,
    Label,
    TextInfo,
    Divider,
    CardTravelFooter
} from './styles'

import data from '../../data.json'

import Header from '../../components/Header';

export default function TravelsScreen(props) {

    goToTravelDetails = () => {
        props.navigation.navigate('TravelDetails')
    }

    toggleDrawer = () => {
        props.navigation.toggleDrawer()
    }

    _renderItem = (item) => {
        return (
            <CardTravel onPress={goToTravelDetails}>
                <CardTravelBody>
                    <CardTravelDetailsOrigem>
                        <Label>De: </Label>
                        <TextInfo>{item.origem}</TextInfo>
                    </CardTravelDetailsOrigem>
                    <CardTravelDetailsDestiny>
                        <Label>Para: </Label>
                        <TextInfo>{item.destiny}</TextInfo>
                    </CardTravelDetailsDestiny>

                    <Divider/>

                    <CardTravelFooter>
                        <Label>Status: </Label>
                        <TextInfo>{item.status}</TextInfo>
                    </CardTravelFooter>
                </CardTravelBody>
            </CardTravel>
        )
    }

    return (
      	<Container>
            <Header 
                title="Minhas viagens"
                onDrawer={toggleDrawer}
            />

            <Content showsVerticalScrollIndicator={false}>
                <Title>Histórico de viagens</Title>

                <FlatList 
                    keyExtractor={item => String(item.id)}
                    data={data}
                    renderItem={({ item }) => _renderItem(item)}
                    numColumns={1}
                />
            </Content>
        </Container>
    )
}
