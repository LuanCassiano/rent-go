import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

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
} from './styles';

import Header from '../../components/Header'

import data from '../../data.json'

import driverIcon from '../../assets/icons/driver.png'
import starIcon from '../../assets/icons/star.png'

export default function DriverScreen(props) {

	const [driver, setDriver] = useState({})

	useEffect(() => {
		setDriver(data[0])
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
						<Label>{driver.name}</Label>
					</ContentInfo>

					<ContentInfo>
						<Icon source={starIcon}/>
						<Label>{driver.rating}</Label>
					</ContentInfo>
				</Row>

				<ContentDetails>
					<TextInfo>Viagens Realizadas</TextInfo>
					<TextInfo>16</TextInfo>
				</ContentDetails>

				<Divider/>
			
				<ContentDetails>
					<TextInfo>Van</TextInfo>
					<TextInfo>3</TextInfo>
				</ContentDetails>

				<Divider/>
			
				<ContentDetails>
					<TextInfo>Distância viajada</TextInfo>
					<TextInfo>300km</TextInfo>
				</ContentDetails>

				<ActionButton>
					<ActionButtonText>Selecionar motorista</ActionButtonText>
				</ActionButton>
			</ViewGeneric>
		</Container>
	);
}