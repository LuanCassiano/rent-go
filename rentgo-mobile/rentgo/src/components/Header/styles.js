import { Platform } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled.View`
    padding-top: ${Platform.OS === "ios" ? 20 : 15};
    padding-left: ${Platform.OS === "ios" ? 20 : 15};
    padding-right: ${Platform.OS === "ios" ? 20 : 15};
    padding-bottom: ${Platform.OS === "ios" ? 20 : 15};
    background-color: #1C2331;
`;

export const Content = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const HeaderActionButton = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    margin-top: ${Platform.OS === "ios" ? 25 : 5};
    margin-bottom: 0px;
    margin-left: 10px;
`;

export const HeaderActionButtonIcon = styled.Image`
    width: 30px; 
    height: 30px;
`;

export const Title = styled.Text`
    margin-top: ${Platform.OS === "ios" ? 28 : 5};
    margin-right: 50px;
    color: #FFF;
    font-family: 'Quicksand-Bold';
    text-align: center;
    font-size: 20px;
`;