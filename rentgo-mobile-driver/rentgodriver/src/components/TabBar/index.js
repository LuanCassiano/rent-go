import React from 'react'
import { View } from 'react-native'

import { 
    Container,
    Content,
    Tab,
    TabIcon,
    TabText, 
} from './styles'

// import locationIcon from '../../assets/icons/location.png'
// import locationUnselectedIcon from '../../assets/icons/locationUnselected.png'
// import inProgressIcon from '../../assets/icons/inProgress.png'
// import inProgressUnselectedIcon from '../../assets/icons/inProgressUnselected.png'

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
                { _renderTab(null, null, 'Finalizadas', 'Travels')}
                { _renderTab(null, null, 'Agendadas', 'TravelsScheduled')}
            </Content>
        </Container>
    )
}