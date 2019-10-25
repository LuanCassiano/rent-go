import React from 'react'
import { View } from 'react-native'

import { 
    Container,
    Content,
    Tab,
    TabIcon,
    TabText, 
} from './styles'

import requestIcon from '../../assets/icons/progress.png'
import requestSelectedIcon from '../../assets/icons/progressSelected.png'
import scheduledIcon from '../../assets/icons/calendar.png'
import scheduledSelectedIcon from '../../assets/icons/calendarSelected.png'
import inProgressIcon from '../../assets/icons/tracking.png'
import inProgressSelectedIcon from '../../assets/icons/trackingSelected.png'
import finishedIcon from '../../assets/icons/location.png'
import finishedSelectedIcon from '../../assets/icons/locationSelected.png'
import canceledIcon from '../../assets/icons/cancel.png'
import canceledSelectedIcon from '../../assets/icons/cancelSelected.png'

export default function TabBar(props) {
    
    const navigate = props.navigation.navigate
    const currentRoute = props.navigation.state.routes[props.navigation.state.index].key

    _renderTab = (icon, iconSelected, label, screen) => {
        return (
            <Tab onPress={() => navigate(screen)}>
                <TabIcon source={currentRoute === screen ? iconSelected : icon }/>
                <TabText isActive={currentRoute === screen ? true : false}>{label}</TabText>
            </Tab>
        )
    }
    
    return (
        <Container>
            <Content>
                { _renderTab(requestIcon, requestSelectedIcon, 'Solicitadas', 'TravelRequests')}
                { _renderTab(scheduledIcon, scheduledSelectedIcon, 'Agendadas', 'TravelsScheduled')}
                { _renderTab(inProgressIcon, inProgressSelectedIcon, 'Em andamento', 'TravelInProgress')}
                { _renderTab(finishedIcon, finishedSelectedIcon, 'Finalizadas', 'Travels')}
                { _renderTab(canceledIcon, canceledSelectedIcon, 'Canceladas', 'TravelsCanceled')}
            </Content>
        </Container>
    )
}