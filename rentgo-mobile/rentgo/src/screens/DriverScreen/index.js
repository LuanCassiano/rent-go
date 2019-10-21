import React, { useEffect, useState } from 'react'
import { StatusBar, AsyncStorage, ScrollView } from 'react-native'

import api from '../../services/api'

import { 
	ActionButton,
	ActionButtonText,
	ContentDetails,
	ContentInfo,
	Divider,
	DriverProfileImage,
	Icon,
	Label,
	Row,
	TextInfo,
	ViewGeneric
} from './styles'

import Header from '../../components/Header'
import Container from '../../components/Container'

import driverIcon from '../../assets/icons/driver.png'
import starIcon from '../../assets/icons/star.png'

export default function DriverScreen(props) {

	const driverId = props.navigation.getParam('driver')

	const [driver, setDriver] = useState({})

	goBack = () => {
        props.navigation.goBack()
    }

	goToTravelConfirmation = async () => {
		await AsyncStorage.setItem('RentGoDriver', JSON.stringify(driver))
		props.navigation.navigate('TravelConfirmation')
	}

	useEffect(() => {
		async function loadDataDriver() {
			try {
				const response = await api.get(`/api/driver/${driverId}`)
				setDriver(response.data.result[0])
			} catch (error) {
				console.log(error)
			}
		}

		loadDataDriver()
	}, [])

	return (
		<Container noPadding={false}>
			<Header 
				title="Motorista"
				goBack={goBack}
			/>
			<ScrollView>
				<DriverProfileImage source={{uri: driver.profile_image}}>
				</DriverProfileImage>

				<ViewGeneric>
					<Row>
						<ContentInfo>
							<Icon source={driverIcon}/>
							<Label>{driver.fullname}</Label>
						</ContentInfo>

						<ContentInfo>
							<Icon source={starIcon}/>
							{ driver.rating ? (
								<Label>{driver.rating}</Label>
							) : (
								<Label>0.0</Label>
							)}
						</ContentInfo>
					</Row>

					<ContentDetails>
						<TextInfo>Viagens Realizadas</TextInfo>
						<TextInfo>0</TextInfo>
					</ContentDetails>

					<Divider/>
				
					<ContentDetails>
						<TextInfo>Van</TextInfo>
						<TextInfo>0</TextInfo>
					</ContentDetails>

					<Divider/>
				
					<ContentDetails>
						<TextInfo>Distância viajada</TextInfo>
						<TextInfo>até {driver.dist_max}km</TextInfo>
					</ContentDetails>

					<ActionButton onPress={goToTravelConfirmation}>
						<ActionButtonText>Selecionar motorista</ActionButtonText>
					</ActionButton>
				</ViewGeneric>
			</ScrollView>
		</Container>
	)
}