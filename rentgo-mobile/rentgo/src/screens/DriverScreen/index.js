import React, { useEffect, useState } from 'react'
import { StatusBar, AsyncStorage, ScrollView, TouchableOpacity, Text, Image, View, Modal, FlatList } from 'react-native'

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
	ViewGeneric,
	ModalContainer,
	ModalContent,
	ButtonSubmit,
	TextButton
} from './styles'

import Header from '../../components/Header'
import Container from '../../components/Container'

import driverIcon from '../../assets/icons/driver.png'
import starIcon from '../../assets/icons/star.png'

export default function DriverScreen(props) {

	const driverId = props.navigation.getParam('driver')

	const [driver, setDriver] = useState({})
	const [positive, setPositive] = useState(0)
	const [negative, setNegative] = useState(0)
	const [media, setMedia] = useState(0)
	const [vans, setVans] = useState([])
	const [modalOpen, setModalOpen] = useState(false)

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

				const data = await api.get(`/api/driver-rating/${driverId}`)
				setPositive(data.data.positive)
				setNegative(data.data.negative)
				setMedia(data.data.media)

				const driverVans = await api.get(`/api/van?driver=${driverId}&page=1`)
				setVans(driverVans.data.result.data)

			} catch (error) {
				console.log(error)
			}
		}

		loadDataDriver()
	}, [])

	const _renderVans = (item) => {
		return (
			<TouchableOpacity style={{padding: 20, borderRadius: 5, backgroundColor: '#1C2331', marginBottom: 20, marginTop: 10}} onPress={() => setModalOpen(false)}>
				<View style={{flexDirection: 'row'}}>
					<Image source={require('../../assets/img/van.jpg')} style={{width: 50, height: 50, borderRadius: 25}}/>
					<View style={{flexDirection: 'column'}}>
						<Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 16, color: '#E5E9F0', marginLeft: 10}}>{item.model}</Text>
						<Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 16, color: '#E5E9F0', marginLeft: 10}}>{item.amount_passenger} lugares</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}

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
							<Label>{media}</Label>
						</ContentInfo>
					</Row>

					<ContentDetails>
						<TextInfo>Preço/km</TextInfo>
						<TextInfo>R$ {driver.value_per_kilometer}</TextInfo>
					</ContentDetails>

					<Divider />

					<ContentDetails>
						<TextInfo>Vans</TextInfo>
						<TouchableOpacity onPress={() => setModalOpen(true)} style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20, borderRadius: 5, backgroundColor: '#E5E9F0', alignItems: "center", justifyContent: "center" }}>
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
							<Text style={{ textAlign: "center", color: "#E5E9F0", fontFamily: 'Quicksand-Medium', fontSize: 14 }}>{positive}</Text>
							<Text style={{ textAlign: "center", color: "#E5E9F0", fontFamily: 'Quicksand-Medium', fontSize: 14 }}>Avaliações positivas</Text>
						</View>
						<View style={{ flexDirection: 'column', justifyContent: "center", alignItems: "center", flex: 1 }}>
							<Text style={{ textAlign: "center", color: "#E5E9F0", fontFamily: 'Quicksand-Medium', fontSize: 14 }}>{negative}</Text>
							<Text style={{ textAlign: "center", color: "#E5E9F0", fontFamily: 'Quicksand-Medium', fontSize: 14 }}>Avaliações negativas</Text>
						</View>

						<View style={{ flexDirection: 'column', justifyContent: "center", alignItems: "center", flex: 1 }}>
							{ driver.trip && <Text style={{ textAlign: "center", color: "#E5E9F0", fontFamily: 'Quicksand-Medium', fontSize: 14 }}>{driver.trip.length}</Text>}
							<Text style={{ textAlign: "center", color: "#E5E9F0", fontFamily: 'Quicksand-Medium', fontSize: 14 }}>Viagens realizadas</Text>
						</View>
					</View>
				</View>

				{/* <View style={{ backgroundColor: '#1C2331', padding: 20 }}>
					<Text style={{ textAlign: "center", color: "#E5E9F0", fontFamily: 'Quicksand-Bold', fontSize: 16 }}>Observações</Text>
					<Text style={{ textAlign: "center", color: "#E5E9F0", fontFamily: 'Quicksand-Medium', fontSize: 14 }}>{driver.observations}</Text>
				</View> */}

				<ViewGeneric>
					<ActionButton onPress={goToTravelConfirmation}>
						<ActionButtonText>Selecionar motorista</ActionButtonText>
					</ActionButton>
				</ViewGeneric>
			</ScrollView>

			<Modal animationType="fade" transparent visible={modalOpen} onRequestClose={() => {}}>
                <ModalContainer>
                    <ModalContent>
                        
						<FlatList 
							keyExtractor={(item) => String(item.id)}
							data={vans}
							renderItem={({ item }) => _renderVans(item)}
						/>
                    </ModalContent>
                </ModalContainer>
            </Modal>
		</Container>
	)
}