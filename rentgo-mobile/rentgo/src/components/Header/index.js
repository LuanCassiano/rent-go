import React, { useEffect, useState } from 'react';
import { ActivityIndicator, AsyncStorage, TouchableOpacity, Image, View } from 'react-native';

import { 
    Container,
    Content,
    HeaderActionButton,
    HeaderActionButtonIcon,
    Title,
    ViewGeneric,
} from './styles';

import menuIcon from '../../assets/icons/menu.png'
import backIcon from '../../assets/icons/back.png'

export default function Header(props) {

    goBack = () => {
        props.onBack.goBack()
    }

    _renderAction = () => {
        if(props.onBack) {
            return (
                <View style={{backgroundColor: 'transparent'}}>
                    <Content>
                        <TouchableOpacity style={{width: 50, height: 50}} onPress={goBack}>
                            <Image source={backIcon} style={{width: 20, height: 20, margin: 20}}/>
                        </TouchableOpacity>
                    </Content>
                </View>
            )
        }

        if(props.onDrawer) {
            return (
                <Container>
                    <Content>
                        <HeaderActionButton onPress={props.onDrawer}>
                            <HeaderActionButtonIcon source={menuIcon}/>
                        </HeaderActionButton>
                        <Title>{props.title}</Title>
                        <View>
                            
                        </View>
                    </Content>
                </Container>
            )
        }
    }

    return (
        <>
            { _renderAction()}
        </>
    );
}