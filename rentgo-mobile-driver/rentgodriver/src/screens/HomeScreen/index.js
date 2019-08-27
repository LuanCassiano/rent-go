import React from 'react'
import { FlatList } from 'react-native'

import Header from '../../components/Header'
import Slider from '../../components/Slider'

import data from '../../data.json'

import { 
    Container,
    Label,
    CardInfo,
    CardInfoContent,
    CardInfoMedia,
    Paragraph,
    Row,
    Section,
    ViewCenter
} from './styles';

export default function HomeScreen(props) {

    toggleDrawer = () => {
        props.navigation.toggleDrawer()
    }

    return (
        <Container>
            <Header 
                title="RentGo Driver"
                onDrawer={toggleDrawer}
            />

            <Section>
                <Label>Informações Gerais</Label>

                <Row>
                    <CardInfo>
                        <ViewCenter>
                            <CardInfoMedia source={require('../../assets/icons/myvan.png')}/>
                        </ViewCenter>
                        <CardInfoContent>
                            <Paragraph>0</Paragraph>
                            <Paragraph isMargin={true}>Viagens realizadas</Paragraph>
                        </CardInfoContent>
                    </CardInfo>
                    <CardInfo>
                        <ViewCenter>
                            <CardInfoMedia source={require('../../assets/icons/road.png')}/>
                        </ViewCenter>
                        <CardInfoContent>
                            <Paragraph>0 km</Paragraph>
                            <Paragraph isMargin={true}>Distância percorrida</Paragraph>
                        </CardInfoContent>
                    </CardInfo>
                </Row>
            </Section>

            <Section>
                <Label>Suas Vans</Label>

                <FlatList 
                    keyExtractor={item => String(item.id)}
                    data={data.vans}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <Slider vans={item}/>}
                />
            </Section>

            <Section>
                <Label>Últimas viagens</Label>

                <FlatList 
                    keyExtractor={item => String(item.id)}
                    data={data.trips}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <Slider trips={item}/>}
                />
            </Section>
        </Container>
    )
}