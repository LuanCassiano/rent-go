import React from 'react'
import { View } from 'react-native'

import {
    Container,
    Content,
    Tab,
    TabIcon,
    TabText,
} from './styles'

import locationIcon from '../../assets/icons/location.png'
import locationUnselectedIcon from '../../assets/icons/locationUnselected.png'
import inProgressIcon from '../../assets/icons/inProgress.png'
import inProgressUnselectedIcon from '../../assets/icons/inProgressUnselected.png'
import scheduledIcon from '../../assets/icons/calendar.png'
import scheduledUnselectedIcon from '../../assets/icons/calendarUnselected.png'
import canceledIcon from '../../assets/icons/cancel.png'
import canceledUnselectedIcon from '../../assets/icons/cancelUnselected.png'
import trackIcon from '../../assets/icons/tracking.png'
import trackUnselectedIcon from '../../assets/icons/trackingUnselected.png'

export default function TabBar(props) {

    const navigate = props.navigation.navigate
    const currentRoute = props.navigation.state.routes[props.navigation.state.index].key

    _renderTab = (icon, iconSelected, label, screen) => {
        return (
            <Tab onPress={() => navigate(screen)}>
                <TabIcon source={currentRoute === screen ? iconSelected : icon} />
                <TabText isActive={currentRoute === screen ? true : false}>{label}</TabText>
            </Tab>
        )
    }

    return (
        <Container>
            <Content>
                {_renderTab(inProgressUnselectedIcon, inProgressIcon, 'Solicitadas', 'TravelRequests')}
                {_renderTab(scheduledUnselectedIcon, scheduledIcon, 'Agendadas', 'TravelsScheduled')}
                {_renderTab(trackUnselectedIcon, trackIcon, 'Em andamento', 'TravleInProgress')}
                {_renderTab(locationUnselectedIcon, locationIcon, 'Finalizadas', 'Travels')}
                {_renderTab(canceledUnselectedIcon, canceledIcon, 'Canceladas', 'TravelsCanceled')}
            </Content>
        </Container>
    )
}