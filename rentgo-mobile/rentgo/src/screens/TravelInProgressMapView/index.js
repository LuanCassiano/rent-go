import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, ScrollView, FlatList, Image } from 'react-native'
import MapboxGL from '@mapbox/react-native-mapbox-gl'

MapboxGL.setAccessToken('pk.eyJ1IjoibHV1YW5jYXNzaWFubyIsImEiOiJjanBzeWF4aHcwMGNyM3dwYTYzeTlsY2VmIn0.ReacoepEj0J0hJpbyHogYQ')

// import { Container } from './styles';

export default function TravelInProgressMapView() {

	const renderAnnotations = () => {
		return (
			<MapboxGL.PointAnnotation
				id='rocketseat'
				coordinate={[-49.6446024, -27.2108001]}
			>
				<View>
					<Image source={require('../../assets/icons/trackingUnselected.png')} />
				</View>

				<MapboxGL.Callout title='Rocketseat House' />
			</MapboxGL.PointAnnotation>
		)
	}

	return (
		<MapboxGL.MapView
			centerCoordinate={[-49.6446024, -27.2108001]}
			style={{ flex: 1 }}
			showUserLocation
			styleURL={MapboxGL.StyleURL.Light}
		>
			{renderAnnotations()}
		</MapboxGL.MapView>
	)
}