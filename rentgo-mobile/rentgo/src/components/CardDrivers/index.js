import React from 'react'
import { FlatList } from 'react-native'

import { 
    Container,
    Card,
    CardBody,
    CardAction,
    CardActionText,
    CardFooter,
    CardImage,
    CardText,
    CardTitle,
    Label,
    ViewInfo
} from './styles'

export default function CardDrivers(props) {

    const nav = props.navigation

    goToDriverInfo = (driverId) => {
        nav.navigate('Driver', {
            driver: driverId
        })
    }

    _renderCards = (item) => {
        return (
            <Card>
                <CardBody>
                    <CardImage source={{uri: item.profile_image}}/>
                    <ViewInfo>
                        <CardTitle>{item.fullname}</CardTitle>
                        { item.rating ? (
                            <CardText>{item.rating}</CardText>
                        ) : (
                            <CardText>0.0</CardText>
                        )}
                    </ViewInfo>
                </CardBody>
                <CardFooter>
                    <CardAction onPress={() => goToDriverInfo(item.id)}>
                        <CardActionText>Mais detalhes</CardActionText>
                    </CardAction>
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
                numColumns={2}
            />
        </Container>
    )
}