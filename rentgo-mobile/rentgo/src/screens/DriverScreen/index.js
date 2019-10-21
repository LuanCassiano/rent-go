import React, { useEffect, useState } from 'react'
import { StatusBar, AsyncStorage, ScrollView, TouchableOpacity, Text, Image, View } from 'react-native'

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
				setDriver(response.data.driver[0])
			} catch (error) {
				console.log(error)
			}
		}

		loadDataDriver()
	}, [])

	useEffect(() => {
		async function updateDataDriver() {
			const responseRate = await api.get(`/api/driver-rating?driver_rated=${driverId}`)

			await api.put(`/api/driver/${driverId}`, {
				rating: responseRate.data.media,
				positive_notes: responseRate.data.positive_notes,
				negative_notes: responseRate.data.negative_notes
			})
		}

		updateDataDriver()
	}, [])

	return (
		<Container noPadding={false}>
			<Header
				title="Motorista"
				goBack={goBack}
			/>
			<ScrollView>
				<DriverProfileImage source={{ uri: driver.profile_image }}>
				</DriverProfileImage>

				<ViewGeneric>
					<Row>
						<ContentInfo>
							<Icon source={driverIcon} />
							<Label>{driver.fullname}</Label>
						</ContentInfo>

						<ContentInfo>
							<Icon source={starIcon} />
							{driver.rating ? (
								<Label>{driver.rating}</Label>
							) : (
									<Label>0.0</Label>
								)}
						</ContentInfo>
					</Row>

					<ContentDetails>
						<TextInfo>Preço/km</TextInfo>
						<TextInfo>R$ {driver.value_per_kilometer}</TextInfo>
					</ContentDetails>

					<Divider />

					<ContentDetails>
						<TextInfo>Vans</TextInfo>
						<TouchableOpacity style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20, borderRadius: 5, backgroundColor: '#E5E9F0', alignItems: "center", justifyContent: "center" }}>
							<Image source={require('../../assets/icons/view.png')} style={{ width: 20, height: 20 }} />
						</TouchableOpacity>
					</ContentDetails>

					<Divider />

					<ContentDetails>
						<TextInfo>Distância viajada</TextInfo>
						<TextInfo>até {driver.dist_max}km</TextInfo>
					</ContentDetails>

					<Divider />

				</ViewGeneric>

				<View style={{ backgroundColor: '#1C2331', padding: 20, marginBottom: 10 }}>
					<View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
						<View style={{ flexDirection: 'column', justifyContent: "center", alignItems: "center", flex: 1 }}>
							<Text style={{ textAlign: "center", color: "#E5E9F0", fontFamily: 'Quicksand-Medium', fontSize: 14 }}>{driver.positive_notes}</Text>
							<Text style={{ textAlign: "center", color: "#E5E9F0", fontFamily: 'Quicksand-Medium', fontSize: 14 }}>Avaliações positivas</Text>
						</View>
						<View style={{ flexDirection: 'column', justifyContent: "center", alignItems: "center", flex: 1 }}>
							<Text style={{ textAlign: "center", color: "#E5E9F0", fontFamily: 'Quicksand-Medium', fontSize: 14 }}>{driver.negative_notes}</Text>
							<Text style={{ textAlign: "center", color: "#E5E9F0", fontFamily: 'Quicksand-Medium', fontSize: 14 }}>Avaliações negativas</Text>
						</View>

						<View style={{ flexDirection: 'column', justifyContent: "center", alignItems: "center", flex: 1 }}>
							{ driver.trip && <Text style={{ textAlign: "center", color: "#E5E9F0", fontFamily: 'Quicksand-Medium', fontSize: 14 }}>{driver.trip.length}</Text>}
							<Text style={{ textAlign: "center", color: "#E5E9F0", fontFamily: 'Quicksand-Medium', fontSize: 14 }}>Viagens realizadas</Text>
						</View>
					</View>
				</View>

				<View style={{ backgroundColor: '#1C2331', padding: 20 }}>
					<Text style={{ textAlign: "center", color: "#E5E9F0", fontFamily: 'Quicksand-Bold', fontSize: 16 }}>Observações</Text>
					<Text style={{ textAlign: "center", color: "#E5E9F0", fontFamily: 'Quicksand-Medium', fontSize: 14 }}>{driver.observations}</Text>
				</View>

				<ViewGeneric>
					<ActionButton onPress={goToTravelConfirmation}>
						<ActionButtonText>Selecionar motorista</ActionButtonText>
					</ActionButton>
				</ViewGeneric>
			</ScrollView>
		</Container>
	)
}