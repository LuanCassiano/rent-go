import React from 'react'
import { FlatList, Image } from 'react-native'

import {
    Container,
    Card,
    CardBody,
    CardFooter,
    CardImage,
    CardText,
    CardTitle,
    Label,
    ViewInfo,
    Row
} from './styles'

export default function CardDrivers(props) {

    const nav = props.navigation

    goToDriverInfo = (driverId) => {
        nav.navigate('Driver', {
            driver: driverId
        })
    }

    showPicker = () => {
        setVisible(true)
    }

    _renderCards = (item) => {
        return (
            <Card onPress={() => goToDriverInfo(item.id)}>
                <CardBody>
                    <ViewInfo>
                        <Row>
                            <Image source={require('../../assets/icons/driver.png')} style={{ width: 18, height: 18, marginTop: 6 }} />
                            <CardTitle>{item.fullname}</CardTitle>
                        </Row>
                        <Row>
                            <Image source={require('../../assets/icons/star.png')} style={{ width: 15, height: 15 }} />
                            <CardText>{item.rating}</CardText>
                        </Row>
                    </ViewInfo>
                    <CardImage source={{ uri: item.profile_image }} />
                </CardBody>
                <CardFooter>
                    <CardText>Viagens</CardText>
                    <CardText>408</CardText>
                </CardFooter>
            </Card>
        )
    }

    return (
        <Container>
            <Label>Motoristas Disponíveis</Label>

            <FlatList
                keyExtractor={(item) => String(item.id)}
                data={props.driver}
                renderItem={({ item }) => _renderCards(item)}
            />
        </Container>
    )
}