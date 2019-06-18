import React from 'react';

import { 
    Container,
    Content,
    Tab,
    TabIcon,
    TabText 
} from './styles';

import HomeIcon from '../../assets/img/home.png';
import HomeSelectedIcon from '../../assets/img/homeSelected.png';
import ProfileIcon from '../../assets/img/profile.png';
import ProfileSelectedIcon from '../../assets/img/profileSelected.png';
import TravelIcon from '../../assets/img/travel.png';
import TravelSelectedIcon from '../../assets/img/travelSelected.png';

export default function TabBar(props) {
    const navigate = props.navigation.navigate;
    const currentRoute = props.navigation.state.routes[props.navigation.state.index].key;

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
                { _renderTab(HomeIcon, HomeSelectedIcon, 'Home', 'Home')}
                { _renderTab(TravelIcon, TravelSelectedIcon, 'Viagens', 'Travels')}
                { _renderTab(ProfileIcon, ProfileSelectedIcon, 'Perfil', 'Profile')}
            </Content>
        </Container>
    );
}