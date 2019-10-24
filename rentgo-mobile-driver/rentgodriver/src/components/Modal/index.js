import React from 'react';
import { View, Modal, Text } from 'react-native';

// import { Container } from './styles';

export default function ModalPush(props) {

    console.log('props modal', props)

    return (
        <Modal animationType="fade" transparent visible={props.visible} onRequestClose={() => {}}>
            <View style={{flex: 1, justifyContent: "center", backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 20}}>
                <View style={{alignItems: 'stretch', alignSelf: 'stretch', backgroundColor: '#FFFFFF', borderRadius: 10, padding: 20}}>
                    <Text>Ola mundo</Text>
                </View>
            </View>
        </Modal>
    )
}