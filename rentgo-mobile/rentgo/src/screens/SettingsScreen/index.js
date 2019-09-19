import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Switch } from 'react-native'

// import { Container } from './styles';

import Header from '../../components/Header'
import Container from '../../components/Container'

export default function SettingsScreen(props) {

    const [pushPermission, setPushPermission] = useState(true)

    toggleSwitch = (value) => {
        setPushPermission(value)
    }

    toggleDrawer = () => {
        props.navigation.toggleDrawer()
    }

    return (
        <Container noPadding={false}>

            <Header 
                title="Configurações"
                onDrawer={toggleDrawer}
            />

            <View style={{padding: 20}}>

                <View style={{padding: 20, backgroundColor: '#E5E9F0', borderRadius: 5, marginBottom: 20}}>
                    <View style={{flexDirection: "row", justifyContent: 'space-between', marginBottom: 20}}>
                        <Text style={{fontFamily: 'Quicksand-Medium', fontSize: 16, color: '#1C2331'}}>Notificações</Text>
                        <Switch 
                            onValueChange={toggleSwitch}
                            value={pushPermission}
                        />
                    </View>

                    <Text style={{fontSize: 12, fontFamily: 'Quicksand-Medium'}}>Permitir app enviar PushNotifications</Text>
                </View>

                <View style={{padding: 20, backgroundColor: '#E5E9F0', borderRadius: 5}}>
                    <View style={{flexDirection: "row", justifyContent: 'space-between', marginBottom: 20}}>
                        <Text style={{fontFamily: 'Quicksand-Medium', fontSize: 16, color: '#1C2331'}}>Localização</Text>
                        <Switch 
                            onValueChange={toggleSwitch}
                            value={pushPermission}
                        />
                    </View>

                    <Text style={{fontSize: 12, fontFamily: 'Quicksand-Medium'}}>Permitir app usar localização</Text>
                </View>

            </View>
        </Container>
    )
}