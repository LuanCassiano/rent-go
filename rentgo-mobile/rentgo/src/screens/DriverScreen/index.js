import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'

import api from '../../services/api'

import { 
	Container,
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

import driverIcon from '../../assets/icons/driver.png'
import starIcon from '../../assets/icons/star.png'

export default function DriverScreen(props) {

	const driverId = props.navigation.getParam('driver')

	const [driver, setDriver] = useState({})

	goToTravelConfirmation = () => {
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
		<Container>
			<StatusBar hidden/>
			<DriverProfileImage source={{uri: driver.profile_image}}>
				<Header 
					onBack={props.navigation}
				/>
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
		</Container>
	)
}