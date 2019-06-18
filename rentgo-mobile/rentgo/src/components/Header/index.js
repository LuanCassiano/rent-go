import React, { useEffect, useState } from 'react';
import { ActivityIndicator, AsyncStorage } from 'react-native';

import { 
    Container,
    Content,
    HeaderActionButton,
    HeaderActionButtonIcon,
    Title,
    ViewGeneric,
    ButtonImageProfile,
    ImageProfile
} from './styles';

// import BackIcon from '../../assets/img/left-arrow.png';

export default function Header(props) {

    const [profileImage, setProfileImage] = useState('');

    _renderBackButton = () => {
        if(props.onBack) {
            return (
                <HeaderActionButton onPress={props.onBack}>
                    <HeaderActionButtonIcon source={BackIcon}/>
                </HeaderActionButton>
            )
        }

        return (
            <ViewGeneric/>
        )
    }

    _renderProfileImage = () => {
        return (
            <ButtonImageProfile onPress={props.onSignOut}>
                { !profileImage ? (
                    <ActivityIndicator size="large" color="#3F729B"/>
                ) : (
                    <ImageProfile source={{uri: profileImage}}/>
                )}
            </ButtonImageProfile>
        )
    }

    // useEffect(() => {
    //     async function loadUserInfo() {
    //         const info = await AsyncStorage.getItem('MyStoreUser');
    //         const data = JSON.parse(info);

    //         setProfileImage(data.profile_image)
    //     }

    //     loadUserInfo();
    // }, [])

    return (
        <Container>
            <Content>
                {/* { _renderBackButton()} */}
                <Title numberOfLines={1}>{props.title}</Title>
                {/* { _renderProfileImage()} */}
            </Content>
        </Container>
    );
}